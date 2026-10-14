/*
 * Read access to the journal and blog records in Supabase, on the server.
 *
 * The static site fetched these in the browser with supabase-js (recent posts in
 * the post sidebar, the listing grids). Here the pages render the same data on
 * the server through Supabase's REST API, so visitors get the lists in the HTML
 * and no longer download supabase-js.
 *
 * The key is the project's publishable (anon) key, the same one the static
 * site's scripts carry in public; row-level security decides what it can read.
 * Set NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY to point elsewhere.
 *
 * Responses are cached for REVALIDATE seconds (ISR), so a newly published post
 * shows up within that window without a deploy.
 */

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://iceaceywsecnlmkcqopu.supabase.co";
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "sb_publishable_HC5p_ycaiSfyqVevN0tiiQ_bAiC7H9r";
export const REVALIDATE = 600;

export type PostSummary = {
  slug: string;
  title: string | null;
  main_heading: string | null;
  summary: string | null;
  thumbnail: string | null;
  author_name: string | null;
  tag: string | null;
  publish_date: string | null;
};

export type Section = "journal" | "blog";

/** Table and base filter per section, exactly as the static site's scripts queried them. */
const SOURCE: Record<Section, { table: string; filter: string }> = {
  journal: { table: "blog_posts", filter: "" },
  blog: { table: "odai_blogs", filter: "&status=eq.published" },
};

export async function rest<T>(path: string, init?: RequestInit): Promise<{ data: T; count: number | null }> {
  const res = await fetch(`${URL}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, Prefer: "count=exact", ...(init?.headers || {}) },
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) throw new Error(`Supabase ${res.status} for ${path}`);
  const range = res.headers.get("content-range"); // "0-8/31"
  const count = range && range.includes("/") ? Number(range.split("/")[1]) : null;
  return { data: (await res.json()) as T, count };
}

const COLS = "slug,title,main_heading,summary,thumbnail,author_name,tag,publish_date";

/** All posts of a section, newest first (the listing pages page through these client-side). */
export async function getPosts(section: Section): Promise<PostSummary[]> {
  const { table, filter } = SOURCE[section];
  const { data } = await rest<PostSummary[]>(`${table}?select=${COLS}${filter}&order=publish_date.desc`);
  return data;
}

/** The six most recent posts other than the current one (the post sidebar). */
export async function getRecentPosts(section: Section, currentSlug: string): Promise<PostSummary[]> {
  const { table, filter } = SOURCE[section];
  const { data } = await rest<PostSummary[]>(`${table}?select=${COLS}${filter}&slug=neq.${encodeURIComponent(currentSlug)}&order=publish_date.desc&limit=6`);
  return data;
}
