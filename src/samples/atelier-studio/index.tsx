import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import './atelier-studio.css'
import { contact, heroStatement, manifesto, navLinks, services, studioName, works, type Work } from './mock'

const reveal = (reduced: boolean, delay = 0) => ({
  initial: reduced ? false : { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: reduced ? 0 : 0.48, delay, ease: 'easeOut' as const },
})

function Header() {
  return (
    <header className="as-header">
      <a href="#" className="as-logo">{studioName}</a>
      <nav className="as-nav" aria-label="Atelier navigation">
        {navLinks.map((link) => (
          <a key={link.label} href={link.href}>{link.label}</a>
        ))}
      </nav>
      <span className="as-locale">KR / EN</span>
    </header>
  )
}

function WorkRows({
  selected,
  onSelect,
}: {
  selected: Work
  onSelect: (work: Work) => void
}) {
  return (
    <div className="as-work-table">
      <div className="as-work-head">
        <span>No.</span>
        <span>프로젝트</span>
        <span>연도</span>
      </div>
      {works.map((work) => (
        <button
          key={work.index}
          className={`as-work-row${work.index === selected.index ? ' is-selected' : ''}`}
          type="button"
          onClick={() => onSelect(work)}
          aria-pressed={work.index === selected.index}
        >
          <span>{work.index}</span>
          <span>
            <strong>{work.project}</strong>
            <small>{work.client} / {work.discipline}</small>
          </span>
          <span>{work.year}</span>
        </button>
      ))}
    </div>
  )
}

function CasePanel({ work, reduced }: { work: Work; reduced: boolean }) {
  return (
    <motion.article
      className="as-case"
      key={work.index}
      initial={reduced ? false : { opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: reduced ? 0 : 0.25, ease: 'easeOut' }}
    >
      <img src={work.image} alt={`${work.project} 작업 이미지`} />
      <div className="as-case-meta">
        <span>{work.location}</span>
        <span>{work.discipline}</span>
      </div>
      <h3>{work.project}</h3>
      <p>{work.brief}</p>
      <ul>
        {work.scope.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </motion.article>
  )
}

export default function AtelierStudio() {
  const reduced = useReducedMotion() ?? false
  const [selectedIndex, setSelectedIndex] = useState(works[0].index)
  const selectedWork = useMemo(
    () => works.find((work) => work.index === selectedIndex) ?? works[0],
    [selectedIndex],
  )

  return (
    <div className="sample-atelier-studio">
      <Header />
      <main>
        <section className="as-hero">
          <motion.div className="as-hero-type" {...reveal(reduced, 0)}>
            <h1>{studioName}</h1>
            <p>{heroStatement.sub}</p>
          </motion.div>
          <motion.figure className="as-hero-media" {...reveal(reduced, 0.04)}>
            <img src={works[0].image} alt={`${works[0].project} 건축 모형 이미지`} />
            <figcaption>
              <span>{works[0].index}</span>
              {works[0].project}
            </figcaption>
          </motion.figure>
          <motion.aside className="as-hero-aside" {...reveal(reduced, 0.08)}>
            <p>{heroStatement.line1}<br />{heroStatement.line2}<br />{heroStatement.line3}</p>
            <a href="#work">프로젝트 보기</a>
          </motion.aside>
        </section>

        <section className="as-work" id="work">
          <div className="as-section-title">
            <span>Selected Projects</span>
            <strong>{works.length}</strong>
          </div>
          <div className="as-work-grid">
            <WorkRows selected={selectedWork} onSelect={(work) => setSelectedIndex(work.index)} />
            <CasePanel work={selectedWork} reduced={reduced} />
          </div>
        </section>

        <section className="as-studio" id="studio">
          <motion.div className="as-studio-image" {...reveal(reduced, 0)}>
            <img src="/media/atelier-studio/model-assembly.jpg" alt="건축 모형을 조립하는 스튜디오 작업 장면" />
          </motion.div>
          <motion.div className="as-studio-copy" {...reveal(reduced, 0.08)}>
            <p>{manifesto.label}</p>
            <h2>{manifesto.headline}</h2>
            {manifesto.body.map((item) => (
              <span key={item}>{item}</span>
            ))}
            <small>{manifesto.founded}</small>
          </motion.div>
        </section>

        <section className="as-method" id="method">
          <div className="as-section-title">
            <span>Method</span>
            <strong>04</strong>
          </div>
          <div className="as-method-grid">
            {services.map((service, index) => (
              <motion.article key={service.number} {...reveal(reduced, index * 0.05)}>
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </motion.article>
            ))}
          </div>
        </section>
      </main>

      <footer className="as-footer" id="contact">
        <div>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <span>{contact.address}</span>
        </div>
        <strong>{studioName}</strong>
        <div>
          <span>{contact.instagram}</span>
          <span>2026 / Seoul</span>
        </div>
      </footer>
    </div>
  )
}
