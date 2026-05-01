// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <header className="mb-14">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight">
          TextKit
        </h1>
        <p className="text-lg opacity-75">
          빠르고 간편한 텍스트 유틸리티 모음.
          <br className="hidden sm:block" />
          지금은 <b>이모지 검색 & 복사</b>와 <b>럭키데이</b>를 제공하고 있어요.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Emoji */}
        <Link
          href="/emoji"
          className="rounded-3xl border p-8 transition hover:shadow-lg"
        >
          <h2 className="text-2xl font-bold">😀 Emoji</h2>
          <p className="mt-2 text-sm opacity-70">
            한국어·영어로 이모지를 검색하고 바로 복사하세요.
          </p>
          <span className="mt-6 inline-block text-sm font-semibold">
            사용해보기 →
          </span>
        </Link>

        {/* Lucky Day */}
        <Link
          href="/luckyday"
          className="rounded-3xl border p-8 transition hover:shadow-lg"
        >
          <h2 className="text-2xl font-bold">🍀 럭키데이</h2>
          <p className="mt-2 text-sm opacity-70">
            럭키데이 안내, 약관, 개인정보처리방침, 다운로드 링크를 확인하세요.
          </p>
          <span className="mt-6 inline-block text-sm font-semibold">
            자세히 보기 →
          </span>
        </Link>
      </div>
    </main>
  );
}
