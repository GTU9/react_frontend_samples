import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { useRef } from 'react'
import './quill-journal.css'
import {
  masthead,
  categories,
  featuredArticle,
  gridArticles,
  mostRead,
  newsletter,
} from './mock'

// ——— Reduced-motion hook wrapper ———
// All variants honour the reduced flag passed down from the root.

// ——— Reading-progress bar ———
function ReadingProgressBar({ reduced }: { reduced: boolean }) {
  const { scrollYProgress } = useScroll()
  if (reduced) return null
  return (
    <motion.div
      className="qj-progress-bar"
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

// ——— Word-by-word headline reveal ———
function WordReveal({
  text,
  className,
  reduced,
  delayBase = 0,
}: {
  text: string
  className: string
  reduced: boolean
  delayBase?: number
}) {
  const words = text.split(' ')
  if (reduced) {
    return <span className={className}>{text}</span>
  }
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="qj-word"
          initial={{ opacity: 0, y: 18, filter: 'blur(3px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            delay: delayBase + i * 0.055,
          }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </span>
  )
}

// ——— Masthead ———
function Masthead({ reduced }: { reduced: boolean }) {
  return (
    <header className="qj-masthead">
      <div className="qj-masthead__meta">
        <span>{masthead.issueDate}</span>
        <span>{masthead.issueNumber}</span>
      </div>
      <div className="qj-masthead__rule-top" />
      <motion.h1
        className="qj-masthead__title"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {masthead.publication}
      </motion.h1>
      <p className="qj-masthead__tagline">{masthead.tagline}</p>
      <nav className="qj-nav" aria-label="Category navigation">
        {categories.map((cat, i) => (
          <motion.button
            key={cat.id}
            className={`qj-nav__item${cat.active ? ' qj-nav__item--active' : ''}`}
            type="button"
            initial={reduced ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.3 + i * 0.04, ease: 'easeOut' }}
          >
            {cat.label}
          </motion.button>
        ))}
      </nav>
    </header>
  )
}

// ——— Parallax featured image ———
function ParallaxImage({
  art,
  reduced,
}: {
  art: typeof featuredArticle
  reduced: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Slow upward drift: inner image translates –12% to +12% as section scrolls
  const y = useTransform(scrollYProgress, [0, 1], ['12%', '-12%'])

  return (
    <motion.div
      ref={ref}
      className="qj-featured__image"
      initial={reduced ? false : { opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
      aria-label={art.imageAlt}
    >
      <motion.div
        className="qj-featured__image-placeholder"
        style={{
          background: art.imagePlaceholder,
          ...(reduced ? {} : { y }),
          transformOrigin: 'center',
          height: '120%',
          marginTop: '-10%',
        }}
        role="img"
        aria-label={art.imageAlt}
      />
    </motion.div>
  )
}

// ——— Drop-cap with fade reveal ———
function DropCapLede({
  text,
  reduced,
}: {
  text: string
  reduced: boolean
}) {
  const first = text.charAt(0)
  const rest = text.slice(1)
  return (
    <p className="qj-drop-cap">
      <motion.span
        className="qj-drop-cap__letter"
        aria-hidden="true"
        initial={reduced ? false : { opacity: 0, scale: 1.3, filter: 'blur(4px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.65, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {first}
      </motion.span>
      <motion.span
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        {rest}
      </motion.span>
    </p>
  )
}

// ——— Featured Article ———
function FeaturedArticle({ reduced }: { reduced: boolean }) {
  const art = featuredArticle
  return (
    <section className="qj-featured" aria-label="Featured article">
      <div className="qj-page">
        <div className="qj-section-label">특집</div>
        <div className="qj-featured__inner">
          <motion.div
            className="qj-featured__content"
            initial={reduced ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="qj-category-tag">{art.category}</span>
            <h2 className="qj-featured__title">
              <WordReveal
                text={art.title}
                className="qj-featured__title-inner"
                reduced={reduced}
                delayBase={0.15}
              />
            </h2>
            <p className="qj-featured__subtitle">{art.subtitle}</p>
            <div className="qj-byline">
              <span className="qj-byline__name">{art.author.name}</span>
              <span className="qj-byline__sep">·</span>
              <span>{art.date}</span>
              <span className="qj-byline__sep">·</span>
              <span>{art.readTime} 소요</span>
            </div>
            <DropCapLede text={art.lede} reduced={reduced} />
            <button className="qj-read-more" type="button">
              계속 읽기
              <span className="qj-read-more__arrow" aria-hidden="true">→</span>
            </button>
          </motion.div>

          <ParallaxImage art={art} reduced={reduced} />
        </div>
      </div>
    </section>
  )
}

// ——— Article Card — whileInView stagger ———
function ArticleCard({
  article,
  index,
  reduced,
}: {
  article: typeof gridArticles[number]
  index: number
  reduced: boolean
}) {
  return (
    <motion.article
      className="qj-card"
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.5,
        delay: reduced ? 0 : index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        className="qj-card__image"
        role="img"
        aria-label={article.imageAlt}
      >
        <div
          className="qj-card__image-placeholder"
          style={{ background: article.imagePlaceholder }}
        />
      </div>
      <span className="qj-category-tag">{article.category}</span>
      <h3 className="qj-card__title">{article.title}</h3>
      <p className="qj-card__excerpt">{article.excerpt}</p>
      <div className="qj-card__byline">
        <span>{article.author.name}</span>
        <span>·</span>
        <span>{article.date}</span>
        <span>·</span>
        <span>{article.readTime}</span>
      </div>
    </motion.article>
  )
}

// ——— Most Read Sidebar ———
function MostReadSidebar({ reduced }: { reduced: boolean }) {
  return (
    <aside className="qj-sidebar" aria-label="Most read articles">
      <div className="qj-sidebar__section">
        <p className="qj-sidebar__heading">많이 읽은 글</p>
        <ol className="qj-most-read" aria-label="Most read list">
          {mostRead.map((item, i) => (
            <motion.li
              key={item.id}
              className="qj-most-read__item"
              initial={reduced ? false : { opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.4,
                delay: reduced ? 0 : i * 0.07,
                ease: 'easeOut',
              }}
            >
              <span className="qj-most-read__rank" aria-hidden="true">
                {item.rank}
              </span>
              <div>
                <p className="qj-most-read__title">{item.title}</p>
                <p className="qj-most-read__meta">
                  {item.category} · {item.date}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </aside>
  )
}

// ——— Newsletter ———
function Newsletter({ reduced }: { reduced: boolean }) {
  return (
    <motion.section
      className="qj-newsletter"
      aria-label="Newsletter signup"
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="qj-newsletter__ornament" aria-hidden="true">
        ✦ &nbsp; ✦ &nbsp; ✦
      </div>
      <h2 className="qj-newsletter__headline">{newsletter.headline}</h2>
      <p className="qj-newsletter__body">{newsletter.body}</p>
      <form
        className="qj-newsletter__form"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Email subscription form"
      >
        <input
          type="email"
          className="qj-newsletter__input"
          placeholder={newsletter.placeholder}
          aria-label="Email address"
        />
        <button type="submit" className="qj-newsletter__btn">
          {newsletter.cta}
        </button>
      </form>
    </motion.section>
  )
}

// ——— Footer ———
function Footer() {
  const footerLinks = ['소개', '아카이브', '투고', '광고', '개인정보처리방침', '문의']
  return (
    <footer className="qj-footer">
      <p className="qj-footer__title">{masthead.publication}</p>
      <p className="qj-footer__tagline">{masthead.tagline}</p>
      <nav className="qj-footer__links" aria-label="Footer navigation">
        {footerLinks.map((link) => (
          <button key={link} className="qj-footer__link" type="button">
            {link}
          </button>
        ))}
      </nav>
      <p className="qj-footer__copy">© 2026 The Quill. 모든 권리 보유.</p>
    </footer>
  )
}

// ——— Root export ———
export default function QuillJournal() {
  const reduced = useReducedMotion() ?? false

  return (
    <div className="sample-quill-journal">
      <ReadingProgressBar reduced={reduced} />
      <Masthead reduced={reduced} />
      <FeaturedArticle reduced={reduced} />

      <div className="qj-page">
        <div className="qj-main-layout">
          {/* Article grid */}
          <section aria-label="Latest articles">
            <div className="qj-section-label">최신</div>
            <div className="qj-grid">
              {gridArticles.map((article, i) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  index={i}
                  reduced={reduced}
                />
              ))}
            </div>
          </section>

          {/* Sidebar */}
          <MostReadSidebar reduced={reduced} />
        </div>
      </div>

      <div className="qj-ornament" aria-hidden="true">— ✦ —</div>

      <Newsletter reduced={reduced} />
      <Footer />
    </div>
  )
}
