const { createClient } = supabase;
const db = createClient(
  "https://iceaceywsecnlmkcqopu.supabase.co",
  "sb_publishable_HC5p_ycaiSfyqVevN0tiiQ_bAiC7H9r"
);

const grid = document.getElementById("custom-blog-grid");
const pagination = document.getElementById("custom-blog-pagination");

const PER_PAGE = 9;
let currentPage = 1;

/* -----------------------------
   LIMIT SUMMARY TO 30 WORDS
-------------------------------- */
function limitWords(text = "", maxWords = 30) {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
}

/* -----------------------------
   SHIMMER SKELETON
-------------------------------- */
function showLoadingSkeletons() {
  grid.innerHTML = "";

  for (let i = 0; i < PER_PAGE; i++) {
    grid.innerHTML += `
      <div class="col-12 col-md-6 col-xxl-4">
        <div class="custom-blog-card skeleton-card">
          <div class="custom-blog-img skeleton-img"></div>

          <div class="custom-blog-body">
            <div class="skeleton-title"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text short"></div>

            <div class="custom-blog-meta">
              <div class="meta-container">
                <div class="skeleton-meta"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  }
}

/* -----------------------------
   LOAD BLOGS
-------------------------------- */
async function loadBlogs(page = 1) {
  showLoadingSkeletons();

  const from = (page - 1) * PER_PAGE;
  const to = from + PER_PAGE - 1;

  const { count } = await db
    .from("blog_posts")
    .select("*", { count: "exact", head: true });

  const { data } = await db
    .from("blog_posts")
    .select(
      "title, main_heading, slug, summary, thumbnail, author_name, tag"
    )
    .order("publish_date", { ascending: false })
    .range(from, to);

  grid.innerHTML = "";

  data.forEach(post => {
    const author = post.author_name || "Basim Yafai";
    const badgeText = post.tag && post.tag.trim() !== "" ? post.tag : "Blog";

    grid.innerHTML += `
      <div class="col-12 col-md-6 col-xl-6 col-xxxl-4">
        <div class="custom-blog-card horizontal" data-slug="${post.slug}">
          
          <!-- LEFT IMAGE -->
          <div class="custom-blog-img">
            <img 
              src="${post.thumbnail || "https://via.placeholder.com/800x600"}" 
              alt="${post.title || ""}"
            >
          </div>

          <!-- RIGHT CONTENT -->
          <div class="custom-blog-body">

            <div class="content-top">
              <span class="custom-blog-badge">${badgeText}</span>

              <a href="/blogs/${post.slug}" class="custom-blog-title text-carbon">
                ${limitWords(post.main_heading || post.title, 6)}
              </a>

              <div class="custom-blog-excerpt sm-pb-5 mb-5">
                ${limitWords(post.summary || "", 12)}
              </div>
            </div>

            <!-- META (UPDATED) -->
            <div class="custom-blog-meta">
              <div class="meta-container">

                <span class="separator-mainline"></span>

                <div class="author-line">
                  ${author}
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    `;
  });

  attachCardClickListeners();
  renderPagination(count, page);
}

/* -----------------------------
   CARD CLICK
-------------------------------- */
function attachCardClickListeners() {
  document.querySelectorAll(".custom-blog-card").forEach(card => {
    card.style.cursor = "pointer";

    card.addEventListener("click", function (e) {
      if (e.target.closest("a, button, input, select, textarea")) return;

      const slug = this.getAttribute("data-slug");
      if (slug) {
        window.location.href = `/blogs/${slug}`;
      }
    });
  });
}

/* -----------------------------
   PAGINATION
-------------------------------- */
function renderPagination(total, page) {
  const pages = Math.ceil(total / PER_PAGE);
  pagination.innerHTML = "";

  if (page > 1) {
    pagination.innerHTML += `
      <li class="page-item">
        <a class="page-link" href="#" onclick="changePage(${page - 1})">«</a>
      </li>
    `;
  }

  for (let i = 1; i <= pages; i++) {
    pagination.innerHTML += `
      <li class="page-item ${i === page ? "active" : ""}">
        <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
      </li>
    `;
  }

  if (page < pages) {
    pagination.innerHTML += `
      <li class="page-item">
        <a class="page-link" href="#" onclick="changePage(${page + 1})">»</a>
      </li>
    `;
  }
}

/* -----------------------------
   CHANGE PAGE
-------------------------------- */
function changePage(page) {
  currentPage = page;
  loadBlogs(page);
  window.scrollTo({ top: 200, behavior: "smooth" });
}

/* -----------------------------
   INIT
-------------------------------- */
loadBlogs();