import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "럭키데이 이용약관",
  description: "럭키데이 서비스의 이용약관입니다.",
};

export default function LuckyDayTermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/luckyday" className="text-sm font-semibold opacity-70 hover:opacity-100">
        ← 럭키데이
      </Link>

      <header className="mt-10 rounded-2xl bg-teal-800 px-6 py-7 text-white shadow-lg">
        <h1 className="text-3xl font-extrabold tracking-tight">럭키데이 이용약관</h1>
        <p className="mt-3 text-sm opacity-90">시행일: 2026년 3월 27일</p>
        <p className="text-sm opacity-90">최종 수정일: 2026년 3월 27일</p>
      </header>

      <div className="mt-6 space-y-4">
        <section className="rounded-2xl border p-6">
          <h2 className="text-xl font-bold text-teal-700">제1조 (목적)</h2>
          <p className="mt-3 leading-8 opacity-75">
            본 약관은 럭키데이(이하 &quot;회사&quot;)가 제공하는 운세, 날씨, 게임 및
            관련 포인트 적립/교환 서비스(이하 &quot;서비스&quot;)의 이용과 관련하여
            회사와 회원의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-xl font-bold text-teal-700">제2조 (정의)</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-8 opacity-75">
            <li>&quot;회원&quot;이란 본 약관에 동의하고 회사와 이용계약을 체결한 자를 말합니다.</li>
            <li>&quot;포인트&quot;란 회사가 서비스 내 활동에 따라 회원에게 부여하는 보상 단위를 말합니다.</li>
            <li>
              &quot;기프티콘&quot;이란 회원이 포인트를 사용하여 교환할 수 있는 모바일
              상품권 또는 이에 준하는 디지털 보상을 말합니다.
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-xl font-bold text-teal-700">제3조 (약관의 효력 및 변경)</h2>
          <div className="mt-3 space-y-3 leading-8 opacity-75">
            <p>
              회사는 관련 법령을 위반하지 않는 범위에서 약관을 변경할 수
              있습니다. 변경 시 시행일 및 변경 사유를 앱 또는 웹페이지 공지사항에
              사전 고지합니다.
            </p>
            <p>
              회원이 변경된 약관 시행일 이후에도 서비스를 계속 이용하는 경우
              변경 약관에 동의한 것으로 봅니다.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-xl font-bold text-teal-700">제4조 (이용계약의 성립 및 계정 관리)</h2>
          <div className="mt-3 space-y-3 leading-8 opacity-75">
            <p>
              이용계약은 회원이 회원가입 시 약관 및 개인정보 처리방침에 동의하고
              회사가 이를 승인함으로써 성립합니다.
            </p>
            <p>
              회원은 본인의 계정을 직접 관리해야 하며, 계정 정보의 관리 소홀로
              인한 불이익에 대해 회사는 귀책사유가 없는 한 책임을 지지 않습니다.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-xl font-bold text-teal-700">제5조 (서비스 내용 및 제공)</h2>
          <p className="mt-3 leading-8 opacity-75">회사는 아래의 기능을 제공합니다.</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-8 opacity-75">
            <li>운세, 날씨, 게임 콘텐츠 이용</li>
            <li>출석, 미션 수행 등 다양한 방식의 포인트 적립</li>
            <li>보유 포인트를 이용한 기프티콘 교환</li>
          </ul>
          <p className="mt-3 leading-8 opacity-75">
            회사는 운영상 또는 기술상 필요에 따라 서비스의 전부 또는 일부를
            변경할 수 있으며, 중요한 변경 사항은 사전에 공지합니다.
          </p>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-xl font-bold text-teal-700">제6조 (포인트 적립 및 소멸)</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-8 opacity-75">
            <li>포인트 적립 기준, 지급 시점, 사용 가능 조건은 서비스 내 안내 정책에 따릅니다.</li>
            <li>
              부정한 방법(매크로, 허위 참여, 시스템 악용 등)으로 취득한 포인트는
              사전 통지 후 회수 또는 무효 처리될 수 있습니다.
            </li>
            <li>회원 탈퇴 시 보유 포인트는 소멸하며 복구되지 않습니다.</li>
            <li>
              마지막 서비스 접속일로부터 <strong>12개월</strong> 이상 접속 기록이
              없는 경우, 보유 포인트는 소멸됩니다. 소멸 예정 시점은 서비스 내
              공지 또는 알림을 통해 사전 안내합니다.
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-xl font-bold text-teal-700">제7조 (기프티콘 교환)</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-8 opacity-75">
            <li>회원은 회사가 정한 기준 포인트를 충족하는 경우 기프티콘 교환을 신청할 수 있습니다.</li>
            <li>기프티콘은 제휴사 또는 발행처의 정책(유효기간, 사용처, 환불 등)을 따릅니다.</li>
            <li>
              회원의 귀책사유(연락처 오기재, 수신 불가 환경 등)로 인한
              재발송/취소/환불 제한이 발생할 수 있습니다.
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-xl font-bold text-teal-700">제8조 (회원의 의무 및 금지행위)</h2>
          <p className="mt-3 leading-8 opacity-75">회원은 다음 행위를 하여서는 안 됩니다.</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-8 opacity-75">
            <li>관계 법령 또는 본 약관에 위반되는 행위</li>
            <li>타인의 계정 도용, 개인정보 침해, 서비스 운영 방해 행위</li>
            <li>자동화 도구를 이용한 비정상 접속, 부정 포인트 획득 행위</li>
            <li>서비스 또는 제3자의 권리(지식재산권 등)를 침해하는 행위</li>
          </ul>
          <p className="mt-3 leading-8 opacity-75">
            금지행위가 확인되는 경우 회사는 사안에 따라 이용 제한, 포인트 회수,
            계약 해지 등 조치를 할 수 있습니다.
          </p>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-xl font-bold text-teal-700">제9조 (회원 탈퇴 및 데이터 보관)</h2>
          <div className="mt-3 space-y-3 leading-8 opacity-75">
            <p>회원은 서비스 내 탈퇴 기능을 통해 언제든지 회원 탈퇴를 신청할 수 있습니다.</p>
            <p>
              탈퇴가 처리되면 관련 법령 및 내부 정책에 따라 회원 데이터는{" "}
              <strong>30일간 보관</strong> 후 복구 불가능한 방식으로 완전
              삭제됩니다. 단, 법령에 따라 보존이 필요한 정보는 해당 기간 동안
              별도 보관될 수 있습니다.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-xl font-bold text-teal-700">제10조 (서비스 이용 제한 및 중단)</h2>
          <div className="mt-3 space-y-3 leading-8 opacity-75">
            <p>
              회사는 시스템 점검, 장애, 천재지변, 제휴사 사정 등 불가피한 사유가
              있는 경우 서비스 제공을 일시적으로 제한 또는 중단할 수 있습니다.
            </p>
            <p>회사는 사전 또는 사후에 공지 가능한 방법으로 회원에게 안내합니다.</p>
          </div>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-xl font-bold text-teal-700">제11조 (면책)</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-8 opacity-75">
            <li>회사는 천재지변, 불가항력적 사유로 인한 서비스 장애에 대해 책임을 지지 않습니다.</li>
            <li>운세 정보는 참고용 콘텐츠이며, 특정 결과를 보장하지 않습니다.</li>
            <li>날씨 정보는 외부 데이터 제공처 사정에 따라 지연 또는 오차가 발생할 수 있습니다.</li>
          </ul>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-xl font-bold text-teal-700">제12조 (분쟁 해결 및 준거법)</h2>
          <div className="mt-3 space-y-3 leading-8 opacity-75">
            <p>회사와 회원 간 분쟁이 발생한 경우 당사자는 성실히 협의하여 해결하도록 노력합니다.</p>
            <p>본 약관은 대한민국 법령을 준거법으로 하며, 관련 소송은 민사소송법상 관할 법원에 제기합니다.</p>
          </div>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-xl font-bold text-teal-700">제13조 (고객 문의)</h2>
          <p className="mt-3 leading-8 opacity-75">
            서비스 이용 관련 문의는 아래 채널로 접수할 수 있습니다.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-8 opacity-75">
            <li>서비스명: 럭키데이</li>
            <li>개인정보 보호책임자: 김보경</li>
            <li>문의 이메일: textkit.team@gmail.com</li>
          </ul>
          <p className="mt-4 text-sm opacity-60">
            부칙: 본 약관은 2026년 3월 27일부터 적용됩니다.
          </p>
        </section>
      </div>
    </main>
  );
}
