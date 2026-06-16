import {
  useReducedMotion,
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import { useRef, useCallback } from 'react'
import './aurora-landing.css'
import {
  navLinks,
  heroData,
  logos,
  features,
  pricingTiers,
  testimonial,
  footerLinks,
} from './mock'

/* ── Framer-motion variants ─────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay },
  }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut', delay },
  }),
}

/* Word-split stagger variants */
const wordContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
}

const wordChild = {
  hidden: { opacity: 0, y: 36, rotateX: -40 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

/* Glass tilt card hook */
function useTilt(reduced: boolean) {
  const ref = useRef<HTMLDivElement>(null)
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const springX = useSpring(rotX, { stiffness: 280, damping: 28 })
  const springY = useSpring(rotY, { stiffness: 280, damping: 28 })

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)
      rotX.set(-dy * 10)
      rotY.set(dx * 10)
    },
    [reduced, rotX, rotY]
  )

  const onMouseLeave = useCallback(() => {
    rotX.set(0)
    rotY.set(0)
  }, [rotX, rotY])

  return { ref, springX, springY, onMouseMove, onMouseLeave }
}

/* Magnetic CTA hook */
function useMagnetic(reduced: boolean) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 20 })
  const sy = useSpring(y, { stiffness: 200, damping: 20 })

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (reduced || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      x.set((e.clientX - cx) * 0.35)
      y.set((e.clientY - cy) * 0.35)
    },
    [reduced, x, y]
  )

  const onMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return { ref, sx, sy, onMouseMove, onMouseLeave }
}

/* Tilt feature card */
function TiltCard({
  reduced,
  children,
  className,
}: {
  reduced: boolean
  children: React.ReactNode
  className: string
}) {
  const { ref, springX, springY, onMouseMove, onMouseLeave } = useTilt(reduced)
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 900,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  )
}

/* ── Sub-components ─────────────────────────────────────────── */

function Navbar({ reduced: _reduced }: { reduced: boolean }) {
  return (
    <nav className="al-nav">
      <div className="al-container">
        <div className="al-nav-inner">
          <a href="#" className="al-logo">
            <span className="al-logo-mark">A</span>
            Aurora
          </a>
          <ul className="al-nav-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <a href="#pricing" className="al-nav-cta">
            시작하기
          </a>
        </div>
      </div>
    </nav>
  )
}

function HeroMockup({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="glass al-hero-mockup"
      initial={reduced ? false : { opacity: 0, y: 40, scale: 0.96 }}
      animate={reduced ? {} : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.35 }}
      style={reduced ? {} : { animation: 'al-float 6s ease-in-out infinite' }}
    >
      {/* Window chrome */}
      <div className="al-mockup-header">
        <div className="al-mockup-dots">
          <span className="al-mockup-dot al-mockup-dot-r" />
          <span className="al-mockup-dot al-mockup-dot-y" />
          <span className="al-mockup-dot al-mockup-dot-g" />
        </div>
        <span className="al-mockup-title">aurora.app — 워크스페이스</span>
      </div>

      {/* Stats row */}
      <div className="al-mockup-stats">
        {heroData.mockupStats.map((stat) => (
          <div key={stat.label} className="al-stat-card">
            <div className="al-stat-value">{stat.value}</div>
            <div className="al-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Progress bars */}
      <div className="al-mockup-bar-section">
        {[
          { label: '스프린트 진행률', pct: 74 },
          { label: 'AI 제안 활용률', pct: 58 },
          { label: '팀 역량', pct: 89 },
        ].map((bar) => (
          <div key={bar.label}>
            <div className="al-mockup-bar-label">
              <span>{bar.label}</span>
              <span>{bar.pct}%</span>
            </div>
            <div className="al-mockup-bar-track">
              <motion.div
                className="al-mockup-bar-fill"
                initial={reduced ? false : { width: 0 }}
                animate={reduced ? {} : { width: `${bar.pct}%` }}
                transition={{ duration: 1.1, ease: 'easeOut', delay: 0.7 }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function Hero({ reduced }: { reduced: boolean }) {
  const magnetic = useMagnetic(reduced)
  const words = heroData.headline.replace('\n', ' ').split(' ')

  return (
    <section className="al-hero" id="product">
      <div className="al-container">
        <div className="al-hero-inner">
          {/* Badge */}
          <motion.div
            className="al-badge"
            variants={fadeIn}
            initial={reduced ? false : 'hidden'}
            animate="visible"
            custom={0}
          >
            <span className="al-badge-dot" />
            {heroData.badge}
          </motion.div>

          {/* Headline — word split reveal */}
          <motion.h1
            className="al-headline al-headline-split"
            variants={reduced ? undefined : wordContainer}
            initial={reduced ? false : 'hidden'}
            animate="visible"
            aria-label={heroData.headline}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={reduced ? undefined : wordChild}
                className={
                  i >= words.length - 2 ? 'al-headline-accent al-word' : 'al-word'
                }
                style={{ display: 'inline-block' }}
              >
                {word}
                {i < words.length - 1 ? ' ' : ''}
              </motion.span>
            ))}
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            className="al-subheadline"
            variants={fadeUp}
            initial={reduced ? false : 'hidden'}
            animate="visible"
            custom={0.55}
          >
            {heroData.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="al-cta-group"
            variants={fadeUp}
            initial={reduced ? false : 'hidden'}
            animate="visible"
            custom={0.68}
          >
            {/* Magnetic primary CTA */}
            <motion.a
              ref={magnetic.ref}
              href="#pricing"
              className="al-btn-primary"
              style={{ x: magnetic.sx, y: magnetic.sy }}
              onMouseMove={magnetic.onMouseMove}
              onMouseLeave={magnetic.onMouseLeave}
              whileHover={reduced ? {} : { scale: 1.05 }}
              whileTap={reduced ? {} : { scale: 0.97 }}
            >
              {heroData.primaryCta}
            </motion.a>
            <a href="#features" className="al-btn-secondary">
              {heroData.secondaryCta} →
            </a>
          </motion.div>

          {/* Floating glass mockup */}
          <HeroMockup reduced={reduced} />
        </div>
      </div>
    </section>
  )
}

function LogoStrip({ reduced }: { reduced: boolean }) {
  return (
    <section className="al-logos">
      <div className="al-container">
        <motion.p
          className="al-logos-label"
          variants={fadeIn}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          신뢰하는 팀들
        </motion.p>
        <motion.div
          className="al-logos-grid"
          variants={fadeIn}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.1}
        >
          {logos.map((logo) => (
            <div key={logo.name} className="al-logo-item">
              <span className="al-logo-abbr">{logo.abbr}</span>
              <span className="al-logo-name">{logo.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Features({ reduced }: { reduced: boolean }) {
  return (
    <section className="al-features" id="features">
      <div className="al-container">
        <motion.p
          className="al-section-label"
          variants={fadeIn}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          Aurora를 선택하는 이유
        </motion.p>
        <motion.h2
          className="al-section-title"
          variants={fadeUp}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.05}
        >
          팀이 실제로 일하는 방식에 맞게 설계된 도구
        </motion.h2>
        <motion.p
          className="al-section-sub"
          variants={fadeUp}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.1}
        >
          군더더기 없이, 별도 학습 없이. 팀이 일사불란하게 움직이고 결과물을 만들어내는 데 필요한 도구만 담았습니다.
        </motion.p>
        <div className="al-feature-grid">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              variants={fadeUp}
              initial={reduced ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.12}
            >
              {/* 3D tilt wrapper */}
              <TiltCard reduced={reduced} className="glass al-feature-card">
                <div className="al-feature-icon">{feat.icon}</div>
                <h3 className="al-feature-title">{feat.title}</h3>
                <p className="al-feature-desc">{feat.description}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing({ reduced }: { reduced: boolean }) {
  return (
    <section className="al-pricing" id="pricing">
      <div className="al-container">
        <motion.p
          className="al-section-label"
          variants={fadeIn}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          요금제
        </motion.p>
        <motion.h2
          className="al-section-title"
          variants={fadeUp}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.05}
        >
          단순하고 투명한 요금제
        </motion.h2>
        <motion.p
          className="al-section-sub"
          variants={fadeUp}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.1}
        >
          무료로 시작하세요. 필요할 때 확장하면 됩니다. 예상치 못한 청구는 없습니다.
        </motion.p>
        <div className="al-pricing-grid">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              className={[
                tier.highlighted ? 'glass-strong' : 'glass',
                'al-pricing-card',
                tier.highlighted ? 'al-pricing-card-highlighted' : '',
              ].join(' ')}
              variants={fadeUp}
              initial={reduced ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.12}
              whileHover={
                reduced
                  ? {}
                  : {
                      y: -6,
                      boxShadow: tier.highlighted
                        ? '0 0 60px rgba(124,92,255,0.35), 0 24px 48px rgba(0,0,0,0.4)'
                        : '0 16px 48px rgba(124,92,255,0.18)',
                      transition: { duration: 0.22 },
                    }
              }
            >
              {tier.highlighted && (
                <span className="al-pricing-popular-badge">가장 인기 있는 플랜</span>
              )}
              <p className="al-pricing-name">{tier.name}</p>
              <div className="al-pricing-price">
                <span className="al-pricing-amount">{tier.price}</span>
                <span className="al-pricing-period">{tier.period}</span>
              </div>
              <p className="al-pricing-desc">{tier.description}</p>
              <hr className="al-pricing-divider" />
              <ul className="al-pricing-features">
                {tier.features.map((feat) => (
                  <li key={feat} className="al-pricing-feature">
                    <span className="al-pricing-check">✓</span>
                    {feat}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={[
                  'al-pricing-cta',
                  tier.highlighted
                    ? 'al-pricing-cta-highlighted'
                    : 'al-pricing-cta-default',
                ].join(' ')}
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonial({ reduced }: { reduced: boolean }) {
  return (
    <section className="al-testimonial">
      <div className="al-container">
        <motion.div
          className="glass al-testimonial-inner"
          variants={fadeUp}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          whileHover={
            reduced
              ? {}
              : {
                  boxShadow: '0 0 60px rgba(124,92,255,0.18)',
                  transition: { duration: 0.3 },
                }
          }
        >
          <div className="al-testimonial-stars">
            {'★★★★★'.split('').map((s, i) => (
              <motion.span
                key={i}
                style={{ color: '#7c5cff' }}
                initial={reduced ? false : { opacity: 0, scale: 0.4 }}
                whileInView={reduced ? {} : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.07, type: 'spring', stiffness: 400, damping: 18 }}
              >
                {s}
              </motion.span>
            ))}
          </div>
          <p className="al-testimonial-quote">{testimonial.quote}</p>
          <div className="al-testimonial-author">
            <div className="al-testimonial-avatar">{testimonial.avatar}</div>
            <div>
              <div className="al-testimonial-name">{testimonial.author}</div>
              <div className="al-testimonial-role">{testimonial.role}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="al-footer">
      <div className="al-container">
        <div className="al-footer-inner">
          <a href="#" className="al-logo" style={{ textDecoration: 'none' }}>
            <span className="al-logo-mark">A</span>
            Aurora
          </a>
          <ul className="al-footer-links">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <p className="al-footer-copy">© 2025 Aurora Inc. 모든 권리 보유.</p>
        </div>
      </div>
    </footer>
  )
}

/* ── Root component ─────────────────────────────────────────── */
export default function AuroraLanding() {
  const reduced = useReducedMotion() ?? false

  return (
    <div className="sample-aurora-landing">
      {/* Animated aurora background blobs */}
      <div className="aurora-bg" aria-hidden="true">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>

      <Navbar reduced={reduced} />
      <Hero reduced={reduced} />
      <LogoStrip reduced={reduced} />
      <Features reduced={reduced} />
      <Pricing reduced={reduced} />
      <Testimonial reduced={reduced} />
      <Footer />
    </div>
  )
}
