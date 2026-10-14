import { getPosts, type Section } from "@/lib/supabase";
import { PostGrid } from "./PostGrid";

/*
 * The journal / blog listing: all posts of the section, newest first, rendered on the
 * server. PostGrid shows nine at a time with the same pagination the static site's
 * browser script drew (js/blogs-metro.js, js/blog-metro.js).
 */
export async function PostListing({ section }: { section: Section }) {
  const posts = await getPosts(section);
  return (
    <div className="container-fluid">
      <PostGrid section={section} posts={posts} />
    </div>
  );
}
