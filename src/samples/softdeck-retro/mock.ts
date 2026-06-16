export const mock = {
  brand: {
    name: "SoftDeck",
    tagline: "The Retro-Powered Deck Builder",
    year: "© 1994–2026",
    logo: "SD",
  },

  nav: [
    { label: "기능", href: "#features" },
    { label: "사양", href: "#specs" },
    { label: "요금제", href: "#pricing" },
    { label: "문의", href: "#contact" },
  ],

  hero: {
    headline: "Build Decks Like It's 1989",
    sub: "OHP 이후 가장 손맛 좋고 만족스러운 프레젠테이션 툴. 뉴모픽 컨트롤, 레트로 감성.",
    cta: "무료로 시작하기",
    ctaSecondary: "데모 보기",
    badge: "신규 출시 v2.4",
  },

  productPanel: {
    title: "SoftDeck Studio",
    description: "나만의 크리에이티브 워크스테이션",
    stats: [
      { label: "슬라이드", value: "∞" },
      { label: "테마", value: "64" },
      { label: "폰트", value: "128" },
    ],
    indicator: "ACTIVE",
  },

  features: [
    {
      icon: "◈",
      title: "뉴모픽 캔버스",
      desc: "모든 슬라이드 표면이 같은 소재에서 눌러낸 듯 부드럽고 촉감이 살아있습니다.",
    },
    {
      icon: "◉",
      title: "레트로 타입 엔진",
      desc: "그래픽 디자인의 황금기에서 엄선한 128종 이상의 디스플레이 폰트. 슬랩 세리프 포함.",
    },
    {
      icon: "▣",
      title: "그리드 컴포저",
      desc: "픽셀 단위 정렬 가이드와 마그네틱 스냅 존이 있는 올드스쿨 모듈식 그리드.",
    },
    {
      icon: "◆",
      title: "선버스트 FX",
      desc: "클릭 한 번으로 레트로 방사형 효과, 하프톤 오버레이, 스캔라인 텍스처를 적용해 빈티지 감성을 완성하세요.",
    },
    {
      icon: "◐",
      title: "소프트 트랜지션",
      desc: "VHS 디졸브, 필름 와이프, 아날로그 방송 컷에서 영감을 받은 모션 프리셋.",
    },
    {
      icon: "◑",
      title: "덱 내보내기",
      desc: "PDF, PPTX, 또는 별도 설치 없이 공유 가능한 레트로 스타일 웹 페이지로 내보내기.",
    },
  ],

  specs: [
    { label: "엔진", value: "RetroCore™ v3" },
    { label: "해상도", value: "최대 8K" },
    { label: "포맷", value: "PDF, PPTX, HTML" },
    { label: "플랫폼", value: "Win / Mac / Linux" },
    { label: "저장소", value: "클라우드 + 로컬" },
    { label: "협업", value: "실시간" },
  ],

  pricing: [
    {
      tier: "FLOPPY",
      price: "$0",
      period: "/월",
      desc: "혼자 탐험하는 분들을 위해",
      features: ["덱 5개", "슬라이드 각 20장", "기본 테마", "PNG 내보내기"],
      cta: "무료로 시작",
      highlight: false,
    },
    {
      tier: "CASSETTE",
      price: "$12",
      period: "/월",
      desc: "진지한 크리에이터를 위해",
      features: [
        "덱 무제한",
        "전체 테마 + 폰트",
        "PDF & PPTX 내보내기",
        "Sunburst FX",
        "우선 지원",
      ],
      cta: "프로로 전환",
      highlight: true,
    },
    {
      tier: "BETAMAX",
      price: "$39",
      period: "/월",
      desc: "팀과 스튜디오를 위해",
      features: [
        "Cassette의 모든 기능",
        "팀 워크스페이스",
        "화이트라벨 내보내기",
        "API 접근",
        "SSO & 감사 로그",
        "전담 지원",
      ],
      cta: "영업팀 문의",
      highlight: false,
    },
  ],

  newsletter: {
    heading: "새 소식 받아보기",
    sub: "레트로 팁, 신규 테마 출시 소식, 베타 기능 얼리 액세스를 가장 먼저 받아보세요.",
    placeholder: "your@email.com",
    cta: "구독하기",
  },

  footer: {
    links: ["개인정보처리방침", "이용약관", "블로그", "문서", "서비스 상태"],
    social: ["TW", "GH", "YT"],
  },
}
