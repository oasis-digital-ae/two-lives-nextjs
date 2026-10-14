// Compares the Next.js port against the live site, page by page, in headless Chrome.
//
//   node tools/compare-pages.mjs [--base http://localhost:8888] [--prod https://twolivestheory.com]
//                                [--width 1280] [--paths /,/about] [--sitemap]
//
// For every path it loads both versions, waits for fonts and lazy images, then records
// each <section>/<header>/<footer>'s offset and height, the document height, the number
// of initialised Swipers, and uncaught exceptions. Differences above a 3px tolerance are
// printed. Exit code 1 if any page differs or throws something production does not.
//
// Uses the Chrome DevTools Protocol directly (no puppeteer), so it only needs Chrome.
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const args = Object.fromEntries(process.argv.slice(2).map((a, i, all) => (a.startsWith("--") ? [a.slice(2), all[i + 1] && !all[i + 1].startsWith("--") ? all[i + 1] : true] : [])).filter((x) => x.length));
const BASE = args.base || "http://localhost:8888";
const PROD = args.prod || "https://twolivestheory.com";
const WIDTH = Number(args.width || 1280);
const TOL = 3;
const CHROME = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

let paths;
if (args.paths) paths = String(args.paths).split(",");
else {
  const xml = await (await fetch(`${PROD}/sitemap.xml`)).text();
  paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
}

const port = 9333 + Math.floor(Math.random() * 500);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "cmp-chrome-"));
const chrome = spawn(CHROME, [`--headless=new`, `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, `--window-size=${WIDTH},900`, "--no-first-run", "--no-default-browser-check", "--hide-scrollbars", "--mute-audio", "about:blank"], { stdio: "ignore" });
process.on("exit", () => { chrome.kill(); try { fs.rmSync(profile, { recursive: true, force: true, maxRetries: 3 }); } catch { /* Chrome may still be flushing the profile; the OS cleans tmp */ } });

async function browserWs() {
  for (let i = 0; i < 50; i++) {
    try { return (await (await fetch(`http://127.0.0.1:${port}/json/version`)).json()).webSocketDebuggerUrl; } catch { await new Promise((r) => setTimeout(r, 200)); }
  }
  throw new Error("Chrome did not start");
}

class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.pending = new Map(); this.listeners = []; ws.onmessage = (e) => this.onMessage(JSON.parse(e.data)); }
  static async connect(url) { const ws = new WebSocket(url); await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; }); return new CDP(ws); }
  onMessage(m) { if (m.id && this.pending.has(m.id)) { const { res, rej } = this.pending.get(m.id); this.pending.delete(m.id); m.error ? rej(new Error(m.error.message)) : res(m.result); } else if (m.method) this.listeners.forEach((l) => l(m)); }
  send(method, params = {}, sessionId) { const id = ++this.id; this.ws.send(JSON.stringify({ id, method, params, sessionId })); return new Promise((res, rej) => this.pending.set(id, { res, rej })); }
  on(fn) { this.listeners.push(fn); }
}

const METRICS = `(async () => {
  await document.fonts.ready;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  // Layout is compared once everything has loaded, so lazy images are forced eager and the
  // page is scrolled a viewport at a time (the theme's scroll-driven effects need to see
  // every section). The theme uses smooth scrolling, hence behavior: 'instant'.
  document.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; });
  const go = y => window.scrollTo({ top: y, behavior: 'instant' });
  for (let y = 0; y < document.body.scrollHeight; y += Math.floor(innerHeight * 0.8)) { go(y); await sleep(150); }
  go(document.body.scrollHeight); await sleep(400);
  await Promise.race([Promise.all([...document.images].map(i => i.complete ? null : new Promise(r => { i.onload = i.onerror = r; }))), sleep(10000)]);
  go(0); await sleep(600);
  const secs = [...document.querySelectorAll('section, header, footer')].map(s => {
    const r = s.getBoundingClientRect();
    const cls = s.className.toString().trim().split(/\\s+/).filter(c => !/^(sticky|sticky-active|scrolled)$/.test(c));
    // hidden elements report a zero rect, so their "top" would just be the scroll position
    return { k: s.tagName.toLowerCase() + '.' + cls.slice(0, 2).join('.'), top: r.height ? Math.round(r.top + scrollY) : 0, h: Math.round(r.height) };
  });
  return { title: document.title, docH: document.documentElement.scrollHeight, swipers: document.querySelectorAll('.swiper-initialized').length,
    imgs: document.images.length, broken: [...document.images].filter(i => i.complete && i.naturalWidth === 0 && i.getAttribute('src')).length, secs };
})()`;

const cdp = await CDP.connect(await browserWs());
async function measure(url) {
  const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
  const errors = [];
  cdp.on((m) => {
    if (m.sessionId !== sessionId || m.method !== "Runtime.exceptionThrown") return;
    const d = m.params.exceptionDetails;
    const desc = (d.exception?.description || d.text || "").split("\n");
    // message plus the first two frames, so a new error can be located in the bundle
    errors.push([desc[0], ...desc.slice(1, 3).map((f) => f.trim())].join(" @ ").slice(0, 220));
  });
  await cdp.send("Page.enable", {}, sessionId);
  await cdp.send("Runtime.enable", {}, sessionId);
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: WIDTH, height: 900, deviceScaleFactor: 1, mobile: WIDTH < 768 }, sessionId);
  const loaded = new Promise((res) => cdp.on((m) => { if (m.sessionId === sessionId && m.method === "Page.loadEventFired") res(); }));
  await cdp.send("Page.navigate", { url }, sessionId);
  await Promise.race([loaded, new Promise((r) => setTimeout(r, 30000))]);
  await new Promise((r) => setTimeout(r, 1500));
  const { result } = await cdp.send("Runtime.evaluate", { expression: METRICS, awaitPromise: true, returnByValue: true }, sessionId);
  await cdp.send("Target.closeTarget", { targetId });
  return { ...result.value, errors };
}

let failures = 0;
for (const p of paths) {
  let a, b;
  try { [a, b] = await Promise.all([measure(BASE + p), measure(PROD + p)]); }
  catch (e) { console.log(`${p}  ERROR ${e.message}`); failures++; continue; }
  const diffs = [];
  if (Math.abs(a.docH - b.docH) > TOL) diffs.push(`height ${a.docH} vs ${b.docH}`);
  if (a.secs.length !== b.secs.length) diffs.push(`sections ${a.secs.length} vs ${b.secs.length}`);
  else a.secs.forEach((s, i) => { const t = b.secs[i]; if (s.k !== t.k) diffs.push(`#${i} ${s.k} vs ${t.k}`); else if (Math.abs(s.top - t.top) > TOL || Math.abs(s.h - t.h) > TOL) diffs.push(`${s.k} ${s.top}/${s.h} vs ${t.top}/${t.h}`); });
  if (a.swipers !== b.swipers) diffs.push(`swipers ${a.swipers} vs ${b.swipers}`);
  if (a.title !== b.title) diffs.push(`title "${a.title}" vs "${b.title}"`);
  if (a.broken > b.broken) diffs.push(`${a.broken} broken images (production: ${b.broken})`);
  // same error message on production counts as pre-existing (frames differ: one bundle vs several files)
  const msg = (e) => e.split(" @ ")[0];
  const newErrors = a.errors.filter((e) => !b.errors.some((f) => msg(f) === msg(e)));
  if (newErrors.length) diffs.push(`new errors: ${[...new Set(newErrors)].join(" | ")}`);
  if (diffs.length) { failures++; console.log(`✗ ${p}\n    ${diffs.join("\n    ")}`); }
  else console.log(`✓ ${p}  (${a.docH}px, ${a.secs.length} sections, ${a.swipers} swipers${a.errors.length ? `, ${a.errors.length} pre-existing errors` : ""})`);
}
console.log(`\n${paths.length - failures}/${paths.length} pages match at ${WIDTH}px`);
process.exit(failures ? 1 : 0);
