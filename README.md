# Two Lives Theory — Next.js

Next.js (App Router, TypeScript, Tailwind CSS v4) rebuild of the Two Lives
Theory marketing site. The original static HTML/CSS site lives in
`Old website files/` for reference; this pass rebuilds the homepage as
reusable React components under `components/home` and `components/layout`
so the remaining pages can be composed from the same pieces.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Structure

- `app/` — routes (currently just the homepage)
- `components/layout/` — Header, Footer, WhatsApp widget, scroll progress, custom cursor
- `components/home/` — homepage sections (Hero, MeetBasim, WhoIMentor, Reviews, FAQ, etc.)
- `components/ui/` — shared primitives (Carousel, Accordion, Counter, icons)
- `lib/nav.ts` — navigation/menu data
- `public/` — images and fonts copied from the original site

## Notes

- Brand colors/fonts (Manrope, Sora, Gotham-Black) are wired up in
  `app/globals.css` and `app/layout.tsx` to match the original theme tokens.
- Carousels use `embla-carousel-react`; interactive UI (menus, tabs,
  accordion, custom video controls) is implemented with React state instead
  of the original jQuery/Swiper/GSAP stack.
