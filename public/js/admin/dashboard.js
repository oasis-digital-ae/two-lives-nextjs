/* ======================================================
   UTILITY FUNCTIONS
====================================================== */

// Escape HTML to prevent XSS when rendering text
function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Valid slug (security)
function isValidSlug(slug) {
  return /^[a-z0-9-]+$/.test(slug);
}

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

/* Journal or Blogs - picked by ?type= in the URL (see content-types.js). */
const TYPE = currentContentType();

/* Everything loaded from the table; filters and search work on this copy so
   typing in the search box never hits the database. */
let allPosts = [];

const view = {
  query: "",
  status: "all", // all | live | draft | edited
  sort: "newest", // newest | oldest | title
};


/* ======================================================
   PAGE CHROME
   Title, "New" button and sidebar highlight follow the type.
====================================================== */

function renderChrome() {
  document.title = `Admin · ${TYPE.label}`;

  const heading = document.getElementById("page-title");
  if (heading) heading.textContent = TYPE.label;

  const sub = document.getElementById("page-sub");
  if (sub) {
    sub.textContent =
      TYPE.key === "blog"
        ? "Published at twolivestheory.com/blog. Blogs from ODAI appear here too."
        : "Published at twolivestheory.com/journal. Draft, preview, then push live.";
  }

  const newBtn = document.getElementById("new-post-btn");
  if (newBtn) {
    newBtn.innerHTML = `<i class="ri-add-line"></i> ${TYPE.newLabel}`;
    newBtn.onclick = () => (window.location.href = adminUrl("editor.html", TYPE));
  }

  const search = document.getElementById("search");
  if (search) search.placeholder = `Search ${TYPE.label.toLowerCase()} by title or slug…`;

  document.querySelectorAll("[data-type-link]").forEach((link) => {
    link.classList.toggle("active", link.dataset.typeLink === TYPE.key);
  });
}


/* ======================================================
   TOOLBAR (search · status filter · sort)
====================================================== */

function bindToolbar() {
  const search = document.getElementById("search");
  if (search) {
    search.addEventListener("input", () => {
      view.query = search.value.trim().toLowerCase();
      renderList();
    });
    // "/" focuses search, Escape clears it - the two shortcuts people expect.
    document.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== search && !/input|textarea/i.test(document.activeElement.tagName)) {
        e.preventDefault();
        search.focus();
      }
      if (e.key === "Escape" && document.activeElement === search) {
        search.value = "";
        view.query = "";
        renderList();
        search.blur();
      }
    });
  }

  document.querySelectorAll("[data-filter]").forEach((chip) => {
    chip.addEventListener("click", () => {
      view.status = chip.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((c) => c.classList.toggle("active", c === chip));
      renderList();
    });
  });

  const sort = document.getElementById("sort");
  if (sort) {
    sort.addEventListener("change", () => {
      view.sort = sort.value;
      renderList();
    });
  }
}


/* ======================================================
   LOAD POSTS
====================================================== */

async function loadPosts() {
  const box = document.getElementById("posts");

  if (!box) return console.error("Error: #posts not found.");

  box.innerHTML = `<p class="list-note">Loading ${TYPE.label.toLowerCase()}…</p>`;

  try {
    const { data, error } = await supabaseClient
      .from(TYPE.table)
      .select("id, title, slug, created_at, status, publish_requested_at, updated_at, publish_date, author_name, tag, thumbnail")
      .order("created_at", { ascending: false });

    if (error) throw error;

    allPosts = data || [];
    renderStats();
    renderList();

  } catch (err) {
    console.error("Load error:", err);
    box.innerHTML = `<p class="list-error">Failed to load ${TYPE.label.toLowerCase()}: ${escapeHTML(err.message || "")}</p>`;
  }
}


/* ======================================================
   STATE
====================================================== */

/**
 * A row has to answer one question at a glance: is this on the site?
 *
 *   Draft          never published
 *   Live           published, nothing edited since
 *   Live · edited  published, but there are saved changes not yet pushed
 *
 * Rows written before the status column existed carry no status; those are
 * already live, so they read as Live rather than Draft. Blog rows that came
 * from ODAI carry no publish_requested_at either - they are live too.
 */
function postState(post) {
  if ((post.status || "published") !== "published") {
    return { key: "draft", label: "Draft", cls: "badge-draft", live: false };
  }

  const pushed = post.publish_requested_at ? Date.parse(post.publish_requested_at) : 0;
  const saved = post.updated_at ? Date.parse(post.updated_at) : 0;

  // publish_requested_at is the BROWSER's clock, updated_at is the SERVER's
  // (set by a trigger in the same write). A few seconds of skew between the
  // two is normal, so allow a generous window: a real edit happens minutes
  // later, never within 30s of pressing Push Live.
  if (pushed && saved > pushed + 30000) {
    return { key: "edited", label: "Live · edited", cls: "badge-edited", live: true, stale: true };
  }

  return { key: "live", label: "Live", cls: "badge-live", live: true };
}


/* ======================================================
   STATS
====================================================== */

function renderStats() {
  const counts = { all: allPosts.length, live: 0, draft: 0, edited: 0 };
  allPosts.forEach((p) => { counts[postState(p).key]++; });

  const set = (id, n) => { const el = document.getElementById(id); if (el) el.textContent = n; };
  set("stat-all", counts.all);
  set("stat-live", counts.live + counts.edited);
  set("stat-draft", counts.draft);
  set("stat-edited", counts.edited);

  // Filter chips carry their counts too, so the numbers are next to the action.
  document.querySelectorAll("[data-filter]").forEach((chip) => {
    const n = chip.querySelector(".chip-count");
    if (n) n.textContent = counts[chip.dataset.filter] ?? 0;
  });
}


/* ======================================================
   LIST
====================================================== */

function visiblePosts() {
  let rows = allPosts.slice();

  if (view.status !== "all") {
    rows = rows.filter((p) => postState(p).key === view.status);
  }

  if (view.query) {
    rows = rows.filter((p) =>
      (p.title || "").toLowerCase().includes(view.query) ||
      (p.slug || "").toLowerCase().includes(view.query) ||
      (p.tag || "").toLowerCase().includes(view.query)
    );
  }

  const when = (p) => Date.parse(p.publish_date || p.created_at || 0) || 0;
  if (view.sort === "oldest") rows.sort((a, b) => when(a) - when(b));
  else if (view.sort === "title") rows.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
  else rows.sort((a, b) => when(b) - when(a));

  return rows;
}

function renderList() {
  const box = document.getElementById("posts");
  const count = document.getElementById("list-count");
  const rows = visiblePosts();

  if (count) {
    count.textContent =
      rows.length === allPosts.length
        ? `${allPosts.length} ${allPosts.length === 1 ? "post" : "posts"}`
        : `${rows.length} of ${allPosts.length} posts`;
  }

  if (!allPosts.length) {
    box.innerHTML = `
      <div class="list-empty">
        <i class="ri-quill-pen-line"></i>
        <p>No ${TYPE.label.toLowerCase()} yet.</p>
        <span>Press "${escapeHTML(TYPE.newLabel)}" to write the first one.</span>
      </div>`;
    return;
  }

  if (!rows.length) {
    box.innerHTML = `
      <div class="list-empty">
        <i class="ri-search-line"></i>
        <p>Nothing matches.</p>
        <span>Try a different search or clear the filter.</span>
      </div>`;
    return;
  }

  box.innerHTML = rows.map(renderPostRow).join("");
}

function renderPostRow(post) {
  const safeTitle = escapeHTML(post.title);
  const safeSlug = escapeHTML(post.slug);
  const state = postState(post);

  const badge = `<span class="badge ${state.cls}">${state.label}</span>`;

  const thumb = post.thumbnail
    ? `<img src="${escapeHTML(post.thumbnail)}" alt="" loading="lazy">`
    : `<i class="ri-image-line"></i>`;

  const meta = [
    formatDate(post.publish_date),
    post.author_name ? escapeHTML(post.author_name) : "",
    post.tag ? `<span class="tag">${escapeHTML(post.tag)}</span>` : "",
  ].filter(Boolean).join('<span class="dot">·</span>');

  // Only a draft, or a live post with unpushed edits, has anything to send.
  const pushButton =
    !state.live || state.stale
      ? `<button class="btn btn-accent" onclick="pushLive('${safeSlug}')"><i class="ri-rocket-line"></i> Push Live</button>`
      : "";

  // "View live" rather than "View": next to "Preview" a bare "View" reads like
  // the same action, and the difference between them is the whole point -
  // Preview shows your unpublished draft, this opens the real public page.
  const viewButton = state.live
    ? `<a href="https://twolivestheory.com${TYPE.urlPrefix}/${safeSlug}" target="_blank" rel="noopener"><button class="btn btn-ghost"><i class="ri-external-link-line"></i> View live</button></a>`
    : "";

  return `
    <div class="post-row" data-state="${state.key}">
      <div class="post-thumb">${thumb}</div>

      <div class="post-title">
        <div class="post-heading">${safeTitle}${badge}</div>
        <div class="post-meta">${meta}</div>
        <div class="small-slug">${TYPE.urlPrefix}/${safeSlug}</div>
      </div>

      <div class="post-actions">
        <button class="btn btn-ghost" onclick="previewPost('${safeSlug}')"><i class="ri-eye-line"></i> Preview</button>
        ${pushButton}
        ${viewButton}
        <button class="btn btn-ghost" onclick="editPost('${safeSlug}')"><i class="ri-edit-line"></i> Edit</button>
        <button class="btn btn-danger" onclick="deletePost('${safeSlug}')"><i class="ri-delete-bin-line"></i> Delete</button>
      </div>
    </div>
  `;
}


/* ======================================================
   PREVIEW
   Renders through the same code publishing uses, so it shows exactly
   what the live page will be. Writes nothing to the site.
====================================================== */

async function previewPost(slug) {
  if (!isValidSlug(slug)) return alert("Invalid slug.");

  // Opened before the await: a popup blocker only trusts a window opened
  // directly from the click, not one opened after an async round-trip.
  const tab = window.open("", "_blank");

  const { data } = await supabaseClient.auth.getSession();
  const token = data?.session?.access_token;

  if (!token) {
    if (tab) tab.close();
    return alert("Session expired - sign in again.");
  }

  const url =
    "/.netlify/functions/preview-blog?slug=" +
    encodeURIComponent(slug) +
    "&type=" +
    encodeURIComponent(TYPE.key) +
    "&token=" +
    encodeURIComponent(token);

  if (tab) tab.location = url;
  else window.open(url, "_blank");
}


/* ======================================================
   PUSH LIVE
   Sets status and bumps publish_requested_at. The update webhook
   republishes purely because that timestamp changed - which is what keeps
   an ordinary save from reaching the site.
====================================================== */

let pushInProgress = false;

async function pushLive(slug) {
  if (pushInProgress) return;
  if (!isValidSlug(slug)) return alert("Invalid slug.");
  if (!confirm(`Push "${slug}" to the live site?`)) return;

  pushInProgress = true;

  try {
    const { error } = await supabaseClient
      .from(TYPE.table)
      .update({ status: "published", publish_requested_at: new Date().toISOString() })
      .eq("slug", slug);

    if (error) throw error;

    alert("Pushed live. The site rebuilds in 2-3 minutes.");
    loadPosts();
  } catch (err) {
    console.error("Push live error:", err);
    alert("Failed to push live: " + err.message);
  }

  pushInProgress = false;
}


/* ======================================================
   EDIT POST
====================================================== */

function editPost(slug) {
  if (!isValidSlug(slug)) {
    alert("Invalid slug.");
    return;
  }
  window.location.href = adminUrl("editor.html", TYPE, { slug });
}


/* ======================================================
   DELETE POST
====================================================== */

let deleteInProgress = false;

async function deletePost(slug) {

  if (deleteInProgress) return; // Prevent double-click deletion

  if (!isValidSlug(slug)) {
    alert("Invalid slug.");
    return;
  }

  const ok = confirm(`Delete "${slug}"?\n\nIf it is live, the page is removed from the site too. This cannot be undone.`);
  if (!ok) return;

  deleteInProgress = true;

  try {
    const { error } = await supabaseClient
      .from(TYPE.table)
      .delete()
      .eq("slug", slug);

    if (error) throw error;

    loadPosts();

  } catch (err) {
    console.error("Delete error:", err);
    alert("Failed to delete post.");
  }

  deleteInProgress = false;
}


/* ======================================================
   INITIAL LOAD
====================================================== */

renderChrome();
bindToolbar();
loadPosts();
