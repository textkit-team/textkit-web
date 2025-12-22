import { getAllEmojiFlat } from "@/lib/emoji-data";

export const metadata = {
  title: "전체 이모지 빠른 복사 | TextKit",
  description: "자주 쓰는 이모지를 한 화면에서 보고 클릭으로 복사하세요.",
};

export default function EmojiCopyPage() {
  const all = getAllEmojiFlat();
  const text = all.join(" ");

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "56px 20px" }}>
      <header style={{ marginBottom: 14 }}>
        <a href="/emoji" style={{ textDecoration: "none", opacity: 0.8 }}>
          ← 이모지 허브
        </a>
        <h1 style={{ fontSize: 36, margin: "12px 0 8px", letterSpacing: -0.5 }}>
          전체 이모지 빠른 복사
        </h1>
        <p style={{ margin: 0, opacity: 0.85, lineHeight: 1.7 }}>
          자주 쓰는 이모지를 한 번에 모아둔 페이지입니다. 아래에서 드래그/복사하거나,
          카테고리 페이지의 “클릭 복사”를 이용하세요.
        </p>
      </header>

      <section
        style={{
          padding: 16,
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(255,255,255,0.03)",
          lineHeight: 2.1,
          fontSize: 20,
          wordBreak: "break-word",
        }}
      >
        {text}
      </section>

      <footer style={{ marginTop: 18, opacity: 0.7, fontSize: 14 }}>
        추천: “클릭 복사”는 카테고리 페이지에서 제공됩니다.
      </footer>
    </main>
  );
}
