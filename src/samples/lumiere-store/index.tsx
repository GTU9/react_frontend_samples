import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import './lumiere-store.css'
import {
  navLinks,
  heroData,
  newArrivals,
  lookbookCategories,
  brandStory,
  footerColumns,
} from './mock'

/* ── Framer-motion variants ─────────────────────────────────── */
const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

/* Word-by-word split for hero headline */
function WordReveal({
  text,
  className,
  delay = 0,
  reduced,
}: {
  text: string
  className?: string
  delay?: number
  reduced: boolean
}) {
  const words = text.split(' ')
  if (reduced) {
    return <h1 className={className}>{text}</h1>
  }
  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.07,
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </h1>
  )
}

/* ── Magnetic button hook ───────────────────────────────────── */
function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.5 })

  function onMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  function onLeave() {
    x.set(0)
    y.set(0)
  }

  return { ref, springX, springY, onMove, onLeave }
}

/* ── Nav ────────────────────────────────────────────────────── */
function Nav({ reduced }: { reduced: boolean }) {
  const mag1 = useMagnetic(0.3)
  const mag2 = useMagnetic(0.3)

  return (
    <nav className="ls-nav">
      <div className="ls-container">
        <div className="ls-nav-inner">
          {/* Left links */}
          <ul className="ls-nav-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <motion.a
                  href={link.href}
                  whileHover={reduced ? {} : { color: 'var(--ls-gold)', y: -1 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {link.label}
                </motion.a>
              </li>
            ))}
          </ul>

          {/* Centered wordmark */}
          <motion.a
            href="#"
            className="ls-wordmark"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: 'easeOut', delay: 0.1 }}
          >
            Lumière
          </motion.a>

          {/* Right actions — magnetic */}
          <div className="ls-nav-actions">
            <motion.a
              ref={mag1.ref}
              href="#"
              className="ls-nav-icon"
              style={reduced ? {} : { x: mag1.springX, y: mag1.springY }}
              onMouseMove={reduced ? undefined : mag1.onMove}
              onMouseLeave={reduced ? undefined : mag1.onLeave}
            >
              검색
            </motion.a>
            <motion.a
              ref={mag2.ref}
              href="#"
              className="ls-nav-icon"
              style={reduced ? {} : { x: mag2.springX, y: mag2.springY }}
              onMouseMove={reduced ? undefined : mag2.onMove}
              onMouseLeave={reduced ? undefined : mag2.onLeave}
            >
              장바구니 (0)
            </motion.a>
          </div>
        </div>
      </div>
    </nav>
  )
}

/* ── Hero with parallax ─────────────────────────────────────── */
function Hero({ reduced }: { reduced: boolean }) {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const rawY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const parallaxY = useSpring(rawY, { stiffness: 60, damping: 20 })

  return (
    <section className="ls-hero" ref={heroRef}>
      {/* Parallax background layers */}
      <motion.div
        className="ls-hero-bg"
        style={reduced ? {} : { y: parallaxY }}
        aria-hidden="true"
      />
      <div className="ls-hero-shape" aria-hidden="true" />
      <div className="ls-hero-line" aria-hidden="true" />

      <div className="ls-hero-content ls-container">
        <motion.span
          className="ls-hero-season"
          variants={fadeIn}
          initial={reduced ? false : 'hidden'}
          animate="visible"
          custom={0}
        >
          {heroData.season}
        </motion.span>

        <WordReveal
          text={heroData.headline}
          className="ls-hero-headline"
          delay={0.18}
          reduced={reduced}
        />

        <motion.p
          className="ls-hero-subline"
          variants={fadeUp}
          initial={reduced ? false : 'hidden'}
          animate="visible"
          custom={0.55}
        >
          {heroData.subline}
        </motion.p>

        <MagneticCta reduced={reduced} />
      </div>
    </section>
  )
}

/* Magnetic hero CTA */
function MagneticCta({ reduced }: { reduced: boolean }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 18 })
  const springY = useSpring(y, { stiffness: 180, damping: 18 })
  const ref = useRef<HTMLAnchorElement>(null)

  function onMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.4)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.4)
  }
  function onLeave() { x.set(0); y.set(0) }

  return (
    <motion.a
      ref={ref}
      href="#collections"
      className="ls-hero-cta"
      variants={fadeUp}
      initial={reduced ? false : 'hidden'}
      animate="visible"
      custom={0.7}
      style={reduced ? {} : { x: springX, y: springY }}
      onMouseMove={reduced ? undefined : onMove}
      onMouseLeave={reduced ? undefined : onLeave}
    >
      {heroData.cta}
      <span className="ls-hero-cta-arrow" aria-hidden="true">→</span>
    </motion.a>
  )
}

/* ── New Arrivals grid ──────────────────────────────────────── */
function NewArrivals({ reduced }: { reduced: boolean }) {
  return (
    <section className="ls-arrivals" id="collections">
      <div className="ls-container">
        <div className="ls-arrivals-header">
          <div>
            <motion.span
              className="ls-section-overline"
              variants={fadeIn}
              initial={reduced ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              신상품
            </motion.span>
            <motion.h2
              className="ls-section-title"
              variants={fadeUp}
              initial={reduced ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.1}
            >
              이 시즌의 선택
            </motion.h2>
          </div>
          <motion.a
            href="#"
            className="ls-arrivals-view-all"
            variants={fadeIn}
            initial={reduced ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
          >
            전체 보기
          </motion.a>
        </div>

        <div className="ls-product-grid">
          {newArrivals.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              reduced={reduced}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* Product card with image zoom + staggered whileInView */
function ProductCard({
  product,
  index,
  reduced,
}: {
  product: typeof newArrivals[number]
  index: number
  reduced: boolean
}) {
  return (
    <motion.article
      className="ls-product-card"
      variants={fadeUp}
      initial={reduced ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={index * 0.12}
    >
      {/* Image container — overflow hidden for zoom containment */}
      <div className="ls-product-img">
        <motion.div
          className="ls-product-img-bg"
          style={{ backgroundColor: product.color }}
          whileHover={reduced ? {} : { scale: 1.08 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Hover reveal quick-add */}
        <div className="ls-product-overlay">
          <motion.a
            href="#"
            className="ls-product-quick-btn"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            빠른 보기
          </motion.a>
        </div>
      </div>

      <p className="ls-product-category">{product.category}</p>
      <p className="ls-product-name">{product.name}</p>
      <p className="ls-product-price">{product.price}</p>
    </motion.article>
  )
}

/* ── Lookbook / Category band ───────────────────────────────── */
function Lookbook({ reduced }: { reduced: boolean }) {
  return (
    <section className="ls-lookbook" id="lookbook">
      <div className="ls-container">
        <motion.div
          className="ls-lookbook-header"
          variants={fadeUp}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          <span className="ls-section-overline">룩북</span>
          <h2 className="ls-section-title" style={{ color: 'var(--ls-ivory)' }}>
            카테고리별 쇼핑
          </h2>
        </motion.div>
      </div>

      <div className="ls-container">
        <motion.div
          className="ls-lookbook-strip"
          variants={fadeIn}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.15}
        >
          {lookbookCategories.map((cat, i) => (
            <LookbookTile key={cat.id} cat={cat} index={i} reduced={reduced} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function LookbookTile({
  cat,
  index,
  reduced,
}: {
  cat: typeof lookbookCategories[number]
  index: number
  reduced: boolean
}) {
  return (
    <motion.a
      href="#"
      className="ls-lookbook-tile"
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.09 }}
    >
      <motion.div
        className="ls-lookbook-tile-bg"
        style={{ backgroundColor: cat.color }}
        whileHover={reduced ? {} : { scale: 1.06 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="ls-lookbook-tile-label">
        <span className="ls-lookbook-tile-divider" />
        {cat.label}
      </div>
    </motion.a>
  )
}

/* ── Brand story split ──────────────────────────────────────── */
function BrandStory({ reduced }: { reduced: boolean }) {
  return (
    <section className="ls-brand" id="about">
      <div className="ls-container">
        <div className="ls-brand-inner">
          {/* Left — editorial visual placeholder */}
          <motion.div
            className="ls-brand-visual"
            variants={fadeIn}
            initial={reduced ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <div className="ls-brand-visual-bg" />
          </motion.div>

          {/* Right — copy */}
          <motion.div
            className="ls-brand-text-wrap"
            variants={fadeUp}
            initial={reduced ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
          >
            <span className="ls-brand-overline">{brandStory.overline}</span>
            <h2 className="ls-brand-headline">{brandStory.headline}</h2>
            <p className="ls-brand-body">{brandStory.body}</p>
            <span className="ls-brand-detail">{brandStory.detail}</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="ls-footer">
      <div className="ls-container">
        <div className="ls-footer-top">
          {/* Brand column */}
          <div className="ls-footer-brand-col">
            <a href="#" className="ls-wordmark">Lumière</a>
            <p className="ls-footer-tagline">
              조용한 럭셔리, 변치 않는 디자인.
              <br />파리 · 밀라노 · 뉴욕
            </p>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <p className="ls-footer-col-heading">{col.heading}</p>
              <ul className="ls-footer-links">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="ls-footer-bottom">
          <p className="ls-footer-copy">© 2025 Maison Lumière. 모든 권리 보유.</p>
          <ul className="ls-footer-legal">
            <li><a href="#">개인정보 처리방침</a></li>
            <li><a href="#">이용약관</a></li>
            <li><a href="#">쿠키 정책</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

/* ── Root component ─────────────────────────────────────────── */
export default function LumiereStore() {
  const reduced = useReducedMotion() ?? false

  return (
    <div className="sample-lumiere-store">
      <Nav reduced={reduced} />
      <Hero reduced={reduced} />
      <hr className="ls-gold-rule" />
      <NewArrivals reduced={reduced} />
      <Lookbook reduced={reduced} />
      <BrandStory reduced={reduced} />
      <Footer />
    </div>
  )
}
