export function ArticleH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-shadow-soft mt-10 mb-4 font-heading text-[26px] font-semibold tracking-[-1px] text-carbon first:mt-0 sm:text-[32px]">
      {children}
    </h2>
  );
}

export function ArticleP({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 leading-relaxed text-carbon">{children}</p>;
}
