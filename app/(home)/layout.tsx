import ThemeLayout from "@/components/ThemeLayout";
import { siteMetadata, siteViewport } from "@/lib/site-metadata";

export const metadata = siteMetadata;
export const viewport = siteViewport;

export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <ThemeLayout bodyClass="custom-cursor index-page">{children}</ThemeLayout>;
}
