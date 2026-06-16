// ── Flow CRM — mock data ──────────────────────────────────────────────────

export type DealStage = 'leads' | 'contacted' | 'proposal' | 'won'

export interface Deal {
  id: string
  company: string
  amount: number
  owner: string       // initials
  ownerColor: string  // bg color for avatar
  tag: string
  tagColor: string    // 'violet' | 'blue' | 'green' | 'orange'
  dueDate: string
  stage: DealStage
}

export interface Contact {
  id: string
  name: string
  company: string
  role: string
  email: string
  status: 'active' | 'lead' | 'churned'
  lastContact: string
}

export interface StatCard {
  id: string
  label: string
  value: string
  sub: string
  positive: boolean
}

// ── Nav ──────────────────────────────────────────────────────────────────

export const navItems = [
  { id: 'pipeline', label: '파이프라인', icon: 'kanban' },
  { id: 'contacts', label: '연락처', icon: 'users' },
  { id: 'deals', label: '딜', icon: 'briefcase' },
  { id: 'reports', label: '보고서', icon: 'bar-chart' },
  { id: 'emails', label: '이메일', icon: 'mail' },
  { id: 'settings', label: '설정', icon: 'settings' },
]

// ── Stats ─────────────────────────────────────────────────────────────────

export const statCards: StatCard[] = [
  { id: 's1', label: '파이프라인 가치', value: '$284,500', sub: '전월 대비 +12%', positive: true },
  { id: 's2', label: '성약률', value: '38%', sub: '전월 대비 +4pts', positive: true },
  { id: 's3', label: '진행 중 딜', value: '24', sub: '이번 주 마감 6건', positive: true },
  { id: 's4', label: '평균 딜 규모', value: '$11,854', sub: '전월 대비 -2%', positive: false },
]

// ── Deals ─────────────────────────────────────────────────────────────────

export const deals: Deal[] = [
  // Leads
  { id: 'd1', company: 'Acme Corp', amount: 18000, owner: 'JM', ownerColor: '#ede9fe', tag: '엔터프라이즈', tagColor: 'violet', dueDate: 'Jun 28', stage: 'leads' },
  { id: 'd2', company: 'Brightwave', amount: 7500, owner: 'SK', ownerColor: '#dbeafe', tag: 'SMB', tagColor: 'blue', dueDate: 'Jul 5', stage: 'leads' },
  { id: 'd3', company: 'Neon Labs', amount: 24000, owner: 'AM', ownerColor: '#d1fae5', tag: '스타트업', tagColor: 'green', dueDate: 'Jul 12', stage: 'leads' },

  // Contacted
  { id: 'd4', company: 'Redstone AI', amount: 42000, owner: 'JM', ownerColor: '#ede9fe', tag: '엔터프라이즈', tagColor: 'violet', dueDate: 'Jun 22', stage: 'contacted' },
  { id: 'd5', company: 'Pinepoint', amount: 9200, owner: 'TK', ownerColor: '#fef3c7', tag: '중견기업', tagColor: 'orange', dueDate: 'Jun 30', stage: 'contacted' },
  { id: 'd6', company: 'Cloudnine', amount: 15800, owner: 'SK', ownerColor: '#dbeafe', tag: 'SMB', tagColor: 'blue', dueDate: 'Jul 8', stage: 'contacted' },

  // Proposal
  { id: 'd7', company: 'Vantage Group', amount: 56000, owner: 'AM', ownerColor: '#d1fae5', tag: '엔터프라이즈', tagColor: 'violet', dueDate: 'Jun 19', stage: 'proposal' },
  { id: 'd8', company: 'Solarix', amount: 31000, owner: 'JM', ownerColor: '#ede9fe', tag: '중견기업', tagColor: 'orange', dueDate: 'Jun 24', stage: 'proposal' },
  { id: 'd9', company: 'Tesseract', amount: 12500, owner: 'TK', ownerColor: '#fef3c7', tag: '스타트업', tagColor: 'green', dueDate: 'Jul 1', stage: 'proposal' },

  // Won
  { id: 'd10', company: 'Axiom Health', amount: 88000, owner: 'SK', ownerColor: '#dbeafe', tag: '엔터프라이즈', tagColor: 'violet', dueDate: 'Jun 15', stage: 'won' },
  { id: 'd11', company: 'Driftwood Co.', amount: 14400, owner: 'AM', ownerColor: '#d1fae5', tag: 'SMB', tagColor: 'blue', dueDate: 'Jun 10', stage: 'won' },
]

// ── Contacts ──────────────────────────────────────────────────────────────

export const contacts: Contact[] = [
  { id: 'c1', name: 'Diana Reeves', company: 'Acme Corp', role: '영업 부사장', email: 'diana@acme.com', status: 'lead', lastContact: '2일 전' },
  { id: 'c2', name: 'Marcus Liu', company: 'Redstone AI', role: 'CTO', email: 'marcus@redstone.ai', status: 'active', lastContact: '오늘' },
  { id: 'c3', name: 'Sofia Mendez', company: 'Vantage Group', role: 'CEO', email: 'sofia@vantage.io', status: 'active', lastContact: '어제' },
  { id: 'c4', name: 'Oliver Kim', company: 'Axiom Health', role: 'IT 총괄', email: 'oliver@axiomhealth.com', status: 'active', lastContact: '5일 전' },
  { id: 'c5', name: 'Priya Patel', company: 'Solarix', role: '구매 담당', email: 'priya@solarix.com', status: 'lead', lastContact: '1주일 전' },
  { id: 'c6', name: 'Ethan Brooks', company: 'Neon Labs', role: '공동 창업자', email: 'ethan@neonlabs.dev', status: 'lead', lastContact: '3일 전' },
  { id: 'c7', name: 'Claire Novak', company: 'Driftwood Co.', role: '이사', email: 'claire@driftwood.co', status: 'churned', lastContact: '3주 전' },
]

// ── Kanban column config ──────────────────────────────────────────────────

export interface KanbanColumn {
  id: DealStage
  label: string
  color: string        // accent color for column header dot
  headerBg: string     // light tint
}

export const kanbanColumns: KanbanColumn[] = [
  { id: 'leads',     label: '리드',     color: '#8b5cf6', headerBg: '#f5f3ff' },
  { id: 'contacted', label: '접촉 완료', color: '#3b82f6', headerBg: '#eff6ff' },
  { id: 'proposal',  label: '제안 중',  color: '#f59e0b', headerBg: '#fffbeb' },
  { id: 'won',       label: '성약',     color: '#10b981', headerBg: '#f0fdf4' },
]
