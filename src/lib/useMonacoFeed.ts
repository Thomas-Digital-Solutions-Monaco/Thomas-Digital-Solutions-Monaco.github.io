import { useEffect, useState } from "react";
import { monacoFeedUrl } from "../constants";
export interface FeedItem { title: string; link: string; }
export type FeedStatus = "loading" | "ok" | "error";
let cache: FeedItem[] | null = null; let inflight: Promise<FeedItem[]> | null = null;
function clean(raw: string): string {
  if (!raw) return "";
  let s = raw.replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1").replace(/<[^>]*>/g, " ");
  const a = document.createElement("textarea"); a.innerHTML = s; s = a.value;
  const b = document.createElement("textarea"); b.innerHTML = s;
  return b.value.replace(/\s+/g, " ").trim();
}
function withTimeout(url: string, ms = 5000): Promise<Response> {
  const ctrl = new AbortController(); const timer = setTimeout(() => ctrl.abort(), ms);
  return fetch(url, { signal: ctrl.signal }).finally(() => clearTimeout(timer));
}
async function wpRest(): Promise<FeedItem[]> {
  const origin = new URL(monacoFeedUrl).origin;
  const r = await withTimeout(`${origin}/wp-json/wp/v2/posts?per_page=8&_fields=title,link`);
  if (!r.ok) throw new Error(String(r.status));
  const arr = (await r.json()) as { title?: { rendered?: string }; link?: string }[];
  const items = arr.map((p) => ({ title: clean(p.title?.rendered ?? ""), link: p.link ?? origin })).filter((i) => i.title.length > 3);
  if (!items.length) throw new Error("empty");
  return items;
}
function collect(doc: Document): FeedItem[] {
  return Array.from(doc.querySelectorAll("item, entry")).slice(0, 8).map((n) => {
    const title = clean(n.querySelector("title")?.textContent ?? "");
    const linkEl = n.querySelector("link");
    const link = linkEl?.getAttribute("href") || clean(linkEl?.textContent ?? "");
    return { title, link };
  }).filter((i) => i.title.length > 3);
}
function parse(xml: string): FeedItem[] { if (!xml) return []; let doc = new DOMParser().parseFromString(xml, "application/xml"); if (doc.querySelector("parsererror")) doc = new DOMParser().parseFromString(xml, "text/html"); return collect(doc); }
type Proxy = { build: (u: string) => string; extract: (r: Response) => Promise<string> };
const PROXIES: Proxy[] = [
  { build: (u) => `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(u)}`, extract: (r) => r.text() },
  { build: (u) => `https://corsproxy.io/?url=${encodeURIComponent(u)}`, extract: (r) => r.text() },
  { build: (u) => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}`, extract: async (r) => (await r.json())?.contents ?? "" },
];
async function viaProxy(px: Proxy): Promise<FeedItem[]> { const r = await withTimeout(px.build(monacoFeedUrl)); if (!r.ok) throw new Error(String(r.status)); const items = parse(await px.extract(r)); if (!items.length) throw new Error("empty"); return items; }
function firstSuccess(tasks: (() => Promise<FeedItem[]>)[]): Promise<FeedItem[]> {
  return new Promise((resolve, reject) => { let remaining = tasks.length; let done = false;
    tasks.forEach((task) => { task().then((items) => { if (!done) { done = true; resolve(items); } }).catch(() => { if (--remaining === 0 && !done) reject(new Error("all failed")); }); }); });
}
function load(): Promise<FeedItem[]> { if (cache) return Promise.resolve(cache); if (inflight) return inflight; const tasks = [wpRest, ...PROXIES.map((px) => () => viaProxy(px))]; inflight = firstSuccess(tasks).then((items) => { cache = items; return items; }); return inflight; }
export function useMonacoFeed() {
  const [items, setItems] = useState<FeedItem[] | null>(cache);
  const [status, setStatus] = useState<FeedStatus>(cache ? "ok" : "loading");
  useEffect(() => { if (cache) return; let alive = true; load().then((it) => alive && (setItems(it), setStatus("ok"))).catch(() => alive && setStatus("error")); return () => { alive = false; }; }, []);
  return { items, status };
}
