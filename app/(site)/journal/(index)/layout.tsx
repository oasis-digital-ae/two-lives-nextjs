import SupabaseScript from "@/components/SupabaseScript";

/* /journal listing: the grid and pagination are filled from Supabase in the browser. */
export default function JournalIndexLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <SupabaseScript src="/js/blogs-metro.js" />
    </>
  );
}
