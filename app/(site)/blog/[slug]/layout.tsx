import { BlogDetailStylesheet } from "@/components/ThemeLayout";
import SupabaseScript from "@/components/SupabaseScript";

export default function BlogPostLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <BlogDetailStylesheet />
      {children}
      <SupabaseScript src="/js/blog-recent-posts.js" />
    </>
  );
}
