// ── Vault Finance — mock data ─────────────────────────────────────────────

export interface Holding {
  id: string
  symbol: string
  name: string
  price: number
  change24h: number   // percent
  marketCap: string
  sparkline: number[]
  allocation: number  // percent of portfolio
  color: string       // for donut
}

export interface WatchlistItem {
  id: string
  symbol: string
  name: string
  price: number
  change24h: number
  sparkline: number[]
}

export interface Transaction {
  id: string
  type: 'buy' | 'sell' | 'deposit' | 'withdraw'
  asset: string
  amount: string
  value: string
  time: string
  status: 'completed' | 'pending' | 'failed'
}

export interface NavItem {
  id: string
  icon: string
  label: string
}

// ── Portfolio summary ──────────────────────────────────────────────────────

export const portfolioTotal = '$284,731.42'
export const portfolioChange = '+$12,408.17'
export const portfolioChangePct = '+4.56%'
export const portfolioChangePositive = true

export const statCards = [
  { id: 'day-gain', label: '오늘 수익', value: '+$3,204.88', delta: '+1.14%', positive: true },
  { id: 'all-time', label: '누적 수익률', value: '+$84,731.42', delta: '+42.37%', positive: true },
  { id: 'invested', label: '총 투자금', value: '$200,000.00', delta: null, positive: true },
  { id: 'assets', label: '보유 자산', value: '8', delta: null, positive: true },
]

// ── Balance area chart (30-day) ────────────────────────────────────────────

export const balanceHistory = [
  248000, 251200, 249800, 255400, 252100, 258700, 261300, 259400,
  263100, 265800, 268200, 264900, 270100, 272500, 269800, 274200,
  271600, 275900, 278400, 276100, 280300, 277800, 282100, 284600,
  281300, 285900, 283200, 287100, 284700, 284731,
]

export const balanceLabels = [
  'May 17', 'May 19', 'May 21', 'May 23', 'May 25',
  'May 27', 'May 29', 'May 31', 'Jun 2',  'Jun 4',
  'Jun 6',  'Jun 8',  'Jun 10', 'Jun 12', 'Jun 15',
]

// ── Holdings ───────────────────────────────────────────────────────────────

export const holdings: Holding[] = [
  {
    id: 'btc',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 67842.10,
    change24h: 2.34,
    marketCap: '$1.34T',
    sparkline: [63200, 64100, 63800, 65200, 64700, 66100, 65800, 67100, 66400, 67842],
    allocation: 38.2,
    color: '#f59e0b',
  },
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3521.44,
    change24h: 3.81,
    marketCap: '$423.2B',
    sparkline: [3180, 3240, 3210, 3310, 3280, 3390, 3360, 3440, 3490, 3521],
    allocation: 27.6,
    color: '#6366f1',
  },
  {
    id: 'sol',
    symbol: 'SOL',
    name: 'Solana',
    price: 178.92,
    change24h: -1.22,
    marketCap: '$82.4B',
    sparkline: [184, 182, 185, 181, 179, 183, 180, 177, 181, 178],
    allocation: 14.1,
    color: '#22d3ee',
  },
  {
    id: 'bnb',
    symbol: 'BNB',
    name: 'BNB Chain',
    price: 592.31,
    change24h: 0.87,
    marketCap: '$86.1B',
    sparkline: [581, 585, 583, 588, 586, 590, 587, 591, 589, 592],
    allocation: 9.4,
    color: '#eab308',
  },
  {
    id: 'avax',
    symbol: 'AVAX',
    name: 'Avalanche',
    price: 38.14,
    change24h: -3.47,
    marketCap: '$15.6B',
    sparkline: [41, 40, 39, 40, 38, 39, 37, 38, 39, 38],
    allocation: 5.3,
    color: '#ef4444',
  },
  {
    id: 'link',
    symbol: 'LINK',
    name: 'Chainlink',
    price: 14.72,
    change24h: 5.12,
    marketCap: '$8.9B',
    sparkline: [13, 13.4, 13.2, 13.7, 14.0, 13.8, 14.2, 14.5, 14.6, 14.72],
    allocation: 3.2,
    color: '#2563eb',
  },
  {
    id: 'other',
    symbol: '...',
    name: 'Other',
    price: 0,
    change24h: 0,
    marketCap: '—',
    sparkline: [],
    allocation: 2.2,
    color: '#475569',
  },
]

// ── Watchlist ──────────────────────────────────────────────────────────────

export const watchlist: WatchlistItem[] = [
  {
    id: 'dot',
    symbol: 'DOT',
    name: 'Polkadot',
    price: 7.84,
    change24h: 1.92,
    sparkline: [7.4, 7.5, 7.6, 7.5, 7.7, 7.6, 7.8, 7.7, 7.8, 7.84],
  },
  {
    id: 'ada',
    symbol: 'ADA',
    name: 'Cardano',
    price: 0.4821,
    change24h: -0.74,
    sparkline: [0.495, 0.492, 0.490, 0.488, 0.485, 0.487, 0.484, 0.483, 0.482, 0.4821],
  },
  {
    id: 'matic',
    symbol: 'MATIC',
    name: 'Polygon',
    price: 0.7314,
    change24h: 4.28,
    sparkline: [0.68, 0.69, 0.70, 0.69, 0.71, 0.70, 0.72, 0.71, 0.73, 0.7314],
  },
  {
    id: 'near',
    symbol: 'NEAR',
    name: 'NEAR Protocol',
    price: 6.12,
    change24h: -2.11,
    sparkline: [6.4, 6.35, 6.3, 6.28, 6.25, 6.22, 6.2, 6.18, 6.15, 6.12],
  },
  {
    id: 'arb',
    symbol: 'ARB',
    name: 'Arbitrum',
    price: 1.182,
    change24h: 6.74,
    sparkline: [1.08, 1.09, 1.10, 1.11, 1.12, 1.13, 1.14, 1.15, 1.17, 1.182],
  },
]

// ── Transactions ───────────────────────────────────────────────────────────

export const transactions: Transaction[] = [
  { id: 'tx1', type: 'buy',      asset: 'BTC',  amount: '0.182 BTC',  value: '+$12,347.26', time: '2m ago',   status: 'completed' },
  { id: 'tx2', type: 'sell',     asset: 'SOL',  amount: '14.5 SOL',   value: '-$2,594.34',  time: '38m ago',  status: 'completed' },
  { id: 'tx3', type: 'buy',      asset: 'ETH',  amount: '1.42 ETH',   value: '+$5,000.45',  time: '2h ago',   status: 'completed' },
  { id: 'tx4', type: 'deposit',  asset: 'USDC', amount: '10,000 USDC',value: '+$10,000.00', time: '5h ago',   status: 'completed' },
  { id: 'tx5', type: 'buy',      asset: 'LINK', amount: '120 LINK',   value: '+$1,766.40',  time: '1d ago',   status: 'completed' },
  { id: 'tx6', type: 'sell',     asset: 'AVAX', amount: '30 AVAX',    value: '-$1,144.20',  time: '1d ago',   status: 'completed' },
  { id: 'tx7', type: 'withdraw', asset: 'USDC', amount: '5,000 USDC', value: '-$5,000.00',  time: '2d ago',   status: 'completed' },
  { id: 'tx8', type: 'buy',      asset: 'BNB',  amount: '4.2 BNB',    value: '+$2,487.70',  time: '3d ago',   status: 'pending' },
]

// ── Nav ────────────────────────────────────────────────────────────────────

export const navItems: NavItem[] = [
  { id: 'portfolio', icon: 'grid',    label: '포트폴리오' },
  { id: 'trade',     icon: 'trade',   label: '거래' },
  { id: 'markets',   icon: 'markets', label: '시장' },
  { id: 'earn',      icon: 'earn',    label: '수익' },
  { id: 'history',   icon: 'history', label: '내역' },
  { id: 'settings',  icon: 'settings', label: '설정' },
]
