import { lazy } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'

export type PageType =
  | 'landing'
  | 'dashboard'
  | 'ecommerce'
  | 'portfolio'
  | 'blog'
  | 'media'
  | 'news'
  | 'app'

export type VisualStyle =
  | 'glassmorphism'
  | 'minimal'
  | 'brutalism'
  | 'neon'
  | 'editorial'
  | 'retro'
  | 'gradient'
  | 'dark'
  | 'luxury'

/** Web-purpose category used to classify samples in the gallery. */
export type Category =
  | 'Marketing & Landing'
  | 'Dashboards & Admin'
  | 'E-commerce & Retail'
  | 'Portfolio & Personal'
  | 'Content & Media'
  | 'Web Apps & Tools'

/** Display order for category sections in the gallery. */
export const categoryOrder: Category[] = [
  'Marketing & Landing',
  'Dashboards & Admin',
  'E-commerce & Retail',
  'Portfolio & Personal',
  'Content & Media',
  'Web Apps & Tools',
]

/** Korean display label per category. */
export const categoryLabels: Record<Category, string> = {
  'Marketing & Landing': '마케팅 · 랜딩',
  'Dashboards & Admin': '대시보드 · 관리자',
  'E-commerce & Retail': '이커머스 · 리테일',
  'Portfolio & Personal': '포트폴리오 · 퍼스널',
  'Content & Media': '콘텐츠 · 미디어',
  'Web Apps & Tools': '웹앱 · 툴',
}

/** Korean blurb shown under each category heading. */
export const categoryBlurbs: Record<Category, string> = {
  'Marketing & Landing': '제품·서비스를 소개하고 전환을 유도하는 랜딩 페이지',
  'Dashboards & Admin': '데이터를 모니터링하고 운영을 관리하는 백오피스 화면',
  'E-commerce & Retail': '상품을 진열하고 구매로 이어지는 커머스 화면',
  'Portfolio & Personal': '작업물과 자신을 보여주는 포트폴리오 화면',
  'Content & Media': '글·영상·뉴스를 소비하는 콘텐츠 화면',
  'Web Apps & Tools': '실제 작업을 수행하는 인터랙티브 웹 애플리케이션',
}

/** Korean labels for the type/style pills. */
export const pageTypeLabels: Record<PageType, string> = {
  landing: '랜딩',
  dashboard: '대시보드',
  ecommerce: '이커머스',
  portfolio: '포트폴리오',
  blog: '블로그',
  media: '미디어',
  news: '뉴스',
  app: '웹앱',
}

export const visualStyleLabels: Record<VisualStyle, string> = {
  glassmorphism: '글래스모피즘',
  minimal: '미니멀',
  brutalism: '브루탈리즘',
  neon: '네온',
  editorial: '에디토리얼',
  retro: '레트로',
  gradient: '그라데이션',
  dark: '다크',
  luxury: '럭셔리',
}

export interface Sample {
  id: string
  title: string
  description: string
  category: Category
  pageType: PageType
  visualStyle: VisualStyle
  accent: string // hex color
  Component: LazyExoticComponent<ComponentType>
}

export const samples: Sample[] = [
  // ── 마케팅 · 랜딩 ──────────────────────────────────────────────
  { id: 'aurora-landing', title: 'Aurora', description: '팀의 출시 일정과 작업을 연결하는 협업 서비스', category: 'Marketing & Landing', pageType: 'landing', visualStyle: 'minimal', accent: '#2257c8', Component: lazy(() => import('./aurora-landing')) },
  { id: 'softdeck-retro', title: 'Softdeck', description: '휴대용 오디오 콘솔의 제품 소개와 사양', category: 'Marketing & Landing', pageType: 'landing', visualStyle: 'retro', accent: '#b92c2f', Component: lazy(() => import('./softdeck-retro')) },
  { id: 'zenith-saas', title: 'Zenith', description: '팀의 가용 시간과 일정을 정리하는 프로젝트 플래너', category: 'Marketing & Landing', pageType: 'landing', visualStyle: 'minimal', accent: '#185847', Component: lazy(() => import('./zenith-saas')) },

  // ── 대시보드 · 관리자 ───────────────────────────────────────────
  { id: 'pulse-dashboard', title: 'Pulse', description: '기간별 지표와 페이지별 성과를 살펴보는 분석 워크스페이스', category: 'Dashboards & Admin', pageType: 'dashboard', visualStyle: 'minimal', accent: '#147b70', Component: lazy(() => import('./pulse-dashboard')) },
  { id: 'vault-finance', title: 'Vault', description: '기업 계좌와 거래 내역을 검토하는 금융 장부', category: 'Dashboards & Admin', pageType: 'dashboard', visualStyle: 'minimal', accent: '#424945', Component: lazy(() => import('./vault-finance')) },
  { id: 'flow-crm', title: 'Flow', description: '고객사별 거래와 다음 액션을 관리하는 영업 파이프라인', category: 'Dashboards & Admin', pageType: 'dashboard', visualStyle: 'minimal', accent: '#4357b6', Component: lazy(() => import('./flow-crm')) },

  // ── 이커머스 · 리테일 ──────────────────────────────────────────
  { id: 'slab-shop', title: 'Slab', description: '소재와 규격으로 고르는 생활 도구 편집숍', category: 'E-commerce & Retail', pageType: 'ecommerce', visualStyle: 'brutalism', accent: '#c52b2e', Component: lazy(() => import('./slab-shop')) },
  { id: 'lumiere-store', title: 'Lumière', description: '실루엣과 소재에 집중한 독립 패션 카탈로그', category: 'E-commerce & Retail', pageType: 'ecommerce', visualStyle: 'luxury', accent: '#5a6348', Component: lazy(() => import('./lumiere-store')) },
  { id: 'fresh-market', title: 'Fresh', description: '제철 식재료를 담는 동네 식료품 마켓', category: 'E-commerce & Retail', pageType: 'ecommerce', visualStyle: 'minimal', accent: '#21754d', Component: lazy(() => import('./fresh-market')) },

  // ── 포트폴리오 · 퍼스널 ─────────────────────────────────────────
  { id: 'nebula-folio', title: 'Nebula', description: '물성과 기술을 탐구하는 크리에이티브 작업 아카이브', category: 'Portfolio & Personal', pageType: 'portfolio', visualStyle: 'dark', accent: '#b7ca62', Component: lazy(() => import('./nebula-folio')) },
  { id: 'atelier-studio', title: 'Atelier', description: '공간과 그래픽을 다루는 디자인 스튜디오의 작업집', category: 'Portfolio & Personal', pageType: 'portfolio', visualStyle: 'editorial', accent: '#ba292d', Component: lazy(() => import('./atelier-studio')) },
  { id: 'lens-gallery', title: 'Lens', description: '사진가의 콘택트 시트와 풍경 아카이브', category: 'Portfolio & Personal', pageType: 'portfolio', visualStyle: 'minimal', accent: '#373737', Component: lazy(() => import('./lens-gallery')) },

  // ── 콘텐츠 · 미디어 ────────────────────────────────────────────
  { id: 'quill-journal', title: 'Quill', description: '도시와 일상을 오래 읽는 독립 문화 저널', category: 'Content & Media', pageType: 'blog', visualStyle: 'editorial', accent: '#ad292b', Component: lazy(() => import('./quill-journal')) },
  { id: 'pulse-stream', title: 'Frame', description: '세 편의 이야기로 만나는 독립영화 큐레이션', category: 'Content & Media', pageType: 'media', visualStyle: 'dark', accent: '#b7c95f', Component: lazy(() => import('./pulse-stream')) },
  { id: 'daily-wire', title: '데일리 서울', description: '도시의 변화와 동네의 일상을 기록하는 지역 신문', category: 'Content & Media', pageType: 'news', visualStyle: 'editorial', accent: '#742e3c', Component: lazy(() => import('./daily-wire')) },

  // ── 블로그 (글작성 + 조회) ──────────────────────────────────────
  { id: 'inkwell-blog', title: 'Inkwell', description: '문장과 여백을 중심에 둔 문학 노트', category: 'Content & Media', pageType: 'blog', visualStyle: 'minimal', accent: '#2856a3', Component: lazy(() => import('./inkwell-blog')) },
  { id: 'prism-blog', title: 'Prism', description: '사진과 그래픽 장면을 전면에 둔 시각문화 저널', category: 'Content & Media', pageType: 'blog', visualStyle: 'editorial', accent: '#ac8b13', Component: lazy(() => import('./prism-blog')) },
  { id: 'mono-devlog', title: 'Mono', description: '배포와 장애 대응을 기록하는 엔지니어링 필드 로그', category: 'Content & Media', pageType: 'blog', visualStyle: 'dark', accent: '#6eae86', Component: lazy(() => import('./mono-devlog')) },
  { id: 'press-brut', title: 'Press', description: '시민의 의제를 다루는 독립 오피니언 신문', category: 'Content & Media', pageType: 'blog', visualStyle: 'brutalism', accent: '#a32428', Component: lazy(() => import('./press-brut')) },
  { id: 'velvet-blog', title: 'Velvet', description: '여행지의 빛과 장소를 사진으로 남기는 개인 저널', category: 'Content & Media', pageType: 'blog', visualStyle: 'editorial', accent: '#a8546e', Component: lazy(() => import('./velvet-blog')) },
  { id: 'halo-neon', title: 'Halo', description: '클럽과 레이블, 음악을 기록하는 언더그라운드 진', category: 'Content & Media', pageType: 'blog', visualStyle: 'dark', accent: '#b2c444', Component: lazy(() => import('./halo-neon')) },

  // ── 웹앱 · 툴 ──────────────────────────────────────────────────
  { id: 'converse-chat', title: 'Converse', description: '팀 채널과 대화를 검색하는 업무용 메신저', category: 'Web Apps & Tools', pageType: 'app', visualStyle: 'minimal', accent: '#35697d', Component: lazy(() => import('./converse-chat')) },
  { id: 'tempo-music', title: 'Tempo', description: '독립 음반 라이브러리와 미리듣기 시뮬레이션', category: 'Web Apps & Tools', pageType: 'app', visualStyle: 'dark', accent: '#b7614d', Component: lazy(() => import('./tempo-music')) },
  { id: 'board-tasks', title: 'Board', description: '담당자와 상태별로 정리하는 프로젝트 작업 보드', category: 'Web Apps & Tools', pageType: 'app', visualStyle: 'minimal', accent: '#a88425', Component: lazy(() => import('./board-tasks')) },
]

export const getSample = (id: string | undefined) => samples.find((s) => s.id === id)

/** Samples grouped by category, in display order, skipping empty groups. */
export const samplesByCategory = (): { category: Category; items: Sample[] }[] =>
  categoryOrder
    .map((category) => ({ category, items: samples.filter((s) => s.category === category) }))
    .filter((g) => g.items.length > 0)
