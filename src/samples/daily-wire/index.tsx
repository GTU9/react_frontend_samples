import { motion, useSpring, useTransform, useInView, useReducedMotion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import './daily-wire.css'
import {
  tickerItems,
  heroArticle,
  secondaryArticles,
  gridArticles,
  mostRead,
  opinions,
  markets,
  scores,
  weatherData,
  navSections,
  type Article,
  type OpinionPiece,
  type MarketEntry,
  type SportScore,
} from './mock'

// ── Helpers ──────────────────────────────────────────────────────────────────

function categoryClass(cat: string): string {
  return `cat-${cat.toLowerCase()}`
}

function initials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

/** Parse a formatted number string like "42,317" or "$67,420" into a float. */
function parseMarketValue(raw: string): number {
  return parseFloat(raw.replace(/[$,]/g, '')) || 0
}

/** Re-format a raw float back to the same style as the original string. */
function formatMarketValue(raw: string, val: number): string {
  const hasPrefix = raw.startsWith('$')
  const hasComma = raw.includes(',')
  const decimals = raw.includes('.') ? (raw.split('.')[1]?.length ?? 0) : 0
  let out = hasComma
    ? val.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : val.toFixed(decimals)
  return hasPrefix ? `$${out}` : out
}

// ── Count-up market value ─────────────────────────────────────────────────────

function AnimatedMarketValue({
  raw,
  reduced,
}: {
  raw: string
  reduced: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const target = parseMarketValue(raw)

  // Spring from 0 → target
  const spring = useSpring(0, { stiffness: 60, damping: 18, mass: 0.8 })
  const display = useTransform(spring, (v) => formatMarketValue(raw, v))

  useEffect(() => {
    if (!reduced && isInView) {
      spring.set(target)
    } else if (reduced) {
      spring.jump(target)
    }
  }, [isInView, reduced, target, spring])

  return (
    <motion.span ref={ref} className="dw-market-value">
      {reduced ? raw : display}
    </motion.span>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Ticker() {
  // Duplicate items so the scroll loop is seamless
  const doubled = [...tickerItems, ...tickerItems]
  return (
    <div className="dw-ticker">
      <div className="dw-ticker-label">
        <span className="dw-ticker-dot" />
        속보
      </div>
      <div className="dw-ticker-track">
        <div className="dw-ticker-inner">
          {doubled.map((item, i) => (
            <span key={i} className="dw-ticker-item">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Masthead() {
  const today = new Date().toLocaleDateString('ko-KR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  return (
    <header className="dw-masthead">
      <div className="dw-masthead-top">
        <div className="dw-masthead-meta">
          <span className="dw-masthead-meta-date">{today}</span>
          <span>제 12,847호</span>
        </div>
        <div>
          <div className="dw-publication-name">
            The Daily<span>Wire</span>
          </div>
          <div className="dw-publication-tagline">명확함 · 깊이 · 독립성</div>
        </div>
        <div className="dw-weather">
          <div className="dw-weather-temp">
            <span>{weatherData.icon}</span>
            {weatherData.temp}
          </div>
          <span>{weatherData.city}</span>
          <span>{weatherData.condition}</span>
        </div>
      </div>
      <nav className="dw-section-nav">
        <div className="dw-section-nav-inner">
          {navSections.map((section, i) => (
            <span key={section} className={`dw-section-nav-item${i === 0 ? ' active' : ''}`}>
              {section}
            </span>
          ))}
        </div>
      </nav>
    </header>
  )
}

function HeroArticle({ article }: { article: Article }) {
  return (
    <div className="dw-hero-main">
      <div
        className="dw-hero-image"
        style={{ background: article.imageColor }}
        role="img"
        aria-label={article.headline}
      />
      <span className={`dw-hero-category ${categoryClass(article.category)}`}>{article.category}</span>
      <h1 className="dw-hero-headline">{article.headline}</h1>
      <p className="dw-hero-standfirst">{article.excerpt}</p>
      <div className="dw-hero-byline">
        <span>{article.byline}</span>
        <span className="dw-byline-sep">|</span>
        <span>{article.timestamp}</span>
        <span className="dw-byline-sep">|</span>
        <span>{article.readTime}</span>
      </div>
    </div>
  )
}

function SecondaryArticleCard({ article }: { article: Article }) {
  return (
    <div className="dw-secondary-article">
      <div
        className="dw-secondary-thumb"
        style={{ background: article.imageColor }}
        role="img"
        aria-label={article.headline}
      />
      <div className="dw-secondary-content">
        <div className={`dw-secondary-category ${categoryClass(article.category)}`}>{article.category}</div>
        <p className="dw-secondary-headline">{article.headline}</p>
        <span className="dw-secondary-timestamp">{article.timestamp}</span>
      </div>
    </div>
  )
}

function NewsCard({ article, index, reduced }: { article: Article; index: number; reduced: boolean }) {
  return (
    <motion.div
      className="dw-card"
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: reduced ? 0 : index * 0.07, ease: 'easeOut' }}
      whileHover={reduced ? {} : { y: -4, boxShadow: '0 8px 24px rgba(15,23,42,0.10)', transition: { duration: 0.2 } }}
    >
      <div
        className="dw-card-image"
        style={{ background: article.imageColor }}
        role="img"
        aria-label={article.headline}
      />
      <span className={`dw-card-cat ${categoryClass(article.category)}`}>{article.category}</span>
      <h3 className="dw-card-headline">{article.headline}</h3>
      <p className="dw-card-excerpt">{article.excerpt}</p>
      <div className="dw-card-footer">
        <span>{article.byline}</span>
        <span>·</span>
        <span>{article.timestamp}</span>
      </div>
    </motion.div>
  )
}

function MostReadSidebar({ reduced }: { reduced: boolean }) {
  return (
    <aside className="dw-sidebar">
      <span className="dw-section-label">많이 읽은 기사</span>
      <div className="dw-most-read-list">
        {mostRead.map((item, i) => (
          <motion.div
            key={item.rank}
            className="dw-most-read-item"
            initial={reduced ? false : { opacity: 0, x: 14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: reduced ? 0 : i * 0.06, ease: 'easeOut' }}
          >
            <div className="dw-most-read-rank">{item.rank}</div>
            <div className="dw-most-read-content">
              <div className={`dw-most-read-cat ${categoryClass(item.category)}`}>{item.category}</div>
              <div className="dw-most-read-headline">{item.headline}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </aside>
  )
}

function OpinionCard({ piece, index, reduced }: { piece: OpinionPiece; index: number; reduced: boolean }) {
  return (
    <motion.div
      className="dw-opinion-card"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: reduced ? 0 : index * 0.09, ease: 'easeOut' }}
    >
      <div className="dw-opinion-author-row">
        <div
          className="dw-opinion-avatar"
          style={{ background: piece.avatarColor }}
          aria-label={piece.author}
        >
          {initials(piece.author)}
        </div>
        <div>
          <div className="dw-opinion-author-name">{piece.author}</div>
          <div className="dw-opinion-author-bio">{piece.bio}</div>
        </div>
      </div>
      <p className="dw-opinion-title">{piece.title}</p>
      <span className="dw-opinion-read-link">더 읽기 →</span>
    </motion.div>
  )
}

function MarketEntry({ entry, reduced }: { entry: MarketEntry; reduced: boolean }) {
  return (
    <div className="dw-market-entry">
      <span className="dw-market-symbol">{entry.symbol}</span>
      <AnimatedMarketValue raw={entry.value} reduced={reduced} />
      <span className={`dw-market-change ${entry.up ? 'up' : 'down'}`}>
        {entry.up ? '▲' : '▼'} {entry.change}
      </span>
    </div>
  )
}

function ScoreRow({ score }: { score: SportScore }) {
  return (
    <div className="dw-score-row">
      <span className="dw-score-team">{score.homeTeam}</span>
      <span className="dw-score-num">{score.homeScore}</span>
      <span className="dw-score-num">{score.awayScore}</span>
      <span className="dw-score-team away">{score.awayTeam}</span>
      <span className="dw-score-status">{score.status}</span>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function DailyWire() {
  const reduced = useReducedMotion() ?? false

  return (
    <div className="sample-daily-wire">
      {/* Ticker */}
      <Ticker />

      {/* Masthead + nav */}
      <Masthead />

      {/* Page body */}
      <main className="dw-page">

        {/* Hero: lead story + secondary column */}
        <motion.section
          className="dw-hero dw-fade-in"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <HeroArticle article={heroArticle} />
          <div className="dw-hero-secondary">
            {secondaryArticles.map((article) => (
              <SecondaryArticleCard key={article.id} article={article} />
            ))}
          </div>
        </motion.section>

        {/* News grid + Most Read sidebar */}
        <motion.section
          className="dw-middle"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <div className="dw-grid-area">
            <span className="dw-section-label">최신 뉴스</span>
            <div className="dw-news-grid">
              {gridArticles.map((article, i) => (
                <NewsCard key={article.id} article={article} index={i} reduced={reduced} />
              ))}
            </div>
          </div>
          <MostReadSidebar reduced={reduced} />
        </motion.section>

        {/* Opinion strip */}
        <motion.section
          className="dw-opinion-strip"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <span className="dw-section-label">오피니언</span>
          <div className="dw-opinion-grid">
            {opinions.map((piece, i) => (
              <OpinionCard key={piece.id} piece={piece} index={i} reduced={reduced} />
            ))}
          </div>
        </motion.section>

        {/* Markets + Scores */}
        <motion.section
          className="dw-widgets"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <div className="dw-markets">
            <span className="dw-section-label">시장</span>
            <div className="dw-market-table">
              {markets.map((entry) => (
                <MarketEntry key={entry.symbol} entry={entry} reduced={reduced} />
              ))}
            </div>
          </div>
          <div className="dw-scores">
            <span className="dw-section-label">스코어</span>
            <div className="dw-score-list">
              {scores.map((score, i) => (
                <ScoreRow key={i} score={score} />
              ))}
            </div>
          </div>
        </motion.section>

      </main>

      {/* Footer */}
      <footer className="dw-footer">
        <div className="dw-footer-inner">
          <div className="dw-footer-brand">
            The Daily<span>Wire</span>
          </div>
          <div className="dw-footer-tagline">명확함 · 깊이 · 독립성</div>
          <div className="dw-footer-links">
            {['소개', '문의', '광고', '구독', '아카이브', 'RSS', '국제', '경제', '테크', '스포츠', '문화', '건강', '오피니언', '개인정보처리방침', '이용약관'].map(
              (link) => (
                <span key={link} className="dw-footer-link">
                  {link}
                </span>
              )
            )}
          </div>
          <div className="dw-footer-bottom">
            <span>© {new Date().getFullYear()} The Daily Wire. 모든 권리 보유.</span>
            <span>인쇄판은 월요일부터 토요일까지 발행됩니다.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
