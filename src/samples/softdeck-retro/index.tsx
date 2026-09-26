import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { softdeck } from './mock'
import './softdeck-retro.css'

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
    <header className="sd-header">
      <a href="#" className="sd-brand">
        <span>SD</span>
        {softdeck.brand.name}
      </a>
      <nav aria-label="주요 메뉴">
        {softdeck.nav.map((item) => (
          <a href={item.href} key={item.label}>{item.label}</a>
        ))}
      </nav>
      <a href="#bundles" className="sd-header__cta">구매하기</a>
    </header>
  )
}

function Hero() {
  const reduced = useReducedMotion() ?? false

  return (
    <section className="sd-hero" id="product">
      <figure className="sd-product-photo" aria-label="SoftDeck 포터블 오디오 콘솔 제품 사진">
        <img src={softdeck.brand.image} alt="" aria-hidden="true" />
      </figure>
      <motion.div className="sd-hero__copy" variants={fadeUp} initial={reduced ? false : 'hidden'} animate="visible">
        <p>{softdeck.brand.category}</p>
        <h1>{softdeck.hero.title}</h1>
        <h2>{softdeck.hero.subtitle}</h2>
        <p className="sd-hero__body">{softdeck.hero.body}</p>
        <div className="sd-actions">
          <a href="#bundles" className="sd-button sd-button--primary">{softdeck.hero.primary}</a>
          <a href="#specs" className="sd-button sd-button--secondary">{softdeck.hero.secondary}</a>
        </div>
      </motion.div>
    </section>
  )
}

function Specs() {
  return (
    <section className="sd-specs" id="specs">
      <div className="sd-section-copy">
        <p>기술 사양</p>
        <h2>작은 바디에 담은 현장용 입출력</h2>
      </div>
      <div className="sd-specs__sheet">
        {softdeck.specs.map((spec) => (
          <div className="sd-spec-row" key={spec.label}>
            <span>{spec.label}</span>
            <strong>{spec.value}</strong>
          </div>
        ))}
      </div>
      <div className="sd-controls">
        {softdeck.controls.map((control) => (
          <span key={control}>{control}</span>
        ))}
      </div>
    </section>
  )
}

function Bundles() {
  const reduced = useReducedMotion() ?? false
  const [selected, setSelected] = useState(1)

  return (
    <section className="sd-bundles" id="bundles">
      <div className="sd-section-copy">
        <p>구성</p>
        <h2>작업 방식에 맞는 패키지</h2>
      </div>
      <div className="sd-bundles__grid">
        {softdeck.bundles.map((bundle, index) => (
          <motion.article
            className={selected === index ? 'is-selected' : ''}
            key={bundle.tier}
            onClick={() => setSelected(index)}
            variants={fadeUp}
            initial={reduced ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true }}
            custom={index * 0.08}
          >
            <div className="sd-bundle__top">
              <h3>{bundle.tier}</h3>
              {selected === index && <span>선택됨</span>}
            </div>
            <strong>{bundle.price}</strong>
            <p>{bundle.desc}</p>
            <ul>
              {bundle.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button type="button" onClick={(event) => { event.stopPropagation(); setSelected(index) }}>
              {bundle.cta}
            </button>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

function Newsletter() {
  const reduced = useReducedMotion() ?? false
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function submit(event: React.FormEvent) {
    event.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  return (
    <section className="sd-newsletter" id="contact">
      <div>
        <p>지원</p>
        <h2>{softdeck.newsletter.title}</h2>
        <span>{softdeck.newsletter.body}</span>
      </div>
      {submitted ? (
        <motion.p className="sd-confirm" initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          신청 완료. 입고 일정이 확정되면 알려드리겠습니다.
        </motion.p>
      ) : (
        <form onSubmit={submit}>
          <input
            aria-label="이메일 주소"
            type="email"
            required
            placeholder={softdeck.newsletter.placeholder}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button type="submit">{softdeck.newsletter.cta}</button>
        </form>
      )}
    </section>
  )
}

export default function SoftdeckRetro() {
  return (
    <div className="sample-softdeck-retro">
      <Header />
      <main>
        <Hero />
        <Specs />
        <Bundles />
        <Newsletter />
      </main>
      <footer className="sd-footer">
        <strong>SoftDeck</strong>
        <span>© 2026 SoftDeck Instruments. 모든 권리 보유.</span>
      </footer>
    </div>
  )
}
