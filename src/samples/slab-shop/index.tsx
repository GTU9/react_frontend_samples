import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { product } from './mock'
import './slab-shop.css'

/* ---------- tiny helpers ---------- */
function Stars({ rating }: { rating: number }) {
  return (
    <div className="slab-review-card__stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < rating ? '★' : '☆'}</span>
      ))}
    </div>
  )
}

/* ---------- brutalist spring configs ---------- */
const HARD_SPRING = { type: 'spring' as const, stiffness: 700, damping: 28, mass: 0.6 }
const SNAP_SPRING = { type: 'spring' as const, stiffness: 900, damping: 22, mass: 0.5 }

/* ---------- stagger container variant ---------- */
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055, delayChildren: 0.05 },
  },
}

const brutalReveal = {
  hidden: { opacity: 0, y: 14, skewY: 1.5 },
  visible: { opacity: 1, y: 0, skewY: 0, transition: HARD_SPRING },
}

/* ---------- main component ---------- */
export default function SlabShop() {
  const reduced = useReducedMotion() ?? false

  const [activeColor, setActiveColor] = useState(0)
  const [activeSize, setActiveSize] = useState<string | null>(null)
  const [activeThumb, setActiveThumb] = useState(0)
  const [cartCount, setCartCount] = useState(0)
  const [added, setAdded] = useState(false)
  const [cartBump, setCartBump] = useState(0)

  function handleAddToCart() {
    if (!activeSize) return
    setCartCount(c => c + 1)
    setCartBump(b => b + 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  const savings = product.originalPrice - product.price
  const savePct = Math.round((savings / product.originalPrice) * 100)

  return (
    <div className="sample-slab-shop">

      {/* NAV */}
      <nav className="slab-nav">
        <a href="#" className="slab-nav__logo">SLAB<span>.</span>SHOP</a>
        <ul className="slab-nav__links">
          <li><a href="#">신상품</a></li>
          <li><a href="#">신발</a></li>
          <li><a href="#">의류</a></li>
          <li><a href="#">컬래버</a></li>
        </ul>
        {/* Cart button with count bump animation */}
        <motion.button
          className="slab-nav__cart"
          onClick={() => {}}
          whileHover={reduced ? {} : { x: -2, y: -2, boxShadow: '5px 5px 0 #f5f5f0' }}
          whileTap={reduced ? {} : { x: 0, y: 0, boxShadow: '1px 1px 0 #f5f5f0', scale: 0.97 }}
          transition={HARD_SPRING}
        >
          장바구니 (
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={cartBump}
              initial={reduced ? false : { y: -10, opacity: 0, scale: 1.4 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={SNAP_SPRING}
              style={{ display: 'inline-block' }}
            >
              {cartCount}
            </motion.span>
          </AnimatePresence>
          )
        </motion.button>
      </nav>

      {/* BREADCRUMB */}
      <div className="slab-breadcrumb">
        홈 / 신발 / 러너 / <span>{product.title}</span>
      </div>

      {/* PRODUCT: asymmetric grid */}
      <section className="slab-product">

        {/* LEFT: visual block */}
        <motion.div
          className="slab-visual"
          variants={reduced ? {} : staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="slab-visual__main">
            <div className="slab-visual__shape-bg" />
            {/* Color-reactive geometric placeholder */}
            <motion.div
              className="slab-visual__shape-rect"
              key={activeColor}
              initial={reduced ? false : { opacity: 0, scale: 0.88, x: -8 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={HARD_SPRING}
              style={{ background: product.colors[activeColor].hex }}
            />
            <div className="slab-visual__shape-strip" />
            <div className="slab-visual__shape-circle" />
            <div className="slab-visual__label">
              {product.colors[activeColor].name} — 보기 {activeThumb + 1}/5
            </div>
            <div className="slab-visual__badge">세일 −{savePct}%</div>
          </div>

          {/* Thumbnails */}
          <div className="slab-visual__thumbs">
            {product.thumbnailColors.map((color, i) => (
              <motion.button
                key={i}
                className={`slab-visual__thumb${activeThumb === i ? ' slab-visual__thumb--active' : ''}`}
                style={{ background: color }}
                onClick={() => setActiveThumb(i)}
                whileHover={reduced ? {} : { y: -4, transition: HARD_SPRING }}
                whileTap={reduced ? {} : { scale: 0.93, transition: SNAP_SPRING }}
                aria-label={`View angle ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* RIGHT: product info — staggered brutal reveal */}
        <motion.div
          className="slab-info"
          variants={reduced ? {} : staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={reduced ? {} : brutalReveal} className="slab-info__tag">신시즌</motion.div>

          <motion.div variants={reduced ? {} : brutalReveal}>
            <h1 className="slab-info__title">{product.title}</h1>
            <p className="slab-info__subtitle">{product.subtitle}</p>
          </motion.div>

          <motion.div
            className="slab-info__price-row"
            variants={reduced ? {} : brutalReveal}
          >
            <span className="slab-info__price">${product.price}</span>
            <span className="slab-info__price-original">${product.originalPrice}</span>
            <span className="slab-info__price-save">절약 ${savings}</span>
          </motion.div>

          {/* Color swatches */}
          <motion.div className="slab-swatches" variants={reduced ? {} : brutalReveal}>
            <div className="slab-swatches__label">
              색상: {product.colors[activeColor].name}
            </div>
            <div className="slab-swatches__row">
              {product.colors.map((c, i) => (
                <motion.button
                  key={i}
                  className={`slab-swatch${activeColor === i ? ' slab-swatch--active' : ''}`}
                  style={{ background: c.hex }}
                  onClick={() => setActiveColor(i)}
                  whileHover={reduced ? {} : { x: -2, y: -2, boxShadow: '6px 6px 0px #0a0a0a', transition: HARD_SPRING }}
                  whileTap={reduced ? {} : { scale: 0.88, transition: SNAP_SPRING }}
                  aria-label={`Select color ${c.name}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Size selectors */}
          <motion.div className="slab-sizes" variants={reduced ? {} : brutalReveal}>
            <div className="slab-sizes__label">
              <span>사이즈: {activeSize ?? '사이즈 선택'}</span>
              <span className="slab-sizes__guide">사이즈 가이드</span>
            </div>
            <div className="slab-sizes__grid">
              {product.variants.map((v) => (
                <motion.button
                  key={v.size}
                  className={[
                    'slab-size-btn',
                    !v.available ? 'slab-size-btn--unavailable' : '',
                    activeSize === v.size ? 'slab-size-btn--active' : '',
                  ].join(' ').trim()}
                  onClick={() => v.available && setActiveSize(v.size)}
                  disabled={!v.available}
                  whileHover={v.available && !reduced ? { x: -2, y: -2, boxShadow: '6px 6px 0px #0a0a0a', transition: HARD_SPRING } : {}}
                  whileTap={v.available && !reduced ? { x: 0, y: 0, scale: 0.94, transition: SNAP_SPRING } : {}}
                  aria-pressed={activeSize === v.size}
                >
                  {v.size}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div className="slab-cta" variants={reduced ? {} : brutalReveal}>
            {/* Add to cart with AnimatePresence pop */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.button
                key={added ? 'added' : 'idle'}
                className="slab-cta__add"
                onClick={handleAddToCart}
                style={{
                  opacity: activeSize ? 1 : 0.55,
                  cursor: activeSize ? 'pointer' : 'not-allowed',
                  background: added ? '#0a0a0a' : undefined,
                  color: added ? '#ff5c00' : undefined,
                }}
                initial={reduced ? false : { scale: 0.96, opacity: 0.8 }}
                animate={{ scale: 1, opacity: activeSize ? 1 : 0.55 }}
                exit={reduced ? {} : { scale: 0.97, opacity: 0.7 }}
                transition={SNAP_SPRING}
                whileHover={activeSize && !reduced ? { x: -4, y: -4, boxShadow: '14px 14px 0px #0a0a0a', transition: HARD_SPRING } : {}}
                whileTap={activeSize && !reduced ? { x: 0, y: 0, boxShadow: '2px 2px 0px #0a0a0a', scale: 0.97, transition: SNAP_SPRING } : {}}
              >
                {added ? '✓ 장바구니에 담겼습니다' : activeSize ? '장바구니 담기' : '사이즈를 선택하세요'}
              </motion.button>
            </AnimatePresence>
            <motion.button
              className="slab-cta__wishlist"
              whileHover={reduced ? {} : { x: -3, y: -3, boxShadow: '9px 9px 0px #0a0a0a', transition: HARD_SPRING }}
              whileTap={reduced ? {} : { x: 0, y: 0, scale: 0.97, transition: SNAP_SPRING }}
            >
              + 위시리스트에 저장
            </motion.button>
          </motion.div>

          <motion.div className="slab-info__sku" variants={reduced ? {} : brutalReveal}>
            SKU: {product.sku}
          </motion.div>
        </motion.div>
      </section>

      {/* DESCRIPTION BAND */}
      <section className="slab-desc-band">
        <div className="slab-desc-band__label">제품 소개</div>
        <p className="slab-desc-band__text">{product.description}</p>
      </section>

      {/* SPECS */}
      <section className="slab-specs">
        <h2 className="slab-specs__heading">스펙<span>정보</span></h2>
        <motion.div
          className="slab-specs__grid"
          variants={reduced ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {product.specs.map((s) => (
            <motion.div
              key={s.label}
              className="slab-spec-row"
              variants={reduced ? {} : brutalReveal}
            >
              <div className="slab-spec-row__label">{s.label}</div>
              <div className="slab-spec-row__value">{s.value}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* REVIEWS */}
      <section className="slab-reviews">
        <div className="slab-reviews__header">
          <h2 className="slab-reviews__heading">
            고객<span>후기</span>
          </h2>
          <span className="slab-reviews__avg">
            ★ 4.25 / 5 &nbsp;·&nbsp; {product.reviews.length}개 후기
          </span>
        </div>
        <motion.div
          className="slab-reviews__grid"
          variants={reduced ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {product.reviews.map((r) => (
            <motion.div
              key={r.id}
              className="slab-review-card"
              variants={reduced ? {} : brutalReveal}
              whileHover={reduced ? {} : { x: -3, y: -3, boxShadow: '6px 6px 0px #0a0a0a', transition: HARD_SPRING }}
            >
              <div className="slab-review-card__header">
                <span className="slab-review-card__author">{r.author}</span>
                {r.verified && (
                  <span className="slab-review-card__verified">구매 확인</span>
                )}
              </div>
              <Stars rating={r.rating} />
              <p className="slab-review-card__body">{r.body}</p>
              <div className="slab-review-card__date">{r.date}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* RELATED PRODUCTS */}
      <section className="slab-related">
        <h2 className="slab-related__heading">
          이런 제품도 <span>좋아요</span>
        </h2>
        <motion.div
          className="slab-related__strip"
          variants={reduced ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {product.relatedProducts.map((p) => (
            <motion.div
              key={p.id}
              className="slab-related-card"
              variants={reduced ? {} : brutalReveal}
              whileHover={reduced ? {} : { x: -4, y: -4, boxShadow: '10px 10px 0px #0a0a0a', transition: HARD_SPRING }}
              whileTap={reduced ? {} : { scale: 0.97, x: 0, y: 0, transition: SNAP_SPRING }}
            >
              <div
                className="slab-related-card__visual"
                style={{ background: p.accentColor }}
              >
                <div className="slab-related-card__geo" />
                <div className="slab-related-card__tag">{p.tag}</div>
              </div>
              <div className="slab-related-card__info">
                <div className="slab-related-card__title">{p.title}</div>
                <div className="slab-related-card__price">${p.price}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="slab-footer">
        <div className="slab-footer__brand">SLAB<span>.</span>SHOP</div>
        <div className="slab-footer__copy">
          © 2024 SLAB INDUSTRIES. 모든 권리 보유. 타협 없음.
        </div>
      </footer>

    </div>
  )
}
