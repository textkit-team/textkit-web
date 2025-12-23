import EmojiGrid from "./EmojiGrid";
import {
  ALL_CATEGORIES,
  CATEGORY_META,
  EMOJIS,
  type EmojiCategory,
} from "@/lib/emoji-data";

type Params = { category: string };

export function generateStaticParams() {
  return ALL_CATEGORIES.map((c) => ({ category: c }));
}

export async function generateMetadata({ params }: { params: any }) {
  const p = await Promise.resolve(params);
  const cat = p?.category as EmojiCategory;

  const meta = CATEGORY_META[cat];
  if (!meta) return { title: "이모지 | TextKit" };

  return {
    title: `${meta.title} | TextKit`,
    description: `${meta.description} — 클릭 한 번으로 복사하세요.`,
  };
}

export default async function EmojiCategoryPage({ params }: { params: any }) {
  const p = await Promise.resolve(params);
  const cat = p?.category as EmojiCategory;

  const meta = CATEGORY_META[cat];
  const emojis = EMOJIS[cat];

  if (!meta || !emojis) {
    return (
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "56px 20px" }}>
        <a href="/emoji" style={{ textDecoration: "none", opacity: 0.8 }}>
          ← 이모지 허브
        </a>
        <h1 style={{ fontSize: 32, marginTop: 14 }}>없는 카테고리입니다</h1>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "56px 20px" }}>
      <header style={{ marginBottom: 18 }}>
        <a href="/emoji" style={{ textDecoration: "none", opacity: 0.8 }}>
          ← 이모지 허브
        </a>
        <h1
          style={{ fontSize: 36, margin: "14px 0 8px", letterSpacing: -0.5 }}
        >
          {meta.title}
        </h1>
        <p style={{ margin: 0, opacity: 0.85, lineHeight: 1.7 }}>
          {meta.description}. 원하는 이모지를 <b>클릭하면 복사</b>됩니다.
        </p>
      </header>

      <EmojiGrid emojis={emojis} title={meta.title} />

      <footer style={{ marginTop: 28, opacity: 0.7, fontSize: 14 }}>
        더 많은 이모지는 계속 추가될 예정입니다.
      </footer>
    </main>
  );
}
