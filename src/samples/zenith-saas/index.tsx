import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import './zenith-saas.css'
import { zenith } from './mock'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut', delay },
  }),
}

function Header() {
  return (
    <header className="z-nav">
      <a href="#" className="z-brand">{zenith.brand.name}</a>
      <nav aria-label="주요 메뉴">
        {zenith.nav.map((item) => (
          <a href={item.href} key={item.label}>{item.label}</a>
        ))}
      </nav>
      <a href="#schedule" className="z-nav__cta">시작하기</a>
    </header>
  )
}

function Schedule() {
  const [filter, setFilter] = useState(zenith.filters[0])
  const people = useMemo(
    () => zenith.people.filter((person) => filter === '전체' || person.team === filter),
    [filter],
  )

  return (
    <section className="z-schedule" id="schedule">
      <div className="z-schedule__top">
        <div>
          <p>리소스 계획</p>
          <h2>4월 로드맵</h2>
        </div>
        <div className="z-filter" role="group" aria-label="팀 필터">
          {zenith.filters.map((item) => (
            <button
              className={filter === item ? 'is-active' : ''}
              key={item}
              onClick={() => setFilter(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="z-grid" role="table" aria-label="팀 리소스 일정">
        <div className="z-grid__header">
          <span>멤버</span>
          {['4월 1주', '4월 2주', '4월 3주', '4월 4주', '5월 1주', '5월 2주', '5월 3주'].map((week) => (
            <span key={week}>{week}</span>
          ))}
        </div>
        {people.map((person) => (
          <div className="z-grid__row" key={person.name}>
            <div className="z-person">
              <strong>{person.name}</strong>
              <span>{person.role}</span>
              <em>{person.capacity}%</em>
            </div>
            <div className="z-lane">
              {person.bars.map((bar) => (
                <span
                  className={`z-bar z-bar--${bar.tone}`}
                  key={`${person.name}-${bar.label}`}
                  style={{ gridColumn: `${bar.start} / span ${bar.span}` }}
                >
                  {bar.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="z-dependencies">
        <h3>주요 의존성</h3>
        {zenith.dependencies.map((item) => (
          <p key={`${item.from}-${item.to}`}>
            <span>{item.from}</span>
            <strong>→</strong>
            <span>{item.to}</span>
            <time>{item.date}</time>
          </p>
        ))}
      </div>
    </section>
  )
}

function Hero() {
  const reduced = useReducedMotion() ?? false

  return (
    <section className="z-hero" id="product">
      <img src={zenith.brand.image} alt="" aria-hidden="true" />
      <div className="z-hero__overlay" />
      <motion.div className="z-hero__copy" variants={fadeUp} initial={reduced ? false : 'hidden'} animate="visible">
        <p>{zenith.brand.category}</p>
        <h1>{zenith.hero.title}</h1>
        <h2>{zenith.hero.subtitle}</h2>
        <p className="z-hero__body">{zenith.hero.body}</p>
        <div className="z-actions">
          <a href="#schedule" className="z-button z-button--primary">{zenith.hero.primary}</a>
          <a href="#ops" className="z-button z-button--secondary">{zenith.hero.secondary}</a>
        </div>
      </motion.div>
    </section>
  )
}

function Ops() {
  return (
    <section className="z-ops" id="ops">
      <div className="z-section-copy">
        <p>운영</p>
        <h2>계획을 낙관이 아니라 용량으로 조정합니다</h2>
      </div>
      <div className="z-ops__list">
        {zenith.ops.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(zenith.pricing[1].name)

  return (
    <section className="z-pricing" id="pricing">
      <div className="z-section-copy">
        <p>요금</p>
        <h2>계획 주기에 맞는 구성</h2>
      </div>
      <div className="z-pricing__grid">
        {zenith.pricing.map((plan) => (
          <article className={selectedPlan === plan.name ? 'is-selected' : ''} key={plan.name}>
            <h3>{plan.name}</h3>
            {selectedPlan === plan.name && <span className="z-plan-picked">선택됨</span>}
            <strong>{plan.price}</strong>
            <p>{plan.body}</p>
            <button type="button" onClick={() => setSelectedPlan(plan.name)}>
              {plan.name === 'Enterprise' ? '상담 요청' : '시작하기'}
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default function ZenithSaas() {
  return (
    <div className="sample-zenith-saas">
      <Header />
      <main>
        <Hero />
        <Schedule />
        <Ops />
        <Pricing />
      </main>
      <footer className="z-footer">
        <strong>Zenith</strong>
        <span>© 2026 Zenith Planning Co. 모든 권리 보유.</span>
      </footer>
    </div>
  )
}
