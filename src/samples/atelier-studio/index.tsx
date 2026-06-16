import { useReducedMotion, motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import './atelier-studio.css'
import {
  studioName,
  navLinks,
  heroStatement,
  works,
  services,
  manifesto,
  clients,
  contact,
} from './mock'

/* ── Framer-motion variants ─────────────────────────────────── */
const revealUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
  }),
}

const revealIn = {
  hidden: { opacity: 0, x: -12 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay },
  }),
}

/* ── Line-split reveal variant ──────────────────────────────── */
const lineMaskVariant = {
  hidden: { y: '100%' },
  visible: (delay = 0) => ({
    y: '0%',
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay },
  }),
}

/* ── Sub-components ─────────────────────────────────────────── */

function Header() {
  return (
    <header className="as-header">
      <div className="as-container">
        <div className="as-header-inner">
          <a href="#" className="as-logo">{studioName}</a>
          <nav className="as-nav">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}>{link.label}</a>
            ))}
          </nav>
          <span className="as-header-index">CH — 2025</span>
        </div>
      </div>
    </header>
  )
}

function Hero({ reduced }: { reduced: boolean }) {
  const { scrollY } = useScroll()
  const heroYRaw = useTransform(scrollY, [0, 400], [0, -60])

  /* Label line grow: add as-label-visible after mount */
  const [labelVisible, setLabelVisible] = useState(false)
  useEffect(() => {
    if (reduced) {
      setLabelVisible(true)
      return
    }
    const timer = setTimeout(() => setLabelVisible(true), 50)
    return () => clearTimeout(timer)
  }, [reduced])

  return (
    <section className="as-hero">
      <div className="as-container">
        <div className="as-hero-inner">
          {/* Label with animated line via CSS class */}
          <motion.div
            className={`as-hero-label${labelVisible ? ' as-label-visible' : ''}`}
            variants={revealIn}
            initial={reduced ? false : 'hidden'}
            animate="visible"
            custom={0}
          >
            디자인 스튜디오 · 취리히
          </motion.div>

          {/* Hero headline: line-split reveal or plain */}
          {reduced ? (
            <h1 className="as-hero-headline">
              {heroStatement.line1}<br />
              <em>{heroStatement.line2}</em><br />
              {heroStatement.line3}
            </h1>
          ) : (
            <motion.h1
              className="as-hero-headline"
              style={{ y: heroYRaw }}
              initial="hidden"
              animate="visible"
            >
              {/* Line 1 */}
              <span className="as-line-mask">
                <motion.span
                  style={{ display: 'block' }}
                  variants={lineMaskVariant}
                  custom={0.1}
                >
                  {heroStatement.line1}
                </motion.span>
              </span>
              {/* Line 2 — italic */}
              <span className="as-line-mask">
                <motion.span
                  style={{ display: 'block' }}
                  variants={lineMaskVariant}
                  custom={0.22}
                >
                  <em>{heroStatement.line2}</em>
                </motion.span>
              </span>
              {/* Line 3 */}
              <span className="as-line-mask">
                <motion.span
                  style={{ display: 'block' }}
                  variants={lineMaskVariant}
                  custom={0.34}
                >
                  {heroStatement.line3}
                </motion.span>
              </span>
            </motion.h1>
          )}

          <motion.div
            className="as-hero-footer"
            variants={revealIn}
            initial={reduced ? false : 'hidden'}
            animate="visible"
            custom={0.35}
          >
            <p className="as-hero-sub">{heroStatement.sub}</p>
            <a href="#work" className="as-hero-cta">
              선정 작업 →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function SelectedWorks({ reduced }: { reduced: boolean }) {
  return (
    <section className="as-works" id="work">
      <div className="as-container">
        <div className="as-section-header">
          <h2 className="as-section-title">선정 작업</h2>
          <span className="as-section-count">({works.length})</span>
        </div>

        <div className="as-works-table">
          {/* Column headers */}
          <div className="as-works-head">
            <span>No.</span>
            <span>프로젝트 / 클라이언트</span>
            <span>연도</span>
            <span className="as-col-discipline">분야</span>
          </div>

          {/* Work rows */}
          {works.map((work, i) => (
            <motion.div
              key={work.index}
              className="as-work-row"
              variants={revealIn}
              initial={reduced ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.06}
            >
              {/* CSS thumbnail shown on hover via opacity/transform */}
              <div
                className="as-work-thumb"
                style={{ backgroundColor: work.thumb }}
              />

              <span className="as-work-index">{work.index}</span>

              <div>
                <div className="as-work-project">{work.project}</div>
                <div className="as-work-client">{work.client}</div>
              </div>

              <span className="as-work-year">{work.year}</span>
              <span className="as-work-discipline">{work.discipline}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services({ reduced }: { reduced: boolean }) {
  return (
    <section className="as-services" id="services">
      <div className="as-container">
        <div className="as-section-header">
          <h2 className="as-section-title">역량</h2>
        </div>

        <div className="as-services-grid">
          {services.map((svc, i) => (
            <motion.div
              key={svc.number}
              className="as-service-cell"
              variants={revealUp}
              initial={reduced ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.07}
            >
              <div className="as-service-num">{svc.number}</div>
              <div className="as-service-title">{svc.title}</div>
              <p className="as-service-desc">{svc.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function About({ reduced }: { reduced: boolean }) {
  return (
    <section className="as-about" id="about">
      <div className="as-container">
        <div className="as-about-inner">
          <motion.div
            className="as-about-left"
            variants={revealUp}
            initial={reduced ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <div className="as-manifesto-label">{manifesto.label}</div>
            <h2 className="as-manifesto-headline">{manifesto.headline}</h2>
          </motion.div>

          <motion.div
            className="as-about-right"
            variants={revealUp}
            initial={reduced ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.15}
          >
            {manifesto.body.map((para, i) => (
              <p key={i} className="as-manifesto-para">{para}</p>
            ))}
            <div className="as-manifesto-meta">{manifesto.founded}</div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Clients({ reduced }: { reduced: boolean }) {
  return (
    <section className="as-clients">
      <div className="as-container">
        <div className="as-section-header">
          <h2 className="as-section-title">클라이언트</h2>
          <span className="as-section-count">({clients.length})</span>
        </div>

        <motion.div
          className="as-clients-list"
          variants={revealIn}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          {clients.map((client) => (
            <div key={client} className="as-client-item">
              {client}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="as-footer" id="contact">
      <hr className="as-rule" />
      <div className="as-container">
        <div className="as-footer-inner">
          <div className="as-footer-contact">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <span className="as-footer-address">{contact.address}</span>
          </div>

          <div className="as-footer-logo">{studioName}</div>

          <div className="as-footer-right">
            <span className="as-footer-social">{contact.instagram}</span>
            <span className="as-footer-copy">© 2025 Atelier Studio — 스위스에서 제작</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ── Root component ─────────────────────────────────────────── */
export default function AtelierStudio() {
  const reduced = useReducedMotion() ?? false

  return (
    <div className="sample-atelier-studio">
      <Header />
      <Hero reduced={reduced} />
      <SelectedWorks reduced={reduced} />
      <Services reduced={reduced} />
      <About reduced={reduced} />
      <Clients reduced={reduced} />
      <Footer />
    </div>
  )
}
