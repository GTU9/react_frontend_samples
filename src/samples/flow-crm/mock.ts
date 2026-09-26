export type DealStage = 'lead' | 'meeting' | 'proposal' | 'negotiation' | 'contract'

export interface Deal {
  id: string
  company: string
  contact: string
  amount: number
  owner: string
  industry: string
  stage: DealStage
  closeDate: string
  nextAction: string
  priority: '높음' | '보통' | '낮음'
}

export interface Activity {
  id: string
  company: string
  due: string
  task: string
  owner: string
}

export const stageLabels: Record<DealStage, string> = {
  lead: '리드',
  meeting: '미팅',
  proposal: '제안',
  negotiation: '협상',
  contract: '계약',
}

export const stageOrder: DealStage[] = ['lead', 'meeting', 'proposal', 'negotiation', 'contract']

export const owners = ['김지훈', '이수진', '박민준', '정다은']

export const navItems = ['파이프라인', '고객사', '활동', '캘린더', '리포트', '설정']

export const initialDeals: Deal[] = [
  { id: 'd1', company: '한빛테크', contact: '오세영', amount: 50000000, owner: '김지훈', industry: '제조', stage: 'lead', closeDate: '10월 12일', nextAction: '요구사항 확인 통화', priority: '보통' },
  { id: 'd2', company: '그린푸드', contact: '박인준', amount: 40000000, owner: '이수진', industry: 'F&B', stage: 'lead', closeDate: '10월 18일', nextAction: '도입 범위 메일 발송', priority: '낮음' },
  { id: 'd3', company: '코라시스템', contact: '김지훈', amount: 120000000, owner: '김지훈', industry: 'IT서비스', stage: 'meeting', closeDate: '10월 06일', nextAction: '4차 미팅 자료 준비', priority: '높음' },
  { id: 'd4', company: '스마트교육', contact: '이현아', amount: 70000000, owner: '박민준', industry: '교육', stage: 'meeting', closeDate: '10월 22일', nextAction: '견적서 초안 공유', priority: '보통' },
  { id: 'd5', company: '넥스트바이오', contact: '김지훈', amount: 200000000, owner: '김지훈', industry: '바이오', stage: 'proposal', closeDate: '10월 15일', nextAction: '제안서 피드백 확인', priority: '높음' },
  { id: 'd6', company: '에이치케어', contact: '이수진', amount: 180000000, owner: '이수진', industry: '헬스케어', stage: 'proposal', closeDate: '10월 19일', nextAction: '보안 질의 응답', priority: '높음' },
  { id: 'd7', company: '프라임커머스', contact: '김지훈', amount: 180000000, owner: '정다은', industry: '커머스', stage: 'negotiation', closeDate: '10월 11일', nextAction: '법무 검토 회신', priority: '높음' },
  { id: 'd8', company: '아이엔지', contact: '이수진', amount: 150000000, owner: '박민준', industry: '물류', stage: 'negotiation', closeDate: '10월 21일', nextAction: '가격 조건 조율', priority: '보통' },
  { id: 'd9', company: '상화식품', contact: '김지훈', amount: 150000000, owner: '정다은', industry: '식품', stage: 'contract', closeDate: '10월 05일', nextAction: '전자계약 서명', priority: '높음' },
  { id: 'd10', company: '위드패션', contact: '정다은', amount: 80000000, owner: '정다은', industry: '패션', stage: 'contract', closeDate: '10월 09일', nextAction: '첫 청구서 발행', priority: '낮음' },
]

export const activities: Activity[] = [
  { id: 'a1', company: '넥스트바이오', due: '오늘', task: '제안서 피드백 확인', owner: '김지훈' },
  { id: 'a2', company: '프라임커머스', due: '오늘', task: '법무 검토 회신', owner: '정다은' },
  { id: 'a3', company: '코라시스템', due: '내일', task: '4차 미팅 일정 조율', owner: '김지훈' },
  { id: 'a4', company: '에이치케어', due: '내일', task: '보안 질의 응답', owner: '이수진' },
  { id: 'a5', company: '스마트교육', due: '10월 1일', task: '견적서 수정본 발송', owner: '박민준' },
]
