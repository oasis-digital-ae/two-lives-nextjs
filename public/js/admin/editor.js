// Helper: get query parameter
function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

/* Journal or Blogs - picked by ?type= in the URL (see content-types.js). */
const TYPE = currentContentType();

let editingSlug = getQueryParam("slug");
let uploadedFeaturedURL = null;
// Whether the post being edited is already live. A new post starts as a draft.
let currentStatus = "draft";

/* ======================================================
   PAGE CHROME
====================================================== */
document.title = editingSlug ? `Edit ${TYPE.singular}` : `New ${TYPE.singular}`;

const editorHeading = document.getElementById("editor-title");
if (editorHeading) {
  editorHeading.textContent = `${editingSlug ? "Edit" : "New"} ${TYPE.singular}`;
}

const slugPrefix = document.getElementById("slug-prefix");
if (slugPrefix) slugPrefix.textContent = `${TYPE.urlPrefix}/`;

/* ======================================================
   LOAD POST FOR EDITING
====================================================== */
async function loadPostForEditing() {
  if (!editingSlug) return;

  const { data, error } = await supabaseClient
    .from(TYPE.table)
    .select("*")
    .eq("slug", editingSlug)
    .single();

  if (error || !data) return;

  document.getElementById("title").value = data.title || "";
  document.getElementById("slug").value = data.slug || "";
  document.getElementById("summary").value = data.summary || "";

  document.getElementById("main_heading").value = data.main_heading || "";
  document.getElementById("author_name").value = data.author_name || "";
  // odai_blogs stores a full timestamp; the date input only takes the day
  document.getElementById("publish_date").value =
    data.publish_date ? String(data.publish_date).substring(0, 10) : "";

  // ✅ TAG
  document.getElementById("tag").value = data.tag || "";

  // Rows saved before the status column existed are already live.
  currentStatus = data.status || "published";
  renderStatusNote();

  if (data.thumbnail) {
    uploadedFeaturedURL = data.thumbnail;
    document.getElementById("featuredPreview").src = data.thumbnail;
    document.getElementById("featuredPreview").style.display = "block";
    document.getElementById("removeFeatured").style.display = "inline-block";
  }

  document.getElementById("seo_title").value = data.seo_title || "";
  const seoDesc = document.getElementById("seo_description");
  seoDesc.value = data.seo_description || "";
  seoDesc.dispatchEvent(new Event("input")); // refresh the character counter
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
   STATUS NOTE
   Tells the author, in words, whether what they are looking at is on the
   site - the single thing that was previously invisible in this editor.
====================================================== */
function renderStatusNote() {
  const badge = document.getElementById("status-badge");
  if (badge) {
    badge.className = "badge " + (currentStatus === "published" ? "badge-live" : "badge-draft");
    badge.textContent = currentStatus === "published" ? "Live" : "Draft";
  }

  const note = document.getElementById("status-note");
  if (!note) return;

  note.innerHTML =
    currentStatus === "published"
      ? `This ${TYPE.singular} is <strong>live</strong>. Saving keeps the live page as it is &mdash; press <strong>Push Live</strong> to send your changes to the site.`
      : `This ${TYPE.singular} is a <strong>draft</strong>. Nothing is on the site until you press <strong>Push Live</strong>.`;
}

/* ======================================================
   SAVE
====================================================== */

/**
 * Collects the form and writes it to the type's table.
 *
 * `publish` is the ONLY thing that puts a post on the site: it flips the status
 * and bumps publish_requested_at, and the update webhook republishes purely on
 * that timestamp changing. An ordinary save leaves both alone, which is what
 * lets a live post be edited and previewed without the edit going out.
 *
 * Returns the slug on success, or null (message already shown) on failure.
 */
async function savePost({ publish = false } = {}) {
  const editor = tinymce.get("editor");
  const html_content = editor ? editor.getContent() : "";

  const title = document.getElementById("title").value.trim();
  const slug = document.getElementById("slug").value.trim();
  const msg = document.getElementById("msg");
  msg.innerText = "";

  if (!title || !slug) {
    msg.innerText = "Title and slug are required.";
    return null;
  }

  if (!/^[a-z0-9-]+$/.test(slug)) {
    msg.innerText = "Slug can only contain lowercase letters, numbers and hyphens.";
    return null;
  }

  const user = await supabaseClient.auth.getUser();
  if (!user.data.user) {
    msg.innerText = "Not logged in.";
    return null;
  }

  const payload = {
    title,
    slug,
    summary: document.getElementById("summary").value.trim(),
    main_heading: document.getElementById("main_heading").value.trim(),
    author_name: document.getElementById("author_name").value.trim(),
    // An empty date input must go up as null, not "" - odai_blogs.publish_date
    // is a timestamp and rejects an empty string.
    publish_date: document.getElementById("publish_date").value || null,
    tag: document.getElementById("tag").value.trim(),
    html_content,
    thumbnail: uploadedFeaturedURL,
    seo_title: document.getElementById("seo_title").value.trim(),
    seo_description: document.getElementById("seo_description").value.trim(),
    seo_keywords: document.getElementById("seo_keywords").value.trim(),
    seo_canonical: document.getElementById("seo_canonical").value.trim(),
  };

  // odai_blogs (shared with the ODAI receiver) has no author_id column.
  if (TYPE.hasAuthorId) payload.author_id = user.data.user.id;

  if (publish) {
    payload.status = "published";
    payload.publish_requested_at = new Date().toISOString();
  } else if (!editingSlug) {
    // A brand new post is always a draft until it is pushed live.
    payload.status = "draft";
  }

  const { error } = editingSlug
    ? await supabaseClient.from(TYPE.table).update(payload).eq("slug", editingSlug)
    : await supabaseClient.from(TYPE.table).insert(payload);

  if (error) {
    msg.innerText = error.message;
    return null;
  }

  // The slug can be edited, so keep editing the row we just wrote.
  editingSlug = slug;
  if (publish) currentStatus = "published";
  renderStatusNote();

  return slug;
}

function busy(button, label) {
  button.disabled = true;
  button.dataset.label = button.innerHTML;
  button.innerHTML = label;
}

function done(button) {
  button.disabled = false;
  if (button.dataset.label) button.innerHTML = button.dataset.label;
}

function goBack() {
  window.location.href = adminUrl("dashboard.html", TYPE);
}

/* ---------- Save ---------- */
document.getElementById("saveBtn").onclick = async function () {
  busy(this, "Saving…");
  const slug = await savePost();
  done(this);
  if (slug) goBack();
};

/* ---------- Save & Preview ---------- */
document.getElementById("previewBtn").onclick = async function () {
  // Opened before the await: a popup blocker only trusts a window opened
  // directly from the click, not one opened after an async round-trip.
  const tab = window.open("", "_blank");

  busy(this, "Saving…");
  const slug = await savePost();
  done(this);

  if (!slug) {
    if (tab) tab.close();
    return;
  }

  const { data } = await supabaseClient.auth.getSession();
  const token = data?.session?.access_token;

  if (!token) {
    if (tab) tab.close();
    document.getElementById("msg").innerText = "Session expired - sign in again.";
    return;
  }

  const url =
    "/.netlify/functions/preview-blog?slug=" +
    encodeURIComponent(slug) +
    "&type=" +
    encodeURIComponent(TYPE.key) +
    "&token=" +
    encodeURIComponent(token);

  if (tab) tab.location = url;
  else window.open(url, "_blank");
};

/* ---------- Push Live ---------- */
document.getElementById("publishBtn").onclick = async function () {
  const wording =
    currentStatus === "published"
      ? "Send these changes to the live site?"
      : `Publish this ${TYPE.singular} to the live site?`;

  if (!confirm(wording)) return;

  busy(this, "Publishing…");
  const slug = await savePost({ publish: true });
  done(this);

  if (slug) {
    alert("Pushed live. The site rebuilds in 2-3 minutes.");
    goBack();
  }
};

renderStatusNote();
