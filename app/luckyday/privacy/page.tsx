import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "럭키데이 개인정보처리방침",
  description: "럭키데이 서비스의 개인정보처리방침입니다.",
};

export default function LuckyDayPrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="rounded-2xl bg-cyan-800 px-6 py-7 text-white shadow-lg">
        <h1 className="text-3xl font-extrabold tracking-tight">
          럭키데이 개인정보처리방침
        </h1>
        <p className="mt-3 text-sm opacity-90">시행일: 2026년 3월 27일</p>
        <p className="text-sm opacity-90">최종 수정일: 2026년 3월 27일</p>
      </header>

      <div className="mt-6 space-y-4">
        <section className="rounded-2xl border p-6">
          <h2 className="text-xl font-bold text-cyan-700">1. 총칙</h2>
          <p className="mt-3 leading-8 opacity-75">
            럭키데이(이하 &quot;회사&quot;)는 이용자의 개인정보를 중요하게 생각하며,
            관련 법령을 준수합니다. 본 개인정보처리방침은 회사가 서비스 제공
            과정에서 어떤 정보를 수집하고, 어떻게 이용 및 보관하며, 어떤
            방식으로 파기하는지 안내합니다.
          </p>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-xl font-bold text-cyan-700">2. 수집하는 개인정보 항목</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-8 opacity-75">
            <li>회원가입 및 로그인 시: 소셜 로그인 식별값, 닉네임, 프로필 이미지</li>
            <li>
              서비스 이용 과정에서 자동 생성되는 정보: 접속 일시, 기기 정보,
              서비스 이용 기록, IP 주소
            </li>
            <li>
              기프티콘 교환 시 필요한 정보: 수령 처리에 필요한 최소 정보(예:
              연락처 등)
            </li>
          </ul>
          <p className="mt-3 leading-8 opacity-75">
            회사는 서비스 제공에 필요한 최소한의 개인정보만 수집합니다.
          </p>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-xl font-bold text-cyan-700">3. 개인정보의 이용 목적</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-8 opacity-75">
            <li>회원 식별 및 로그인/계정 관리</li>
            <li>운세, 날씨, 게임, 포인트 적립 및 기프티콘 교환 서비스 제공</li>
            <li>부정 이용 방지, 보안 및 서비스 안정성 확보</li>
            <li>고객 문의 응대 및 공지 전달</li>
          </ul>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-xl font-bold text-cyan-700">4. 개인정보 보관 및 파기</h2>
          <div className="mt-3 space-y-3 leading-8 opacity-75">
            <p>회사는 개인정보 수집 및 이용 목적이 달성되면 해당 정보를 지체 없이 파기합니다.</p>
            <p>
              다만 회원이 탈퇴한 경우, 계정 및 서비스 이용 관련 데이터는{" "}
              <strong>30일간 보관</strong> 후 복구 불가능한 방법으로 완전 삭제합니다.
            </p>
            <p>
              마지막 서비스 접속일로부터 <strong>12개월</strong> 이상 접속 기록이
              없는 장기 미이용 회원의 경우, 보유 포인트를 소멸 처리하며 해당
              사실을 서비스 내 공지 또는 알림을 통해 사전 안내합니다.
            </p>
            <p>
              관련 법령에 따라 보존 의무가 있는 정보는 법정 보존기간 동안 별도
              분리 보관 후 파기합니다.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-xl font-bold text-cyan-700">5. 개인정보의 제3자 제공</h2>
          <p className="mt-3 leading-8 opacity-75">
            회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만
            다음의 경우에는 예외로 합니다.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-8 opacity-75">
            <li>이용자가 사전에 동의한 경우</li>
            <li>법령에 따라 제공 의무가 발생한 경우</li>
          </ul>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-xl font-bold text-cyan-700">6. 개인정보 처리 위탁</h2>
          <div className="mt-3 space-y-3 leading-8 opacity-75">
            <p>
              회사는 서비스 제공을 위해 필요한 경우 일부 업무를 외부 업체에
              위탁할 수 있으며, 위탁 시 관련 법령에 따라 수탁자에 대한
              관리·감독을 수행합니다.
            </p>
            <p>위탁 사항이 발생하거나 변경되는 경우 본 방침 또는 공지를 통해 안내합니다.</p>
          </div>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-xl font-bold text-cyan-700">7. 이용자 및 법정대리인의 권리</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-8 opacity-75">
            <li>이용자는 언제든지 자신의 개인정보 열람, 정정, 삭제, 처리정지를 요청할 수 있습니다.</li>
            <li>회원탈퇴는 서비스 내 기능을 통해 언제든지 가능합니다.</li>
            <li>
              권리 행사는 고객 문의 채널을 통해 요청할 수 있으며, 회사는 관련
              법령에 따라 지체 없이 조치합니다.
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-xl font-bold text-cyan-700">8. 쿠키 및 유사 기술</h2>
          <p className="mt-3 leading-8 opacity-75">
            회사는 서비스 품질 향상 및 보안 목적을 위해 쿠키 또는 유사 기술을
            사용할 수 있습니다. 이용자는 기기 또는 브라우저 설정을 통해 쿠키
            저장을 거부할 수 있습니다.
          </p>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-xl font-bold text-cyan-700">9. 아동의 개인정보 보호</h2>
          <p className="mt-3 leading-8 opacity-75">
            회사는 관련 법령이 요구하는 경우 아동 개인정보 보호를 위한 추가
            절차를 따릅니다. 법정대리인은 아동의 개인정보에 대한 열람, 정정,
            삭제를 요청할 수 있습니다.
          </p>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-xl font-bold text-cyan-700">10. 개인정보 보호를 위한 조치</h2>
          <p className="mt-3 leading-8 opacity-75">
            회사는 개인정보의 안전성 확보를 위해 접근 통제, 권한 관리, 로그 관리
            등 합리적인 기술적·관리적 보호조치를 적용합니다.
          </p>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-xl font-bold text-cyan-700">11. 문의처</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-8 opacity-75">
            <li>서비스명: 럭키데이</li>
            <li>개인정보 보호책임자: 김보경</li>
            <li>문의 이메일: textkit.team@gmail.com</li>
          </ul>
          <p className="mt-4 text-sm opacity-60">
            본 방침은 2026년 3월 27일부터 적용됩니다.
          </p>
        </section>
      </div>
    </main>
  );
}
