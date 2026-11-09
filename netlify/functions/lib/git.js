/**
 * Atomic multi-file commits via the GitHub Git Data API.
 *
 * The Contents API can only write one file per request, so a publish that
 * touches four files (cover image, the page, sitemap.xml, the listing page)
 * costs eight round-trips, lands as four separate commits, and triggers four
 * separate Netlify deploys. Worse, a timeout partway through leaves the repo
 * in a state no single step intended - a page with no sitemap entry, or a
 * sitemap entry pointing at a page that was never written.
 *
 * This builds one tree and one commit instead:
 *
 *   blobs (parallel)  ->  tree  ->  commit  ->  ref update
 *
 * so the whole publish either lands or it does not, in one commit, with one
 * deploy, and the sequential depth is roughly halved.
 *
 * Two behaviours are carried over from lib/sitemap.js and lib/archive.js
 * deliberately, because the publishers depend on them:
 *
 *  - Concurrent publishes. The ref update is NOT forced, so a push that landed
 *    between our read and our write is rejected rather than clobbered; we
 *    re-read and rebuild. Blobs are content-addressed, so retrying is cheap.
 *  - No empty commits. If the resulting tree is identical to the base tree,
 *    nothing actually changed and no commit is made - a re-publish of an
 *    unchanged post does not trigger a pointless site rebuild.
 */

const MAX_ATTEMPTS = 3;
const FILE_MODE = "100644";

function ghHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
  };
}

function gh(token, repo, endpoint, init) {
  return fetch(`https://api.github.com/repos/${repo}${endpoint}`, {
    headers: ghHeaders(token),
    ...init,
  });
}

async function ghJson(token, repo, endpoint, init, what) {
  const res = await gh(token, repo, endpoint, init);

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`${what} failed (${res.status}): ${detail.slice(0, 200)}`);
  }

  return res.json();
}

/** Blobs are content-addressed: identical bytes always resolve to the same sha. */
async function createBlob(token, repo, buffer) {
  const data = await ghJson(
    token,
    repo,
    "/git/blobs",
    {
      method: "POST",
      body: JSON.stringify({
        content: buffer.toString("base64"),
        encoding: "base64",
      }),
    },
    "Blob create"
  );

  return data.sha;
}

/** One call gives us both the head commit and its tree, so we skip a hop. */
async function readBranch(token, repo, branch) {
  const data = await ghJson(token, repo, `/branches/${branch}`, undefined, "Branch read");

  return {
    commitSha: data.commit.sha,
    treeSha: data.commit.commit.tree.sha,
  };
}

async function readTextFile(token, repo, branch, filePath) {
  const res = await gh(token, repo, `/contents/${filePath}?ref=${encodeURIComponent(branch)}`);

  if (!res.ok) {
    throw new Error(`Could not read ${filePath} (${res.status})`);
  }

  const data = await res.json();
  return Buffer.from(data.content, "base64").toString("utf8");
}

/**
 * Commits `files` and `edits` together as a single commit.
 *
 *   files: [{ path, buffer }]          content known upfront
 *   edits: [{ path, apply(text) }]     read-modify-write; apply returns the new
 *                                      text, or null when already correct
 *
 * An edit whose file cannot be read or whose apply() throws is SKIPPED, not
 * fatal - a missing sitemap line must never take the post itself down with it,
 * which is the same rule lib/sitemap.js and lib/archive.js follow. Skipped
 * paths come back in the result so the caller can log them.
 */
async function commitFiles({ token, repo, branch = "main", message, files = [], edits = [] }) {
  // Created once: the bytes do not change between attempts, and an identical
  // blob costs nothing to re-reference.
  const staticEntries = await Promise.all(
    files.map(async (file) => ({
      path: file.path,
      sha: await createBlob(token, repo, file.buffer),
    }))
  );

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const skipped = [];

    // The edit reads address the branch by name, not by the sha we are about
    // to read, so they do not depend on readBranch - all of it goes out at
    // once. Re-read on every attempt: a competing publish may have moved them.
    const [{ commitSha, treeSha }, ...edited] = await Promise.all([
      readBranch(token, repo, branch),
      ...edits.map(async (edit) => {
        try {
          return { edit, text: edit.apply(await readTextFile(token, repo, branch, edit.path)) };
        } catch (err) {
          skipped.push({ path: edit.path, reason: err.message });
          return null;
        }
      }),
    ]);

    const editEntries = await Promise.all(
      edited
        // null = unreadable (already recorded above); apply() returning null
        // means the desired state already holds, so there is nothing to write.
        .filter((result) => result && result.text !== null && result.text !== undefined)
        .map(async ({ edit, text }) => ({
          path: edit.path,
          sha: await createBlob(token, repo, Buffer.from(text, "utf8")),
        }))
    );

    const entries = [...staticEntries, ...editEntries];
    if (!entries.length) return { committed: false, skipped };

    const tree = await ghJson(
      token,
      repo,
      "/git/trees",
      {
        method: "POST",
        body: JSON.stringify({
          base_tree: treeSha,
          tree: entries.map((entry) => ({
            path: entry.path,
            mode: FILE_MODE,
            type: "blob",
            sha: entry.sha,
          })),
        }),
      },
      "Tree create"
    );

    // Same tree as the base means every file already held this exact content.
    if (tree.sha === treeSha) return { committed: false, skipped };

    const commit = await ghJson(
      token,
      repo,
      "/git/commits",
      {
        method: "POST",
        body: JSON.stringify({
          message,
          tree: tree.sha,
          parents: [commitSha],
        }),
      },
      "Commit create"
    );

    // force:false - a push that landed since readBranch must lose, not be
    // overwritten. 422 is exactly that collision.
    const res = await gh(token, repo, `/git/refs/heads/${branch}`, {
      method: "PATCH",
      body: JSON.stringify({ sha: commit.sha, force: false }),
    });

    if (res.ok) {
      return { committed: true, sha: commit.sha, skipped };
    }

    if (res.status === 422 && attempt < MAX_ATTEMPTS) {
      console.warn(`[git] Ref moved under us, retrying (attempt ${attempt})`);
      continue;
    }

    const detail = await res.text();
    throw new Error(`Ref update failed (${res.status}): ${detail.slice(0, 200)}`);
  }

  throw new Error("Commit failed after retries (too many concurrent publishes)");
}

module.exports = { commitFiles };
