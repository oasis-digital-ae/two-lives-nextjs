export default function PillQuote({ text }: { text: string }) {
  return (
    <section className="bg-off-white py-10">
      <div className="mx-auto max-w-[1400px] px-5 text-center lg:px-10">
        <div className="inline-block rounded-full bg-white px-12 py-5 shadow-[0_0_25px_rgba(0,0,0,0.08)] sm:px-[60px]">
          <span className="text-[19px] font-semibold tracking-[-0.5px] text-carbon">{text}</span>
        </div>
      </div>
    </section>
  );
}
