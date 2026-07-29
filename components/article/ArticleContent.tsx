export function ArticleH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-shadow-soft mt-10 mb-[25px] font-heading text-[40px] font-semibold tracking-[-2px] text-carbon first:mt-0">
      {children}
    </h2>
  );
}

export function ArticleP({ children }: { children: React.ReactNode }) {
  return <p className="mb-[25px] leading-relaxed text-carbon">{children}</p>;
}
