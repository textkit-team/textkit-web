"use client";

import { useMemo, useState } from "react";

type Props = {
  emojis: string[];
  title: string;
};

export default function EmojiGrid({ emojis, title }: Props) {
  const [q, setQ] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const qq = q.trim();
    if (!qq) return emojis;
    // 이모지 검색은 키워드 매핑 없으면 한계가 있어,
    // 일단 “붙여넣기 검색”(이모지를 입력/붙여넣기) 위주로 지원합니다.
    return emojis.filter((e) => e.includes(qq));
  }, [q, emojis]);

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setToast(`복사됨: ${text}`);
      window.setTimeout(() => setToast(null), 900);
    } catch {
      setToast("복사 실패 (브라우저 권한 확인)");
      window.setTimeout(() => setToast(null), 1200);
    }
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="이모지를 붙여넣어 검색 (예: 😀 또는 ❤️)"
          style={{
            flex: 1,
            padding: "12px 12px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.16)",
            background: "rgba(0,0,0,0.15)",
            color: "inherit",
            outline: "none",
          }}
        />
        <a
          href="/emoji/copy"
          style={{
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.16)",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          📋 전체 복사
        </a>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(56px, 1fr))",
          gap: 10,
        }}
        aria-label={`${title} 이모지 목록`}
      >
        {filtered.map((e, idx) => (
          <button
            key={`${e}-${idx}`}
            onClick={() => copy(e)}
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

      <div style={{ marginTop: 14, opacity: 0.75, fontSize: 14 }}>
        총 {filtered.length}개 표시
      </div>

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
    </div>
  );
}
