(async function () {
    const box = document.getElementById("recent-posts");
    if (!box || !window.supabase) return;

    const path = window.location.pathname;
    const currentSlug = path.split("/").pop().replace(".html", "");

    const supabase = window.supabase.createClient(
        "https://iceaceywsecnlmkcqopu.supabase.co",
        "sb_publishable_HC5p_ycaiSfyqVevN0tiiQ_bAiC7H9r"
    );

    const { data } = await supabase
        .from("blog_posts")
        .select("title,main_heading, slug, thumbnail, publish_date")
        .neq("slug", currentSlug)
        .order("publish_date", { ascending: false })
        .limit(6);

    if (!data || !data.length) return;

    box.innerHTML = data.map(post => `
        <a href="/blogs/${post.slug}" class="recent-post-item">
            <div class="recent-post-thumb">
                <img src="${post.thumbnail || '/images/placeholder.jpg'}" alt="">
            </div>
            <div class="recent-post-content">
                <div class="recent-post-title">${post.main_heading || post.title}</div>
                
            </div>
        </a>
    `).join("");
})();
