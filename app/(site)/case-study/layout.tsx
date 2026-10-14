import { BlogDetailStylesheet } from "@/components/ThemeLayout";

export default function CaseStudyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <BlogDetailStylesheet />
      {children}
    </>
  );
}
