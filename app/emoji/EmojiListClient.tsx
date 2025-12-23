"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  ALL_CATEGORIES,
  CATEGORY_META,
  EMOJIS,
  EMOJI_META,
  type EmojiCategory,
} from "@/lib/emoji-data";

const RECENTS_KEY = "textkit:emoji:recents";
const RECENTS_MAX = 48;

function safeJsonParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function loadRecents(): string[] {
  const parsed = safeJsonParse<unknown>(
    typeof window === "undefined" ? null : localStorage.getItem(RECENTS_KEY)
  );
  if (!Array.isArray(parsed)) return [];
  return parsed.filter((x): x is string => typeof x === "string").slice(0, RECENTS_MAX);
}

function saveRecents(list: string[]) {
  try {
    localStorage.setItem(RECENTS_KEY, JSON.stringify(list.slice(0, RECENTS_MAX)));
  } catch {
    // ignore
  }
}

function slugToSectionId(slug: string) {
  return `sec-${slug}`;
}

export default function EmojiListClient() {
  const [q, setQ] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [active, setActive] = useState<string>("recents");
  const [recents, setRecents] = useState<string[]>([]);

  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    setRecents(loadRecents());
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  const search = useMemo(() => {
    const raw = q.trim();
    const qq = raw.toLowerCase();
    const tokens = qq.split(/\s+/).filter(Boolean);

    if (!tokens.length) {
      return {
        isSearching: false,
        tokens: [] as string[],
        // default view: keep categories as-is
        cats: ALL_CATEGORIES.map((c) => ({ c, items: EMOJIS[c] })),
        results: [] as string[],
        total: 0,
      };
    }

    // PiliApp-style: when searching, show a single consolidated grid
    const all = ALL_CATEGORIES.flatMap((c) => EMOJIS[c]);

    function matches(emoji: string): boolean {
      // allow direct emoji paste
      if (tokens.some((t) => t && emoji.includes(t))) return true;
      const meta = EMOJI_META[emoji];
      if (!meta) return false;
      const hay = (meta.search ?? "").toLowerCase();
      return tokens.every((t) => hay.includes(t));
    }

    function score(emoji: string): number {
      const meta = EMOJI_META[emoji];
      const hay = (meta?.search ?? "").toLowerCase();

      if (emoji === raw) return 0;
      if (emoji.includes(raw)) return 1;
      if (meta?.name && meta.name.toLowerCase().startsWith(tokens[0] ?? "")) return 2;
      if (meta?.koName && meta.koName.toLowerCase().startsWith(tokens[0] ?? "")) return 2;
      // earlier match position = slightly better
      const idx = tokens.length ? Math.max(...tokens.map((t) => hay.indexOf(t))) : 9999;
      return 10 + (idx >= 0 ? idx : 9999);
    }

    const results = all
      .filter(matches)
      .sort((a, b) => {
        const sa = score(a);
        const sb = score(b);
        if (sa !== sb) return sa - sb;
        return a.localeCompare(b);
      });

    return {
      isSearching: true,
      tokens,
      results,
      total: results.length,
      cats: [] as { c: EmojiCategory; items: string[] }[],
    };
  }, [q]);

  const tabs = useMemo(() => {
    // In search mode, tabs are distracting — keep it minimal like PiliApp.
    if (search.isSearching) {
      return [{ id: "search", label: `검색 결과 (${search.total.toLocaleString()})` }];
    }
    const base = [{ id: "recents", label: "최근" }];
    const catTabs = search.cats.map(({ c }) => ({
      id: c,
      label: CATEGORY_META[c].title,
    }));
    return [...base, ...catTabs];
  }, [search.isSearching, search.total, search.cats]);

  useEffect(() => {
    if (search.isSearching) {
      setActive("search");
      return;
    }

    // active tab highlight (category view only)
    const ids = ["recents", ...search.cats.map(({ c }) => c)];
    const els = ids
      .map((id) => document.getElementById(slugToSectionId(id)))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0));
        const top = visible[0]?.target as HTMLElement | undefined;
        if (!top?.id) return;
        setActive(top.id.replace("sec-", ""));
      },
      {
        root: null,
        threshold: 0.12,
        // sticky 영역(검색+탭) 높이 고려
        rootMargin: "-140px 0px -70% 0px",
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [search.isSearching, search.cats]);

  function showToast(message: string, ms = 900) {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), ms);
  }

  async function copyEmoji(e: string) {
    try {
      await navigator.clipboard.writeText(e);
      showToast(`복사됨: ${e}`);

      setRecents((prev) => {
        const next = [e, ...prev.filter((x) => x !== e)].slice(0, RECENTS_MAX);
        saveRecents(next);
        return next;
      });
    } catch {
      showToast("복사 실패 (브라우저 권한 확인)", 1200);
    }
  }

  function jumpTo(id: string) {
    const el = document.getElementById(slugToSectionId(id));
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  }

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 20px" }}>
      <header style={{ marginBottom: 18 }}>
        <a href="/emoji" style={{ textDecoration: "none", opacity: 0.8 }}>
          ← 이모지 허브
        </a>
        <h1 style={{ fontSize: 40, margin: "14px 0 8px", letterSpacing: -0.5 }}>
          전체 이모지 리스트
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.85, margin: 0 }}>
          카테고리별로 한 화면에서 보고, <b>클릭 한 번으로 복사</b>하세요.
        </p>
      </header>

      {/* Search */}
      <div style={{ marginBottom: 10 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="이모지 / 이름 / 키워드 검색 (예: 😀, grin, 웃음, 하트)"
          style={{
            width: "100%",
            padding: "12px 12px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.16)",
            background: "rgba(0,0,0,0.15)",
            color: "inherit",
            outline: "none",
          }}
        />
      </div>

      {/* Sticky Tabs */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          padding: "10px 0",
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.10)",
          marginBottom: 18,
        }}
      >
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                if (t.id === "search") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  return;
                }
                jumpTo(t.id);
              }}
              style={{
                whiteSpace: "nowrap",
                padding: "8px 10px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.16)",
                background: active === t.id ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.04)",
                color: "inherit",
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              {t.label}
            </button>
          ))}

          <a
            href="/emoji/copy"
            style={{
              marginLeft: "auto",
              padding: "8px 10px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.16)",
              textDecoration: "none",
              whiteSpace: "nowrap",
              opacity: 0.95,
              fontSize: 13,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            📋 전체 복사
          </a>

          {q.trim() ? (
            <button
              onClick={() => setQ("")}
              style={{
                padding: "8px 10px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.16)",
                background: "rgba(255,255,255,0.04)",
                color: "inherit",
                cursor: "pointer",
                fontSize: 13,
              }}
              title="검색 초기화"
            >
              ✕ 지우기
            </button>
          ) : null}
        </div>
      </div>

      {search.isSearching ? (
        <Section
          id="search"
          title={`검색 결과 (${search.total.toLocaleString()})`}
          description={
            search.total
              ? "PiliApp처럼 결과를 한 번에 보여줘요. 클릭하면 바로 복사됩니다."
              : "검색 결과가 없어요. 다른 키워드를 시도해 보세요!"
          }
          emojis={search.results}
          onCopy={copyEmoji}
          emptyText="검색 결과가 없어요."
        />
      ) : (
        <>
          {/* Recents */}
          <Section
            id="recents"
            title="최근 사용"
            description="최근에 클릭(복사)한 이모지"
            emojis={recents}
            onCopy={copyEmoji}
            emptyText="최근 이모지가 아직 없어요. 아래에서 클릭해 보세요!"
          />

          {/* Categories */}
          {search.cats.map(({ c, items }) => {
            const meta = CATEGORY_META[c as EmojiCategory];
            return (
              <Section
                key={c}
                id={c}
                title={meta.title}
                description={meta.description}
                emojis={items}
                onCopy={copyEmoji}
                emptyText={"이 카테고리는 비어 있어요."}
              />
            );
          })}
        </>
      )}

      {toast && (
        <div
          style={{
            position: "fixed",
            left: "50%",
            bottom: 18,
            transform: "translateX(-50%)",
            padding: "10px 14px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(0,0,0,0.75)",
            fontSize: 14,
            zIndex: 50,
          }}
        >
          {toast}
        </div>
      )}
    </main>
  );
}

function Section({
  id,
  title,
  description,
  emojis,
  onCopy,
  emptyText,
}: {
  id: string;
  title: string;
  description?: string;
  emojis: string[];
  onCopy: (emoji: string) => void;
  emptyText: string;
}) {
  return (
    <section
      id={slugToSectionId(id)}
      style={{ marginBottom: 28, scrollMarginTop: 170 }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 12 }}>
        <h2 style={{ fontSize: 22, margin: 0, letterSpacing: -0.2 }}>{title}</h2>
        {description ? (
          <span style={{ opacity: 0.7, fontSize: 13 }}>{description}</span>
        ) : null}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{ marginLeft: "auto", textDecoration: "none", opacity: 0.75, fontSize: 13 }}
        >
          맨 위로
        </a>
      </div>

      {emojis.length === 0 ? (
        <div
          style={{
            padding: 16,
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.03)",
            opacity: 0.8,
          }}
        >
          {emptyText}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(56px, 1fr))",
            gap: 10,
          }}
          aria-label={`${title} 이모지 목록`}
        >
          {emojis.map((e, idx) => (
            <button
              key={`${e}-${idx}`}
              onClick={() => onCopy(e)}
              title="클릭하면 복사됩니다"
              style={{
                height: 54,
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.03)",
                cursor: "pointer",
                fontSize: 26,
              }}
            >
              {e}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
