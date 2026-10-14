import SupabaseScript from "@/components/SupabaseScript";

/* /blog listing: the grid and pagination are filled from Supabase in the browser. */
export default function BlogIndexLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <SupabaseScript src="/js/blog-metro.js" />
    </>
  );
}
