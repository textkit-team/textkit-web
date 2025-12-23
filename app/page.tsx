import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-10 text-3xl font-bold">
        TextKit
      </h1>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Emoji */}
        <Link
          href="/emoji"
          className="rounded-2xl border p-6 transition hover:shadow-md"
        >
          <h2 className="text-xl font-semibold">😀 Emoji</h2>
          <p className="mt-2 text-sm opacity-70">
            이모지 검색 & 복사
          </p>
          <span className="mt-4 inline-block text-sm font-medium">
            바로가기 →
          </span>
        </Link>

        {/* Coming Soon */}
        <div className="rounded-2xl border p-6 opacity-60">
          <h2 className="text-xl font-semibold">🚧 New Service</h2>
          <p className="mt-2 text-sm">
            신규 서비스 예정
          </p>
          <span className="mt-4 inline-block text-sm">
            Coming Soon
          </span>
        </div>
      </div>
    </main>
  );
}
