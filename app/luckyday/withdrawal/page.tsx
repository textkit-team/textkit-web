import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "럭키데이 회원 탈퇴 안내",
  description: "럭키데이 계정 탈퇴 및 데이터 삭제 요청 방법입니다.",
};

export default function LuckyDayWithdrawalPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/luckyday" className="text-sm font-semibold opacity-70 hover:opacity-100">
        ← 럭키데이
      </Link>
      <h1 className="mt-10 text-3xl font-extrabold tracking-tight">
        럭키데이 회원 탈퇴 안내
      </h1>
      <p className="mt-4 leading-8 opacity-75">
        럭키데이 계정 삭제를 원하는 경우 앱의 설정 화면에서 직접 회원 탈퇴를
        진행할 수 있습니다. 탈퇴가 완료되면 로그인 정보, 포인트 및 서비스 이용
        데이터는 아래 기준에 따라 처리됩니다.
      </p>

      <section className="mt-10 rounded-2xl border p-6">
        <h2 className="text-xl font-bold">앱에서 탈퇴하기</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 leading-7 opacity-75">
          <li>럭키데이 앱을 실행합니다.</li>
          <li>하단 탭에서 설정을 선택합니다.</li>
          <li>상단 정보 영역의 회원 탈퇴 메뉴를 선택합니다.</li>
          <li>탈퇴 안내 내용을 확인한 뒤 탈퇴를 완료합니다.</li>
        </ol>
      </section>

      <section className="mt-6 rounded-2xl border p-6">
        <h2 className="text-xl font-bold">탈퇴 전 확인 사항</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 opacity-75">
          <li>탈퇴 후에는 카카오 계정 로그인을 포함한 계정 기반 기능을 이용할 수 없습니다.</li>
          <li>보유 포인트와 적립/사용 내역은 탈퇴 처리와 함께 소멸되며 복구되지 않습니다.</li>
          <li>진행 중인 미션, 출석 체크, 포인트몰 이용 정보도 계정 삭제 대상에 포함됩니다.</li>
        </ul>
      </section>

      <section className="mt-6 rounded-2xl border p-6">
        <h2 className="text-xl font-bold">탈퇴 후 데이터 처리</h2>
        <div className="mt-4 space-y-3 leading-8 opacity-75">
          <p>
            탈퇴가 처리되면 회원 데이터는 관련 약관 및 내부 정책에 따라 30일간
            보관 후 복구 불가능한 방식으로 삭제됩니다.
          </p>
          <p>
            단, 관련 법령에 따라 보존이 필요한 정보는 법정 보존기간 동안 별도로
            분리 보관한 뒤 파기합니다.
          </p>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border p-6">
        <h2 className="text-xl font-bold">문의하기</h2>
        <p className="mt-4 leading-8 opacity-75">
          앱에서 탈퇴가 어렵거나 계정 삭제와 관련해 도움이 필요한 경우 설정 화면의
          문의하기 메뉴 또는 이메일(textkit.team@gmail.com)로 문의해 주세요.
        </p>
      </section>
    </main>
  );
}
