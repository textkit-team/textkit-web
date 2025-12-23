"use client";

import { useEffect, useMemo, useState } from "react";
import EmojiGrid from "./EmojiGrid";
import LazySection from "./LazySection";
import {
  ALL_CATEGORIES,
  CATEGORY_META,
  EMOJIS,
  EMOJI_META,
  type EmojiCategory,
} from "@/lib/emoji-data";

export default function EmojiPageClient() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<string>(ALL_CATEGORIES[0] ?? "");
  const isSearching = q.trim().length > 0;

  const categories = useMemo(() => {
    return ALL_CATEGORIES.map((c) => ({
      id: c,
      title: CATEGORY_META[c as EmojiCategory]?.title ?? c,
      emojis: EMOJIS[c as EmojiCategory] ?? [],
    }));
  }, []);

  const searchResult = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return [];
    return Object.entries(EMOJI_META)
      .filter(([emoji, meta]) => {
        if (emoji.includes(qq)) return true;
        return (meta?.search ?? "").toLowerCase().includes(qq);
      })
      .map(([emoji]) => emoji);
  }, [q]);

  useEffect(() => {
    if (isSearching) return;

    const els = categories
      .map((c) => document.getElementById(`sec-${c.id}`))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const v = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.boundingClientRect.top ?? 0) -
              (b.boundingClientRect.top ?? 0)
          );
        if (v[0]) setActive(v[0].target.id.replace("sec-", ""));
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0.1 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [categories, isSearching]);

  function jump(id: string) {
    document.getElementById(`sec-${id}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setActive(id);
  }

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: 34, fontWeight: 800, marginBottom: 12 }}>
        Emoji
      </h1>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search (😀 / smile / 웃음)"
        style={{
          width: "100%",
          padding: "14px 16px",
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(0,0,0,0.2)",
          color: "inherit",
          marginBottom: 14,
        }}
      />

      {isSearching ? (
        <>
          <div style={{ marginBottom: 10, fontSize: 14, opacity: 0.7 }}>
            Results {searchResult.length}
          </div>
          <EmojiGrid emojis={searchResult} />
        </>
      ) : (
        <>
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(10px)",
              borderRadius: 14,
              padding: "10px",
              marginBottom: 18,
            }}
          >
            <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => jump(c.id)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.14)",
                    background:
                      active === c.id
                        ? "rgba(255,255,255,0.15)"
                        : "transparent",
                    color: "inherit",
                    whiteSpace: "nowrap",
                    fontSize: 13,
                  }}
                >
                  {c.title}
                </button>
              ))}
            </div>
          </div>

          {categories.map((c) => (
            <section
              key={c.id}
              id={`sec-${c.id}`}
              style={{ marginBottom: 28, scrollMarginTop: 90 }}
            >
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>
                {c.title}{" "}
                <span style={{ fontSize: 13, opacity: 0.6 }}>
                  {c.emojis.length}
                </span>
              </h2>
              <LazySection>
                <EmojiGrid emojis={c.emojis} />
              </LazySection>
            </section>
          ))}
        </>
      )}
    </main>
  );
}