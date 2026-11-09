/**
 * Journal post preview - renders a post exactly as publishing would, and
 * returns it as a page instead of committing it.
 *
 * The whole point is that it shares lib/render-journal-post.js with
 * create-blog and update-blog, so what you see here IS what goes live. It
 * never writes to GitHub, never touches the sitemap or the listing page.
 *
 * Drafts are unpublished content, so this is behind the same Supabase login
 * the admin uses: the caller sends its access token and the token has to
 * resolve to a real user. Without that, an unlisted slug would be enough to
 * read anything unpublished.
 *
 * Called as: GET /.netlify/functions/preview-blog?slug=<slug>&token=<jwt>[&type=blog]
 * (token may also be sent as an Authorization: Bearer header)
 *
 * `type` is journal (default) or blog - see lib/post-types.js. It picks the
 * table the row is read from and the template it is rendered with.
 */

const { createClient } = require("@supabase/supabase-js");
const { renderPost } = require("./lib/render-journal-post");
const { typeForKey, TYPES } = require("./lib/post-types");

const html = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "text/html; charset=utf-8",
    // A preview is never a cacheable, indexable page.
    "Cache-Control": "no-store",
    "X-Robots-Tag": "noindex, nofollow",
  },
  body,
});

function errorPage(title, detail) {
  return `<!doctype html><meta charset="utf-8"><title>${title}</title>
<div style="font:16px/1.6 system-ui,sans-serif;max-width:520px;margin:80px auto;padding:0 20px">
<h1 style="font-size:20px;margin:0 0 10px">${title}</h1>
<p style="color:#555;margin:0">${detail}</p>
</div>`;
}

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "GET") {
      return html(405, errorPage("Method not allowed", "Use GET."));
    }

    const slug = (event.queryStringParameters?.slug || "").trim();
    if (!slug) {
      return html(400, errorPage("Missing slug", "No post was requested."));
    }

    const typeKey = (event.queryStringParameters?.type || "journal").trim();
    const type = typeForKey(typeKey);
    if (!type) {
      return html(400, errorPage("Unknown type", `"${typeKey}" is not a post type. Use one of: ${Object.keys(TYPES).join(", ")}.`));
    }

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      return html(500, errorPage("Not configured", "Supabase environment variables are missing."));
    }

    /* AUTH - the token comes from the logged-in admin session. */
    const token =
      (event.headers.authorization || "").replace(/^Bearer\s+/i, "").trim() ||
      (event.queryStringParameters?.token || "").trim();

    if (!token) {
      return html(401, errorPage("Not signed in", "Open this preview from the post editor."));
    }

    /* The token is attached to the client, so the row is read AS the signed-in
       admin and row-level security still applies. Reading with the bare anon
       key would hand back whatever anon happens to be allowed, which is not a
       decision this function should be making about unpublished content. */
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: auth, error: authError } = await supabase.auth.getUser(token);
    if (authError || !auth?.user) {
      return html(401, errorPage("Session expired", "Sign in to the admin again, then retry the preview."));
    }

    const { data: blog, error } = await supabase
      .from(type.table)
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !blog) {
      return html(404, errorPage("Post not found", `No ${type.key} post exists with the slug “${slug}”.`));
    }

    const { html: page } = renderPost(blog, slug, type);

    /* A banner so a preview tab is never mistaken for the live page. It is
       appended to the body and fixed to the viewport, so it cannot disturb
       the layout being previewed. */
    const banner = `
<div style="position:fixed;left:0;right:0;bottom:0;z-index:99999;background:#0E1412;color:#fff;
            font:600 13px/1.4 system-ui,sans-serif;padding:10px 16px;text-align:center;
            letter-spacing:.04em">
  ${type.key.toUpperCase()} PREVIEW — ${blog.status === "published" ? "this post is live; unsaved changes are shown here" : "draft, not published"}
  · not indexed · nothing has been written to the site
</div>`;

    return html(200, page.replace(/<\/body>/i, `${banner}\n</body>`));
  } catch (err) {
    console.error("[preview-blog]", err);
    return html(500, errorPage("Preview failed", err.message));
  }
};
