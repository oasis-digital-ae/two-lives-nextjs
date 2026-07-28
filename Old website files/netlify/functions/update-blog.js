const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Netlify native fetch available

exports.handler = async (event, context) => {
  try {
    console.log("🔥 UPDATE Function triggered!");
    console.log("HTTP Method:", event.httpMethod);
    console.log("Raw event.body:", event.body);

    /* ======================================================
       1) ONLY POST ALLOWED
    ====================================================== */
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Only POST allowed" };
    }

    /* ======================================================
       2) PARSE WEBHOOK PAYLOAD
    ====================================================== */
    let payload;
    try {
      payload = JSON.parse(event.body);
    } catch (err) {
      console.log("❌ JSON parse failed:", err);
      return { statusCode: 400, body: "Invalid JSON body" };
    }

    const updated = payload.record;
    const old = payload.old_record;

    if (!updated || !updated.slug) {
      return { statusCode: 400, body: "Missing slug in payload" };
    }

    const newSlug = updated.slug;
    const oldSlug = old?.slug || null;

    console.log("🆕 New slug:", newSlug);
    console.log("🧡 Old slug:", oldSlug);

    /* ======================================================
       3) ENV CHECKS
    ====================================================== */
    if (
      !process.env.SUPABASE_URL ||
      !process.env.SUPABASE_ANON_KEY ||
      !process.env.GITHUB_TOKEN
    ) {
      return { statusCode: 500, body: "Missing environment variables" };
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const REPO = "oasis-digital-ae/two-lives";

    /* ======================================================
       4) FETCH COMPLETE BLOG DATA
    ====================================================== */
    console.log("🔎 Fetching updated blog using new slug:", newSlug);

    const { data: blog, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", newSlug)
      .single();

    if (error || !blog) {
      console.log("⛔ Could not fetch blog:", error);
      return { statusCode: 404, body: "Blog not found" };
    }

    /* ======================================================
       5) LOAD TEMPLATE
    ====================================================== */
    const templatePath = path.resolve(__dirname, "templates/blog-template.html");

    if (!fs.existsSync(templatePath)) {
      return { statusCode: 500, body: "Template not found" };
    }

    let template = fs.readFileSync(templatePath, "utf8");

    const headingSource = blog.main_heading || blog.title || "";
    const headingParts = headingSource.trim().replace(/\s+/g, " ").split(" ");
    const headingFirstWord = headingParts.shift() || "";
    const headingRest = headingParts.length ? ` ${headingParts.join(" ")}` : "";

    /* ======================================================
       6) RENDER HTML (UPDATED FOR NEW FIELDS)
    ====================================================== */
    console.log("🛠 Rendering new HTML…");

    const html = template
      .replace(/{{seo_title}}/g, blog.seo_title || blog.title)
      .replace(/{{seo_description}}/g, blog.seo_description || "")
      .replace(/{{canonical}}/g, blog.seo_canonical || "")
      .replace(/{{title}}/g, blog.title || "")
      .replace(/{{excerpt}}/g, blog.summary || "")
      .replace(/{{thumbnail}}/g, blog.thumbnail || "")
      .replace(/{{content}}/g, blog.html_content || "")
      .replace(/{{main_heading}}/g, blog.main_heading || "")
      .replace(/{{heading_first_word}}/g, headingFirstWord)
      .replace(/{{heading_rest}}/g, headingRest)
      .replace(/{{author_name}}/g, blog.author_name || "")
      .replace(/{{publish_date}}/g, blog.publish_date || "");

    /* ======================================================
       7) DELETE OLD FILE IF SLUG CHANGED
    ====================================================== */
    if (oldSlug && oldSlug !== newSlug) {
      console.log("🗑 Slug changed — deleting old file:", oldSlug);

      const oldPath = `blogs/${oldSlug}.html`;
      const oldUrl = `https://api.github.com/repos/${REPO}/contents/${oldPath}`;

      const oldFile = await fetch(oldUrl, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        }
      });

      if (oldFile.status === 200) {
        const oldJson = await oldFile.json();
        console.log("📌 Old file SHA:", oldJson.sha);

        await fetch(oldUrl, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github+json",
          },
          body: JSON.stringify({
            message: `Deleted old HTML for slug: ${oldSlug}`,
            sha: oldJson.sha
          }),
        });

        console.log("🗑 Old HTML deleted");
      }
    }

    /* ======================================================
       8) UPLOAD UPDATED FILE
    ====================================================== */
    console.log("⬆ Uploading updated file:", newSlug);

    const newPath = `blogs/${newSlug}.html`;
    const newUrl = `https://api.github.com/repos/${REPO}/contents/${newPath}`;

    // Check if new file exists
    const existingNew = await fetch(newUrl, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      }
    });

    let newSha = null;
    if (existingNew.status === 200) {
      const newJson = await existingNew.json();
      newSha = newJson.sha;
    }

    const upload = await fetch(newUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({
        message: `Updated blog HTML for slug: ${newSlug}`,
        content: Buffer.from(html, "utf8").toString("base64"),
        sha: newSha || undefined,
      }),
    });

    const result = await upload.json();
    console.log("GitHub upload result:", result);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        updated_slug: newSlug,
        old_slug_deleted: oldSlug !== newSlug,
        github: result
      }),
    };

  } catch (err) {
    console.log("💥 UPDATE FUNCTION ERROR:", err);
    return { statusCode: 500, body: err.message };
  }
};
