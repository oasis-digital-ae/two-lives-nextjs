/* ======================================================
   UTILITY FUNCTIONS
====================================================== */

// Escape HTML to prevent XSS when rendering text
function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Valid slug (security)
function isValidSlug(slug) {
  return /^[a-z0-9-]+$/.test(slug);
}


/* ======================================================
   LOAD POSTS
====================================================== */

async function loadPosts() {
  const box = document.getElementById("posts");

  if (!box) return console.error("Error: #posts not found.");

  box.innerHTML = `<p style="padding:20px; color:#64748b;">Loading posts...</p>`;

  try {
    const { data, error } = await supabaseClient
      .from("blog_posts")
      .select("id, title, slug, created_at")
      .order("created_at", { ascending: false });

    if (error) throw error;

    if (!data || data.length === 0) {
      box.innerHTML = `
        <div style="padding:30px; text-align:center; color:#94a3b8;">
          No posts available yet.
        </div>
      `;
      return;
    }

    box.innerHTML = data.map(renderPostRow).join("");

  } catch (err) {
    console.error("Load error:", err);
    box.innerHTML = `<p style="color:#dc2626; padding:20px;">Failed to load posts.</p>`;
  }
}


/* ======================================================
   RENDER SINGLE POST ROW
====================================================== */

function renderPostRow(post) {
  const safeTitle = escapeHTML(post.title);
  const safeSlug = escapeHTML(post.slug);

  return `
    <div class="post-row">
      <div class="post-title">
        ${safeTitle}
        <div class="small-slug">${safeSlug}</div>
      </div>

      <div class="post-actions">
        <button onclick="editPost('${safeSlug}')">Edit</button>
        <button onclick="deletePost('${safeSlug}')">Delete</button>
      </div>
    </div>
  `;
}


/* ======================================================
   EDIT POST
====================================================== */

function editPost(slug) {
  if (!isValidSlug(slug)) {
    alert("Invalid slug.");
    return;
  }
  window.location.href = `editor.html?slug=${slug}`;
}


/* ======================================================
   DELETE POST
====================================================== */

let deleteInProgress = false;

async function deletePost(slug) {

  if (deleteInProgress) return; // Prevent double-click deletion

  if (!isValidSlug(slug)) {
    alert("Invalid slug.");
    return;
  }

  const ok = confirm(`Are you sure you want to delete "${slug}"?`);
  if (!ok) return;

  deleteInProgress = true;

  try {
    const { error } = await supabaseClient
      .from("blog_posts")
      .delete()
      .eq("slug", slug);

    if (error) throw error;

    loadPosts();

  } catch (err) {
    console.error("Delete error:", err);
    alert("Failed to delete post.");
  }

  deleteInProgress = false;
}


/* ======================================================
   INITIAL LOAD
====================================================== */

loadPosts();
