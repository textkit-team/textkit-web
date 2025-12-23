"use client";

import { useMemo, useState } from "react";
import EmojiGrid from "./EmojiGrid";
import { EMOJI_META } from "@/lib/emoji-data";

export default function EmojiPageClient() {
  const [q, setQ] = useState("");

  const allEmojis = useMemo(() => {
    return Object.values(EMOJI_META).map(e => e.emoji);
  }, []);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return allEmojis;
    return Object.values(EMOJI_META)
      .filter(e => e.search.includes(qq))
      .map(e => e.emoji);
  }, [q, allEmojis]);

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>
        Emoji
      </h1>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search emoji (😀 / smile / 웃음)"
        style={{
          width: "100%",
          padding: "14px 16px",
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(0,0,0,0.2)",
          color: "inherit",
          marginBottom: 20,
        }}
      />

      <EmojiGrid emojis={filtered} />
    </main>
  );
}
