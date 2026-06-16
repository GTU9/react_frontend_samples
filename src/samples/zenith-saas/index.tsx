import './zenith-saas.css'
import { useState, useRef, useCallback, useEffect } from 'react'
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useInView,
  animate,
} from 'framer-motion'
import { mock } from './mock'

/* ---- reduced motion shorthand ---- */
function useIsReduced() {
  const r = useReducedMotion()
  return r ?? false
}

/* ---- animation variants ---- */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.45, ease: 'easeOut', delay },
  }),
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

/* word-split variants */
const wordContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}
const wordChild = {
  hidden: { opacity: 0, y: 40, rotateX: -35 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

/* ---- Magnetic CTA hook ---- */
function useMagnetic(reduced: boolean) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 22 })
  const sy = useSpring(y, { stiffness: 200, damping: 22 })

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (reduced || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      x.set((e.clientX - (rect.left + rect.width / 2)) * 0.35)
      y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35)
    },
    [reduced, x, y]
  )
  const onMouseLeave = useCallback(() => { x.set(0); y.set(0) }, [x, y])
  return { ref, sx, sy, onMouseMove, onMouseLeave }
}

/* ---- Bento tilt card hook ---- */
function useBentoTilt(reduced: boolean) {
  const ref = useRef<HTMLDivElement>(null)
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const sx = useSpring(rotX, { stiffness: 300, damping: 30 })
  const sy = useSpring(rotY, { stiffness: 300, damping: 30 })

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
      const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
      rotX.set(-dy * 8)
      rotY.set(dx * 8)
    },
    [reduced, rotX, rotY]
  )
  const onMouseLeave = useCallback(() => { rotX.set(0); rotY.set(0) }, [rotX, rotY])
  return { ref, sx, sy, onMouseMove, onMouseLeave }
}

/* ---- Count-up number component ---- */
function CountUp({ value, reduced }: { value: string; reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  // Extract numeric prefix, suffix (e.g. "1.2B+" → num=1.2, suffix="B+")
  const match = value.match(/^([<]?)(\d+\.?\d*)(.*)$/)
  const prefix = match?.[1] ?? ''
  const num = match ? parseFloat(match[2]) : null
  const suffix = match?.[3] ?? ''

  const motionVal = useMotionValue(0)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (num === null || reduced || !inView) {
      setDisplay(value)
      return
    }
    const controls = animate(motionVal, num, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        const rounded = num < 10 ? v.toFixed(1) : Math.round(v).toString()
        setDisplay(`${prefix}${rounded}${suffix}`)
      },
    })
    return () => controls.stop()
  }, [inView, num, reduced, value, prefix, suffix, motionVal])

  return (
    <div ref={ref} className="z-stats__value">
      {display}
    </div>
  )
}

/* ---- sub-components ---- */

function Nav() {
  return (
    <nav className="z-nav">
      <div className="z-container z-nav__inner">
        <span className="z-nav__logo">{mock.nav.logo}</span>
        <ul className="z-nav__links">
          {mock.nav.links.map((l) => (
            <li key={l}><a href="#">{l}</a></li>
          ))}
        </ul>
        <button className="z-nav__cta">{mock.nav.cta}</button>
      </div>
    </nav>
  )
}

function HeroMockup({ reduced }: { reduced: boolean }) {
  /* scroll parallax on the mockup */
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, reduced ? 0 : -60])

  const rows = [
    { icon: '🚀', fill: '92%' },
    { icon: '📦', fill: '67%' },
    { icon: '⚡', fill: '84%' },
  ]
  return (
    <motion.div className="z-hero__mockup" ref={ref} style={{ y }}>
      <div className="z-mockup">
        <div className="z-mockup__topbar">
          <span className="z-mockup__dot z-mockup__dot--red" />
          <span className="z-mockup__dot z-mockup__dot--yellow" />
          <span className="z-mockup__dot z-mockup__dot--green" />
          <div className="z-mockup__url">app.zenith.dev/대시보드</div>
        </div>

        <div className="z-mockup__chart">
          <div className="z-mockup__chart-line" />
          <div className="z-mockup__chart-stroke" />
        </div>

        <div className="z-mockup__rows">
          {rows.map((r, i) => (
            <div className="z-mockup__row" key={i}>
              <div className="z-mockup__row-icon">{r.icon}</div>
              <div className="z-mockup__row-bar">
                <motion.div
                  className="z-mockup__row-fill"
                  initial={reduced ? false : { width: 0 }}
                  animate={reduced ? {} : { width: r.fill }}
                  transition={{ duration: 1.0, ease: 'easeOut', delay: 0.5 + i * 0.12 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="z-mockup__badge">
        <div className="z-mockup__badge-icon">⚡</div>
        <div>
          <div className="z-mockup__badge-title">배포 성공</div>
          <div className="z-mockup__badge-sub">28초 · 오류 0개 · 방금 전</div>
        </div>
      </div>
    </motion.div>
  )
}

function Hero() {
  const reduced = useIsReduced()
  const magnetic = useMagnetic(reduced)

  const headlineLines = mock.hero.headline.split('\n')
  /* flatten all words across lines for stagger */
  const words = headlineLines.join(' ').split(' ')
  const lastLineWords = headlineLines[headlineLines.length - 1].split(' ')

  return (
    <section className="z-hero">
      <div className="z-hero__blob z-hero__blob--1" />
      <div className="z-hero__blob z-hero__blob--2" />
      <div className="z-hero__blob z-hero__blob--3" />

      <div className="z-container z-hero__inner">
        {/* left copy */}
        <div>
          <motion.div
            initial={reduced ? false : 'hidden'}
            animate="visible"
            custom={0}
            variants={fadeUp}
          >
            <div className="z-hero__badge">
              <span className="z-hero__badge-dot" />
              {mock.hero.badge}
            </div>
          </motion.div>

          {/* Word-split headline */}
          <motion.h1
            className="z-hero__headline z-hero__headline--split"
            variants={reduced ? undefined : wordContainer}
            initial={reduced ? false : 'hidden'}
            animate="visible"
            aria-label={mock.hero.headline}
          >
            {words.map((word, i) => {
              const isGrad = lastLineWords.includes(word) &&
                i >= words.length - lastLineWords.length
              return (
                <motion.span
                  key={i}
                  variants={reduced ? undefined : wordChild}
                  style={{ display: 'inline-block' }}
                >
                  {isGrad
                    ? <span className="z-grad-text">{word}</span>
                    : word}
                  {i < words.length - 1 ? ' ' : ''}
                </motion.span>
              )
            })}
          </motion.h1>

          <motion.p
            className="z-hero__subcopy"
            initial={reduced ? false : 'hidden'}
            animate="visible"
            custom={0.45}
            variants={fadeUp}
          >
            {mock.hero.subCopy}
          </motion.p>

          <motion.div
            className="z-hero__actions"
            initial={reduced ? false : 'hidden'}
            animate="visible"
            custom={0.55}
            variants={fadeUp}
          >
            {/* Magnetic primary CTA */}
            <motion.button
              ref={magnetic.ref}
              className="z-btn-primary"
              style={{ x: magnetic.sx, y: magnetic.sy }}
              onMouseMove={magnetic.onMouseMove}
              onMouseLeave={magnetic.onMouseLeave}
              whileHover={reduced ? {} : { scale: 1.05 }}
              whileTap={reduced ? {} : { scale: 0.97 }}
            >
              {mock.hero.cta.primary}
            </motion.button>
            <button className="z-btn-secondary">{mock.hero.cta.secondary}</button>
          </motion.div>

          <motion.div
            className="z-hero__stats"
            initial={reduced ? false : 'hidden'}
            animate="visible"
            custom={0.65}
            variants={fadeUp}
          >
            {mock.hero.stats.map((s) => (
              <div key={s.label}>
                <div className="z-hero__stat-value">{s.value}</div>
                <div className="z-hero__stat-label">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* right mockup with parallax */}
        <motion.div
          initial={reduced ? false : 'hidden'}
          animate="visible"
          custom={0.2}
          variants={scaleIn}
        >
          <HeroMockup reduced={reduced} />
        </motion.div>
      </div>
    </section>
  )
}

function LogoRow() {
  const reduced = useIsReduced()
  return (
    <section className="z-logos">
      <div className="z-container">
        <motion.p
          className="z-logos__label"
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeIn}
        >
          신뢰하는 팀들
        </motion.p>
        <motion.div
          className="z-logos__row"
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.05}
          variants={fadeIn}
        >
          {mock.logos.map((logo) => (
            <div className="z-logo-chip" key={logo.name}>
              <div className="z-logo-chip__icon">{logo.abbr}</div>
              <span className="z-logo-chip__name">{logo.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* Bento card with individual tilt */
function BentoCard({
  feat,
  i,
  reduced,
}: {
  feat: (typeof mock.features)[number]
  i: number
  reduced: boolean
}) {
  const { ref, sx, sy, onMouseMove, onMouseLeave } = useBentoTilt(reduced)

  return (
    <motion.div
      ref={ref}
      className={`z-bento__card z-bento__card--${feat.size}`}
      initial={reduced ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true }}
      custom={i * 0.07}
      variants={fadeUp}
      style={{
        rotateX: sx,
        rotateY: sy,
        transformPerspective: 900,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={
        reduced
          ? {}
          : {
              borderColor: 'rgba(99,102,241,0.5)',
              boxShadow: '0 16px 48px rgba(99,102,241,0.18)',
              transition: { duration: 0.2 },
            }
      }
    >
      <span className="z-bento__icon">{feat.icon}</span>
      <h3 className="z-bento__title">{feat.title}</h3>
      <p className="z-bento__body">{feat.body}</p>
    </motion.div>
  )
}

function Features() {
  const reduced = useIsReduced()
  return (
    <section className="z-section">
      <div className="z-container">
        <motion.div
          className="z-features__header"
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
        >
          <div className="z-section-tag">기능</div>
          <h2 className="z-section-title">
            자신 있게 <span className="z-grad-text">출시하기 위한 모든 것</span>
          </h2>
          <p className="z-section-sub">
            배포, 모니터링, 협업, AI 지원을 하나의 플랫폼에서 — 땜질 없이.
          </p>
        </motion.div>

        <div className="z-bento">
          {mock.features.map((feat, i) => (
            <BentoCard key={feat.id} feat={feat} i={i} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatsBand() {
  const reduced = useIsReduced()
  return (
    <section className="z-stats">
      <div className="z-container">
        <div className="z-stats__grid">
          {mock.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduced ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.08}
              variants={fadeUp}
            >
              {/* animated count-up */}
              <CountUp value={s.value} reduced={reduced} />
              <div className="z-stats__label">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const reduced = useIsReduced()
  return (
    <section className="z-section">
      <div className="z-container">
        <motion.div
          className="z-pricing__header"
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
        >
          <div className="z-section-tag">요금제</div>
          <h2 className="z-section-title">
            단순하고 <span className="z-grad-text">투명한 요금제</span>
          </h2>
          <p className="z-section-sub">
            무료로 시작하고, 성장에 맞춰 확장하세요. 숨겨진 요금도, 예상치 못한 청구서도 없습니다.
          </p>
        </motion.div>

        <div className="z-pricing__grid">
          {mock.pricing.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`z-pricing__card${plan.highlight ? ' z-pricing__card--highlight' : ''}`}
              initial={reduced ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.1}
              variants={fadeUp}
              whileHover={
                reduced
                  ? {}
                  : {
                      y: plan.highlight ? -8 : -6,
                      boxShadow: plan.highlight
                        ? '0 0 60px rgba(99,102,241,0.28), 0 24px 48px rgba(0,0,0,0.4)'
                        : '0 16px 40px rgba(99,102,241,0.14)',
                      transition: { duration: 0.22 },
                    }
              }
            >
              {plan.highlight && (
                <div className="z-pricing__popular">가장 인기 있는 플랜</div>
              )}

              <div className="z-pricing__name">{plan.name}</div>

              <div className="z-pricing__price">
                <span className="z-pricing__amount">{plan.price}</span>
                {plan.period && (
                  <span className="z-pricing__period">{plan.period}</span>
                )}
              </div>

              <p className="z-pricing__desc">{plan.description}</p>
              <div className="z-pricing__divider" />

              <ul className="z-pricing__features">
                {plan.features.map((f) => (
                  <li className="z-pricing__feature" key={f}>
                    <span className="z-pricing__feature-check">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`z-pricing__cta${plan.highlight ? ' z-pricing__cta--primary' : ' z-pricing__cta--secondary'}`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const reduced = useIsReduced()
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="z-section">
      <div className="z-container">
        <motion.div
          className="z-faq__header"
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
        >
          <div className="z-section-tag">자주 묻는 질문</div>
          <h2 className="z-section-title">
            <span className="z-grad-text">궁금한 점이 있으신가요?</span>
          </h2>
          <p className="z-section-sub">
            시작하기 전에 알아야 할 모든 것.
          </p>
        </motion.div>

        <div className="z-faq__list">
          {mock.faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={i}
                className="z-faq__item"
                data-open={isOpen ? 'true' : 'false'}
                initial={reduced ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.06}
                variants={fadeUp}
              >
                <button
                  className="z-faq__question"
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{faq.q}</span>
                  <motion.span
                    className="z-faq__chevron"
                    animate={reduced ? {} : { rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                  >
                    ▾
                  </motion.span>
                </button>

                {isOpen && (
                  <motion.div
                    className="z-faq__answer"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const reduced = useIsReduced()
  return (
    <section className="z-section">
      <div className="z-container">
        <motion.div
          className="z-testimonials__header"
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
        >
          <div className="z-section-tag">고객 후기</div>
          <h2 className="z-section-title">
            <span className="z-grad-text">엔지니어링 팀</span>이 사랑하는 도구
          </h2>
        </motion.div>

        <div className="z-testimonials__grid">
          {mock.testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              className="z-testimonial"
              initial={reduced ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.1}
              variants={fadeUp}
              whileHover={
                reduced
                  ? {}
                  : {
                      y: -6,
                      borderColor: 'rgba(99,102,241,0.4)',
                      transition: { duration: 0.2 },
                    }
              }
            >
              <div className="z-testimonial__stars">
                {Array.from({ length: 5 }).map((_, j) => (
                  <motion.span
                    key={j}
                    style={{ color: '#facc15' }}
                    initial={reduced ? false : { opacity: 0, scale: 0.3 }}
                    whileInView={reduced ? {} : { opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.1 + j * 0.06,
                      type: 'spring',
                      stiffness: 400,
                      damping: 18,
                    }}
                  >
                    ★
                  </motion.span>
                ))}
              </div>
              <p className="z-testimonial__quote">"{t.quote}"</p>
              <div className="z-testimonial__author">
                <div className="z-testimonial__avatar">{t.avatar}</div>
                <div>
                  <div className="z-testimonial__name">{t.author}</div>
                  <div className="z-testimonial__role">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="z-footer">
      <div className="z-container">
        <div className="z-footer__top">
          <div className="z-footer__brand">
            <div className="z-footer__brand-logo">{mock.footer.tagline.split('.')[0].trim()}</div>
            <p className="z-footer__tagline">{mock.footer.tagline}</p>
          </div>

          {mock.footer.columns.map((col) => (
            <div key={col.heading}>
              <div className="z-footer__col-heading">{col.heading}</div>
              <ul className="z-footer__col-links">
                {col.links.map((l) => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="z-footer__bottom">
          <span>{mock.footer.bottom}</span>
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>Zenith로 구축됨</span>
        </div>
      </div>
    </footer>
  )
}

/* ---- Root ---- */
export default function ZenithSaas() {
  return (
    <div className="sample-zenith-saas">
      <Nav />
      <Hero />
      <LogoRow />
      <Features />
      <StatsBand />
      <Pricing />
      <FAQ />
      <Testimonials />
      <Footer />
    </div>
  )
}
