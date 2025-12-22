export const metadata = {
  title: "이모지 모음 | TextKit",
  description: "자주 쓰는 이모지를 카테고리별로 보고 클릭 한 번으로 복사하세요.",
};

const CATEGORIES = [
  { slug: "smileys", title: "😀 표정/감정", desc: "웃음, 감정, 사람 표정" },
  { slug: "hearts", title: "❤️ 하트", desc: "하트, 사랑, 감정 표현" },
  { slug: "hands", title: "🤝 손/제스처", desc: "손 모양, 제스처, 악수" },
  { slug: "symbols", title: "✅ 기호", desc: "체크, 경고, 화살표, 기타 기호" },
  { slug: "animals", title: "🐶 동물", desc: "강아지, 고양이 등 동물 이모지" },
  { slug: "food", title: "🍔 음식", desc: "음식, 음료, 디저트" },
];

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
        {CATEGORIES.map((c) => (
          <a
            key={c.slug}
            href={`/emoji/${c.slug}`}
            style={{
              display: "block",
              padding: 18,
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 14,
              textDecoration: "none",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700 }}>{c.title}</div>
            <div style={{ marginTop: 6, opacity: 0.8 }}>{c.desc}</div>
          </a>
        ))}
      </section>

      <footer style={{ marginTop: 36, opacity: 0.7, fontSize: 14 }}>
        Tip: 모바일에서는 길게 누르지 말고, “클릭 → 복사” 방식으로 제공할 예정입니다.
      </footer>
    </main>
  );
}
