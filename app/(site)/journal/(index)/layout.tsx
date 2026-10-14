import { REVALIDATE } from "@/lib/supabase";

/* The listing is rendered from Supabase on the server and regenerated every
   REVALIDATE seconds, so a newly published post shows up without a deploy. */
export const revalidate = REVALIDATE;

export default function ListingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
