import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, useReducedMotion, useInView, animate } from 'framer-motion'
import './pulse-dashboard.css'
import {
  kpiCards,
  timeSeries,
  barData,
  tableRows,
  navItems,
  activityFeed,
  type KpiCard,
  type TableRow,
  type ActivityItem,
} from './mock'

// ── Icon components (inline SVG, no library) ──────────────────────────────

function IconGrid({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="9" y="1" width="6" height="6" rx="1" />
      <rect x="1" y="9" width="6" height="6" rx="1" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
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

function IconTarget({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="7" />
      <circle cx="8" cy="8" r="4" />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none" />
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

function IconFileText({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 1H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6l-5-5z" />
      <path d="M9 1v5h5" />
      <path d="M5 10h6M5 12.5h4" strokeLinecap="round" />
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

const navIconMap: Record<string, (p: { className?: string }) => JSX.Element> = {
  'grid': IconGrid,
  'bar-chart': IconBarChart,
  'target': IconTarget,
  'users': IconUsers,
  'file-text': IconFileText,
  'settings': IconSettings,
}

// ── Count-up hook ──────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1.2, shouldStart = true) {
  const reducedMotion = useReducedMotion()
  const [display, setDisplay] = useState(reducedMotion ? target : 0)
  const started = useRef(false)

  useEffect(() => {
    if (!shouldStart || started.current) return
    if (reducedMotion) { setDisplay(target); return }
    started.current = true
    const controls = animate(0, target, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate(v) { setDisplay(v) },
    })
    return () => controls.stop()
  }, [shouldStart, target, duration, reducedMotion])

  return display
}

// ── Animated KPI value ─────────────────────────────────────────────────────

function AnimatedKpiValue({ value }: { value: string }) {
  // Parse prefix/suffix and numeric portion
  const match = value.match(/^([^0-9]*)([0-9,]+\.?[0-9]*)([^0-9]*)$/)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  if (!match) return <div className="pd-kpi-value" ref={ref}>{value}</div>

  const prefix = match[1]
  const numStr = match[2].replace(/,/g, '')
  const suffix = match[3]
  const num = parseFloat(numStr)
  const isFloat = numStr.includes('.')
  const decimals = isFloat ? (numStr.split('.')[1]?.length ?? 0) : 0

  const counted = useCountUp(num, 1.2, isInView)
  const formatted = isFloat
    ? counted.toFixed(decimals)
    : Math.round(counted).toLocaleString()

  return (
    <div className="pd-kpi-value" ref={ref}>
      {prefix}{formatted}{suffix}
    </div>
  )
}

// ── Sparkline SVG with draw-on ─────────────────────────────────────────────

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const W = 80
  const H = 32
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W
    const y = H - ((v - min) / range) * (H - 4) - 2
    return `${x},${y}`
  })
  const polyline = pts.join(' ')
  const areaPath = `M${pts[0]} L${pts.join(' L')} L${W},${H} L0,${H} Z`
  const color = positive ? '#10b981' : '#ef4444'
  const fillColor = positive ? 'rgba(16,185,129,0.10)' : 'rgba(239,68,68,0.10)'
  const reducedMotion = useReducedMotion()

  // Compute path length approximation for stroke-dasharray draw-on
  const lineId = `spark-line-${Math.random().toString(36).slice(2)}`

  return (
    <svg className="pd-sparkline" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <defs>
        <mask id={`${lineId}-mask`}>
          <motion.rect
            x="0" y="0" width={W} height={H}
            fill="white"
            initial={{ scaleX: reducedMotion ? 1 : 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            style={{ transformOrigin: '0 0' }}
          />
        </mask>
      </defs>
      <path d={areaPath} fill={fillColor} mask={`url(#${lineId}-mask)`} />
      <polyline
        points={polyline}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        mask={`url(#${lineId}-mask)`}
      />
    </svg>
  )
}

// ── Area + Line chart with draw-on via motion path ─────────────────────────

function RevenueChart() {
  const W = 560
  const H = 180
  const PAD = { top: 12, right: 12, bottom: 28, left: 52 }
  const cW = W - PAD.left - PAD.right
  const cH = H - PAD.top - PAD.bottom
  const reducedMotion = useReducedMotion()
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const revenues = timeSeries.map(d => d.revenue)
  const sessions = timeSeries.map(d => d.sessions)
  const maxRev = Math.max(...revenues)
  const maxSes = Math.max(...sessions)

  const scaleX = (i: number) => PAD.left + (i / (timeSeries.length - 1)) * cW
  const scaleYRev = (v: number) => PAD.top + cH - (v / maxRev) * cH
  const scaleYSes = (v: number) => PAD.top + cH - (v / maxSes) * cH

  const revPts = timeSeries.map((d, i) => `${scaleX(i)},${scaleYRev(d.revenue)}`)
  const sesPts = timeSeries.map((d, i) => `${scaleX(i)},${scaleYSes(d.sessions)}`)

  const revArea = `M${revPts[0]} L${revPts.join(' L')} L${scaleX(timeSeries.length - 1)},${PAD.top + cH} L${PAD.left},${PAD.top + cH} Z`
  const revLine = `M${revPts.join(' L')}`
  const sesLine = `M${sesPts.join(' L')}`

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(f => ({
    y: PAD.top + cH - f * cH,
    label: `$${Math.round(f * maxRev / 1000)}k`,
  }))

  const maskId = 'pd-chart-reveal'

  return (
    <svg ref={ref} className="pd-chart-area" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <defs>
        <mask id={maskId}>
          <motion.rect
            x={PAD.left} y="0" width={cW} height={H}
            fill="white"
            initial={{ scaleX: reducedMotion ? 1 : 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: reducedMotion ? 1 : 0 }}
            transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
            style={{ transformOrigin: `${PAD.left}px 0px` }}
          />
        </mask>
      </defs>
      {yTicks.map((t, i) => (
        <g key={i}>
          <line x1={PAD.left} y1={t.y} x2={PAD.left + cW} y2={t.y} stroke="#e5e7eb" strokeWidth="1" />
          <text x={PAD.left - 6} y={t.y + 4} textAnchor="end" fontSize="10" fill="#9ca3af">{t.label}</text>
        </g>
      ))}
      <path d={revArea} fill="rgba(16,185,129,0.08)" mask={`url(#${maskId})`} />
      <path d={revLine} fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" mask={`url(#${maskId})`} />
      <path d={sesLine} fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" strokeLinejoin="round" mask={`url(#${maskId})`} />
      {timeSeries.map((d, i) => (
        <text key={i} x={scaleX(i)} y={H - 6} textAnchor="middle" fontSize="10" fill="#9ca3af">{d.label}</text>
      ))}
    </svg>
  )
}

// ── KPI Card with count-up + sparkline draw-on ─────────────────────────────

function KpiCardComponent({ card, index }: { card: KpiCard; index: number }) {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      className="pd-kpi-card"
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 16 }}
      transition={{ duration: 0.4, delay: reducedMotion ? 0 : index * 0.08, ease: 'easeOut' }}
      whileHover={reducedMotion ? {} : { y: -2, boxShadow: '0 4px 16px rgba(16,185,129,0.10)' }}
    >
      <div className="pd-kpi-header">
        <span className="pd-kpi-label">{card.label}</span>
        <span className={`pd-kpi-delta ${card.deltaPositive ? 'positive' : 'negative'}`}>
          {card.delta}
        </span>
      </div>
      <AnimatedKpiValue value={card.value} />
      <Sparkline data={card.sparkline} positive={card.deltaPositive} />
    </motion.div>
  )
}

// ── Activity icon ─────────────────────────────────────────────────────────

function activityEmoji(type: ActivityItem['type']): string {
  switch (type) {
    case 'signup': return '+'
    case 'purchase': return '$'
    case 'alert': return '!'
    case 'milestone': return '★'
  }
}

// ── Status pill ───────────────────────────────────────────────────────────

function StatusPill({ status }: { status: TableRow['status'] }) {
  const labels: Record<TableRow['status'], string> = { active: '진행 중', paused: '일시 중지', ended: '종료' }
  return (
    <span className={`pd-status-pill ${status}`}>
      <span className="pd-status-dot" />
      {labels[status]}
    </span>
  )
}

// ── Sort state ────────────────────────────────────────────────────────────

type SortKey = 'name' | 'revenue' | 'sessions' | 'conversion'
type SortDir = 'asc' | 'desc'

function sortRows(rows: TableRow[], key: SortKey, dir: SortDir): TableRow[] {
  return [...rows].sort((a, b) => {
    const av = a[key]
    const bv = b[key]
    const cmp = typeof av === 'string' ? av.localeCompare(bv as string) : (av as number) - (bv as number)
    return dir === 'asc' ? cmp : -cmp
  })
}

// ── Animated table row ────────────────────────────────────────────────────

function AnimatedTableRow({ row, index }: { row: TableRow; index: number }) {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLTableRowElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })

  return (
    <motion.tr
      ref={ref}
      key={row.id}
      initial={{ opacity: 0, x: reducedMotion ? 0 : -8 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: reducedMotion ? 1 : 0 }}
      transition={{ duration: 0.28, delay: reducedMotion ? 0 : index * 0.05, ease: 'easeOut' }}
      whileHover={reducedMotion ? {} : { backgroundColor: 'var(--pd-bg)' }}
      className="pd-table-row"
    >
      <td className="pd-cell-name">{row.name}</td>
      <td>${row.revenue.toLocaleString()}</td>
      <td>{row.sessions.toLocaleString()}</td>
      <td>{row.conversion.toFixed(1)}%</td>
      <td className="pd-cell-channel">{row.channel}</td>
      <td><StatusPill status={row.status} /></td>
    </motion.tr>
  )
}

// ── Animated bar row with scaleX ─────────────────────────────────────────

function AnimatedBarRow({ bar, index }: { bar: { label: string; value: number }; index: number }) {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })

  return (
    <motion.div
      ref={ref}
      className="pd-bar-row"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: reducedMotion ? 1 : 0 }}
      transition={{ duration: 0.3, delay: reducedMotion ? 0 : index * 0.06 }}
    >
      <span className="pd-bar-label">{bar.label}</span>
      <div className="pd-bar-track">
        <motion.div
          className="pd-bar-fill"
          initial={{ scaleX: reducedMotion ? 1 : 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: reducedMotion ? 1 : 0 }}
          transition={{ duration: 0.7, delay: reducedMotion ? 0 : 0.1 + index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            width: `${bar.value}%`,
            transformOrigin: 'left center',
          }}
        />
      </div>
      <span className="pd-bar-pct">{bar.value}%</span>
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────

export default function PulseDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('dashboard')
  const [sortKey, setSortKey] = useState<SortKey>('revenue')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const reducedMotion = useReducedMotion()

  const toggleSidebar = useCallback(() => setSidebarOpen(p => !p), [])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const sortedRows = sortRows(tableRows, sortKey, sortDir)

  const colDefs: { key: SortKey; label: string }[] = [
    { key: 'name', label: '캠페인' },
    { key: 'revenue', label: '매출' },
    { key: 'sessions', label: '세션' },
    { key: 'conversion', label: '전환율 %' },
  ]

  // Activity feed inView ref
  const activityRef = useRef<HTMLDivElement>(null)
  const activityInView = useInView(activityRef, { once: true, margin: '-40px' })

  return (
    <div className="sample-pulse-dashboard">
      {/* Overlay for mobile drawer */}
      <div
        className={`pd-overlay${sidebarOpen ? ' open' : ''}`}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <aside className={`pd-sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="pd-sidebar-logo">
          <div className="pd-logo-dot" />
          Pulse
        </div>

        <nav className="pd-sidebar-nav">
          {navItems.map(item => {
            const Icon = navIconMap[item.icon]
            return (
              <button
                key={item.id}
                className={`pd-nav-item${activeNav === item.id ? ' active' : ''}`}
                onClick={() => { setActiveNav(item.id); closeSidebar() }}
              >
                {Icon && <Icon className="pd-nav-icon" />}
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="pd-sidebar-footer">
          <div className="pd-avatar-row">
            <div className="pd-avatar">SK</div>
            <div className="pd-avatar-info">
              <div className="pd-avatar-name">Sarah Kim</div>
              <div className="pd-avatar-role">관리자</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="pd-main">
        {/* Top bar */}
        <header className="pd-topbar">
          <button className="pd-menu-btn" onClick={toggleSidebar} aria-label="메뉴 열기/닫기">
            {sidebarOpen ? <IconX /> : <IconMenu />}
          </button>
          <span className="pd-topbar-title">대시보드</span>

          <div className="pd-topbar-search">
            <IconSearch className="pd-search-icon" />
            <input
              className="pd-search-input"
              type="text"
              placeholder="캠페인 검색…"
              aria-label="검색"
            />
          </div>

          <div className="pd-topbar-actions">
            <span className="pd-topbar-date">Jun 15, 2026</span>
            <div className="pd-topbar-avatar" aria-label="사용자 메뉴">SK</div>
          </div>
        </header>

        {/* Page content */}
        <main className="pd-content">
          {/* KPI row */}
          <div className="pd-kpi-row">
            {kpiCards.map((card, i) => (
              <KpiCardComponent key={card.id} card={card} index={i} />
            ))}
          </div>

          {/* Charts row */}
          <div className="pd-charts-row">
            {/* Revenue area chart */}
            <motion.div
              className="pd-card"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.32, ease: 'easeOut' }}
            >
              <div className="pd-card-header">
                <div className="pd-card-title">매출 개요</div>
                <span className="pd-card-badge">2026 YTD</span>
              </div>
              <div className="pd-card-subtitle">월별 매출 vs 세션 수</div>
              <RevenueChart />
              <div className="pd-chart-legend">
                <div className="pd-legend-item">
                  <div className="pd-legend-dot" style={{ background: '#10b981' }} />
                  매출
                </div>
                <div className="pd-legend-item">
                  <div className="pd-legend-dot" style={{ background: '#6366f1' }} />
                  세션
                </div>
              </div>
            </motion.div>

            {/* Traffic breakdown bar chart */}
            <motion.div
              className="pd-card"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.4, ease: 'easeOut' }}
            >
              <div className="pd-card-header">
                <div className="pd-card-title">트래픽 소스</div>
              </div>
              <div className="pd-card-subtitle">채널별 세션 비중</div>
              <div className="pd-bar-chart">
                {barData.map((bar, i) => (
                  <AnimatedBarRow key={bar.label} bar={bar} index={i} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom row */}
          <div className="pd-bottom-row">
            {/* Campaigns table */}
            <motion.div
              className="pd-card"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.46, ease: 'easeOut' }}
            >
              <div className="pd-card-header">
                <div className="pd-card-title">캠페인</div>
                <span className="pd-card-badge">{tableRows.length}개 진행 중</span>
              </div>
              <div className="pd-table-wrapper">
                <table className="pd-table">
                  <thead>
                    <tr>
                      {colDefs.map(col => (
                        <th
                          key={col.key}
                          className={sortKey === col.key ? 'sorted' : ''}
                          onClick={() => handleSort(col.key)}
                        >
                          {col.label}
                          <span className="sort-arrow">
                            {sortKey === col.key ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
                          </span>
                        </th>
                      ))}
                      <th>채널</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedRows.map((row, i) => (
                      <AnimatedTableRow key={row.id} row={row} index={i} />
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Activity feed */}
            <motion.div
              ref={activityRef}
              className="pd-card"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.52, ease: 'easeOut' }}
            >
              <div className="pd-card-header">
                <div className="pd-card-title">최근 활동</div>
              </div>
              <div className="pd-activity-list">
                {activityFeed.map((item, i) => (
                  <motion.div
                    key={item.id}
                    className="pd-activity-item"
                    initial={{ opacity: 0, x: reducedMotion ? 0 : -10 }}
                    animate={activityInView ? { opacity: 1, x: 0 } : { opacity: reducedMotion ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: reducedMotion ? 0 : i * 0.07, ease: 'easeOut' }}
                  >
                    <div className={`pd-activity-icon ${item.type}`}>
                      {activityEmoji(item.type)}
                    </div>
                    <div className="pd-activity-body">
                      <div className="pd-activity-msg">{item.message}</div>
                      {item.detail && (
                        <div className="pd-activity-detail">{item.detail}</div>
                      )}
                    </div>
                    <span className="pd-activity-time">{item.time}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
