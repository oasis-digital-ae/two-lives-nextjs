/**
 * ODAI -> Two Lives blog receiver.
 *
 * ODAI's `webhook_push` publisher POSTs a published post here as JSON. ODAI
 * never touches this site directly - persisting the post is our job.
 *
 * Deliberate choices:
 *  - The post itself lives only in Supabase; the Next.js pages read it from there.
 *  - The cover image is downloaded and committed into THIS repo under
 *    public/images/blog/, and only the site URL is stored. Nothing is ever served
 *    from Supabase storage, so cached + uncached egress stays on Netlify's
 *    CDN instead of billing against the Supabase project.
 *  - Every OG/Twitter/JSON-LD asset is our own hardcoded file, never the
 *    logo/favicon URLs ODAI sends (those point at ODAI's Supabase bucket).
 *  - The canonical ODAI sends is `<site>/blog/<slug>` built from its own
 *    settings; we rebuild it here so it can never drift from this site.
 */

const { createClient } = require("@supabase/supabase-js");
const crypto = require("crypto");
const { commitFiles } = require("./lib/git");

const SITE_URL = "https://twolivestheory.com";
const REPO = "oasis-digital-ae/two-lives-nextjs";
const IMAGE_DIR = "images/blog";
const AUTHOR_NAME = "Basim Yafai";

/* Our own assets - hardcoded on purpose, never taken from the payload. */
const SITE_LOGO = `${SITE_URL}/images/tl-green-logo.svg`;
const FALLBACK_IMAGE = `${SITE_URL}/${IMAGE_DIR}/placeholder.png`;

const json = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

/* ======================================================
   MARKDOWN -> HTML
   ODAI sends `content` as Markdown (only its WordPress
   publisher converts; the webhook one passes it raw).

   The output has to match what css/blog-detail.css styles, so a few
   block types map onto this site's article components rather than to
   bare HTML. Everything here is ordinary Markdown that ODAI's writer
   can produce - the only additions are GitHub-style alert labels on a
   blockquote to pick which callout variant is wanted:

     | a | b |  + |---|---|   ->  <div class="blog-table-wrap"><table class="blog-table">
     > text                   ->  <div class="blog-callout">
     > [!plain] text          ->  <div class="blog-callout is-plain">
     > [!quote] text          ->  <div class="blog-pullquote">
     ---                      ->  <div class="blog-divider">
     1. item                  ->  <ol>
     - item                   ->  <ul>
     ![alt](url)              ->  <img>

   Anything unrecognised falls through to a paragraph, exactly as
   before, so a draft that uses none of this still publishes fine.
====================================================== */
/* Quotes are escaped too: link hrefs and image srcs come straight out of the
   payload into an attribute, and an unescaped `"` there would break out of it. */
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatInline(text) {
  return escapeHtml(text)
    .replace(/!\[(.*?)\]\((.+?)\)/g, '<img src="$2" alt="$1">')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
}

/** `| a | b |` -> ["a", "b"], tolerating a missing leading/trailing pipe. */
function splitRow(line) {
  return line
    .replace(/^\s*\|/, "")
    .replace(/\|\s*$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTableRow(line) {
  return line.includes("|");
}

/** The `|---|:--:|` line directly under a table's header row. */
function isTableDivider(line) {
  return /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(line);
}

function renderTable(headers, rows) {
  const head = headers.map((cell) => `<th>${formatInline(cell)}</th>`).join("");
  const body = rows
    .map((row) => `<tr>${row.map((cell) => `<td>${formatInline(cell)}</td>`).join("")}</tr>`)
    .join("\n");

  return (
    '<div class="blog-table-wrap">\n<table class="blog-table">\n' +
    `<thead>\n<tr>${head}</tr>\n</thead>\n` +
    `<tbody>\n${body}\n</tbody>\n` +
    "</table>\n</div>"
  );
}

/* `> [!plain]` / `> [!quote]` pick the variant; anything else is the
   default callout. The label is consumed, never rendered. */
const CALLOUT_VARIANTS = {
  plain: '<div class="blog-callout is-plain">',
  quote: '<div class="blog-pullquote">',
  lg: '<div class="blog-callout is-lg">',
};

function renderQuote(lines) {
  let open = null;

  // Stripped from EVERY line, not just the first: a writer pairing two lines
  // in one box naturally labels both (`> [!plain] a` / `> [!plain] b`), and a
  // label left in place renders as literal "[!plain]" text on the page. The
  // first label seen picks the variant; the rest are just consumed.
  const body = lines
    .map((line) => {
      const label = line.match(/^\[!(\w+)\]\s*/);
      if (!label) return line;

      open = open || CALLOUT_VARIANTS[label[1].toLowerCase()] || null;
      return line.slice(label[0].length);
    })
    .filter((line) => line.trim())
    .map((line) => `<p>${formatInline(line.trim())}</p>`)
    .join("\n");

  return `${open || '<div class="blog-callout">'}\n${body}\n</div>`;
}

function markdownToHtml(markdown) {
  const lines = String(markdown || "").split("\n");
  const parts = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i++;
      continue;
    }

    /* Table - only when the next line is the |---| divider, so a stray
       pipe in a sentence is still just a sentence. */
    if (isTableRow(line) && i + 1 < lines.length && isTableDivider(lines[i + 1])) {
      const headers = splitRow(line);
      const rows = [];
      i += 2;

      while (i < lines.length && lines[i].trim() && isTableRow(lines[i].trim())) {
        rows.push(splitRow(lines[i].trim()));
        i++;
      }

      parts.push(renderTable(headers, rows));
      continue;
    }

    /* Horizontal rule */
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line)) {
      parts.push('<div class="blog-divider"></div>');
      i++;
      continue;
    }

    /* Blockquote - consecutive `>` lines become one callout */
    if (line.startsWith(">")) {
      const quoted = [];

      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoted.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }

      parts.push(renderQuote(quoted));
      continue;
    }

    /* Heading */
    const heading = line.match(/^(#{1,6})\s+(.*)/);
    if (heading) {
      const level = Math.min(heading[1].length, 6);
      parts.push(`<h${level}>${formatInline(heading[2])}</h${level}>`);
      i++;
      continue;
    }

    /* Bullet list */
    if (/^[-*+]\s+/.test(line)) {
      const items = [];

      while (i < lines.length && /^[-*+]\s+/.test(lines[i].trim())) {
        items.push(`<li>${formatInline(lines[i].trim().replace(/^[-*+]\s+/, ""))}</li>`);
        i++;
      }

      parts.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    /* Numbered list */
    if (/^\d+[.)]\s+/.test(line)) {
      const items = [];

      while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) {
        items.push(`<li>${formatInline(lines[i].trim().replace(/^\d+[.)]\s+/, ""))}</li>`);
        i++;
      }

      parts.push(`<ol>${items.join("")}</ol>`);
      continue;
    }

    /* An image on its own line is a block, not a paragraph */
    if (/^!\[.*?\]\(.+?\)$/.test(line)) {
      parts.push(formatInline(line));
      i++;
      continue;
    }

    parts.push(`<p>${formatInline(line)}</p>`);
    i++;
  }

  /* A sign-off blockquote at the very end ("Speak soon, / Basim") reads as a
     callout box the article doesn't want. Keep the words, drop the box. */
  const last = parts[parts.length - 1];
  if (last && last.startsWith('<div class="blog-callout')) {
    parts[parts.length - 1] = last
      .replace(/^<div class="blog-callout[^"]*">\n/, "")
      .replace(/\n<\/div>$/, "");
  }

  return parts.join("\n");
}

function extensionFor(contentType, url) {
  if (contentType && contentType.includes("png")) return "png";
  if (contentType && contentType.includes("webp")) return "webp";
  if (contentType && contentType.includes("gif")) return "gif";

  const fromUrl = String(url).match(/\.(jpg|jpeg|png|webp|gif)(\?|$)/i);
  return fromUrl ? fromUrl[1].toLowerCase() : "jpg";
}

/**
 * Downloads the incoming cover image and works out where it belongs in this
 * repo. The filename carries a hash of the bytes, so re-publishing the same
 * image resolves to the same path (the tree ends up identical, so no commit)
 * while a genuinely new image gets a new path and cannot be masked by a stale
 * CDN cache.
 *
 * Nothing is written here - the buffer is handed back and committed alongside
 * the page in a single commit, so a publish can never end up with a page
 * pointing at an image that was not written.
 *
 * Any failure falls back to our own placeholder rather than letting an
 * external URL through - a broken image beats an egress bill on someone
 * else's bucket.
 */
async function fetchCoverImage(slug, imageUrl) {
  if (!imageUrl) return { url: FALLBACK_IMAGE, file: null };

  try {
    const res = await fetch(imageUrl);
    if (!res.ok) return { url: FALLBACK_IMAGE, file: null };

    const buffer = Buffer.from(await res.arrayBuffer());
    const extension = extensionFor(res.headers.get("content-type"), imageUrl);
    const digest = crypto.createHash("sha256").update(buffer).digest("hex").slice(0, 16);
    const filePath = `${IMAGE_DIR}/${slug}-${digest}.${extension}`;

    return { url: `${SITE_URL}/${filePath}`, file: { path: filePath, buffer } };
  } catch (err) {
    console.error("[odai-webhook] Cover image download failed, using placeholder:", err.message);
    return { url: FALLBACK_IMAGE, file: null };
  }
}

/* ======================================================
   HANDLER
====================================================== */
exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return json(405, { error: "Only POST allowed" });
    }

    /* 1) AUTH - must match the secret configured in ODAI blog settings */
    const expected = process.env.ODAI_WEBHOOK_SECRET;
    if (!expected) {
      return json(500, { error: "ODAI_WEBHOOK_SECRET is not configured" });
    }

    const provided = (event.headers.authorization || "").replace(/^Bearer\s+/i, "");
    const a = Buffer.from(provided);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return json(401, { error: "Unauthorized" });
    }

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY || !process.env.GITHUB_TOKEN) {
      return json(500, { error: "Missing environment variables" });
    }

    /* 2) PARSE */
    let payload;
    try {
      payload = JSON.parse(event.body);
    } catch {
      return json(400, { error: "Invalid JSON body" });
    }

    const slug = (payload.slug || "").trim();
    const title = (payload.title || "").trim();
    if (!slug || !title) {
      return json(400, { error: "slug and title are required" });
    }

    // ODAI sends the post id as both a field and an Idempotency-Key header;
    // it is the upsert key, so a retried delivery updates instead of duplicating.
    const postId = payload.postId || event.headers["idempotency-key"] || null;

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
    const token = process.env.GITHUB_TOKEN;

    /* 3) IMAGE -> BYTES (committed later, with everything else) */
    const cover = await fetchCoverImage(slug, payload.coverImageUrl);
    const thumbnail = cover.url;

    /* 4) BUILD OUR OWN SEO VALUES (payload's canonical points at /blog on
          whatever site URL ODAI has saved - we never trust it) */
    const canonical = `${SITE_URL}/blog/${slug}`;
    const description = payload.metaDescription || "";
    const publishedAt = payload.publishedAt || new Date().toISOString();
    const keywords = Array.isArray(payload.seoKeywords)
      ? payload.seoKeywords.join(", ")
      : payload.seoKeywords || "";

    const htmlContent = markdownToHtml(payload.content);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: title,
      description,
      image: thumbnail,
      datePublished: publishedAt,
      dateModified: publishedAt,
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      author: { "@type": "Organization", name: "Two Lives Theory", url: SITE_URL },
      publisher: {
        "@type": "Organization",
        name: "Two Lives Theory",
        logo: { "@type": "ImageObject", url: SITE_LOGO },
      },
    };

    /* 5) COMMIT THE COVER BEFORE THE ROW, so a post can never point at an image
          that was not written. A retry lands on the same hashed path. */
    if (cover.file) {
      await commitFiles({
        token,
        repo: REPO,
        branch: process.env.GITHUB_BRANCH || "main",
        message: `Add ODAI blog cover for slug: ${slug}`,
        files: [{ path: `public/${cover.file.path}`, buffer: cover.file.buffer }],
        edits: [],
      });
    }

    /* 6) SAVE TO DB - the page appears from this row, no deploy needed */
    const row = {
      external_post_id: postId,
      slug,
      title,
      main_heading: title,
      summary: description,
      thumbnail,
      author_name: AUTHOR_NAME,
      publish_date: publishedAt,
      html_content: htmlContent,
      raw_content: payload.content || "",
      seo_title: title,
      seo_description: description,
      seo_keywords: keywords,
      seo_canonical: canonical,
      json_ld: jsonLd,
      status: "published",
      published_at: publishedAt,
    };

    const { data: saved, error: dbError } = await supabase
      .from("odai_blogs")
      .upsert(row, { onConflict: "slug" })
      .select("id")
      .single();

    if (dbError) {
      return json(500, { error: "Database write failed", detail: dbError.message });
    }

    /* 7) ODAI stores these as external_post_id / external_post_url */
    return json(200, { id: saved.id, url: canonical });
  } catch (err) {
    console.error("[odai-webhook]", err);
    return json(500, { error: err.message });
  }
};
