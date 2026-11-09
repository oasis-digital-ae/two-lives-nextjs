/**
 * The two kinds of content the admin publishes, and where each one lives.
 *
 *   journal  admin "Journal" posts   blog_posts  -> /journal/<slug>  (journal.html archive)
 *   blog     admin "Blog" posts      odai_blogs  -> /blog/<slug>     (blog.html archive)
 *
 * odai_blogs is the same table the ODAI receiver (odai-webhook.js) writes into,
 * so a blog written in the admin and a blog pushed from ODAI end up in the same
 * listing, the same "recent posts" widget and the same /blog/ folder.
 *
 * Every publishing function receives a Supabase database webhook, and that
 * payload names the table it fired for - so the table is what picks the type.
 * A payload without a table (hand-crafted, or very old) falls back to journal,
 * which is what every function did before blogs existed.
 */

const TYPES = {
  journal: {
    key: "journal",
    table: "blog_posts",
    urlPrefix: "/journal",
    dir: "journal",
    template: "blog-template.html",
    archivePage: "journal.html",
  },
  blog: {
    key: "blog",
    table: "odai_blogs",
    urlPrefix: "/blog",
    dir: "blog",
    template: "odai-blog-template.html",
    archivePage: "blog.html",
  },
};

function typeForTable(table) {
  return Object.values(TYPES).find((t) => t.table === table) || null;
}

function typeForKey(key) {
  return TYPES[key] || null;
}

/** Type for a webhook payload - the table it fired for, else journal. */
function typeForPayload(payload) {
  return typeForTable(payload?.table) || TYPES.journal;
}

module.exports = { TYPES, typeForTable, typeForKey, typeForPayload };
