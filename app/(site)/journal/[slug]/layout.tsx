import { BlogDetailStylesheet } from "@/components/ThemeLayout";
import SupabaseScript from "@/components/SupabaseScript";

export default function JournalPostLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <BlogDetailStylesheet />
      {children}
      <SupabaseScript src="/js/recent-posts.js" />
    </>
  );
}
