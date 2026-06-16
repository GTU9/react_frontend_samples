import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, useReducedMotion, useInView, animate } from 'framer-motion'
import './vault-finance.css'
import {
  portfolioTotal,
  portfolioChange,
  portfolioChangePct,
  portfolioChangePositive,
  statCards,
  balanceHistory,
  balanceLabels,
  holdings,
  watchlist,
  transactions,
  navItems,
  type Holding,
  type WatchlistItem,
  type Transaction,
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

function IconTrade({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 5h10M9 2l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 11H4M7 8l-3 3 3 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconMarkets({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="1,12 5,7 8,9 11,4 15,6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconEarn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 4.5v7M6 6h3.5a1.5 1.5 0 0 1 0 3H6" strokeLinecap="round" />
    </svg>
  )
}

function IconHistory({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 8a6 6 0 1 0 1.5-3.9" strokeLinecap="round" />
      <path d="M2 4.5V8h3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 5.5V8l2 1.5" strokeLinecap="round" />
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

function IconBell({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 1.5a5 5 0 0 1 5 5v3l1.5 2H1.5L3 9.5v-3a5 5 0 0 1 5-5z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 13a1.5 1.5 0 0 0 3 0" strokeLinecap="round" />
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

function IconVault({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="1.6">
      <rect x="3" y="3" width="14" height="14" rx="3" />
      <circle cx="10" cy="10" r="3" />
      <path d="M10 7v1M10 12v1M7 10H8M12 10h1" strokeLinecap="round" />
    </svg>
  )
}

const navIconMap: Record<string, (p: { className?: string }) => JSX.Element> = {
  grid:     IconGrid,
  trade:    IconTrade,
  markets:  IconMarkets,
  earn:     IconEarn,
  history:  IconHistory,
  settings: IconSettings,
}

// ── Count-up hook ──────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1.4, shouldStart = true) {
  const reducedMotion = useReducedMotion()
  const [display, setDisplay] = useState(reducedMotion ? target : 0)
  const started = useRef(false)

  useEffect(() => {
    if (!shouldStart || started.current) return
    if (reducedMotion) { setDisplay(target); return }
    started.current = true
    const ctrl = animate(0, target, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate(v) { setDisplay(v) },
    })
    return () => ctrl.stop()
  }, [shouldStart, target, duration, reducedMotion])

  return display
}

// ── Animated stat value ────────────────────────────────────────────────────

function AnimatedStatValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  // Only count numeric-ish values (those with digits and optional + - $ %)
  const match = value.match(/^([+\-$]*)([0-9,]+\.?[0-9]*)([^0-9]*)$/)

  if (!match) return <span className="vf-stat-value" ref={ref}>{value}</span>

  const prefix = match[1]
  const numStr = match[2].replace(/,/g, '')
  const suffix = match[3]
  const num = parseFloat(numStr)
  const isFloat = numStr.includes('.')
  const decimals = isFloat ? (numStr.split('.')[1]?.length ?? 0) : 0

  const counted = useCountUp(num, 1.3, isInView)
  const formatted = isFloat
    ? counted.toFixed(decimals)
    : Math.round(counted).toLocaleString()

  return (
    <span className="vf-stat-value" ref={ref}>
      {prefix}{formatted}{suffix}
    </span>
  )
}

// ── Mini sparkline SVG with subtle pulse glow ─────────────────────────────

function Sparkline({
  data,
  positive,
  width = 72,
  height = 28,
}: {
  data: number[]
  positive: boolean
  width?: number
  height?: number
}) {
  const reducedMotion = useReducedMotion()
  if (!data.length) return <svg width={width} height={height} />
  const W = width
  const H = height
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W
    const y = H - ((v - min) / range) * (H - 4) - 2
    return `${x},${y}`
  })
  const color = positive ? '#10b981' : '#ef4444'
  const fill  = positive ? 'rgba(16,185,129,0.10)' : 'rgba(239,68,68,0.10)'
  const areaPath = `M${pts[0]} L${pts.join(' L')} L${W},${H} L0,${H} Z`
  const maskId = `vf-spark-${Math.random().toString(36).slice(2)}`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: W, height: H, display: 'block' }}>
      <defs>
        <mask id={maskId}>
          <motion.rect
            x="0" y="0" width={W} height={H}
            fill="white"
            initial={{ scaleX: reducedMotion ? 1 : 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            style={{ transformOrigin: '0 0' }}
          />
        </mask>
      </defs>
      <path d={areaPath} fill={fill} mask={`url(#${maskId})`} />
      <motion.polyline
        points={pts.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        mask={`url(#${maskId})`}
        animate={reducedMotion ? {} : {
          filter: [
            `drop-shadow(0 0 0px ${color})`,
            `drop-shadow(0 0 3px ${color})`,
            `drop-shadow(0 0 0px ${color})`,
          ],
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </svg>
  )
}

// ── Balance area chart with draw-on ───────────────────────────────────────

function BalanceChart() {
  const W = 600
  const H = 180
  const PAD = { top: 12, right: 16, bottom: 28, left: 60 }
  const cW = W - PAD.left - PAD.right
  const cH = H - PAD.top - PAD.bottom
  const reducedMotion = useReducedMotion()
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const data = balanceHistory
  const min = Math.min(...data) * 0.998
  const max = Math.max(...data) * 1.001
  const range = max - min

  const scaleX = (i: number) => PAD.left + (i / (data.length - 1)) * cW
  const scaleY = (v: number) => PAD.top + cH - ((v - min) / range) * cH

  const pts = data.map((v, i) => `${scaleX(i)},${scaleY(v)}`)
  const linePath = `M${pts.join(' L')}`
  const areaPath = `${linePath} L${scaleX(data.length - 1)},${PAD.top + cH} L${PAD.left},${PAD.top + cH} Z`

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(f => ({
    y: PAD.top + cH - f * cH,
    label: `$${Math.round((min + f * range) / 1000)}k`,
  }))

  const xLabelIndices = [0, 7, 14, 21, 29]
  const maskId = 'vf-balance-reveal'

  return (
    <svg ref={ref} className="vf-balance-chart-wrap" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="vf-area-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.20" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.00" />
        </linearGradient>
        <mask id={maskId}>
          <motion.rect
            x={PAD.left} y="0" width={cW} height={H}
            fill="white"
            initial={{ scaleX: reducedMotion ? 1 : 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: reducedMotion ? 1 : 0 }}
            transition={{ duration: 1.3, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
            style={{ transformOrigin: `${PAD.left}px 0px` }}
          />
        </mask>
      </defs>
      {yTicks.map((t, i) => (
        <g key={i}>
          <line x1={PAD.left} y1={t.y} x2={PAD.left + cW} y2={t.y}
            stroke="rgba(34,211,238,0.08)" strokeWidth="1" />
          <text x={PAD.left - 8} y={t.y + 4} textAnchor="end"
            fontSize="10" fill="#4a6080">{t.label}</text>
        </g>
      ))}
      <path d={areaPath} fill="url(#vf-area-grad)" mask={`url(#${maskId})`} />
      <path d={linePath} fill="none" stroke="#22d3ee" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" mask={`url(#${maskId})`} />
      {xLabelIndices.map(idx => (
        <text key={idx} x={scaleX(idx)} y={H - 6}
          textAnchor="middle" fontSize="10" fill="#4a6080">
          {balanceLabels[Math.floor(idx / 2)] ?? ''}
        </text>
      ))}
    </svg>
  )
}

// ── Donut chart with sweep animation ─────────────────────────────────────

function DonutChart({ slices }: { slices: { label: string; pct: number; color: string }[] }) {
  const R = 54
  const cx = 70
  const cy = 70
  const strokeW = 20
  const reducedMotion = useReducedMotion()
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true })

  const circumference = 2 * Math.PI * R

  let cumPct = 0
  const segments = slices.map(s => {
    const offset = circumference * (1 - cumPct / 100)
    const dash = circumference * (s.pct / 100)
    cumPct += s.pct
    return { ...s, offset, dash }
  })

  return (
    <svg ref={ref} className="vf-donut-svg" viewBox="0 0 140 140">
      {/* Static background track */}
      <circle
        cx={cx} cy={cy} r={R}
        fill="none"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth={strokeW}
      />
      {segments.map((seg, i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r={R}
          fill="none"
          stroke={seg.color}
          strokeWidth={strokeW}
          strokeLinecap="round"
          opacity={0.9}
          strokeDasharray={`${seg.dash - 2} ${circumference - seg.dash + 2}`}
          strokeDashoffset={seg.offset}
          style={{ transformOrigin: `${cx}px ${cy}px`, rotate: '-90deg' }}
          initial={{ strokeDasharray: reducedMotion ? `${seg.dash - 2} ${circumference - seg.dash + 2}` : `0 ${circumference}` }}
          animate={isInView
            ? { strokeDasharray: `${seg.dash - 2} ${circumference - seg.dash + 2}` }
            : { strokeDasharray: reducedMotion ? `${seg.dash - 2} ${circumference - seg.dash + 2}` : `0 ${circumference}` }
          }
          transition={{ duration: 1.0, delay: reducedMotion ? 0 : 0.15 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      ))}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="11" fill="#7e96b8">비중</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="13" fontWeight="700" fill="#e8f0fe">
        {slices.length}개 자산
      </text>
    </svg>
  )
}

// ── Holding row ───────────────────────────────────────────────────────────

function HoldingRow({ holding, index }: { holding: Holding; index: number }) {
  const positive = holding.change24h >= 0
  const pct = holding.change24h.toFixed(2)
  const sign = positive ? '+' : ''
  const price = holding.price > 0
    ? holding.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : '—'
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLTableRowElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })

  return (
    <motion.tr
      ref={ref}
      initial={{ opacity: 0, x: reducedMotion ? 0 : -8 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: reducedMotion ? 1 : 0 }}
      transition={{ duration: 0.32, delay: reducedMotion ? 0 : index * 0.06, ease: 'easeOut' }}
    >
      <td>
        <div className="vf-asset-cell">
          <span className="vf-asset-dot" style={{ color: holding.color, backgroundColor: holding.color }} />
          <div>
            <div className="vf-asset-symbol">{holding.symbol}</div>
            <div className="vf-asset-name">{holding.name}</div>
          </div>
        </div>
      </td>
      <td>{price !== '—' ? `$${price}` : '—'}</td>
      <td className={positive ? 'vf-delta-positive' : 'vf-delta-negative'}>
        {sign}{pct}%
      </td>
      <td>{holding.marketCap}</td>
      <td>
        {holding.sparkline.length > 1 && (
          <span className="vf-sparkline-cell">
            <Sparkline data={holding.sparkline} positive={positive} width={72} height={28} />
          </span>
        )}
      </td>
      <td>{holding.allocation}%</td>
    </motion.tr>
  )
}

// ── Watchlist row ─────────────────────────────────────────────────────────

function WatchRow({ item, index }: { item: WatchlistItem; index: number }) {
  const positive = item.change24h >= 0
  const sign = positive ? '+' : ''
  const priceStr = item.price < 1
    ? item.price.toFixed(4)
    : item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className="vf-watch-item"
      initial={{ opacity: 0, x: reducedMotion ? 0 : 8 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: reducedMotion ? 1 : 0 }}
      transition={{ duration: 0.28, delay: reducedMotion ? 0 : index * 0.06, ease: 'easeOut' }}
    >
      <span className="vf-watch-sym">{item.symbol}</span>
      <span className="vf-watch-name">{item.name}</span>
      <span className="vf-watch-sparkline">
        <Sparkline data={item.sparkline} positive={positive} width={52} height={24} />
      </span>
      <span className="vf-watch-price">${priceStr}</span>
      <span className={`vf-watch-delta ${positive ? 'vf-delta-positive' : 'vf-delta-negative'}`}>
        {sign}{item.change24h.toFixed(2)}%
      </span>
    </motion.div>
  )
}

// ── Transaction row ───────────────────────────────────────────────────────

function txIconLabel(type: Transaction['type']): string {
  switch (type) {
    case 'buy':      return 'B'
    case 'sell':     return 'S'
    case 'deposit':  return '↓'
    case 'withdraw': return '↑'
  }
}

function txLabel(type: Transaction['type']): string {
  switch (type) {
    case 'buy':      return '매수'
    case 'sell':     return '매도'
    case 'deposit':  return '입금'
    case 'withdraw': return '출금'
  }
}

function TxRow({ tx, index }: { tx: Transaction; index: number }) {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className="vf-tx-item"
      initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: reducedMotion ? 1 : 0 }}
      transition={{ duration: 0.28, delay: reducedMotion ? 0 : index * 0.055, ease: 'easeOut' }}
    >
      <div className={`vf-tx-icon ${tx.type}`}>
        {txIconLabel(tx.type)}
      </div>
      <div className="vf-tx-body">
        <div className="vf-tx-label">{txLabel(tx.type)} {tx.asset}</div>
        <div className="vf-tx-meta">{tx.amount}</div>
      </div>
      <div className="vf-tx-right">
        <span className={`vf-tx-value ${tx.type}`}>{tx.value}</span>
        <span className="vf-tx-time">{tx.time}</span>
        <span className={`vf-tx-status ${tx.status}`}>
          {tx.status === 'completed' ? '완료' : tx.status === 'pending' ? '처리 중' : '실패'}
        </span>
      </div>
    </motion.div>
  )
}

// ── Animated health bar (scaleX) ──────────────────────────────────────────

function HealthBar({ label, score, color, index }: { label: string; score: number; color: string; index: number }) {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontSize: 12, color: 'var(--vf-text-secondary)' }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color }}>{score}/100</span>
      </div>
      <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
        <motion.div
          style={{ height: '100%', borderRadius: 3, background: color, transformOrigin: 'left center' }}
          initial={{ scaleX: reducedMotion ? score / 100 : 0 }}
          animate={isInView ? { scaleX: score / 100 } : { scaleX: reducedMotion ? score / 100 : 0 }}
          transition={{ duration: 0.9, delay: reducedMotion ? 0 : 0.1 + index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  )
}

// ── Accent glow pulse (logo) ───────────────────────────────────────────────

function GlowLogo() {
  const reducedMotion = useReducedMotion()
  return (
    <motion.div
      className="vf-logo-icon"
      animate={reducedMotion ? {} : {
        filter: [
          'drop-shadow(0 0 4px rgba(34,211,238,0.3))',
          'drop-shadow(0 0 12px rgba(34,211,238,0.7))',
          'drop-shadow(0 0 4px rgba(34,211,238,0.3))',
        ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <IconVault />
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────

export default function VaultFinance() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('portfolio')
  const reducedMotion = useReducedMotion()

  const toggleSidebar = useCallback(() => setSidebarOpen(p => !p), [])
  const closeSidebar  = useCallback(() => setSidebarOpen(false), [])

  const donutSlices = holdings.map(h => ({
    label: h.symbol,
    pct:   h.allocation,
    color: h.color,
  }))

  const healthItems = [
    { label: '분산도',     score: 78, color: '#22d3ee' },
    { label: '위험 지수', score: 62, color: '#f59e0b' },
    { label: '변동성 지수', score: 45, color: '#10b981' },
    { label: '유동성',     score: 91, color: '#6366f1' },
  ]

  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-30px' })

  return (
    <div className="sample-vault-finance">
      {/* Overlay for mobile drawer */}
      <div
        className={`vf-overlay${sidebarOpen ? ' open' : ''}`}
        onClick={closeSidebar}
      />

      {/* Icon sidebar */}
      <aside className={`vf-sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="vf-sidebar-logo">
          <GlowLogo />
        </div>

        <nav className="vf-sidebar-nav">
          {navItems.map(item => {
            const Icon = navIconMap[item.icon]
            return (
              <button
                key={item.id}
                className={`vf-nav-item${activeNav === item.id ? ' active' : ''}`}
                onClick={() => { setActiveNav(item.id); closeSidebar() }}
                aria-label={item.label}
                title={item.label}
              >
                {Icon && <Icon className="vf-nav-icon" />}
              </button>
            )
          })}
        </nav>

        <div className="vf-sidebar-footer">
          <div className="vf-avatar" title="Alex Morgan">AM</div>
        </div>
      </aside>

      {/* Main */}
      <div className="vf-main">
        {/* Top bar */}
        <header className="vf-topbar">
          <button className="vf-menu-btn" onClick={toggleSidebar} aria-label="메뉴 열기/닫기">
            {sidebarOpen ? <IconX /> : <IconMenu />}
          </button>

          <div className="vf-topbar-brand">
            <div className="vf-logo-icon" style={{ width: 28, height: 28, borderRadius: 7 }}>
              <IconVault />
            </div>
            <span className="vf-topbar-brand-name">Vault<span>Fi</span></span>
          </div>

          <div className="vf-topbar-portfolio">
            <span className="vf-topbar-total">{portfolioTotal}</span>
            <span className={`vf-topbar-change ${portfolioChangePositive ? 'positive' : 'negative'}`}>
              {portfolioChange} ({portfolioChangePct}) 오늘
            </span>
          </div>

          <div className="vf-topbar-search">
            <IconSearch className="vf-search-icon" />
            <input
              className="vf-search-input"
              type="text"
              placeholder="자산 검색…"
              aria-label="자산 검색"
            />
          </div>

          <div className="vf-topbar-actions">
            <button className="vf-topbar-icon-btn" aria-label="알림">
              <IconBell style={{ width: 16, height: 16 }} />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="vf-content">

          {/* Stat cards */}
          <div ref={statsRef} className="vf-stat-row">
            {statCards.map((card, i) => (
              <motion.div
                key={card.id}
                className="vf-stat-card"
                initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
                animate={statsInView ? { opacity: 1, y: 0 } : { opacity: reducedMotion ? 1 : 0 }}
                transition={{ duration: 0.35, delay: reducedMotion ? 0 : i * 0.08, ease: 'easeOut' }}
                whileHover={reducedMotion ? {} : {
                  borderColor: 'rgba(34,211,238,0.3)',
                  boxShadow: '0 0 24px rgba(34,211,238,0.08)',
                }}
              >
                <span className="vf-stat-label">{card.label}</span>
                <AnimatedStatValue value={card.value} />
                {card.delta && (
                  <span className={`vf-stat-delta ${card.positive ? 'positive' : 'negative'}`}>
                    {card.delta}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Main row: balance chart + holdings table | right col */}
          <div className="vf-main-row">
            {/* Left — balance chart + holdings */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Balance chart card */}
              <motion.div
                className="vf-card"
                initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, delay: reducedMotion ? 0 : 0.28, ease: 'easeOut' }}
              >
                <div className="vf-card-header">
                  <span className="vf-card-title">포트폴리오 잔액</span>
                  <span className="vf-card-badge">30일</span>
                </div>
                <div className="vf-card-subtitle">최근 30일간 총 자산 가치</div>
                <BalanceChart />
                <div className="vf-chart-legend">
                  <div className="vf-legend-item">
                    <div className="vf-legend-dot" style={{ background: '#22d3ee' }} />
                    포트폴리오 가치 (USD)
                  </div>
                </div>
              </motion.div>

              {/* Holdings table */}
              <motion.div
                className="vf-card"
                initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, delay: reducedMotion ? 0 : 0.36, ease: 'easeOut' }}
              >
                <div className="vf-card-header">
                  <span className="vf-card-title">보유 자산</span>
                  <span className="vf-card-badge">{holdings.length}개 자산</span>
                </div>
                <div className="vf-table-wrap">
                  <table className="vf-table">
                    <thead>
                      <tr>
                        <th>자산</th>
                        <th style={{ textAlign: 'right' }}>가격</th>
                        <th style={{ textAlign: 'right' }}>24시간</th>
                        <th style={{ textAlign: 'right' }}>시가총액</th>
                        <th style={{ textAlign: 'right' }}>7일</th>
                        <th style={{ textAlign: 'right' }}>비중</th>
                      </tr>
                    </thead>
                    <tbody>
                      {holdings.map((h, i) => (
                        <HoldingRow key={h.id} holding={h} index={i} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>

            {/* Right col */}
            <div className="vf-right-col">
              {/* Allocation donut */}
              <motion.div
                className="vf-card"
                initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, delay: reducedMotion ? 0 : 0.42, ease: 'easeOut' }}
              >
                <div className="vf-card-header">
                  <span className="vf-card-title">자산 배분</span>
                </div>
                <div className="vf-donut-wrap">
                  <DonutChart slices={donutSlices} />
                  <div className="vf-donut-legend">
                    {holdings.slice(0, 6).map(h => (
                      <div key={h.id} className="vf-donut-item">
                        <div className="vf-donut-swatch" style={{ background: h.color }} />
                        <span className="vf-donut-label">{h.symbol}</span>
                        <span className="vf-donut-pct">{h.allocation}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Watchlist */}
              <motion.div
                className="vf-card"
                initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, delay: reducedMotion ? 0 : 0.48, ease: 'easeOut' }}
              >
                <div className="vf-card-header">
                  <span className="vf-card-title">관심 목록</span>
                  <span className="vf-card-badge">{watchlist.length}</span>
                </div>
                <div className="vf-watch-list">
                  {watchlist.map((item, i) => (
                    <WatchRow key={item.id} item={item} index={i} />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom row: transactions */}
          <div className="vf-bottom-row">
            <motion.div
              className="vf-card"
              initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: reducedMotion ? 0 : 0.54, ease: 'easeOut' }}
            >
              <div className="vf-card-header">
                <span className="vf-card-title">최근 거래 내역</span>
                <span className="vf-card-badge">최근 {transactions.length}건</span>
              </div>
              <div className="vf-tx-list">
                {transactions.map((tx, i) => (
                  <TxRow key={tx.id} tx={tx} index={i} />
                ))}
              </div>
            </motion.div>

            {/* Quick stats filler card */}
            <motion.div
              className="vf-card"
              initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: reducedMotion ? 0 : 0.60, ease: 'easeOut' }}
            >
              <div className="vf-card-header">
                <span className="vf-card-title">포트폴리오 건강도</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
                {healthItems.map((item, i) => (
                  <HealthBar key={item.label} label={item.label} score={item.score} color={item.color} index={i} />
                ))}
              </div>

              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--vf-border-subtle)' }}>
                <div style={{ fontSize: 11, color: 'var(--vf-text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
                  24시간 요약
                </div>
                {[
                  { label: '체결 거래 수', value: '4' },
                  { label: '평균 거래 규모', value: '$5,298' },
                  { label: '수수료 합계',   value: '$18.42' },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--vf-border-subtle)', fontSize: 12 }}>
                    <span style={{ color: 'var(--vf-text-secondary)' }}>{row.label}</span>
                    <span style={{ color: 'var(--vf-text-primary)', fontWeight: 600 }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </main>
      </div>
    </div>
  )
}
