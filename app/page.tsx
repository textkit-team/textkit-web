export default function Home() {
  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "64px 20px" }}>
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 42, margin: 0, letterSpacing: -0.5 }}>TextKit</h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, marginTop: 12, opacity: 0.85 }}>
          Emoji · Text Tools · Copy &amp; Paste
        </p>
      </header>

      <section style={{ display: "grid", gap: 12 }}>
        <a
          href="/emoji"
          style={{
            display: "block",
            padding: 18,
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 12,
            textDecoration: "none",
          }}
        >
          <strong style={{ fontSize: 18 }}>😄 이모지 모음</strong>
          <div style={{ marginTop: 6, opacity: 0.8 }}>
            자주 쓰는 이모지를 카테고리별로 보고 바로 복사하세요.
          </div>
        </a>

        <a
          href="/emoji/copy"
          style={{
            display: "block",
            padding: 18,
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 12,
            textDecoration: "none",
          }}
        >
          <strong style={{ fontSize: 18 }}>📋 빠른 복사</strong>
          <div style={{ marginTop: 6, opacity: 0.8 }}>
            클릭 한 번으로 복사되는 리스트를 제공합니다.
          </div>
        </a>
      </section>

      <footer style={{ marginTop: 48, opacity: 0.7, fontSize: 14 }}>
        © {new Date().getFullYear()} TextKit
      </footer>
    </main>
  );
}
