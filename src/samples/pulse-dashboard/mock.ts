// Mock data for Pulse Dashboard

export interface KpiCard {
  id: string
  label: string
  value: string
  delta: string
  deltaPositive: boolean
  sparkline: number[]
}

export interface TimeSeriesPoint {
  label: string
  revenue: number
  sessions: number
}

export interface BarDataPoint {
  label: string
  value: number
}

export interface TableRow {
  id: string
  name: string
  channel: string
  revenue: number
  sessions: number
  conversion: number
  status: 'active' | 'paused' | 'ended'
}

export interface NavItem {
  id: string
  label: string
  icon: string
  active?: boolean
}

export interface ActivityItem {
  id: string
  type: 'signup' | 'purchase' | 'alert' | 'milestone'
  message: string
  time: string
  detail?: string
}

export const kpiCards: KpiCard[] = [
  {
    id: 'revenue',
    label: '총 매출',
    value: '$84,230',
    delta: '+12.4%',
    deltaPositive: true,
    sparkline: [40, 52, 48, 61, 55, 68, 72, 65, 78, 84],
  },
  {
    id: 'sessions',
    label: '활성 세션',
    value: '24,810',
    delta: '+8.1%',
    deltaPositive: true,
    sparkline: [60, 55, 63, 58, 70, 66, 74, 69, 80, 82],
  },
  {
    id: 'conversion',
    label: '전환율',
    value: '3.47%',
    delta: '-0.3%',
    deltaPositive: false,
    sparkline: [38, 42, 40, 45, 43, 41, 44, 38, 36, 37],
  },
  {
    id: 'churn',
    label: '이탈율',
    value: '1.82%',
    delta: '-0.5%',
    deltaPositive: true,
    sparkline: [30, 28, 32, 27, 25, 26, 24, 22, 20, 19],
  },
]

export const timeSeries: TimeSeriesPoint[] = [
  { label: 'Jan', revenue: 42000, sessions: 14200 },
  { label: 'Feb', revenue: 47500, sessions: 15800 },
  { label: 'Mar', revenue: 45200, sessions: 15100 },
  { label: 'Apr', revenue: 53000, sessions: 17400 },
  { label: 'May', revenue: 58700, sessions: 18900 },
  { label: 'Jun', revenue: 55400, sessions: 18200 },
  { label: 'Jul', revenue: 62100, sessions: 20100 },
  { label: 'Aug', revenue: 67300, sessions: 21600 },
  { label: 'Sep', revenue: 64800, sessions: 20900 },
  { label: 'Oct', revenue: 71200, sessions: 22800 },
  { label: 'Nov', revenue: 79400, sessions: 24300 },
  { label: 'Dec', revenue: 84230, sessions: 24810 },
]

export const barData: BarDataPoint[] = [
  { label: '자연 검색', value: 34 },
  { label: '유료 광고', value: 28 },
  { label: '이메일', value: 18 },
  { label: '추천', value: 12 },
  { label: '직접 방문', value: 8 },
]

export const tableRows: TableRow[] = [
  { id: '1', name: 'Q4 성장 캠페인', channel: '유료 검색', revenue: 22400, sessions: 6120, conversion: 4.2, status: 'active' },
  { id: '2', name: '뉴스레터 재유입', channel: '이메일', revenue: 14300, sessions: 4870, conversion: 3.8, status: 'active' },
  { id: '3', name: '자연 검색 SEO 강화', channel: '자연 검색', revenue: 18700, sessions: 8340, conversion: 2.9, status: 'active' },
  { id: '4', name: '파트너 추천', channel: '추천', revenue: 9800, sessions: 2960, conversion: 4.5, status: 'paused' },
  { id: '5', name: '소셜 인지도', channel: '유료 소셜', revenue: 7200, sessions: 3810, conversion: 1.8, status: 'active' },
  { id: '6', name: '여름 프로모션', channel: '이메일', revenue: 11500, sessions: 3200, conversion: 3.4, status: 'ended' },
]

export const navItems: NavItem[] = [
  { id: 'dashboard', label: '대시보드', icon: 'grid', active: true },
  { id: 'analytics', label: '분석', icon: 'bar-chart' },
  { id: 'campaigns', label: '캠페인', icon: 'target' },
  { id: 'customers', label: '고객', icon: 'users' },
  { id: 'reports', label: '보고서', icon: 'file-text' },
  { id: 'settings', label: '설정', icon: 'settings' },
]

export const activityFeed: ActivityItem[] = [
  { id: '1', type: 'milestone', message: '매출 마일스톤 달성', time: '2분 전', detail: '$84k 월간 최고 기록' },
  { id: '2', type: 'signup', message: '신규 엔터프라이즈 가입', time: '14분 전', detail: 'Acme Corp — Pro 플랜' },
  { id: '3', type: 'purchase', message: '대형 주문 처리 완료', time: '31분 전', detail: '$4,200 · 주문 #8821' },
  { id: '4', type: 'alert', message: '전환율 하락', time: '1시간 전', detail: '유료 소셜 전일 대비 -0.6%' },
  { id: '5', type: 'signup', message: '신규 가입 3건', time: '2시간 전', detail: '자연 검색 유입' },
  { id: '6', type: 'purchase', message: '구독 갱신 완료', time: '3시간 전', detail: 'NovaTech — 연간 플랜' },
]
