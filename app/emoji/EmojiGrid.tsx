"use client";

import { useState } from "react";

type Props = { emojis: string[] };

export default function EmojiGrid({ emojis }: Props) {
  const [toast, setToast] = useState<string | null>(null);

  async function copy(e: string) {
    try {
      await navigator.clipboard.writeText(e);
      setToast(`Copied ${e}`);
      setTimeout(() => setToast(null), 900);
    } catch {
      setToast("Copy failed");
      setTimeout(() => setToast(null), 1200);
    }
  }

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(44px, 1fr))",
          gap: 10,
        }}
      >
        {emojis.map((e, i) => (
          <button
            key={`${e}-${i}`}
            onClick={() => copy(e)}
            style={{
              height: 44,
              borderRadius: 12,
              fontSize: 24,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
              cursor: "pointer",
            }}
          >
            {e}
          </button>
        ))}
      </div>

      {toast && (
        <div
          style={{
            position: "fixed",
            left: "50%",
            bottom: 20,
            transform: "translateX(-50%)",
            padding: "10px 14px",
            borderRadius: 999,
            background: "rgba(0,0,0,0.8)",
            fontSize: 14,
            zIndex: 50,
          }}
        >
          {toast}
        </div>
      )}
    </>
  );
}