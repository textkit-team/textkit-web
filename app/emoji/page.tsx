import { ALL_CATEGORIES, CATEGORY_META } from "@/lib/emoji-data";

export const metadata = {
  title: "이모지 모음 | TextKit",
  description: "자주 쓰는 이모지를 카테고리별로 보고 클릭 한 번으로 복사하세요.",
};

export default function EmojiHubPage() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "56px 20px" }}>
      <header style={{ marginBottom: 24 }}>
        <a href="/" style={{ textDecoration: "none", opacity: 0.8 }}>
          ← TextKit 홈
        </a>
        <h1 style={{ fontSize: 40, margin: "14px 0 8px", letterSpacing: -0.5 }}>
          이모지 모음
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.85, margin: 0 }}>
          카테고리를 선택하면 이모지를 보고 <b>클릭 한 번으로 복사</b>할 수 있어요.
        </p>
      </header>

      <section style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
        {ALL_CATEGORIES.map((slug) => {
          const meta = CATEGORY_META[slug];
          return (
            <a
              key={slug}
              href={`/emoji/${slug}`}
              style={{
                display: "block",
                padding: 18,
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 14,
                textDecoration: "none",
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 700 }}>{meta.title}</div>
              <div style={{ marginTop: 6, opacity: 0.8 }}>{meta.description}</div>
            </a>
          );
        })}
      </section>

      <div style={{ marginTop: 14 }}>
        <a
          href="/emoji/list"
          style={{
            display: "inline-block",
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.16)",
            textDecoration: "none",
            opacity: 0.9,
            marginRight: 10,
          }}
        >
          🧾 전체 리스트 보기
        </a>
        <a
          href="/emoji/copy"
          style={{
            display: "inline-block",
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.16)",
            textDecoration: "none",
            opacity: 0.9,
          }}
        >
          📋 전체 이모지 빠른 복사
        </a>
      </div>

      <footer style={{ marginTop: 28, opacity: 0.7, fontSize: 14 }}>
        카테고리는 계속 추가됩니다.
      </footer>
    </main>
  );
}