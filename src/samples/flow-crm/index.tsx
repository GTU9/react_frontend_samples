import { useState, useCallback, useRef, useEffect, forwardRef } from 'react'
import { motion, useReducedMotion, useInView, AnimatePresence, LayoutGroup, animate } from 'framer-motion'
import './flow-crm.css'
import {
  navItems,
  statCards,
  deals,
  contacts,
  kanbanColumns,
  type Deal,
  type Contact,
} from './mock'

// ── Icon components (inline SVG, no library) ──────────────────────────────

function IconKanban({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="1" width="4" height="14" rx="1" />
      <rect x="7" y="1" width="4" height="10" rx="1" />
      <rect x="13" y="1" width="4" height="7" rx="1" />
    </svg>
  )
}

function IconUsers({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="6" cy="5" r="2.5" />
      <path d="M1 13c0-2.76 2.24-5 5-5s5 2.24 5 5" strokeLinecap="round" />
      <path d="M11 7a2.5 2.5 0 1 0 0-5" />
      <path d="M14 13c0-1.9-1.1-3.6-2.7-4.4" strokeLinecap="round" />
    </svg>
  )
}

function IconBriefcase({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="5" width="14" height="9" rx="1.5" />
      <path d="M5 5V3.5A1.5 1.5 0 0 1 6.5 2h3A1.5 1.5 0 0 1 11 3.5V5" />
    </svg>
  )
}

function IconBarChart({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="7" width="3" height="8" rx="0.5" />
      <rect x="6" y="4" width="3" height="11" rx="0.5" />
      <rect x="11" y="1" width="3" height="14" rx="0.5" />
    </svg>
  )
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="3" width="14" height="10" rx="1.5" />
      <path d="M1 4l7 5 7-5" strokeLinecap="round" />
    </svg>
  )
}

function IconSettings({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="2.5" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.1 3.1l1.4 1.4M11.5 11.5l1.4 1.4M3.1 12.9l1.4-1.4M11.5 4.5l1.4-1.4" strokeLinecap="round" />
    </svg>
  )
}

function IconSearch({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="6.5" cy="6.5" r="4.5" />
      <path d="M10 10l3.5 3.5" strokeLinecap="round" />
    </svg>
  )
}

function IconMenu({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 5h14M3 10h14M3 15h14" strokeLinecap="round" />
    </svg>
  )
}

function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
    </svg>
  )
}

function IconPlus({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 2v10M2 7h10" strokeLinecap="round" />
    </svg>
  )
}

function IconClock({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 5v3.5l2 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconFlowLogo() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7h4M8 7h4M7 2v4M7 8v4" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

const navIconMap: Record<string, (p: { className?: string }) => JSX.Element> = {
  kanban: IconKanban,
  users: IconUsers,
  briefcase: IconBriefcase,
  'bar-chart': IconBarChart,
  mail: IconMail,
  settings: IconSettings,
}

// ── Deal Card with layout FLIP + hover lift ────────────────────────────────

const DealCard = forwardRef<HTMLDivElement, {
  deal: Deal
  selected: boolean
  onSelect: (id: string) => void
}>(function DealCard({ deal, selected, onSelect }, ref) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      layout={!reducedMotion}
      layoutId={deal.id}
      className={`fc-deal-card${selected ? ' selected' : ''}`}
      onClick={() => onSelect(deal.id)}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={reducedMotion ? {} : {
        y: -3,
        boxShadow: '0 8px 24px rgba(139, 92, 246, 0.14), 0 2px 8px rgba(0, 0, 0, 0.08)',
        transition: { type: 'spring', stiffness: 400, damping: 22 },
      }}
      whileTap={reducedMotion ? {} : { scale: 0.98 }}
      transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 28 }}
    >
      <div className="fc-deal-top">
        <span className="fc-deal-company">{deal.company}</span>
        <span className={`fc-deal-tag ${deal.tagColor}`}>{deal.tag}</span>
      </div>
      <div className="fc-deal-amount">${deal.amount.toLocaleString()}</div>
      <div className="fc-deal-footer">
        <div
          className="fc-deal-owner"
          style={{ background: deal.ownerColor }}
          title={deal.owner}
        >
          {deal.owner}
        </div>
        <span className="fc-deal-due">
          <IconClock />
          {deal.dueDate}
        </span>
      </div>
    </motion.div>
  )
})

// ── Status pill ───────────────────────────────────────────────────────────

function StatusPill({ status }: { status: Contact['status'] }) {
  const labels: Record<Contact['status'], string> = { active: '활성', lead: '리드', churned: '이탈' }
  return (
    <span className={`fc-status-pill ${status}`}>
      <span className="fc-status-dot" />
      {labels[status]}
    </span>
  )
}

// ── Contacts table ────────────────────────────────────────────────────────

function ContactsTable() {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className="fc-contacts-section"
      initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: reducedMotion ? 1 : 0 }}
      transition={{ duration: 0.36, delay: reducedMotion ? 0 : 0.1, ease: 'easeOut' }}
    >
      <div className="fc-contacts-header">
        <span className="fc-contacts-title">연락처</span>
        <span className="fc-contacts-badge">총 {contacts.length}명</span>
      </div>
      <div className="fc-table-wrapper">
        <table className="fc-table">
          <thead>
            <tr>
              <th>이름</th>
              <th>회사</th>
              <th>직책</th>
              <th>이메일</th>
              <th>상태</th>
              <th>최근 연락</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((ct, i) => {
              const initials = ct.name.split(' ').map(n => n[0]).join('').slice(0, 2)
              return (
                <motion.tr
                  key={ct.id}
                  initial={{ opacity: 0, x: reducedMotion ? 0 : -6 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: reducedMotion ? 1 : 0 }}
                  transition={{ duration: 0.24, delay: reducedMotion ? 0 : 0.15 + i * 0.05 }}
                  whileHover={reducedMotion ? {} : { backgroundColor: 'var(--fc-bg)' }}
                >
                  <td>
                    <div className="fc-ct-name-cell">
                      <div className="fc-ct-avatar">{initials}</div>
                      <span className="fc-ct-name">{ct.name}</span>
                    </div>
                  </td>
                  <td>{ct.company}</td>
                  <td className="fc-ct-role">{ct.role}</td>
                  <td className="fc-ct-email">{ct.email}</td>
                  <td><StatusPill status={ct.status} /></td>
                  <td className="fc-ct-role">{ct.lastContact}</td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

// ── Count-up stat value ────────────────────────────────────────────────────

function AnimatedStatValue({ value }: { value: string }) {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const started = useRef(false)

  // Parse once — derive stable primitives before hooks
  const parsed = value.match(/^([$]?)([0-9,]+\.?[0-9]*)([%]?)$/)
  const prefix   = parsed ? parsed[1] : ''
  const suffix   = parsed ? parsed[3] : ''
  const numStr   = parsed ? parsed[2].replace(/,/g, '') : ''
  const num      = parsed ? parseFloat(numStr) : 0
  const isFloat  = numStr.includes('.')
  const decimals = isFloat ? (numStr.split('.')[1]?.length ?? 0) : 0

  const [display, setDisplay] = useState(reducedMotion ? num : 0)

  useEffect(() => {
    if (!isInView || started.current || reducedMotion || !parsed) return
    started.current = true
    const ctrl = animate(0, num, {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      onUpdate(v) { setDisplay(v) },
    })
    return () => ctrl.stop()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView])

  if (!parsed) return <div className="fc-stat-value" ref={ref}>{value}</div>

  const formatted = isFloat ? display.toFixed(decimals) : Math.round(display).toLocaleString()

  return (
    <div className="fc-stat-value" ref={ref}>
      {prefix}{formatted}{suffix}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────

export default function FlowCrm() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('pipeline')
  const [selectedDeal, setSelectedDeal] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'kanban' | 'contacts'>('kanban')
  const reducedMotion = useReducedMotion()

  const toggleSidebar = useCallback(() => setSidebarOpen(p => !p), [])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  const handleDealSelect = useCallback((id: string) => {
    setSelectedDeal(prev => (prev === id ? null : id))
  }, [])

  // Group deals by stage
  const dealsByStage = kanbanColumns.reduce<Record<string, Deal[]>>((acc, col) => {
    acc[col.id] = deals.filter(d => d.stage === col.id)
    return acc
  }, {})

  const colTotal = (colId: string) =>
    dealsByStage[colId].reduce((s, d) => s + d.amount, 0)

  const teamAvatars = [
    { initials: 'JM', bg: '#ede9fe', color: '#7c3aed' },
    { initials: 'SK', bg: '#dbeafe', color: '#2563eb' },
    { initials: 'AM', bg: '#d1fae5', color: '#059669' },
    { initials: 'TK', bg: '#fef3c7', color: '#d97706' },
  ]

  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-30px' })

  const kanbanRef = useRef<HTMLDivElement>(null)
  const kanbanInView = useInView(kanbanRef, { once: true, margin: '-40px' })

  return (
    <div className="sample-flow-crm">
      {/* Mobile overlay */}
      <div
        className={`fc-overlay${sidebarOpen ? ' open' : ''}`}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <aside className={`fc-sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="fc-sidebar-logo">
          <div className="fc-logo-mark">
            <IconFlowLogo />
          </div>
          FlowCRM
        </div>

        <nav className="fc-sidebar-nav">
          {navItems.map(item => {
            const Icon = navIconMap[item.icon]
            return (
              <button
                key={item.id}
                className={`fc-nav-item${activeNav === item.id ? ' active' : ''}`}
                onClick={() => { setActiveNav(item.id); closeSidebar() }}
              >
                {Icon && <Icon className="fc-nav-icon" />}
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="fc-sidebar-footer">
          <div className="fc-user-row">
            <div className="fc-user-avatar">JM</div>
            <div className="fc-user-info">
              <div className="fc-user-name">James Miller</div>
              <div className="fc-user-role">영업 관리자</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="fc-main">
        {/* Top bar */}
        <header className="fc-topbar">
          <button className="fc-menu-btn" onClick={toggleSidebar} aria-label="메뉴 열기/닫기">
            {sidebarOpen ? <IconX /> : <IconMenu />}
          </button>
          <span className="fc-topbar-title">파이프라인</span>

          <div className="fc-topbar-search">
            <IconSearch className="fc-search-icon" />
            <input
              className="fc-search-input"
              type="text"
              placeholder="딜 검색…"
              aria-label="딜 검색"
            />
          </div>

          <div className="fc-topbar-actions">
            <div className="fc-topbar-avatars">
              {teamAvatars.map(av => (
                <div
                  key={av.initials}
                  className="fc-topbar-av"
                  style={{ background: av.bg, color: av.color }}
                  title={av.initials}
                >
                  {av.initials}
                </div>
              ))}
            </div>
            <button className="fc-btn-new">
              <IconPlus />
              <span>새 딜</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="fc-content">
          {/* Stats row */}
          <div ref={statsRef} className="fc-stats-row">
            {statCards.map((card, i) => (
              <motion.div
                key={card.id}
                className="fc-stat-card"
                initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
                animate={statsInView ? { opacity: 1, y: 0 } : { opacity: reducedMotion ? 1 : 0 }}
                transition={{ duration: 0.32, delay: reducedMotion ? 0 : i * 0.08, ease: 'easeOut' }}
                whileHover={reducedMotion ? {} : {
                  y: -2,
                  boxShadow: '0 6px 20px rgba(139, 92, 246, 0.12)',
                  transition: { type: 'spring', stiffness: 400, damping: 24 },
                }}
              >
                <div className="fc-stat-label">{card.label}</div>
                <AnimatedStatValue value={card.value} />
                <div className={`fc-stat-sub ${card.positive ? 'positive' : 'negative'}`}>
                  {card.sub}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Section header with tabs */}
          <div className="fc-section-header">
            <span className="fc-section-title">딜 파이프라인</span>
            <div className="fc-tab-group">
              <button
                className={`fc-tab${activeTab === 'kanban' ? ' active' : ''}`}
                onClick={() => setActiveTab('kanban')}
              >
                칸반
              </button>
              <button
                className={`fc-tab${activeTab === 'contacts' ? ' active' : ''}`}
                onClick={() => setActiveTab('contacts')}
              >
                연락처
              </button>
            </div>
          </div>

          {/* Kanban board */}
          {activeTab === 'kanban' && (
            <LayoutGroup>
              <div ref={kanbanRef} className="fc-kanban">
                {kanbanColumns.map((col, colIdx) => {
                  const colDeals = dealsByStage[col.id] ?? []
                  const total = colTotal(col.id)
                  return (
                    <motion.div
                      key={col.id}
                      className="fc-kanban-col"
                      initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
                      animate={kanbanInView ? { opacity: 1, y: 0 } : { opacity: reducedMotion ? 1 : 0 }}
                      transition={{
                        duration: 0.38,
                        delay: reducedMotion ? 0 : 0.08 + colIdx * 0.09,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      <div className="fc-col-header" style={{ background: col.headerBg }}>
                        <div>
                          <div className="fc-col-title-row">
                            <div className="fc-col-dot" style={{ background: col.color }} />
                            <span className="fc-col-title">{col.label}</span>
                          </div>
                          <div className="fc-col-amount">${total.toLocaleString()}</div>
                        </div>
                        <span className="fc-col-count">{colDeals.length}</span>
                      </div>
                      <div className="fc-col-cards">
                        <AnimatePresence mode="popLayout">
                          {colDeals.map((deal) => (
                            <DealCard
                              key={deal.id}
                              deal={deal}
                              selected={selectedDeal === deal.id}
                              onSelect={handleDealSelect}
                            />
                          ))}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </LayoutGroup>
          )}

          {/* Contacts table */}
          {activeTab === 'contacts' && <ContactsTable />}
        </main>
      </div>
    </div>
  )
}
