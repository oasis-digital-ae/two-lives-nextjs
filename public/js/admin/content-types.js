/**
 * The two kinds of content the admin manages. Mirrors
 * netlify/functions/lib/post-types.js - keep the two in step.
 *
 *   journal  "Journal"  blog_posts  -> /journal/<slug>
 *   blog     "Blogs"    odai_blogs  -> /blog/<slug>
 *
 * The dashboard and the editor both read `?type=` from the URL and fall back
 * to journal, so every existing link (and bookmark) keeps working unchanged.
 *
 * odai_blogs is shared with the ODAI receiver, which is why a blog row has no
 * author_id column: the editor only sends that field for journal posts.
 */
const CONTENT_TYPES = {
  journal: {
    key: "journal",
    table: "blog_posts",
    urlPrefix: "/journal",
    label: "Journal",
    singular: "journal post",
    newLabel: "New Post",
    hasAuthorId: true,
  },
  blog: {
    key: "blog",
    table: "odai_blogs",
    urlPrefix: "/blog",
    label: "Blogs",
    singular: "blog post",
    newLabel: "New Blog",
    hasAuthorId: false,
  },
};

function currentContentType() {
  const key = new URLSearchParams(window.location.search).get("type") || "journal";
  return CONTENT_TYPES[key] || CONTENT_TYPES.journal;
}

/** Appends ?type= to an admin page URL, keeping journal links exactly as they were. */
function adminUrl(page, type, extra = {}) {
  const params = new URLSearchParams(extra);
  if (type.key !== "journal") params.set("type", type.key);
  const query = params.toString();
  return `/admin/${page}${query ? "?" + query : ""}`;
}

window.CONTENT_TYPES = CONTENT_TYPES;
window.currentContentType = currentContentType;
window.adminUrl = adminUrl;
