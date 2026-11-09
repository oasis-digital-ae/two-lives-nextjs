const { createClient } = require("@supabase/supabase-js");

/* ================================
   CRON SCHEDULE (daily)
================================ */
exports.config = {
  schedule: "@daily", // daily run
};

exports.handler = async () => {
  try {
    console.log("⏰ Scheduled ping started...");

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    // lightweight query
    const { error } = await supabase
      .from("blog_posts")
      .select("id")
      .limit(1);

    if (error) {
      console.log("❌ Supabase error:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error }),
      };
    }

    console.log("✅ Supabase keep-alive success");

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };

  } catch (err) {
    console.log("💥 Error:", err.message);
    return {
      statusCode: 500,
      body: err.message,
    };
  }
};