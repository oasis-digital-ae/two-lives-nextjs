const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

exports.handler = async (event, context) => {
  try {
    console.log("🔥 Function triggered!");
    console.log("HTTP Method:", event.httpMethod);
    console.log("Raw event.body:", event.body);

    /* ======================================================
       1) ONLY POST REQUESTS ALLOWED
    ====================================================== */
    if (event.httpMethod !== "POST") {
      console.log("⛔ Not a POST request");
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Only POST allowed" }),
      };
    }

    /* ======================================================
       2) EXTRACT SLUG FROM Supabase Webhook BODY
    ====================================================== */
    let slug = null;

    try {
      const body = JSON.parse(event.body);
      if (body.record && body.record.slug) {
        slug = body.record.slug;
        console.log("✅ Slug extracted:", slug);
      }
    } catch (err) {
      console.log("❌ Failed to parse JSON:", err);
    }

    if (!slug) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Slug not found in event.body.record.slug",
          received_body: event.body,
        }),
      };
    }

    /* ======================================================
       3) ENV CHECKS
    ====================================================== */
    if (
      !process.env.SUPABASE_URL ||
      !process.env.SUPABASE_ANON_KEY ||
      !process.env.GITHUB_TOKEN
    ) {
      console.log("⛔ Missing environment vars");
      return { statusCode: 500, body: "Missing env variables" };
    }

    /* ======================================================
       4) INIT SUPABASE
    ====================================================== */
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    /* ======================================================
       5) FETCH BLOG FROM SUPABASE
    ====================================================== */
    const { data: blog, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !blog) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Blog not found", supabase_error: error }),
      };
    }

    /* ======================================================
       6) LOAD TEMPLATE
    ====================================================== */
    const templatePath = path.resolve(__dirname, "templates/blog-template.html");

    if (!fs.existsSync(templatePath)) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Template file missing" }),
      };
    }

    let template = fs.readFileSync(templatePath, "utf8");

    const headingSource = blog.main_heading || blog.title || "";
    const headingParts = headingSource.trim().replace(/\s+/g, " ").split(" ");
    const headingFirstWord = headingParts.shift() || "";
    const headingRest = headingParts.length ? ` ${headingParts.join(" ")}` : "";

    /* ======================================================
       7) RENDER HTML (UPDATED FOR NEW FIELDS)
    ====================================================== */
    const html = template
      .replace(/{{seo_title}}/g, blog.seo_title || blog.title)
      .replace(/{{seo_description}}/g, blog.seo_description || "")
      .replace(/{{canonical}}/g, blog.seo_canonical || "")
      .replace(/{{title}}/g, blog.title)
      .replace(/{{excerpt}}/g, blog.summary || "")
      .replace(/{{thumbnail}}/g, blog.thumbnail || "")
      .replace(/{{content}}/g, blog.html_content || "")
      .replace(/{{main_heading}}/g, blog.main_heading || "")
      .replace(/{{heading_first_word}}/g, headingFirstWord)
      .replace(/{{heading_rest}}/g, headingRest)
      .replace(/{{author_name}}/g, blog.author_name || "")
      .replace(/{{publish_date}}/g, blog.publish_date || "");

    /* ======================================================
       8) GitHub file check
    ====================================================== */
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const REPO = "oasis-digital-ae/two-lives";
    const FILE_PATH = `blogs/${slug}.html`;

    const url = `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`;

    const existing = await fetch(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    });

    if (existing.status === 200) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: false,
          skipped: true,
          reason: "File already exists",
        }),
      };
    }

    /* ======================================================
       9) UPLOAD TO GITHUB
    ====================================================== */
    const upload = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({
        message: `Generated blog HTML for slug: ${slug}`,
        content: Buffer.from(html, "utf8").toString("base64"),
      }),
    });

    const result = await upload.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, file: FILE_PATH, result }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
