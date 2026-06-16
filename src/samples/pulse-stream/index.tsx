import { useReducedMotion, motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import './pulse-stream.css'
import {
  featured,
  contentRows,
  continueWatchingProgress,
  navItems,
  footerLinks,
  type Movie,
  type ContentRow,
} from './mock'

/* ── Framer-motion variants ─────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay },
  }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.45, ease: 'easeOut', delay },
  }),
}

/* ── Ken Burns hero background ──────────────────────────────── */
function KenBurnsArt({
  reduced,
  gradient,
}: {
  reduced: boolean
  gradient: string
}) {
  return (
    <motion.div
      className="ps-hero-art"
      style={{ background: gradient }}
      animate={
        reduced
          ? {}
          : {
              scale: [1, 1.06, 1.03, 1.07, 1],
              x: ['0%', '1.5%', '-1%', '0.8%', '0%'],
              y: ['0%', '-1%', '1%', '-0.5%', '0%'],
            }
      }
      transition={
        reduced
          ? {}
          : {
              duration: 28,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'mirror',
            }
      }
    />
  )
}

/* ── Shimmer text effect ────────────────────────────────────── */
function ShimmerTitle({
  text,
  reduced,
}: {
  text: string
  reduced: boolean
}) {
  if (reduced) {
    return <h1 className="ps-hero-title">{text}</h1>
  }
  return (
    <motion.h1
      className="ps-hero-title ps-hero-title--shimmer"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={0.1}
    >
      {text}
    </motion.h1>
  )
}

/* ── Nav ─────────────────────────────────────────────────────── */
function Nav({ reduced: _reduced }: { reduced: boolean }) {
  return (
    <nav className="ps-nav">
      <a href="#" className="ps-nav-logo">
        <span className="ps-nav-logo-mark">P</span>
        <span className="ps-nav-logo-text">PulseStream</span>
      </a>

      <ul className="ps-nav-links">
        {navItems.map((item, i) => (
          <li key={item}>
            <a href="#" className={i === 0 ? 'ps-nav-active' : ''}>
              {item}
            </a>
          </li>
        ))}
      </ul>

      <div className="ps-nav-spacer" />

      <div className="ps-nav-actions">
        <div className="ps-nav-search">
          <span className="ps-nav-search-icon">⌕</span>
          <span>검색</span>
        </div>
        <div className="ps-nav-profile">S</div>
      </div>
    </nav>
  )
}

/* ── Hero ─────────────────────────────────────────────────────── */
function Hero({ reduced }: { reduced: boolean }) {
  return (
    <section className="ps-hero">
      {/* Background poster art */}
      <div className="ps-hero-bg">
        <KenBurnsArt reduced={reduced} gradient={featured.heroGradient} />
        <div className="ps-hero-vignette" />
        <div className="ps-hero-vignette-bottom" />
      </div>

      {/* Content */}
      <div className="ps-hero-content">
        <motion.div
          className="ps-hero-badge"
          variants={fadeIn}
          initial={reduced ? false : 'hidden'}
          animate="visible"
          custom={0}
        >
          <span className="ps-hero-badge-dot" />
          주목 영화
        </motion.div>

        <ShimmerTitle text={featured.title} reduced={reduced} />

        <motion.div
          className="ps-hero-meta"
          variants={fadeUp}
          initial={reduced ? false : 'hidden'}
          animate="visible"
          custom={0.18}
        >
          <span className="ps-hero-score">★ {featured.score}</span>
          <span className="ps-hero-dot">●</span>
          <span className="ps-hero-year">{featured.year}</span>
          <span className="ps-hero-dot">●</span>
          <span className="ps-hero-duration">{featured.duration}</span>
          <span className="ps-hero-dot">●</span>
          <span className="ps-hero-rating">{featured.rating}</span>
        </motion.div>

        <motion.div
          className="ps-hero-genres"
          variants={fadeUp}
          initial={reduced ? false : 'hidden'}
          animate="visible"
          custom={0.22}
        >
          {featured.genre.map((g) => (
            <span key={g} className="ps-hero-genre-tag">{g}</span>
          ))}
        </motion.div>

        <motion.p
          className="ps-hero-synopsis"
          variants={fadeUp}
          initial={reduced ? false : 'hidden'}
          animate="visible"
          custom={0.28}
        >
          {featured.synopsis}
        </motion.p>

        <motion.div
          className="ps-hero-actions"
          variants={fadeUp}
          initial={reduced ? false : 'hidden'}
          animate="visible"
          custom={0.34}
        >
          <a href="#" className="ps-btn-play">▶ 재생</a>
          <a href="#" className="ps-btn-mylist">+ 내 리스트</a>
        </motion.div>
      </div>
    </section>
  )
}

/* ── Standard poster card ────────────────────────────────────── */
function PosterCard({ movie, reduced }: { movie: Movie; reduced: boolean }) {
  return (
    <motion.div
      className="ps-card"
      whileHover={reduced ? {} : { zIndex: 10 }}
    >
      <motion.div
        className="ps-card-poster"
        whileHover={
          reduced
            ? {}
            : {
                scale: 1.07,
                boxShadow:
                  '0 20px 48px rgba(0,0,0,0.75), 0 0 0 1px rgba(225,29,72,0.35)',
                transition: { duration: 0.22, ease: 'easeOut' },
              }
        }
      >
        <div className="ps-card-art" style={{ background: movie.posterGradient }} />
        <div className="ps-card-shine" />
        <motion.div
          className="ps-card-overlay"
          initial={{ opacity: 0 }}
          whileHover={reduced ? {} : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="ps-card-play-btn"
            initial={{ opacity: 0, scale: 0.7 }}
            whileHover={reduced ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.18 }}
          >
            ▶
          </motion.div>
          <div className="ps-card-title">{movie.title}</div>
          <div className="ps-card-meta">
            <span className="ps-card-score">★ {movie.score}</span>
            <span>·</span>
            <span>{movie.year}</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/* ── Top 10 card ─────────────────────────────────────────────── */
function Top10Card({ movie, reduced }: { movie: Movie; reduced: boolean }) {
  return (
    <motion.div
      className="ps-top10-card"
      whileHover={reduced ? {} : { zIndex: 10 }}
    >
      <motion.div
        className="ps-top10-numeral"
        whileHover={
          reduced
            ? {}
            : {
                WebkitTextStrokeColor: 'rgba(225,29,72,0.5)',
                scale: 1.04,
                transition: { duration: 0.2 },
              }
        }
      >
        {movie.top10Rank}
      </motion.div>
      <motion.div
        className="ps-top10-poster"
        whileHover={
          reduced
            ? {}
            : {
                scale: 1.06,
                boxShadow:
                  '0 16px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(225,29,72,0.3)',
                transition: { duration: 0.22, ease: 'easeOut' },
              }
        }
      >
        <div style={{ position: 'absolute', inset: 0, background: movie.posterGradient }} />
        <motion.div
          className="ps-top10-overlay"
          initial={{ opacity: 0 }}
          whileHover={reduced ? {} : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="ps-top10-title">{movie.title}</div>
          <div className="ps-top10-meta">★ {movie.score} · {movie.year}</div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/* ── Continue watching card ──────────────────────────────────── */
function ContinueWatchingCard({ movie, reduced }: { movie: Movie; reduced: boolean }) {
  const progress = continueWatchingProgress[movie.id] ?? 50
  return (
    <motion.div
      className="ps-cw-card"
      whileHover={reduced ? {} : { zIndex: 10 }}
    >
      <motion.div
        className="ps-cw-poster"
        whileHover={
          reduced
            ? {}
            : {
                scale: 1.06,
                boxShadow:
                  '0 16px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(225,29,72,0.35)',
                transition: { duration: 0.22, ease: 'easeOut' },
              }
        }
      >
        <div style={{ position: 'absolute', inset: 0, background: movie.posterGradient }} />
        <div className="ps-cw-overlay">
          <div className="ps-cw-title">{movie.title}</div>
          <div className="ps-cw-progress-track">
            <div className="ps-cw-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="ps-cw-progress-label">{progress}% 시청 완료</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Content row — whileInView stagger ──────────────────────── */
function ContentRow({ row, reduced }: { row: ContentRow; reduced: boolean }) {
  const isTop10 = row.id === 'top10'
  const isContinue = row.id === 'continue'
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className="ps-row"
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="ps-row-header">
        <span className="ps-row-title">{row.label}</span>
        <a href="#" className="ps-row-see-all">전체 보기</a>
      </div>

      <div className="ps-row-scroll">
        {row.movies.map((movie, i) => {
          const cardDelay = reduced ? 0 : 0.05 + i * 0.06

          const wrapper = (child: React.ReactNode) => (
            <motion.div
              key={movie.id}
              initial={reduced ? false : { opacity: 0, x: 16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.38, delay: cardDelay, ease: 'easeOut' }}
              style={{ display: 'contents' }}
            >
              {child}
            </motion.div>
          )

          if (isTop10) {
            return wrapper(<Top10Card key={movie.id} movie={movie} reduced={reduced} />)
          }
          if (isContinue) {
            return wrapper(<ContinueWatchingCard key={movie.id} movie={movie} reduced={reduced} />)
          }
          return wrapper(<PosterCard key={movie.id} movie={movie} reduced={reduced} />)
        })}
      </div>
    </motion.div>
  )
}

/* ── Footer ───────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="ps-footer">
      <div className="ps-footer-inner">
        <a href="#" className="ps-footer-logo">
          <span className="ps-footer-logo-mark">P</span>
          <span className="ps-footer-logo-text">PulseStream</span>
        </a>
        <ul className="ps-footer-links">
          {footerLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <p className="ps-footer-copy">© 2025 PulseStream, Inc. 모든 권리 보유.</p>
      </div>
    </footer>
  )
}

/* ── Root component ─────────────────────────────────────────── */
export default function PulseStream() {
  const reduced = useReducedMotion() ?? false

  return (
    <div className="sample-pulse-stream">
      <Nav reduced={reduced} />
      <Hero reduced={reduced} />

      <div className="ps-rows">
        {contentRows.map((row) => (
          <ContentRow key={row.id} row={row} reduced={reduced} />
        ))}
      </div>

      <Footer />
    </div>
  )
}
