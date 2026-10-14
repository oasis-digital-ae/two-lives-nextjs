import { BlogDetailStylesheet } from "@/components/ThemeLayout";
import { REVALIDATE } from "@/lib/supabase";

/* Posts add the article stylesheet. The sidebar's recent posts come from Supabase on
   the server; the page is regenerated every REVALIDATE seconds so new posts appear. */
export const revalidate = REVALIDATE;

export default function PostLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <BlogDetailStylesheet />
      {children}
    </>
  );
}
