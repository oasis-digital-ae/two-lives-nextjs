/**
 * Renders one journal post row into its finished page HTML.
 *
 * Pulled out of create-blog.js / update-blog.js because preview-blog.js has to
 * produce EXACTLY what publishing will produce - a preview that renders through
 * a second, near-identical copy of this code is a preview you cannot trust. All
 * three now call this, so there is one template fill and one schema builder.
 */

const fs = require("fs");
const path = require("path");
const { TYPES } = require("./post-types");

const SITE_URL = "https://twolivestheory.com";

/**
 * Finding a template is not a one-liner, because __dirname is not stable for
 * this file.
 *
 * netlify.toml bundles functions with esbuild, which INLINES this module into
 * each function's entry file. Unbundled (plain `require` from source) __dirname
 * is netlify/functions/lib, so the template is at "../templates". Bundled,
 * the code is running from netlify/functions, so it is at "templates". The
 * previous copies of this logic lived in the entry files themselves and only
 * ever needed the second form - moving it in here is what broke it.
 *
 * So: try the candidates, use the first that exists, and remember it - once
 * per template file, since journal and blog posts use different ones.
 */
function templateCandidates(fileName) {
  return [
    path.resolve(__dirname, "..", "templates", fileName), // from lib/, unbundled
    path.resolve(__dirname, "templates", fileName), // inlined into the entry
    path.resolve(process.cwd(), "netlify", "functions", "templates", fileName),
  ];
}

const templatePaths = {};

function findTemplate(fileName) {
  if (templatePaths[fileName]) return templatePaths[fileName];

  const candidates = templateCandidates(fileName);
  const found = candidates.find((candidate) => fs.existsSync(candidate));

  if (!found) {
    throw new Error(`${fileName} not found. Looked in:\n  ${candidates.join("\n  ")}`);
  }

  templatePaths[fileName] = found;
  return found;
}

/** The published URL for a slug of a given type - also the canonical and the schema @id. */
function postUrl(slug, type = TYPES.journal) {
  return `${SITE_URL}${type.urlPrefix}/${slug}`;
}

function journalUrl(slug) {
  return postUrl(slug, TYPES.journal);
}

/**
 * seo_canonical is typed by hand in the admin editor, so it is routinely left
 * blank or left pointing at the previous slug after a rename. An empty or wrong
 * canonical is worse than none at all, so the stored value is only trusted when
 * it already matches this post's real URL.
 */
function canonicalFor(blog, slug, type) {
  const expected = postUrl(slug, type);
  return (blog.seo_canonical || "").trim() === expected ? blog.seo_canonical.trim() : expected;
}

function buildSchema(blog, canonicalUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.seo_title || blog.title,
    description: blog.seo_description || blog.summary || "",
    image: blog.thumbnail || "",
    datePublished: blog.publish_date || "",
    dateModified: blog.updated_at || blog.publish_date || "",
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    author: {
      "@type": "Person",
      name: blog.author_name || "Basim Yafai",
      url: `${SITE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "Two Lives Theory",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/tl-green-logo.svg` },
    },
  };
}

/**
 * @param blog  the row (blog_posts or odai_blogs - same columns for our purposes)
 * @param slug  the slug to render against - passed separately because an update
 *              renders the NEW slug while the row may still carry the old one
 * @param type  one of TYPES - picks the template, the URL prefix and the canonical
 */
function renderPost(blog, slug, type = TYPES.journal) {
  const template = findTemplate(type.template);
  const canonicalUrl = canonicalFor(blog, slug, type);

  // The hero highlights the first word of the heading, so it is split out here.
  const headingSource = blog.main_heading || blog.title || "";
  const headingParts = headingSource.trim().replace(/\s+/g, " ").split(" ");
  const headingFirstWord = headingParts.shift() || "";
  const headingRest = headingParts.length ? ` ${headingParts.join(" ")}` : "";

  const html = fs
    .readFileSync(template, "utf8")
    .replace(/{{seo_title}}/g, blog.seo_title || blog.title || "")
    .replace(/{{seo_description}}/g, blog.seo_description || "")
    .replace(/{{canonical}}/g, canonicalUrl)
    .replace(/{{title}}/g, blog.title || "")
    .replace(/{{excerpt}}/g, blog.summary || "")
    .replace(/{{thumbnail}}/g, blog.thumbnail || "")
    .replace(
      /{{content}}/g,
      // the article body repeats the post title as an <h1>; the template
      // already renders the title as the page <h1>, so demote to <h2>
      (blog.html_content || "").replace(/<h1(\s|>)/gi, "<h2$1").replace(/<\/h1>/gi, "</h2>"),
    )
    .replace(/{{main_heading}}/g, blog.main_heading || "")
    .replace(/{{heading_first_word}}/g, headingFirstWord)
    .replace(/{{heading_rest}}/g, headingRest)
    .replace(/{{author_name}}/g, blog.author_name || "")
    // odai_blogs stores a full timestamp; the page only ever shows the day
    .replace(/{{publish_date}}/g, String(blog.publish_date || "").substring(0, 10))
    .replace(/{{schema}}/g, JSON.stringify(buildSchema(blog, canonicalUrl)));

  return { html, canonicalUrl };
}

/**
 * A post is only written to the site when it has been pushed live. Rows saved
 * before the status column existed have no status at all, and those are already
 * published - treating them as drafts would silently stop updating live pages.
 */
function isPublished(blog) {
  return (blog?.status ?? "published") === "published";
}

/** Kept for callers that predate blog posts - identical to renderPost with the journal type. */
function renderJournalPost(blog, slug) {
  return renderPost(blog, slug, TYPES.journal);
}

module.exports = { renderPost, renderJournalPost, isPublished, postUrl, journalUrl, SITE_URL };
