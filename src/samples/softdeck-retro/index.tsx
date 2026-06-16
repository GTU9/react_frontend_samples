import { useState, useRef, useCallback } from 'react'
import { motion, useReducedMotion, useMotionValue, useSpring } from 'framer-motion'
import { mock } from './mock'
import './softdeck-retro.css'

/* ---------- reduced motion hook ---------- */
function useIsReduced() {
  const r = useReducedMotion()
  return r ?? false
}

/* ---------- animation variants (transform/opacity only) ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' },
  }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

/* springy card entrance */
const springCard = {
  hidden: { opacity: 0, y: 48, scale: 0.94 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      type: 'spring',
      stiffness: 260,
      damping: 22,
    },
  }),
}

/* ---------- Magnetic CTA hook ---------- */
function useMagnetic(reduced: boolean) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 18 })
  const sy = useSpring(y, { stiffness: 180, damping: 18 })

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (reduced || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      x.set((e.clientX - (rect.left + rect.width / 2)) * 0.38)
      y.set((e.clientY - (rect.top + rect.height / 2)) * 0.38)
    },
    [reduced, x, y]
  )

  const onMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return { ref, sx, sy, onMouseMove, onMouseLeave }
}

/* ---------- Header ---------- */
function Header() {
  return (
    <header className="sd-header">
      <div className="sd-container">
        <div className="sd-header-inner">
          <a href="#" className="sd-logo">
            <div className="sd-logo-mark">{mock.brand.logo}</div>
            <span className="sd-logo-text">{mock.brand.name}</span>
          </a>
          <nav>
            <ul className="sd-nav">
              {mock.nav.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="sd-nav-link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#pricing" className="sd-btn sd-btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}>
            시작하기
          </a>
        </div>
      </div>
    </header>
  )
}

/* ---------- Sunburst (rotating retro motif) ---------- */
function Sunburst({ reduced }: { reduced: boolean }) {
  return (
    <div
      className="sd-sunburst"
      aria-hidden="true"
      style={reduced ? {} : { animation: 'sd-spin 60s linear infinite' }}
    />
  )
}

/* ---------- Product Panel (neumorphic CSS art device) ---------- */
function ProductPanel({ reduced }: { reduced: boolean }) {
  const { productPanel: p } = mock
  return (
    <motion.div
      className="sd-product-panel"
      variants={fadeIn}
      initial={reduced ? false : 'hidden'}
      animate="visible"
    >
      <motion.div
        className="sd-panel-device"
        whileHover={reduced ? {} : { y: -6, boxShadow: '-10px -10px 20px rgba(255,248,230,0.95), 10px 10px 20px rgba(160,120,70,0.5)' }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        {/* titlebar */}
        <div className="sd-panel-titlebar">
          <div className="sd-panel-dot" />
          <div className="sd-panel-dot" />
          <div className="sd-panel-dot" />
          <span className="sd-panel-title">{p.title}</span>
        </div>

        {/* screen / canvas area */}
        <div className="sd-panel-screen">
          <p className="sd-panel-screen-title">{p.title}</p>
          <p className="sd-panel-screen-desc">{p.description}</p>
          <div className="sd-panel-stats">
            {p.stats.map((s) => (
              <div className="sd-panel-stat" key={s.label}>
                <span className="sd-panel-stat-val">{s.value}</span>
                <span className="sd-panel-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* controls row */}
        <div className="sd-panel-controls">
          <div className="sd-panel-knob" aria-hidden="true" />
          <span className="sd-panel-indicator">{p.indicator}</span>
          <div className="sd-panel-slider-track" aria-hidden="true">
            <div className="sd-panel-slider-fill" />
            <div className="sd-panel-slider-thumb" />
          </div>
          <div className="sd-panel-knob" aria-hidden="true" />
        </div>
      </motion.div>

      {/* retro badge below device */}
      <div className="sd-retro-badge">RetroCore™ v3 — READY</div>
    </motion.div>
  )
}

/* ---------- Hero ---------- */
function Hero() {
  const reduced = useIsReduced()
  const { hero } = mock
  const magnetic = useMagnetic(reduced)

  return (
    <section className="sd-hero">
      <Sunburst reduced={reduced} />
      <div className="sd-container">
        <div className="sd-hero-grid">
          {/* copy */}
          <div className="sd-hero-copy">
            <motion.div
              className="sd-hero-badge"
              variants={fadeUp}
              custom={0}
              initial={reduced ? false : 'hidden'}
              animate="visible"
            >
              {hero.badge}
            </motion.div>

            <motion.h1
              className="sd-hero-headline"
              variants={fadeUp}
              custom={1}
              initial={reduced ? false : 'hidden'}
              animate="visible"
            >
              덱을 만드세요
              <span>1989년 감성으로</span>
            </motion.h1>

            <motion.p
              className="sd-hero-sub"
              variants={fadeUp}
              custom={2}
              initial={reduced ? false : 'hidden'}
              animate="visible"
            >
              {hero.sub}
            </motion.p>

            <motion.div
              className="sd-hero-actions"
              variants={fadeUp}
              custom={3}
              initial={reduced ? false : 'hidden'}
              animate="visible"
            >
              {/* Magnetic primary CTA */}
              <motion.a
                ref={magnetic.ref}
                href="#pricing"
                className="sd-btn sd-btn-primary"
                style={{ x: magnetic.sx, y: magnetic.sy }}
                onMouseMove={magnetic.onMouseMove}
                onMouseLeave={magnetic.onMouseLeave}
                whileTap={reduced ? {} : {
                  scale: 0.96,
                  boxShadow: 'inset 4px 4px 8px rgba(160,100,30,0.5), inset -4px -4px 8px rgba(255,220,140,0.7)',
                }}
              >
                {hero.cta}
              </motion.a>
              <motion.a
                href="#features"
                className="sd-btn"
                whileHover={reduced ? {} : { y: -3 }}
                whileTap={reduced ? {} : { scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {hero.ctaSecondary}
              </motion.a>
            </motion.div>
          </div>

          {/* product panel */}
          <ProductPanel reduced={reduced} />
        </div>
      </div>
    </section>
  )
}

/* ---------- Features ---------- */
function Features() {
  const reduced = useIsReduced()
  return (
    <section className="sd-features" id="features">
      <div className="sd-container">
        <p className="sd-section-eyebrow">무엇이 들어 있나요</p>
        <h2 className="sd-section-title">장인 정신으로 만든 도구</h2>
        <p className="sd-section-sub">
          보기에도 좋고 느낌도 좋은 프레젠테이션을 만드는 데 필요한 모든 도구 — 부드럽고, 촉감이 살아있고, 확실한 레트로 감성.
        </p>

        <div className="sd-features-grid">
          {mock.features.map((f, i) => (
            <motion.div
              key={f.title}
              className="sd-feature-card"
              variants={springCard}
              custom={i}
              initial={reduced ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={reduced ? {} : { y: -5, scale: 1.02 }}
              whileTap={reduced ? {} : { scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div className="sd-feature-icon" aria-hidden="true">{f.icon}</div>
              <h3 className="sd-feature-title">{f.title}</h3>
              <p className="sd-feature-desc">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Specs ---------- */
function Specs() {
  const reduced = useIsReduced()
  return (
    <section className="sd-specs" id="specs">
      <div className="sd-container">
        <motion.div
          className="sd-specs-inner"
          variants={fadeIn}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="sd-specs-header">
            <span className="sd-specs-badge">기술 사양</span>
            <h3 className="sd-specs-title">내부를 들여다보면</h3>
          </div>
          <div className="sd-specs-grid">
            {mock.specs.map((s) => (
              <div key={s.label} className="sd-spec-row">
                <span className="sd-spec-label">{s.label}</span>
                <span className="sd-spec-value">{s.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Pricing ---------- */
function Pricing() {
  const reduced = useIsReduced()
  const [selected, setSelected] = useState(1) // default: middle tier

  return (
    <section className="sd-pricing" id="pricing">
      <div className="sd-container">
        <p className="sd-section-eyebrow">요금제</p>
        <h2 className="sd-section-title">나에게 맞는 플랜 선택</h2>
        <p className="sd-section-sub">
          주말 실험부터 풀 스튜디오 제작까지. 숨겨진 비용 없이 — 솔직하고 명확한 정가제.
        </p>

        <div className="sd-pricing-grid">
          {mock.pricing.map((tier, i) => (
            <motion.div
              key={tier.tier}
              className={`sd-price-card${selected === i ? ' sd-price-card--selected' : ''}`}
              variants={springCard}
              custom={i}
              initial={reduced ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              onClick={() => setSelected(i)}
              style={{ cursor: 'pointer' }}
              whileHover={reduced ? {} : { y: -5 }}
              whileTap={reduced ? {} : { scale: 0.98 }}
              animate={
                selected === i && !reduced
                  ? { scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 24 } }
                  : { scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
              }
            >
              {selected === i && (
                <span className="sd-price-selected-pill">선택됨</span>
              )}
              <p className="sd-price-tier">{tier.tier}</p>
              <div className="sd-price-amount">
                <span className="sd-price-value">{tier.price}</span>
                <span className="sd-price-period">{tier.period}</span>
              </div>
              <p className="sd-price-desc">{tier.desc}</p>
              <div className="sd-price-divider" />
              <ul className="sd-price-features">
                {tier.features.map((f) => (
                  <li key={f} className="sd-price-feature">{f}</li>
                ))}
              </ul>
              <div className="sd-price-cta">
                <motion.button
                  className={`sd-btn${selected === i ? ' sd-btn-primary' : ''}`}
                  style={{ width: '100%' }}
                  onClick={(e) => { e.stopPropagation(); setSelected(i) }}
                  whileTap={reduced ? {} : {
                    scale: 0.96,
                    boxShadow: selected === i
                      ? 'inset 4px 4px 8px rgba(160,100,30,0.5), inset -4px -4px 8px rgba(255,220,140,0.7)'
                      : 'inset 4px 4px 8px rgba(160,120,70,0.45), inset -4px -4px 8px rgba(255,248,230,0.90)',
                  }}
                >
                  {tier.cta}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Newsletter ---------- */
function Newsletter() {
  const reduced = useIsReduced()
  const { newsletter: nl } = mock
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  return (
    <section className="sd-newsletter" id="contact">
      <div className="sd-container">
        <motion.div
          className="sd-newsletter-inner"
          variants={fadeIn}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="sd-newsletter-content">
            <p className="sd-section-eyebrow">{nl.heading}</p>
            <h2 className="sd-section-title" style={{ marginBottom: 0 }}>
              새 소식 받아보기
            </h2>
            <p className="sd-newsletter-sub">{nl.sub}</p>

            {submitted ? (
              <motion.div
                className="sd-retro-badge"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                ◆ 구독 완료 — 감사합니다!
              </motion.div>
            ) : (
              <form className="sd-newsletter-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="sd-input"
                  placeholder={nl.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="이메일 주소"
                />
                <motion.button
                  type="submit"
                  className="sd-btn sd-btn-primary"
                  whileTap={reduced ? {} : {
                    scale: 0.96,
                    boxShadow: 'inset 4px 4px 8px rgba(160,100,30,0.5), inset -4px -4px 8px rgba(255,220,140,0.7)',
                  }}
                >
                  {nl.cta}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Footer ---------- */
function Footer() {
  const { footer, brand } = mock
  return (
    <footer className="sd-footer">
      <div className="sd-container">
        <div className="sd-footer-inner">
          <ul className="sd-footer-links">
            {footer.links.map((l) => (
              <li key={l}>
                <a href="#" className="sd-footer-link">{l}</a>
              </li>
            ))}
          </ul>

          <div className="sd-footer-right">
            <ul className="sd-social">
              {footer.social.map((s) => (
                <li key={s}>
                  <a href="#" className="sd-social-btn" aria-label={s}>{s}</a>
                </li>
              ))}
            </ul>
            <span className="sd-footer-copy">{brand.year} {brand.name}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ---------- Root export ---------- */
export default function SoftdeckRetro() {
  return (
    <div className="sample-softdeck-retro">
      <Header />
      <main>
        <Hero />
        <Features />
        <Specs />
        <Pricing />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
