import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import type { Section } from "@/lib/supabase";
import { articleHtml, blogPostingSchema, breadcrumbSchema, canonicalFor, getPost, headingParts, relatedPosts, shownDate } from "@/lib/posts";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { LogoMarquee } from "./LogoMarquee";
import { PageHero } from "./PageHero";
import { PostCta } from "./PostCta";
import { RecentPosts } from "./RecentPosts";
import { ScrollTop, WhatsAppWidget } from "./Widgets";

/*
 * A journal or blog post, rendered from its Supabase row. One template for all
 * posts, the markup of the static site's post template (blog-template.html).
 */
const HERO_STYLE: CSSProperties = {
  backgroundImage: "url('/.netlify/images?url=/images/hero-bg-11.webp&w=1920&fm=webp&q=70')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};

export async function PostPage({ section, slug }: { section: Section; slug: string }) {
  const post = await getPost(section, slug);
  if (!post) notFound();
  const canonical = canonicalFor(post, section);
  const heading = headingParts(post);
  const related = await relatedPosts(section, slug);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema(post, canonical)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(post, section, canonical)) }} />
      <Header />
      <PageHero
        style={HERO_STYLE}
        className="page-title-separate-breadcrumbs bg-carbon position-relative text-white pt-18 md-pt-20 sm-pt-30 pb-4 sm-pb-20"
        leftClass="col-lg-6 position-relative page-title-extra-large md-mb-30px sm-mb-10px z-index-9"
        h1Class="text-white fw-600 ls-minus-2px mb-0 alt-font highlight-separator-small"
        lead={` ${heading.first} `}
        title={`${heading.rest} `}
        leadFirst
        rightClass="col-lg-6 text-white z-index-9"
        pClass="fs-20 md-fs-18 sm-fs-16 lh-32 text-white force-white w-90 lg-w-100 md-w-80 mb-0"
        subtitle=""
        dateRowClass="d-flex date-con align-items-center justify-content-start justify-content-sm-center mt-15px text-white fs-15"
        meta={{ date: shownDate(post), author: post.author_name || "" }}
        trailingP
      />
      <section className="blog-detail-page bg-pattern-section pt-220px pb-120px md-pt-180px md-pb-80px sm-pt-140px sm-pb-60px position-relative">
        <div className="icon-rotator">
          <img src="/images/tl-circle.svg" alt="rotator" data-no-retina="" />
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="blog-featured-image mb-50px">
                <img src={post.thumbnail || ""} alt={post.main_heading || ""} className="w-100 border-radius-5px" />
              </div>
              <article className="blog-content auto-content" dangerouslySetInnerHTML={{ __html: articleHtml(post) }} />
              <nav className="related-reading" aria-label="Related reading">
                <h2>Keep reading</h2>
                <ul>
                  {related.posts.map((p) => (
                    <li key={p.href}>
                      <a href={p.href}>{p.title}</a>
                    </li>
                  ))}
                </ul>
                <p className="related-service">
                  {`${related.service[1]}: `}
                  <a href={related.service[0]}>learn how Basim works with you</a>
                  {", or read "}
                  <a href="/journal">more from the journal</a>
                  .
                </p>
              </nav>
            </div>
            <div className="col-lg-4">
              <aside className="blog-sidebar ps-40px lg-ps-0 md-mt-30px sticky-sidebar-column">
                <div className="sidebar-widget">
                  <h6 className="alt-font text-shadow-soft fw-600 text-dark-gray mb-25px">{" Recent Posts "}</h6>
                  <RecentPosts section={section} currentSlug={slug} />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
      <LogoMarquee />
      <PostCta />
      <Footer />
      <WhatsAppWidget />
      <ScrollTop />
    </>
  );
}
