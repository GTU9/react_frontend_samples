export interface NavLink {
  label: string
  href: string
}

export interface Feature {
  icon: string
  title: string
  description: string
}

export interface PricingTier {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  highlighted: boolean
}

export interface Testimonial {
  quote: string
  author: string
  role: string
  avatar: string
}

export interface LogoItem {
  name: string
  abbr: string
}

export const navLinks: NavLink[] = [
  { label: '제품', href: '#product' },
  { label: '기능', href: '#features' },
  { label: '요금제', href: '#pricing' },
  { label: '소개', href: '#about' },
]

export const heroData = {
  badge: '퍼블릭 베타 출시',
  headline: '팀의 업무 방식,\n새롭게 바뀝니다.',
  subheadline:
    'Aurora는 AI 기반 협업, 실시간 인사이트, 그리고 불필요한 마찰 없이 팀을 하나로 연결합니다. 더 빠르게 출시하고, 더 명확하게 사고하고, 더 스마트하게 일하세요.',
  primaryCta: '무료로 시작하기',
  secondaryCta: '어떻게 작동하나요',
  mockupStats: [
    { label: '완료된 작업', value: '2,418' },
    { label: '절약된 시간', value: '34시간' },
    { label: '팀 속도', value: '+62%' },
  ],
}

export const logos: LogoItem[] = [
  { name: 'Vercel', abbr: 'VC' },
  { name: 'Linear', abbr: 'LN' },
  { name: 'Figma', abbr: 'FG' },
  { name: 'Notion', abbr: 'NT' },
  { name: 'Stripe', abbr: 'ST' },
  { name: 'Loom', abbr: 'LM' },
]

export const features: Feature[] = [
  {
    icon: '⚡',
    title: '즉각적인 동기화',
    description:
      '변경 사항이 50ms 이내에 팀 전체에 전파됩니다. 새로고침도 필요 없습니다 — Aurora는 언제나 모든 팀원을 동일한 상태로 유지합니다.',
  },
  {
    icon: '🧠',
    title: 'AI 코파일럿',
    description:
      '팀의 히스토리를 기반으로 한 상황 인식 제안을 제공합니다. Aurora는 여러분의 워크플로우를 학습하고, 필요한 것을 먼저 알아서 제안합니다.',
  },
  {
    icon: '🔒',
    title: '제로 트러스트 보안',
    description:
      '종단간 암호화, SOC 2 Type II 인증, 세분화된 권한 관리가 처음부터 내장되어 있습니다 — 나중에 덧붙인 기능이 아닙니다.',
  },
]

export const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    price: '$0',
    period: '영구 무료',
    description: '개인 메이커와 소규모 사이드 프로젝트에 최적화된 플랜.',
    features: [
      '프로젝트 3개까지',
      '저장 공간 5GB',
      '기본 AI 제안',
      '커뮤니티 지원',
    ],
    cta: '무료로 시작하기',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$24',
    period: '사용자 / 월',
    description: '빠르게 성장하며 자주 출시하는 팀을 위한 플랜.',
    features: [
      '프로젝트 무제한',
      '저장 공간 100GB',
      '고급 AI 코파일럿',
      '우선 지원',
      '커스텀 연동',
      '분석 대시보드',
    ],
    cta: '무료 체험 시작',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '맞춤 견적',
    period: '문의하기',
    description: '대규모 조직을 위한 전용 인프라와 컴플라이언스 지원.',
    features: [
      'Pro의 모든 기능 포함',
      '저장 공간 무제한',
      'SSO / SAML',
      'SLA 보장',
      '전담 성공 매니저',
      '맞춤 계약',
    ],
    cta: '영업팀 문의',
    highlighted: false,
  },
]

export const testimonial = {
  quote:
    '"Aurora 덕분에 매주 3시간씩 걸리던 계획 회의가 20분으로 줄었어요. AI가 다음에 무엇이 필요한지 그냥 알고 있는 것 같더라고요. 마케팅 문구처럼 들릴 수도 있겠지만, 솔직히 그만큼 좋습니다."',
  author: 'Priya Mehta',
  role: 'Head of Product, Lumen Labs',
  avatar: 'PM',
}

export const footerLinks = [
  { label: '개인정보처리방침', href: '#' },
  { label: '이용약관', href: '#' },
  { label: '보안', href: '#' },
  { label: '서비스 상태', href: '#' },
  { label: '블로그', href: '#' },
]
