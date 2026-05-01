export const LUCKYDAY_APP_DOWNLOAD_URL =
  "https://play.google.com/store/apps/details?id=kr.textkit.dailycast";

export const LUCKYDAY_LINKS = [
  {
    href: "/luckyday/privacy",
    title: "개인정보처리방침",
    description: "럭키데이의 개인정보 처리 기준을 확인하세요.",
    external: false,
  },
  {
    href: "/luckyday/terms",
    title: "이용 약관",
    description: "서비스 이용 조건과 사용자 권리를 안내합니다.",
    external: false,
  },
  {
    href: "/luckyday/withdrawal",
    title: "회원 탈퇴 안내",
    description: "계정 및 데이터 삭제 요청 방법을 확인하세요.",
    external: false,
  },
  {
    href: LUCKYDAY_APP_DOWNLOAD_URL,
    title: "앱 다운로드",
    description: "출시 준비 중인 Google Play 상세 페이지로 이동합니다.",
    external: true,
    actionLabel: "Google Play 확인하기 →",
  },
] as const;
