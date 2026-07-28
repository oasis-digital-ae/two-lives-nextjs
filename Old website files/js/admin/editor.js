// Helper: get query parameter
function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

let editingSlug = getQueryParam("slug");
let uploadedFeaturedURL = null;

/* ======================================================
   LOAD POST FOR EDITING
====================================================== */
async function loadPostForEditing() {
  if (!editingSlug) return;

  const { data, error } = await supabaseClient
    .from("blog_posts")
    .select("*")
    .eq("slug", editingSlug)
    .single();

  if (error || !data) return;

  document.getElementById("title").value = data.title || "";
  document.getElementById("slug").value = data.slug || "";
  document.getElementById("summary").value = data.summary || "";

  document.getElementById("main_heading").value = data.main_heading || "";
  document.getElementById("author_name").value = data.author_name || "";
  document.getElementById("publish_date").value =
    data.publish_date ? data.publish_date.substring(0, 10) : "";

  // ✅ TAG
  document.getElementById("tag").value = data.tag || "";

  if (data.thumbnail) {
    uploadedFeaturedURL = data.thumbnail;
    document.getElementById("featuredPreview").src = data.thumbnail;
    document.getElementById("featuredPreview").style.display = "block";
    document.getElementById("removeFeatured").style.display = "inline-block";
  }

  document.getElementById("seo_title").value = data.seo_title || "";
  document.getElementById("seo_description").value = data.seo_description || "";
  document.getElementById("seo_keywords").value = data.seo_keywords || "";
  document.getElementById("seo_canonical").value = data.seo_canonical || "";

  let timer = setInterval(() => {
    const editor = tinymce.get("editor");
    if (editor) {
      editor.setContent(data.html_content || "");
      clearInterval(timer);
    }
  }, 200);
}

loadPostForEditing();

/* ======================================================
   AUTO SLUG
====================================================== */
document.getElementById("title").addEventListener("input", function () {
  if (!editingSlug) {
    document.getElementById("slug").value =
      this.value.toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
  }
});

/* ======================================================
   FEATURED IMAGE UPLOAD
====================================================== */
document.getElementById("featuredInput").addEventListener("change", async function () {
  const file = this.files[0];
  if (!file) return;

  const fileName = `${Date.now()}-${file.name}`;
  const bucket = "blog-images";

  const upload = await supabaseClient.storage.from(bucket).upload(fileName, file);

  if (!upload.error) {
    const { data } = supabaseClient.storage
      .from(bucket)
      .getPublicUrl(fileName);

    uploadedFeaturedURL = data.publicUrl;
    document.getElementById("featuredPreview").src = uploadedFeaturedURL;
    document.getElementById("featuredPreview").style.display = "block";
    document.getElementById("removeFeatured").style.display = "inline-block";
  }
});

document.getElementById("removeFeatured").addEventListener("click", () => {
  uploadedFeaturedURL = null;
  document.getElementById("featuredPreview").style.display = "none";
  document.getElementById("removeFeatured").style.display = "none";
});

/* ======================================================
   SAVE POST
====================================================== */
document.getElementById("saveBtn").onclick = async function () {

  const editor = tinymce.get("editor");
  const html_content = editor ? editor.getContent() : "";

  const title = document.getElementById("title").value.trim();
  const slug = document.getElementById("slug").value.trim();
  const summary = document.getElementById("summary").value.trim();

  const main_heading = document.getElementById("main_heading").value.trim();
  const author_name = document.getElementById("author_name").value.trim();
  const publish_date = document.getElementById("publish_date").value;

  // ✅ TAG
  const tag = document.getElementById("tag").value.trim();

  const seo_title = document.getElementById("seo_title").value.trim();
  const seo_description = document.getElementById("seo_description").value.trim();
  const seo_keywords = document.getElementById("seo_keywords").value.trim();
  const seo_canonical = document.getElementById("seo_canonical").value.trim();

  let msg = document.getElementById("msg");
  msg.innerText = "";

  if (!title || !slug) {
    msg.innerText = "Title and slug are required.";
    return;
  }

  const user = await supabaseClient.auth.getUser();
  if (!user.data.user) {
    msg.innerText = "Not logged in.";
    return;
  }

  const payload = {
    title,
    slug,
    summary,
    main_heading,
    author_name,
    publish_date,
    tag, // ✅ saved
    html_content,
    thumbnail: uploadedFeaturedURL,
    seo_title,
    seo_description,
    seo_keywords,
    seo_canonical,
    author_id: user.data.user.id
  };

  if (!editingSlug) {
    const { error } = await supabaseClient
      .from("blog_posts")
      .insert(payload);

    if (error) return msg.innerText = error.message;
  } else {
    const { error } = await supabaseClient
      .from("blog_posts")
      .update(payload)
      .eq("slug", editingSlug);

    if (error) return msg.innerText = error.message;
  }

  window.location.href = "/admin/dashboard.html";
};
