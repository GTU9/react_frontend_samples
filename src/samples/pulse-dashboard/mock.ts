export type PeriodKey = '7d' | '30d' | '90d'

export interface MetricCard {
  id: string
  label: string
  value: string
  delta: string
  positive: boolean
}

export interface SeriesPoint {
  label: string
  sessions: number
  conversions: number
}

export interface PageRow {
  id: string
  path: string
  owner: string
  sessions: number
  conversions: number
  conversionRate: number
  avgTime: string
  status: 'healthy' | 'watch' | 'drop'
}

export interface EventRow {
  id: string
  event: string
  source: string
  count: number
  change: number
}

export interface FunnelStep {
  label: string
  count: number
  rate: number
}

export const periodLabels: Record<PeriodKey, string> = {
  '7d': '7일',
  '30d': '30일',
  '90d': '90일',
}

export const metricsByPeriod: Record<PeriodKey, MetricCard[]> = {
  '7d': [
    { id: 'sessions', label: '세션', value: '31,284', delta: '+6.8%', positive: true },
    { id: 'conversion', label: '전환', value: '1,246', delta: '+3.1%', positive: true },
    { id: 'rate', label: '전환율', value: '3.98%', delta: '-0.2%p', positive: false },
    { id: 'time', label: '평균 체류', value: '1분 42초', delta: '+12초', positive: true },
  ],
  '30d': [
    { id: 'sessions', label: '세션', value: '128,421', delta: '+12.4%', positive: true },
    { id: 'conversion', label: '전환', value: '3,842', delta: '+18.7%', positive: true },
    { id: 'rate', label: '전환율', value: '3.0%', delta: '+0.5%p', positive: true },
    { id: 'time', label: '평균 체류', value: '1분 26초', delta: '-8초', positive: false },
  ],
  '90d': [
    { id: 'sessions', label: '세션', value: '382,916', delta: '+9.2%', positive: true },
    { id: 'conversion', label: '전환', value: '10,884', delta: '+11.5%', positive: true },
    { id: 'rate', label: '전환율', value: '2.84%', delta: '+0.1%p', positive: true },
    { id: 'time', label: '평균 체류', value: '1분 31초', delta: '+4초', positive: true },
  ],
}

export const seriesByPeriod: Record<PeriodKey, SeriesPoint[]> = {
  '7d': [
    { label: '9/21', sessions: 3900, conversions: 132 },
    { label: '9/22', sessions: 4240, conversions: 151 },
    { label: '9/23', sessions: 4010, conversions: 144 },
    { label: '9/24', sessions: 4480, conversions: 170 },
    { label: '9/25', sessions: 4720, conversions: 181 },
    { label: '9/26', sessions: 5010, conversions: 205 },
    { label: '9/27', sessions: 4924, conversions: 263 },
  ],
  '30d': [
    { label: '8/29', sessions: 11200, conversions: 284 },
    { label: '9/02', sessions: 10420, conversions: 302 },
    { label: '9/06', sessions: 12180, conversions: 341 },
    { label: '9/10', sessions: 11860, conversions: 319 },
    { label: '9/14', sessions: 13840, conversions: 406 },
    { label: '9/18', sessions: 15140, conversions: 449 },
    { label: '9/22', sessions: 14020, conversions: 423 },
    { label: '9/26', sessions: 16180, conversions: 512 },
  ],
  '90d': [
    { label: '7월 1주', sessions: 35600, conversions: 901 },
    { label: '7월 3주', sessions: 39800, conversions: 1032 },
    { label: '8월 1주', sessions: 42100, conversions: 1114 },
    { label: '8월 3주', sessions: 39100, conversions: 1078 },
    { label: '9월 1주', sessions: 45500, conversions: 1292 },
    { label: '9월 3주', sessions: 48900, conversions: 1451 },
  ],
}

export const pages: PageRow[] = [
  { id: 'home', path: '/', owner: '성장팀', sessions: 32421, conversions: 1240, conversionRate: 3.8, avgTime: '1분 24초', status: 'healthy' },
  { id: 'product', path: '/product', owner: '제품팀', sessions: 18553, conversions: 642, conversionRate: 3.5, avgTime: '1분 12초', status: 'healthy' },
  { id: 'pricing', path: '/pricing', owner: '매출팀', sessions: 15220, conversions: 521, conversionRate: 3.4, avgTime: '1분 08초', status: 'watch' },
  { id: 'blog', path: '/blog', owner: '콘텐츠팀', sessions: 12092, conversions: 318, conversionRate: 2.6, avgTime: '58초', status: 'watch' },
  { id: 'help', path: '/help', owner: '고객지원', sessions: 8421, conversions: 77, conversionRate: 0.9, avgTime: '2분 35초', status: 'drop' },
  { id: 'campaign', path: '/campaign/fall', owner: '마케팅', sessions: 6840, conversions: 286, conversionRate: 4.2, avgTime: '1분 18초', status: 'healthy' },
]

export const events: EventRow[] = [
  { id: 'e1', event: 'checkout_started', source: 'pricing', count: 842, change: 16.2 },
  { id: 'e2', event: 'demo_requested', source: 'product', count: 418, change: 9.7 },
  { id: 'e3', event: 'plan_compared', source: 'pricing', count: 1250, change: -4.1 },
  { id: 'e4', event: 'help_article_opened', source: 'help', count: 2912, change: 21.4 },
  { id: 'e5', event: 'invite_sent', source: 'workspace', count: 708, change: 5.9 },
]

export const funnel: FunnelStep[] = [
  { label: '방문', count: 128421, rate: 100 },
  { label: '제품 확인', count: 46320, rate: 36 },
  { label: '가격 비교', count: 15220, rate: 12 },
  { label: '체크아웃', count: 3842, rate: 3 },
]

export const navItems = ['대시보드', '분석 리포트', '사용자', '이벤트', '콘텐츠', '설정']
