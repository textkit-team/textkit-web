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
  const [showTop, setShowTop] = useState(false);

  const isSearching = q.trim().length > 0;

  const categories = useMemo(() => {
    return ALL_CATEGORIES.map((c) => ({
      id: c,
      title: CATEGORY_META[c as EmojiCategory]?.title ?? c,
      emojis: EMOJIS[c as EmojiCategory] ?? [],
    }));
  }, []);

  // 검색 결과: 카테고리 분리 없이 단일 리스트(빠름)
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

  // 스크롤 시 현재 섹션 하이라이트
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
              (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0)
          );
        if (v[0]) setActive(v[0].target.id.replace("sec-", ""));
      },
      { rootMargin: "-90px 0px -70% 0px", threshold: 0.1 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [categories, isSearching]);

  // Top 버튼 표시 제어
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

      <p style={{ marginTop: 0, opacity: 0.75, marginBottom: 16, lineHeight: 1.6 }}>
        검색하고 클릭해서 바로 복사하세요.
      </p>

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
          marginBottom: 14,
          outline: "none",
        }}
      />

      {isSearching ? (
        <>
          <div style={{ marginBottom: 10, fontSize: 14, opacity: 0.75 }}>
            결과 {searchResult.length}개
          </div>
          <EmojiGrid emojis={searchResult} />
        </>
      ) : (
        <>
          {/* 카테고리 선택 영역: 눈에 잘 띄게 “카드”로 강조 + 여러 줄 표시 */}
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              marginBottom: 18,
              padding: 12,
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 10,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: -0.2 }}>
                카테고리 선택
              </div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>
                탭을 눌러 이동
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap", // ✅ 여러 줄 허용 (가로 스크롤 없음)
                justifyContent: "flex-start",
              }}
            >
              {categories.map((c) => {
                const isActive = active === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => jump(c.id)}
                    style={{
                      padding: "10px 12px", // ✅ 더 큼
                      borderRadius: 999,
                      border: isActive
                        ? "1px solid rgba(255,255,255,0.42)"
                        : "1px solid rgba(255,255,255,0.18)",
                      background: isActive
                        ? "rgba(255,255,255,0.18)"
                        : "rgba(255,255,255,0.06)",
                      color: "inherit",
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: isActive ? 800 : 650,
                      letterSpacing: -0.1,
                      boxShadow: isActive
                        ? "0 8px 18px rgba(0,0,0,0.25)"
                        : "none",
                      transform: isActive ? "translateY(-1px)" : "translateY(0)",
                      transition:
                        "background 120ms ease, border-color 120ms ease, transform 120ms ease, box-shadow 120ms ease",
                    }}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {c.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 섹션들: Lazy render */}
          {categories.map((c) => (
            <section
              key={c.id}
              id={`sec-${c.id}`}
              style={{ marginBottom: 28, scrollMarginTop: 100 }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>
                  {c.title}
                </h2>
                <span style={{ fontSize: 13, opacity: 0.65 }}>
                  {c.emojis.length}개
                </span>
              </div>

              <LazySection>
                <EmojiGrid emojis={c.emojis} />
              </LazySection>
            </section>
          ))}
        </>
      )}

      {/* 우측 하단 Top 버튼 */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          style={{
            position: "fixed",
            right: 16,
            bottom: 16,
            zIndex: 60,
            width: 46,
            height: 46,
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.22)",
            background: "rgba(0,0,0,0.75)",
            color: "white",
            cursor: "pointer",
            boxShadow: "0 10px 22px rgba(0,0,0,0.35)",
            fontSize: 16,
            fontWeight: 900,
          }}
        >
          ↑
        </button>
      )}
    </main>
  );
}
