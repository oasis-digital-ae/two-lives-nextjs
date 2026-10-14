import { BlogDetailStylesheet } from "@/components/ThemeLayout";

/* Posts add the article stylesheet. The sidebar's recent posts come from Supabase on
   the server; the page is regenerated every REVALIDATE seconds so new posts appear. */
// Next needs a literal here (it is read statically); keep in step with REVALIDATE in lib/supabase.ts.
export const revalidate = 600;

export default function PostLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <BlogDetailStylesheet />
      {children}
    </>
  );
}
