import { useEffect, useState } from "react";
import { monacoFeedUrl } from "../constants";
export interface FeedItem { title: string; link: string; }
export type FeedStatus = "loading" | "ok" | "error";
let cache: FeedItem[] | null = null; let inflight: Promise<FeedItem[]> | null = null;
type Proxy = { build: (u: string) => string; extract: (r: Response) => Promise<string> };
const PROXIES: Proxy[] = [
  { build: (u) => `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(u)}`, extract: (r) => r.text() },
  { build: (u) => `https://corsproxy.io/?url=${encodeURIComponent(u)}`, extract: (r) => r.text() },
  { build: (u) => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}`, extract: async (r) => (await r.json())?.contents ?? "" },
];
function clean(raw: string): string {
  if (!raw) return "";
  let s = raw.replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1").replace(/<[^>]*>/g, " ");
  const a = document.createElement("textarea"); a.innerHTML = s; s = a.value;
  const b = document.createElement("textarea"); b.innerHTML = s;
  return b.value.replace(/\s+/g, " ").trim();
}
function collect(doc: Document): FeedItem[] {
  return Array.from(doc.querySelectorAll("item, entry")).slice(0, 8).map((n) => {
    const title = clean(n.querySelector("title")?.textContent ?? "");
    const linkEl = n.querySelector("link");
    const link = linkEl?.getAttribute("href") || clean(linkEl?.textContent ?? "");
    return { title, link };
  }).filter((i) => i.title.length > 3);
}
function parse(xml: string): FeedItem[] {
  if (!xml) return [];
  let doc = new DOMParser().parseFromString(xml, "application/xml");
  if (doc.querySelector("parsererror")) doc = new DOMParser().parseFromString(xml, "text/html");
  return collect(doc);
}
function viaProxy(px: Proxy): Promise<FeedItem[]> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 5000);
  return fetch(px.build(monacoFeedUrl), { signal: ctrl.signal })
    .then((r) => (r.ok ? px.extract(r) : Promise.reject(new Error(String(r.status)))))
    .then((xml) => { const items = parse(xml); if (!items.length) throw new Error("empty"); return items; })
    .finally(() => clearTimeout(timer));
}
function firstSuccess(list: Proxy[]): Promise<FeedItem[]> {
  return new Promise((resolve, reject) => {
    let remaining = list.length; let done = false;
    list.forEach((px) => { viaProxy(px).then((items) => { if (!done) { done = true; resolve(items); } }).catch(() => { if (--remaining === 0 && !done) reject(new Error("all failed")); }); });
  });
}
function load(): Promise<FeedItem[]> {
  if (cache) return Promise.resolve(cache);
  if (inflight) return inflight;
  inflight = firstSuccess(PROXIES).then((items) => { cache = items; return items; });
  return inflight;
}
export function useMonacoFeed() {
  const [items, setItems] = useState<FeedItem[] | null>(cache);
  const [status, setStatus] = useState<FeedStatus>(cache ? "ok" : "loading");
  useEffect(() => { if (cache) return; let alive = true; load().then((it) => alive && (setItems(it), setStatus("ok"))).catch(() => alive && setStatus("error")); return () => { alive = false; }; }, []);
  return { items, status };
}
