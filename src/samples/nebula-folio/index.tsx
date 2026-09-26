import './nebula-folio.css'
import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { contactLinks, profile, projects, skills, timeline, type Project, type ProjectKind, type Skill } from './mock'

const kindLabels: Record<ProjectKind, string> = {
  installation: '설치',
  sensing: '센싱',
  tool: '도구',
}

const skillLabels: Record<Skill['category'], string> = {
  code: '코드',
  hardware: '하드웨어',
  process: '프로세스',
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45, delay, ease: 'easeOut' as const },
})

function ProjectList({
  selected,
  onSelect,
}: {
  selected: Project
  onSelect: (project: Project) => void
}) {
  return (
    <div className="nf-work-list" role="list" aria-label="선정 작업">
      {projects.map((project) => (
        <button
          className={`nf-work-row${project.id === selected.id ? ' is-selected' : ''}`}
          key={project.id}
          type="button"
          onClick={() => onSelect(project)}
          aria-pressed={project.id === selected.id}
        >
          <span className="nf-work-year">{project.year}</span>
          <span>
            <strong>{project.title}</strong>
            <small>{kindLabels[project.kind]} / {project.place}</small>
          </span>
        </button>
      ))}
    </div>
  )
}

function ProjectDetail({ project, reduced }: { project: Project; reduced: boolean }) {
  return (
    <motion.article
      className="nf-case"
      key={project.id}
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.28, ease: 'easeOut' }}
    >
      <img src={project.image} alt={`${project.title} 프로젝트 현장 이미지`} className="nf-case-image" />
      <div className="nf-case-copy">
        <p className="nf-case-kicker">{project.role}</p>
        <h2>{project.title}</h2>
        <p>{project.summary}</p>
        <ul>
          {project.details.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="nf-tools" aria-label="사용 기술">
          {project.tools.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

function SkillRow({ skill, reduced }: { skill: Skill; reduced: boolean }) {
  return (
    <div className="nf-skill-row">
      <div className="nf-skill-meta">
        <span>{skill.name}</span>
        <span>{skill.level}%</span>
      </div>
      <div className="nf-skill-track">
        <motion.div
          className="nf-skill-bar"
          initial={reduced ? { scaleX: skill.level / 100 } : { scaleX: 0 }}
          whileInView={{ scaleX: skill.level / 100 }}
          viewport={{ once: true }}
          transition={{ duration: reduced ? 0 : 0.7, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default function NebulaFolio() {
  const reduced = useReducedMotion() ?? false
  const [selectedId, setSelectedId] = useState(projects[0].id)
  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedId) ?? projects[0],
    [selectedId],
  )

  return (
    <div className="sample-nebula-folio">
      <nav className="nf-nav" aria-label="Nebula navigation">
        <a href="#hero" className="nf-brand">Nebula</a>
        <div className="nf-nav-links">
          <a href="#work">작업</a>
          <a href="#practice">노트</a>
          <a href="#contact">연락</a>
        </div>
      </nav>

      <main>
        <section className="nf-hero" id="hero">
          <motion.figure
            className="nf-hero-media"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.55, ease: 'easeOut' }}
          >
            <img src={profile.portrait} alt="센서와 노트북이 놓인 인터랙티브 작업대" />
          </motion.figure>
          <motion.div className="nf-hero-copy" {...fadeUp(0)}>
            <p className="nf-role">{profile.role}</p>
            <h1>{profile.name}</h1>
            <p className="nf-tagline">{profile.tagline}</p>
            <div className="nf-hero-actions">
              <a href="#work">선정 작업 보기</a>
              <span>{profile.location}</span>
            </div>
          </motion.div>
          <motion.div className="nf-hero-work" {...fadeUp(0.08)}>
            <span>{projects[0].year}</span>
            <strong>{projects[0].title}</strong>
            <p>{projects[0].place} / {projects[0].role}</p>
          </motion.div>
          <p className="nf-hero-caption">{profile.availability}</p>
        </section>

        <section className="nf-section nf-work" id="work" aria-label="선정 작업">
          <div className="nf-section-heading">
            <p>Selected Works</p>
            <h2>작동하는 물성의 기록</h2>
          </div>
          <div className="nf-work-grid">
            <ProjectList selected={selectedProject} onSelect={(project) => setSelectedId(project.id)} />
            <ProjectDetail project={selectedProject} reduced={reduced} />
          </div>
        </section>

        <section className="nf-section nf-practice" id="practice">
          <div className="nf-section-heading">
            <p>Practice Notes</p>
            <h2>프로토타입에서 현장 운영까지</h2>
          </div>
          <div className="nf-practice-grid">
            <article className="nf-bio">
              <p>{profile.bio}</p>
              <div className="nf-contact-inline">
                {contactLinks.map((link) => (
                  <a key={link.label} href={link.href}>{link.icon} {link.label}</a>
                ))}
              </div>
            </article>
            <div className="nf-skill-groups">
              {(['code', 'hardware', 'process'] as const).map((category) => (
                <div key={category} className="nf-skill-group">
                  <h3>{skillLabels[category]}</h3>
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill) => (
                      <SkillRow key={skill.name} skill={skill} reduced={reduced} />
                    ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="nf-section nf-timeline-section">
          <div className="nf-section-heading">
            <p>Field Log</p>
            <h2>작업 이력</h2>
          </div>
          <div className="nf-timeline">
            {timeline.map((entry) => (
              <article key={entry.year}>
                <time>{entry.year}</time>
                <h3>{entry.role}</h3>
                <strong>{entry.company}</strong>
                <p>{entry.description}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className="nf-footer" id="contact">
          <p>{profile.name}</p>
          <a href="mailto:hello@nebula.kr">hello@nebula.kr</a>
        </footer>
      </main>
    </div>
  )
}
