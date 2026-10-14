import ThemeLayout from "@/components/ThemeLayout";
import NotFoundBody, { metadata as notFoundMetadata } from "@/content/not-found";
import { siteMetadata } from "@/lib/site-metadata";

/* With one root layout per route group there is no app/layout.tsx, so the 404 page
   renders its own shell (experimental.globalNotFound in next.config.ts). */
export const metadata = { ...siteMetadata, ...notFoundMetadata };

export default function GlobalNotFound() {
  return (
    <ThemeLayout bodyClass="custom-cursor non-home home-404">
      <NotFoundBody />
    </ThemeLayout>
  );
}
