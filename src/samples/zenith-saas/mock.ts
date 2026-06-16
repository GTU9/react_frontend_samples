export const mock = {
  hero: {
    badge: "신규 — v2.0 출시",
    headline: "AI 기반 플랫폼으로\n더 빠르게\n배포하세요",
    subCopy:
      "Zenith는 팀의 워크플로우, 분석, 배포를 하나의 원활한 워크스페이스로 통합합니다. 릴리스 주기를 절반으로 줄이고 자신 있게 출시하세요.",
    cta: { primary: "무료로 시작하기", secondary: "실제 동작 보기" },
    stats: [
      { value: "10x", label: "빠른 배포" },
      { value: "99.9%", label: "가동률 SLA" },
      { value: "50ms", label: "평균 지연시간" },
    ],
  },

  logos: [
    { name: "Stripe", abbr: "S" },
    { name: "Notion", abbr: "N" },
    { name: "Vercel", abbr: "V" },
    { name: "Linear", abbr: "L" },
    { name: "Figma", abbr: "F" },
    { name: "Supabase", abbr: "Su" },
  ],

  features: [
    {
      id: "f1",
      size: "large",
      icon: "⚡",
      title: "즉각적인 배포",
      body: "main에 푸시하면 30초 이내에 앱이 라이브로 올라갑니다. 다운타임 없는 블루-그린 배포가 기본 내장.",
      accent: "#6366f1",
    },
    {
      id: "f2",
      size: "small",
      icon: "🔒",
      title: "SOC 2 Type II",
      body: "기업급 보안이 기본으로 제공됩니다.",
      accent: "#8b5cf6",
    },
    {
      id: "f3",
      size: "small",
      icon: "📊",
      title: "실시간 분석",
      body: "중요한 모든 지표를 실시간으로 확인하세요.",
      accent: "#a855f7",
    },
    {
      id: "f4",
      size: "medium",
      icon: "🤖",
      title: "AI 코파일럿",
      body: "코드베이스를 학습하는 상황 인식 제안으로 프로덕션에 닿기 전에 회귀를 감지합니다.",
      accent: "#c026d3",
    },
    {
      id: "f5",
      size: "medium",
      icon: "🌐",
      title: "글로벌 엣지 네트워크",
      body: "6개 대륙 300개 이상의 PoP. 사용자는 언제나 가장 가까운 노드에 연결됩니다.",
      accent: "#7c3aed",
    },
    {
      id: "f6",
      size: "small",
      icon: "🔄",
      title: "GitOps 네이티브",
      body: "모든 변경이 추적·롤백·감사 가능합니다.",
      accent: "#6366f1",
    },
  ],

  stats: [
    { value: "1.2B+", label: "일일 처리 요청 수" },
    { value: "40,000+", label: "전 세계 팀" },
    { value: "99.99%", label: "역대 가동률" },
    { value: "<30s", label: "중간 배포 시간" },
  ],

  pricing: [
    {
      name: "Starter",
      price: "$0",
      period: "/ 월",
      description: "사이드 프로젝트와 개인 사이트에 딱 맞는 플랜.",
      features: [
        "프로젝트 3개",
        "대역폭 5GB",
        "커뮤니티 지원",
        "기본 분석",
        "팀원 1명",
      ],
      cta: "무료로 시작하기",
      highlight: false,
    },
    {
      name: "Pro",
      price: "$49",
      period: "/ 월",
      description: "빠르게 성장하는 스타트업이 필요한 모든 것.",
      features: [
        "프로젝트 무제한",
        "대역폭 200GB",
        "우선 지원",
        "고급 분석",
        "팀원 10명",
        "AI 코파일럿",
        "커스텀 도메인",
      ],
      cta: "무료 체험 시작",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "맞춤 견적",
      period: "",
      description: "복잡한 요구사항을 가진 대규모 팀을 위한 맞춤형 플랜.",
      features: [
        "모든 것 무제한",
        "전용 인프라",
        "24/7 SLA 지원",
        "SSO / SAML",
        "감사 로그",
        "커스텀 SLA",
        "온보딩 엔지니어",
      ],
      cta: "영업팀 문의",
      highlight: false,
    },
  ],

  faqs: [
    {
      q: "무료 플랜은 어떻게 작동하나요?",
      a: "Starter 플랜은 신용카드 없이 영구 무료입니다. 매월 프로젝트 3개와 대역폭 5GB가 제공됩니다. 더 필요할 때 언제든 업그레이드하세요.",
    },
    {
      q: "Zenith를 자체 호스팅할 수 있나요?",
      a: "네 — 오픈코어 에디션이 GitHub에서 제공됩니다. 클라우드 호스팅 버전에는 관리형 인프라, 글로벌 CDN, AI 기능이 추가로 포함됩니다.",
    },
    {
      q: "Zenith가 지원하는 프레임워크는 무엇인가요?",
      a: "정적 에셋이나 Node.js 서버를 출력하는 모든 프레임워크를 지원합니다: Next.js, Remix, Nuxt, SvelteKit, Astro, Vite 등.",
    },
    {
      q: "사용량은 어떻게 청구되나요?",
      a: "플랜에 포함된 대역폭과 컴퓨팅을 초과한 만큼만 지불합니다. 초과 요금은 GB당, CPU-초당으로 미터링되며 최소 약정은 없습니다.",
    },
    {
      q: "SOC 2 보고서를 요청할 수 있나요?",
      a: "네. Enterprise 고객은 SOC 2 Type II 보고서를 요청하고 상호 NDA를 체결할 수 있습니다. 보안팀(security@zenith.dev)에 문의하세요.",
    },
  ],

  testimonials: [
    {
      quote:
        "배포 파이프라인을 18분에서 45초로 줄였습니다. 이제 팀이 두려움 없이 하루에 여러 번 출시합니다.",
      author: "Sarah Chen",
      role: "CTO at Luma",
      avatar: "SC",
    },
    {
      quote:
        "Zenith의 AI 코파일럿이 스테이징에 도달하기도 전에 메모리 누수를 잡아냈습니다. 모든 PR을 지켜보는 시니어 엔지니어가 있는 것 같습니다.",
      author: "Marcus Webb",
      role: "Lead Engineer at Petal",
      avatar: "MW",
    },
    {
      quote:
        "주말 동안 기존 CI/CD 스택에서 마이그레이션했습니다. 개발자 경험이 지금까지 써본 것 중 단연 최고입니다.",
      author: "Aiko Tanaka",
      role: "Engineering Manager at Arc",
      avatar: "AT",
    },
  ],

  nav: {
    logo: "Zenith",
    links: ["기능", "요금제", "문서", "블로그"],
    cta: "무료 시작",
  },

  footer: {
    tagline: "훌륭한 소프트웨어를 가장 빠르게 출시하는 방법.",
    columns: [
      {
        heading: "제품",
        links: ["기능", "요금제", "변경 로그", "로드맵"],
      },
      {
        heading: "개발자",
        links: ["문서", "API 레퍼런스", "CLI", "연동"],
      },
      { heading: "회사", links: ["소개", "블로그", "채용", "언론"] },
      {
        heading: "법적 고지",
        links: ["개인정보처리방침", "이용약관", "보안", "쿠키 정책"],
      },
    ],
    bottom: "© 2026 Zenith Technologies, Inc. 모든 권리 보유.",
  },
}
