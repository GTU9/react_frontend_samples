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
  { id: 'aurora-landing', title: 'Aurora', description: '프로스트 글래스 패널의 SaaS 랜딩', category: 'Marketing & Landing', pageType: 'landing', visualStyle: 'glassmorphism', accent: '#7c5cff', Component: lazy(() => import('./aurora-landing')) },
  { id: 'softdeck-retro', title: 'Softdeck', description: '레트로 + 뉴모피즘 제품 페이지', category: 'Marketing & Landing', pageType: 'landing', visualStyle: 'retro', accent: '#e8a13a', Component: lazy(() => import('./softdeck-retro')) },
  { id: 'zenith-saas', title: 'Zenith', description: '모던 그라데이션 SaaS 랜딩 페이지', category: 'Marketing & Landing', pageType: 'landing', visualStyle: 'gradient', accent: '#6366f1', Component: lazy(() => import('./zenith-saas')) },

  // ── 대시보드 · 관리자 ───────────────────────────────────────────
  { id: 'pulse-dashboard', title: 'Pulse', description: '미니멀하고 중립적인 분석 대시보드', category: 'Dashboards & Admin', pageType: 'dashboard', visualStyle: 'minimal', accent: '#10b981', Component: lazy(() => import('./pulse-dashboard')) },
  { id: 'vault-finance', title: 'Vault', description: '다크 테마 금융 · 크립토 대시보드', category: 'Dashboards & Admin', pageType: 'dashboard', visualStyle: 'dark', accent: '#22d3ee', Component: lazy(() => import('./vault-finance')) },
  { id: 'flow-crm', title: 'Flow', description: '컬러풀한 CRM · 칸반 관리 보드', category: 'Dashboards & Admin', pageType: 'dashboard', visualStyle: 'minimal', accent: '#8b5cf6', Component: lazy(() => import('./flow-crm')) },

  // ── 이커머스 · 리테일 ──────────────────────────────────────────
  { id: 'slab-shop', title: 'Slab', description: '브루탈리즘 이커머스 상품 페이지', category: 'E-commerce & Retail', pageType: 'ecommerce', visualStyle: 'brutalism', accent: '#ff5c00', Component: lazy(() => import('./slab-shop')) },
  { id: 'lumiere-store', title: 'Lumière', description: '럭셔리 미니멀 패션 스토어프런트', category: 'E-commerce & Retail', pageType: 'ecommerce', visualStyle: 'luxury', accent: '#c2a14d', Component: lazy(() => import('./lumiere-store')) },
  { id: 'fresh-market', title: 'Fresh', description: '친근한 식료품 마켓플레이스 그리드', category: 'E-commerce & Retail', pageType: 'ecommerce', visualStyle: 'minimal', accent: '#16a34a', Component: lazy(() => import('./fresh-market')) },

  // ── 포트폴리오 · 퍼스널 ─────────────────────────────────────────
  { id: 'nebula-folio', title: 'Nebula', description: '네온 사이버펑크 포트폴리오', category: 'Portfolio & Personal', pageType: 'portfolio', visualStyle: 'neon', accent: '#00e5ff', Component: lazy(() => import('./nebula-folio')) },
  { id: 'atelier-studio', title: 'Atelier', description: '스위스 에디토리얼 디자인 스튜디오', category: 'Portfolio & Personal', pageType: 'portfolio', visualStyle: 'editorial', accent: '#111827', Component: lazy(() => import('./atelier-studio')) },
  { id: 'lens-gallery', title: 'Lens', description: '미니멀 사진 메이슨리 포트폴리오', category: 'Portfolio & Personal', pageType: 'portfolio', visualStyle: 'minimal', accent: '#0ea5e9', Component: lazy(() => import('./lens-gallery')) },

  // ── 콘텐츠 · 미디어 ────────────────────────────────────────────
  { id: 'quill-journal', title: 'Quill', description: '에디토리얼 매거진 · 블로그', category: 'Content & Media', pageType: 'blog', visualStyle: 'editorial', accent: '#b91c1c', Component: lazy(() => import('./quill-journal')) },
  { id: 'pulse-stream', title: 'Stream', description: '시네마틱 영상 스트리밍 허브', category: 'Content & Media', pageType: 'media', visualStyle: 'dark', accent: '#e11d48', Component: lazy(() => import('./pulse-stream')) },
  { id: 'daily-wire', title: 'Daily', description: '정보 밀도 높은 뉴스 포털 1면', category: 'Content & Media', pageType: 'news', visualStyle: 'editorial', accent: '#1d4ed8', Component: lazy(() => import('./daily-wire')) },

  // ── 웹앱 · 툴 ──────────────────────────────────────────────────
  { id: 'converse-chat', title: 'Converse', description: '깔끔한 메시징 · 채팅 앱 UI', category: 'Web Apps & Tools', pageType: 'app', visualStyle: 'minimal', accent: '#3b82f6', Component: lazy(() => import('./converse-chat')) },
  { id: 'tempo-music', title: 'Tempo', description: '그라데이션 뮤직 플레이어 웹앱', category: 'Web Apps & Tools', pageType: 'app', visualStyle: 'gradient', accent: '#a855f7', Component: lazy(() => import('./tempo-music')) },
  { id: 'board-tasks', title: 'Board', description: '칸반 작업 관리 웹앱', category: 'Web Apps & Tools', pageType: 'app', visualStyle: 'minimal', accent: '#f59e0b', Component: lazy(() => import('./board-tasks')) },
]

export const getSample = (id: string | undefined) => samples.find((s) => s.id === id)

/** Samples grouped by category, in display order, skipping empty groups. */
export const samplesByCategory = (): { category: Category; items: Sample[] }[] =>
  categoryOrder
    .map((category) => ({ category, items: samples.filter((s) => s.category === category) }))
    .filter((g) => g.items.length > 0)
