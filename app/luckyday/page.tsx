import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LUCKYDAY_LINKS } from "@/lib/luckyday";

export const metadata: Metadata = {
  title: "럭키데이",
  description:
    "날씨, 운세, 미니게임, 미션과 포인트를 한곳에서 확인하는 럭키데이 서비스 안내입니다.",
  openGraph: {
    title: "럭키데이 | TextKit",
    description:
      "날씨, 운세, 미니게임, 미션과 포인트를 한곳에서 확인하는 럭키데이 서비스 안내입니다.",
    url: "https://www.textkit.kr/luckyday",
    images: [
      {
        url: "/luckyday-icon.png",
        width: 512,
        height: 512,
        alt: "럭키데이",
      },
    ],
  },
};

export default function LuckyDayPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <section className="grid gap-8 md:grid-cols-[180px_1fr] md:items-center">
        <Image
          src="/luckyday-icon.png"
          width={180}
          height={180}
          alt="럭키데이 앱 아이콘"
          className="rounded-[32px] shadow-lg"
          priority
        />
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">럭키데이</h1>
          <p className="mt-4 text-lg leading-8 opacity-75">
            럭키데이는 오늘의 날짜, 음력, 날씨, 운세와 한줄 뉴스를 확인하고
            미니게임과 미션으로 포인트를 적립하는 생활형 행운 서비스입니다.
            출석 체크, 운세 확인, 게임 미션, 행운번호와 로또 결과 등 하루에
            필요한 작은 재미를 한곳에서 제공합니다.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-extrabold tracking-tight">주요 기능</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "오늘 정보",
              description:
                "날짜와 음력, 현재 위치 기반 날씨, 습도, 강수확률, 바람세기를 확인할 수 있습니다.",
            },
            {
              title: "오늘의 운세",
              description:
                "띠별 운세 요약을 카드 형태로 보고 하루를 가볍게 시작할 수 있습니다.",
            },
            {
              title: "미니게임과 행운",
              description:
                "카드 맞추기, 순서 맞추기, 행운번호 생성, 로또 결과 확인 기능을 제공합니다.",
            },
            {
              title: "미션과 포인트",
              description:
                "출석 체크와 일일 미션을 완료하고 포인트를 적립하며, 포인트몰은 출시 예정입니다.",
            },
          ].map((feature) => (
            <article key={feature.title} className="rounded-2xl border p-6">
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 opacity-70">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-4 sm:grid-cols-2">
        {LUCKYDAY_LINKS.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="rounded-2xl border p-6 transition hover:shadow-lg"
          >
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 opacity-70">{item.description}</p>
            <span className="mt-5 inline-block text-sm font-semibold">
              {"actionLabel" in item ? item.actionLabel : "확인하기 →"}
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
