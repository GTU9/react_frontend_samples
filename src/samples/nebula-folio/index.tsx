import './nebula-folio.css'
import { useRef } from 'react'
import { motion, useReducedMotion, useMotionValue, useTransform } from 'framer-motion'
import {
  profile,
  projects,
  skills,
  timeline,
  contactLinks,
  type Skill,
  type TimelineEntry,
  type Project,
} from './mock'

/* ── animation helpers ─────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
})

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay },
})

/* ── sub-components ────────────────────────────── */

function SkillRow({ skill, reduced }: { skill: Skill; reduced: boolean }) {
  return (
    <div className="nf-skill-row">
      <div className="nf-skill-meta">
        <span className="nf-skill-name">{skill.name}</span>
        <span className="nf-skill-pct">{skill.level}%</span>
      </div>
      <div className="nf-skill-track">
        <motion.div
          className="nf-skill-bar"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: skill.level / 100 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={reduced ? { duration: 0 } : { duration: 0.9, ease: 'easeOut', delay: 0.1 }}
          style={{ transformOrigin: 'left center' }}
        />
      </div>
    </div>
  )
}

function TimelineItem({ entry }: { entry: TimelineEntry }) {
  return (
    <motion.div
      className="nf-timeline-entry"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="nf-timeline-dot" />
      <div className="nf-timeline-year">{entry.year}</div>
      <div className="nf-timeline-role">{entry.role}</div>
      <div className="nf-timeline-company">{entry.company}</div>
      <div className="nf-timeline-desc">{entry.description}</div>
    </motion.div>
  )
}

function ProjectCard({ project, reduced }: { project: Project; reduced: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const shadowX = useTransform(rotateY, [-8, 8], [-10, 10])
  const shadowY = useTransform(rotateX, [-8, 8], [10, -10])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const offsetX = (e.clientX - centerX) / (rect.width / 2)
    const offsetY = (e.clientY - centerY) / (rect.height / 2)
    rotateY.set(offsetX * 8)
    rotateX.set(-offsetY * 8)
  }

  function handleMouseLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  if (reduced) {
    return (
      <motion.div
        ref={cardRef}
        className="nf-project-card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        whileHover={{ y: -4 }}
      >
        <div className="nf-project-year">{project.year}</div>
        <div className="nf-project-title">{project.title}</div>
        <div className="nf-project-desc">{project.description}</div>
        <div className="nf-project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="nf-tag">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      className="nf-project-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
      }}
      whileHover={{
        boxShadow:
          '0 0 0 1px rgba(0,229,255,0.6), 0 0 40px rgba(0,229,255,0.2), 0 20px 60px rgba(0,0,0,0.8)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="nf-project-card-inner"
        style={{ x: shadowX, y: shadowY, scale: 1 }}
      >
        <div className="nf-project-year">{project.year}</div>
        <div className="nf-project-title">{project.title}</div>
        <div className="nf-project-desc">{project.description}</div>
        <div className="nf-project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="nf-tag">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── skill categories ─── */
const CATEGORIES: { key: Skill['category']; label: string }[] = [
  { key: 'language', label: '언어' },
  { key: 'framework', label: '프레임워크' },
  { key: 'tool', label: '도구 & 데이터' },
]

/* ── main component ────────────────────────────── */
export default function NebulaFolio() {
  const reduced = useReducedMotion() ?? false

  return (
    <div className="sample-nebula-folio">
      {/* ambient overlays */}
      <div className="nf-grid-bg" aria-hidden="true" />
      <div className="nf-scanlines" aria-hidden="true" />

      {/* ── nav ── */}
      <nav className="nf-nav" aria-label="Site navigation">
        <div className="nf-nav-inner">
          <span className="nf-nav-logo">KN://</span>
          <ul className="nf-nav-links">
            {(['소개', '프로젝트', '기술', '경력', '연락처'] as const).map((s, i) => (
              <li key={s}>
                <a href={['#about', '#projects', '#skills', '#timeline', '#contact'][i]}>{s}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="nf-main">
        {/* ── hero ── */}
        <section className="nf-hero" id="hero" aria-label="Hero">
          <div className="nf-hero-glow-orb nf-hero-glow-orb--cyan" aria-hidden="true" />
          <div className="nf-hero-glow-orb nf-hero-glow-orb--mag" aria-hidden="true" />

          <motion.span className="nf-hero-badge" {...fadeIn(0.1)}>
            {profile.availability}
          </motion.span>

          <motion.h1 className="nf-hero-name" {...fadeUp(0.2)}>
            {profile.name.split(' ').map((word, i) => (
              <span
                key={word}
                className={
                  i === 1
                    ? `nf-hero-name-accent${!reduced ? ' nf-shimmer-text' : ''}`
                    : undefined
                }
              >
                {i > 0 ? ' ' : ''}{word}
              </span>
            ))}
          </motion.h1>

          <motion.p className="nf-hero-role" {...fadeUp(0.35)}>
            {profile.role}
          </motion.p>

          <motion.p className="nf-hero-tagline" {...fadeUp(0.45)}>
            {profile.tagline}
          </motion.p>

          <motion.div className="nf-hero-meta" {...fadeIn(0.6)}>
            <span className="nf-hero-meta-item">
              <span className="nf-hero-meta-dot" aria-hidden="true" />
              {profile.location}
            </span>
            <span className="nf-hero-meta-item">
              {profile.availability}
            </span>
          </motion.div>

          {/* SVG accent draw-on */}
          <svg
            className="nf-hero-svg-accent"
            viewBox="0 0 90 28"
            aria-hidden="true"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M 0,20 L 60,20 L 80,0"
              stroke="var(--nf-cyan)"
              strokeWidth={1.5}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: 'drop-shadow(0 0 4px #00e5ff)' }}
              initial={reduced ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 1.2, delay: 0.8, ease: 'easeOut' }
              }
            />
          </svg>
        </section>

        <div className="nf-divider" />

        {/* ── about ── */}
        <section className="nf-section" id="about" aria-label="About">
          <div className="nf-container">
            <motion.div className="nf-section-header" {...fadeUp(0)}>
              <div className="nf-section-label">01 — 소개</div>
              <h2 className="nf-section-title">나는 누구인가</h2>
            </motion.div>
            <div className="nf-about-grid">
              <motion.p className="nf-about-bio" {...fadeUp(0.1)}>
                {profile.bio}
              </motion.p>
              <motion.div
                className="nf-about-stats"
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                {[
                  { value: '7+', label: '경력' },
                  { value: '40+', label: '프로젝트' },
                  { value: '3', label: '언어' },
                  { value: '∞', label: '호기심' },
                ].map((s) => (
                  <div key={s.label} className="nf-stat-card">
                    <div className="nf-stat-value">{s.value}</div>
                    <div className="nf-stat-label">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <div className="nf-divider" />

        {/* ── projects ── */}
        <section className="nf-section" id="projects" aria-label="Projects">
          <div className="nf-container">
            <motion.div className="nf-section-header" {...fadeUp(0)}>
              <div className="nf-section-label">02 — 프로젝트</div>
              <h2 className="nf-section-title">주요 작업</h2>
            </motion.div>
            <div className="nf-projects-grid">
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} reduced={reduced} />
              ))}
            </div>
          </div>
        </section>

        <div className="nf-divider" />

        {/* ── skills ── */}
        <section className="nf-section" id="skills" aria-label="Skills">
          <div className="nf-container">
            <motion.div className="nf-section-header" {...fadeUp(0)}>
              <div className="nf-section-label">03 — 기술</div>
              <h2 className="nf-section-title">기술 스택</h2>
            </motion.div>
            <div className="nf-skills-categories">
              {CATEGORIES.map(({ key, label }) => {
                const group = skills.filter((s) => s.category === key)
                if (group.length === 0) return null
                return (
                  <div key={key}>
                    <div className="nf-skills-group-title">{label}</div>
                    {group.map((s) => (
                      <SkillRow key={s.name} skill={s} reduced={reduced} />
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <div className="nf-divider" />

        {/* ── timeline ── */}
        <section className="nf-section" id="timeline" aria-label="Work timeline">
          <div className="nf-container">
            <motion.div className="nf-section-header" {...fadeUp(0)}>
              <div className="nf-section-label">04 — 경력</div>
              <h2 className="nf-section-title">경력 사항</h2>
            </motion.div>
            <div className="nf-timeline">
              {timeline.map((entry) => (
                <TimelineItem key={entry.year} entry={entry} />
              ))}
            </div>
          </div>
        </section>

        <div className="nf-divider" />

        {/* ── contact ── */}
        <section className="nf-contact" id="contact" aria-label="Contact">
          <div className="nf-container">
            <motion.h2 className="nf-contact-heading" {...fadeUp(0)}>
              함께 만들어봅시다
            </motion.h2>
            <motion.p className="nf-contact-sub" {...fadeUp(0.1)}>
              프리랜서, 계약직, 정규직 기회 모두 열려 있습니다.
            </motion.p>
            <motion.div className="nf-contact-links" {...fadeIn(0.2)}>
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="nf-contact-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="nf-contact-icon">{link.icon}</span>
                  {link.label}
                </a>
              ))}
            </motion.div>
            <motion.p className="nf-footer-copy" {...fadeIn(0.3)}>
              &copy; 2025 KAI NAKAMURA — 정밀하게 제작됨
            </motion.p>
          </div>
        </section>
      </main>
    </div>
  )
}
