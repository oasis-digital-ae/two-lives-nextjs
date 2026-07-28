exports.handler = async (event) => {
  try {
    console.log("🔥 DELETE Function triggered!");
    console.log("Raw event.body:", event.body);

    /* ======================================================
       1) POST only
    ====================================================== */
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Only POST allowed" }),
      };
    }

    /* ======================================================
       2) Parse Supabase webhook JSON (DELETE = old_record)
    ====================================================== */
    let deletedSlug = null;
    let json = null;

    try {
      json = JSON.parse(event.body);

      if (json.type !== "DELETE") {
        console.log("❌ Not a DELETE event. Ignoring.");
        return {
          statusCode: 200,
          body: JSON.stringify({ skipped: true, reason: "Not a DELETE event" }),
        };
      }

      if (json.old_record && json.old_record.slug) {
        deletedSlug = json.old_record.slug;
      }

    } catch (err) {
      console.log("❌ Invalid JSON:", err);
    }

    if (!deletedSlug) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Slug not found in old_record",
          received: event.body,
        }),
      };
    }

    console.log("🗑 DELETE slug:", deletedSlug);

    /* ======================================================
       3) ENV vars
    ====================================================== */
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const REPO = "oasis-digital-ae/two-lives";
    const FILE_PATH = `blogs/${deletedSlug}.html`;
    const url = `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`;

    if (!GITHUB_TOKEN) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing GITHUB_TOKEN" }),
      };
    }

    /* ======================================================
       4) Check if file exists
    ====================================================== */
    console.log("📡 Checking GitHub for file:", FILE_PATH);

    const existing = await fetch(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    });

    if (existing.status === 404) {
      console.log("⚠ File does not exist on GitHub.");
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: false,
          skipped: true,
          reason: "File not found",
        }),
      };
    }

    const existingJson = await existing.json();
    const sha = existingJson.sha;

    console.log("📌 File SHA:", sha);

    /* ======================================================
       5) Delete file
    ====================================================== */
    console.log("🗑 Deleting file from GitHub…");

    const del = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({
        message: `Deleted blog HTML for slug: ${deletedSlug}`,
        sha: sha,
      }),
    });

    const delResult = await del.json();
    console.log("GitHub Delete Result:", delResult);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        deleted_file: FILE_PATH,
        github: delResult,
      }),
    };

  } catch (err) {
    console.log("💥 CRASH:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
