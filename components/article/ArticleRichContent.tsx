export default function ArticleRichContent({ html }: { html: string }) {
  return (
    <div
      className="
        [&_h2]:text-shadow-soft [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:font-heading [&_h2]:text-[26px] [&_h2]:font-semibold
        [&_h2]:tracking-[-1px] [&_h2]:text-carbon [&_h2:first-child]:mt-0 sm:[&_h2]:text-[32px]
        [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-carbon
        [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:text-carbon
        [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6
        [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-6
        [&_li]:text-carbon
        [&_a]:text-emerald [&_a]:underline [&_a]:underline-offset-4
        [&_strong]:font-bold
        [&_em]:italic
        [&_hr]:my-8 [&_hr]:border-carbon/15
      "
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
