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

const CATEGORY_ORDER = [
  "smileys-and-emotion",
  "people-and-body",
  "animals-and-nature",
  "food-and-drink",
  "activities",
  "travel-and-places",
  "objects",
  "symbols",
  "flags",
] as const satisfies readonly EmojiCategory[];

export default function EmojiPageClient() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<string>("");
  const [showTop, setShowTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isSearching = q.trim().length > 0;

  /* ---------- 모바일 판별 ---------- */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* ---------- 카테고리 정렬 ---------- */
  const categories = useMemo(() => {
    const order =
      CATEGORY_ORDER.length > 0 ? CATEGORY_ORDER : ALL_CATEGORIES;

    return order
      .filter((c) => EMOJIS[c]?.length)
      .map((c) => ({
        id: c,
        title: CATEGORY_META[c]?.title ?? c,
        emojis: EMOJIS[c] ?? [],
      }));
  }, []);

  /* ---------- 검색 결과 (단일 그리드) ---------- */
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

  /* ---------- 스크롤 위치에 따른 active 카테고리 ---------- */
  useEffect(() => {
    if (isSearching || isMobile) return;

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
      { rootMargin: "-100px 0px -70% 0px", threshold: 0.1 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [categories, isSearching, isMobile]);

  /* ---------- Top 버튼 ---------- */
  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 420);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function jump(id: string) {
    document.getElementById(`sec-${id}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setActive(id);
  }

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: 36, fontWeight: 900, marginBottom: 10 }}>
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
          border: "1px solid rgba(255,255,255,0.18)",
          background: "rgba(0,0,0,0.2)",
          color: "inherit",
          marginBottom: 16,
        }}
      />

      {/* 검색 중: 단일 결과 */}
      {isSearching ? (
        <>
          <div style={{ marginBottom: 10, fontSize: 14, opacity: 0.75 }}>
            결과 {searchResult.length}개
          </div>
          <EmojiGrid emojis={searchResult} />
        </>
      ) : (
        <>
          {/* 데스크톱 전용 카테고리 선택 */}
          {!isMobile && (
            <div
              style={{
                position: "sticky",
                top: 0,
                zIndex: 10,
                marginBottom: 18,
                padding: 14,
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 800,
                  marginBottom: 10,
                }}
              >
                카테고리
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                {categories.map((c) => {
                  const isActive = active === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => jump(c.id)}
                      style={{
                        padding: "10px 14px",
                        borderRadius: 999,
                        border: isActive
                          ? "1px solid rgba(255,255,255,0.45)"
                          : "1px solid rgba(255,255,255,0.2)",
                        background: isActive
                          ? "rgba(255,255,255,0.2)"
                          : "rgba(255,255,255,0.06)",
                        fontWeight: isActive ? 800 : 600,
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                    >
                        {c.title}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 카테고리 섹션 */}
          {categories.map((c) => (
            <section
              key={c.id}
              id={`sec-${c.id}`}
              style={{ marginBottom: 28, scrollMarginTop: 120 }}
            >
              <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>
                {c.title}
                <span style={{ fontSize: 13, opacity: 0.6, marginLeft: 6 }}>
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

      {/* Top 버튼 */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          style={{
            position: "fixed",
            right: 16,
            bottom: 16,
            width: 46,
            height: 46,
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.25)",
            background: "rgba(0,0,0,0.75)",
            color: "white",
            fontWeight: 900,
            cursor: "pointer",
            zIndex: 60,
          }}
        >
          ↑
        </button>
      )}
    </main>
  );
}
