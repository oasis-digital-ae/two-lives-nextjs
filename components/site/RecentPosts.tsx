import { getRecentPosts, type Section } from "@/lib/supabase";

/*
 * "Recent Posts" in a post's sidebar: the six newest posts of the section other than
 * the one being read. The static site filled this in the browser from Supabase
 * (js/recent-posts.js, js/blog-recent-posts.js); the markup here is that script's.
 */
export async function RecentPosts({ section, currentSlug }: { section: Section; currentSlug: string }) {
  const posts = await getRecentPosts(section, currentSlug);
  const fallback = section === "journal" ? "/images/placeholder.jpg" : "/images/blog/placeholder.webp";
  return (
    <div id="recent-posts">
      {posts.map((post) => (
        <a key={post.slug} href={`/${section}/${post.slug}`} className="recent-post-item">
          <div className="recent-post-thumb">
            <img src={post.thumbnail || fallback} alt="" />
          </div>
          <div className="recent-post-content">
            <div className="recent-post-title">{post.main_heading || post.title}</div>
          </div>
        </a>
      ))}
    </div>
  );
}
