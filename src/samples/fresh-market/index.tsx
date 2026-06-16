import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import './fresh-market.css'
import {
  categories,
  products,
  deals,
  type Product,
  type Category,
  type Deal,
} from './mock'

// ── Spring configs ────────────────────────────────────────────────────────
const BOUNCY = { type: 'spring' as const, stiffness: 500, damping: 22, mass: 0.7 }
const PLAYFUL = { type: 'spring' as const, stiffness: 380, damping: 18, mass: 0.8 }

// ── Stagger container ─────────────────────────────────────────────────────
const cardStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
}

const cardItem = {
  hidden: { opacity: 0, y: 22, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: BOUNCY,
  },
}

// ── Animated count-up for cart total ─────────────────────────────────────
function CountUp({ value, decimals = 2 }: { value: number; decimals: number }) {
  const [displayed, setDisplayed] = useState(value)
  const prev = useRef(value)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    const start = prev.current
    const end = value
    prev.current = value
    if (Math.abs(end - start) < 0.001) return

    const duration = 380
    const startTime = performance.now()

    function tick(now: number) {
      const t = Math.min((now - startTime) / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplayed(start + (end - start) * eased)
      if (t < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => { if (raf.current !== null) cancelAnimationFrame(raf.current) }
  }, [value])

  return <>${displayed.toFixed(decimals)}</>
}

// ── Star rating display ───────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  const full  = Math.floor(rating)
  const half  = rating % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  return (
    <span className="fm-stars" aria-label={`${rating} out of 5 stars`}>
      {'★'.repeat(full)}
      {half ? '½' : ''}
      {'☆'.repeat(empty)}
    </span>
  )
}

// ── Badge pill ────────────────────────────────────────────────────────────

function Badge({ type }: { type: Product['badge'] }) {
  if (!type) return null
  const labels: Record<string, string> = { sale: '세일', new: '신상', organic: '유기농' }
  return <span className={`fm-badge fm-badge--${type}`}>{labels[type]}</span>
}

// ── Quantity stepper inside cart ──────────────────────────────────────────

function Stepper({
  count,
  onInc,
  onDec,
  reduced,
}: {
  count: number
  onInc: () => void
  onDec: () => void
  reduced: boolean
}) {
  return (
    <div className="fm-stepper">
      <motion.button
        className="fm-stepper-btn"
        onClick={onDec}
        aria-label="하나 빼기"
        whileTap={reduced ? {} : { scale: 0.85, transition: BOUNCY }}
      >
        −
      </motion.button>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={count}
          className="fm-stepper-count"
          initial={reduced ? false : { y: -10, opacity: 0, scale: 1.3 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 10, opacity: 0, scale: 0.8 }}
          transition={BOUNCY}
        >
          {count}
        </motion.span>
      </AnimatePresence>
      <motion.button
        className="fm-stepper-btn"
        onClick={onInc}
        aria-label="하나 추가"
        whileTap={reduced ? {} : { scale: 0.85, transition: BOUNCY }}
      >
        +
      </motion.button>
    </div>
  )
}

// ── Product card ──────────────────────────────────────────────────────────

function ProductCard({
  product,
  qty,
  onAdd,
  onInc,
  onDec,
  reduced,
}: {
  product: Product
  qty: number
  onAdd: () => void
  onInc: () => void
  onDec: () => void
  reduced: boolean
}) {
  return (
    <motion.div
      className="fm-product-card"
      variants={cardItem}
      layout
      whileHover={reduced ? {} : {
        y: -4,
        boxShadow: '0 12px 32px rgba(0,0,0,.13)',
        borderColor: 'var(--fm-green-mid)',
        transition: PLAYFUL,
      }}
    >
      <div className="fm-product-image">
        <motion.span
          className="fm-product-emoji"
          role="img"
          aria-label={product.name}
          whileHover={reduced ? {} : { scale: 1.15, rotate: 6, transition: BOUNCY }}
        >
          {product.emoji}
        </motion.span>
        <Badge type={product.badge} />
      </div>

      <div className="fm-product-body">
        <p className="fm-product-name">{product.name}</p>
        <div className="fm-product-meta">
          <StarRating rating={product.rating} />
          <span className="fm-product-reviews">({product.reviewCount})</span>
        </div>
        <div className="fm-product-pricing">
          <span className="fm-product-price">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="fm-product-original">${product.originalPrice.toFixed(2)}</span>
          )}
          <span className="fm-product-unit">{product.unit}</span>
        </div>
      </div>

      <div className="fm-product-action">
        <AnimatePresence mode="wait">
          {qty === 0 ? (
            <motion.button
              key="add"
              className="fm-add-btn"
              onClick={onAdd}
              initial={reduced ? false : { opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? {} : { opacity: 0, scale: 0.82 }}
              transition={BOUNCY}
              whileTap={reduced ? {} : { scale: 0.9, transition: BOUNCY }}
            >
              + 담기
            </motion.button>
          ) : (
            <motion.div
              key="stepper"
              initial={reduced ? false : { opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? {} : { opacity: 0, scale: 0.82 }}
              transition={BOUNCY}
              style={{ width: '100%' }}
            >
              <Stepper count={qty} onInc={onInc} onDec={onDec} reduced={reduced} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ── Category chip ─────────────────────────────────────────────────────────

function CategoryChip({
  cat,
  active,
  onClick,
  reduced,
}: {
  cat: Category
  active: boolean
  onClick: () => void
  reduced: boolean
}) {
  return (
    <motion.button
      className={`fm-chip${active ? ' fm-chip--active' : ''}`}
      onClick={onClick}
      whileTap={reduced ? {} : { scale: 0.92, transition: BOUNCY }}
      animate={active && !reduced ? { scale: 1.06 } : { scale: 1 }}
      transition={BOUNCY}
    >
      <motion.span
        className="fm-chip-emoji"
        animate={active && !reduced ? { rotate: [0, -10, 8, 0] } : { rotate: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {cat.emoji}
      </motion.span>
      {cat.label}
    </motion.button>
  )
}

// ── Deal card ─────────────────────────────────────────────────────────────

function DealCard({ deal, index, reduced }: { deal: Deal; index: number; reduced: boolean }) {
  return (
    <motion.div
      className="fm-deal-card"
      style={{ background: deal.bg }}
      initial={reduced ? false : { opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: 0.55 + index * 0.07, ease: 'easeOut' }}
      whileHover={reduced ? {} : { y: -4, boxShadow: '0 10px 28px rgba(0,0,0,.12)', transition: PLAYFUL }}
      whileTap={reduced ? {} : { scale: 0.97, transition: BOUNCY }}
    >
      <motion.span
        className="fm-deal-emoji"
        role="img"
        aria-hidden="true"
        whileHover={reduced ? {} : { scale: 1.2, rotate: -8, transition: BOUNCY }}
      >
        {deal.emoji}
      </motion.span>
      <div className="fm-deal-body">
        <p className="fm-deal-title">{deal.title}</p>
        <p className="fm-deal-sub">{deal.subtitle}</p>
      </div>
      <span className="fm-deal-badge">{deal.discount}</span>
    </motion.div>
  )
}

// ── Cart mini panel ───────────────────────────────────────────────────────

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 1h3.5l2.3 11.5h9.4l2.3-8H6" />
      <circle cx="9" cy="18.5" r="1.5" />
      <circle cx="16" cy="18.5" r="1.5" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="8" cy="8" r="5.5" />
      <path d="M13 13l3 3" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5s4.5-5 4.5-8.5c0-2.5-2-4.5-4.5-4.5z" />
      <circle cx="8" cy="6" r="1.5" />
    </svg>
  )
}

// ── Main component ────────────────────────────────────────────────────────

export default function FreshMarket() {
  const reduced = useReducedMotion() ?? false

  const [activeCategory, setActiveCategory] = useState('all')
  const [cart, setCart] = useState<Record<string, number>>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [cartBump, setCartBump] = useState(0)

  // Cart helpers
  const addToCart = useCallback((id: string) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }))
    setCartBump(b => b + 1)
  }, [])

  const incQty = useCallback((id: string) => {
    setCart(prev => ({ ...prev, [id]: prev[id] + 1 }))
    setCartBump(b => b + 1)
  }, [])

  const decQty = useCallback((id: string) => {
    setCart(prev => {
      const next = (prev[id] ?? 0) - 1
      if (next <= 0) {
        const copy = { ...prev }
        delete copy[id]
        return copy
      }
      return { ...prev, [id]: next }
    })
  }, [])

  const totalItems = Object.values(cart).reduce((s, v) => s + v, 0)
  const totalPrice = products.reduce((s, p) => s + (cart[p.id] ?? 0) * p.price, 0)

  // Filter products
  const visible = products.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="sample-fresh-market">

      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <header className="fm-topbar">
        <div className="fm-topbar-inner">
          {/* Logo */}
          <div className="fm-logo">
            <motion.span
              className="fm-logo-leaf"
              aria-hidden="true"
              animate={reduced ? {} : { rotate: [0, -15, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
            >
              🌿
            </motion.span>
            <span className="fm-logo-text">FreshMarket</span>
          </div>

          {/* Location */}
          <button className="fm-location-btn">
            <LocationIcon />
            <span className="fm-location-label">배달 지역 <strong>SE1 7PB</strong></span>
          </button>

          {/* Search */}
          <div className="fm-search-wrap">
            <SearchIcon />
            <input
              className="fm-search-input"
              type="text"
              placeholder="식료품 검색…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="식료품 검색"
            />
          </div>

          {/* Cart — bouncy bump on add */}
          <motion.button
            className="fm-cart-btn"
            aria-label={`장바구니, ${totalItems}개 상품`}
            whileTap={reduced ? {} : { scale: 0.93, transition: BOUNCY }}
            animate={reduced ? {} : { scale: [1, 1.12, 0.96, 1] }}
            key={cartBump}
            transition={{ duration: 0.38, ease: 'easeInOut' }}
          >
            <CartIcon />
            <AnimatePresence mode="popLayout">
              {totalItems > 0 && (
                <motion.span
                  key="badge"
                  className="fm-cart-badge"
                  initial={reduced ? false : { scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={BOUNCY}
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={totalItems}
                      initial={reduced ? false : { y: -8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 8, opacity: 0 }}
                      transition={BOUNCY}
                      style={{ display: 'inline-block' }}
                    >
                      {totalItems}
                    </motion.span>
                  </AnimatePresence>
                </motion.span>
              )}
            </AnimatePresence>
            {totalItems > 0 && (
              <span className="fm-cart-total">
                {reduced ? `$${totalPrice.toFixed(2)}` : <CountUp value={totalPrice} decimals={2} />}
              </span>
            )}
          </motion.button>
        </div>
      </header>

      {/* ── Hero banner ──────────────────────────────────────────────────── */}
      <motion.section
        className="fm-hero"
        initial={reduced ? false : { opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <div className="fm-hero-inner">
          <div className="fm-hero-text">
            <motion.p
              className="fm-hero-tag"
              initial={reduced ? false : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
            >
              오늘 무료 배송
            </motion.p>
            <motion.h1
              className="fm-hero-title"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
            >
              문 앞까지 신선하게 <span>60분</span> 내 배달
            </motion.h1>
            <motion.p
              className="fm-hero-sub"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.35, ease: 'easeOut' }}
            >
              $30 이상 주문 시 · 쿠폰 코드 불필요
            </motion.p>
            <motion.button
              className="fm-hero-cta"
              initial={reduced ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...BOUNCY, delay: 0.45 }}
              whileTap={reduced ? {} : { scale: 0.95, transition: BOUNCY }}
              whileHover={reduced ? {} : { scale: 1.05, transition: BOUNCY }}
            >
              지금 쇼핑하기
            </motion.button>
          </div>

          {/* CSS produce illustration using emoji shapes */}
          <div className="fm-hero-illustration" aria-hidden="true">
            <div className="fm-produce-blob fm-produce-blob--1">🍎</div>
            <div className="fm-produce-blob fm-produce-blob--2">🥦</div>
            <div className="fm-produce-blob fm-produce-blob--3">🍋</div>
            <div className="fm-produce-blob fm-produce-blob--4">🍓</div>
            <div className="fm-produce-blob fm-produce-blob--5">🥕</div>
          </div>
        </div>
      </motion.section>

      {/* ── Category chips ────────────────────────────────────────────────── */}
      <section className="fm-categories-section">
        <div className="fm-categories-scroll">
          {categories.map(cat => (
            <CategoryChip
              key={cat.id}
              cat={cat}
              active={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
              reduced={reduced}
            />
          ))}
        </div>
      </section>

      {/* ── Product grid ─────────────────────────────────────────────────── */}
      <main className="fm-main">
        <div className="fm-section-header">
          <h2 className="fm-section-title">
            {activeCategory === 'all' ? '전체 상품' : categories.find(c => c.id === activeCategory)?.label}
          </h2>
          <motion.span
            className="fm-section-count"
            key={visible.length}
            initial={reduced ? false : { scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={BOUNCY}
          >
            {visible.length}개 상품
          </motion.span>
        </div>

        <AnimatePresence mode="wait">
          {visible.length > 0 ? (
            <motion.div
              key={activeCategory + searchQuery}
              className="fm-product-grid"
              variants={reduced ? {} : cardStagger}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              {visible.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  qty={cart[product.id] ?? 0}
                  onAdd={() => addToCart(product.id)}
                  onInc={() => incQty(product.id)}
                  onDec={() => decQty(product.id)}
                  reduced={reduced}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="fm-empty"
              initial={reduced ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={BOUNCY}
            >
              <span className="fm-empty-emoji">🔍</span>
              <p>"<strong>{searchQuery}</strong>"에 해당하는 상품이 없습니다</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Deals strip ───────────────────────────────────────────────── */}
        <section className="fm-deals-section">
          <div className="fm-section-header">
            <h2 className="fm-section-title">오늘의 특가</h2>
            <span className="fm-deals-flame" aria-hidden="true">🔥</span>
          </div>
          <div className="fm-deals-grid">
            {deals.map((deal, i) => (
              <DealCard key={deal.id} deal={deal} index={i} reduced={reduced} />
            ))}
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="fm-footer">
        <div className="fm-footer-inner">
          <div className="fm-footer-brand">
            <span className="fm-logo-leaf" aria-hidden="true">🌿</span>
            <span className="fm-logo-text">FreshMarket</span>
          </div>
          <div className="fm-footer-links">
            <a href="#" className="fm-footer-link">회사 소개</a>
            <a href="#" className="fm-footer-link">자주 묻는 질문</a>
            <a href="#" className="fm-footer-link">채용</a>
            <a href="#" className="fm-footer-link">개인정보 처리방침</a>
          </div>
          <p className="fm-footer-copy">© 2026 FreshMarket. 신선하고, 빠르고, 친절하게.</p>
        </div>
      </footer>
    </div>
  )
}
