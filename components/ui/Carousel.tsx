"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

export function useCarousel(options?: Parameters<typeof useEmblaCarousel>[0]) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, ...options });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const updateSnaps = () => setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    updateSnaps();
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", updateSnaps);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", updateSnaps);
    };
  }, [emblaApi]);

  return { emblaRef, selectedIndex, scrollSnaps, scrollPrev, scrollNext, scrollTo };
}

export function DotNav({
  count,
  selected,
  onSelect,
}: {
  count: number;
  selected: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => onSelect(i)}
          className={`h-2 rounded-full transition-all ${
            i === selected ? "w-6 bg-emerald" : "w-2 bg-carbon/20"
          }`}
        />
      ))}
    </div>
  );
}

export function ArrowNav({
  onPrev,
  onNext,
  className = "",
}: {
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        aria-label="Previous slide"
        onClick={onPrev}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-carbon text-white transition-transform hover:scale-105"
      >
        &larr;
      </button>
      <button
        aria-label="Next slide"
        onClick={onNext}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-carbon text-white transition-transform hover:scale-105"
      >
        &rarr;
      </button>
    </div>
  );
}
