import EmojiListClient from "./EmojiListClient";

export const metadata = {
  title: "전체 이모지 리스트 | TextKit",
  description:
    "카테고리별 이모지를 한 화면에서 보고 클릭 한 번으로 복사하세요.",
};

export default function EmojiListPage() {
  return <EmojiListClient />;
}
