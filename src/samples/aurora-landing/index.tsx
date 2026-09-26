import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import './aurora-landing.css'
import { aurora } from './mock'

type ReleaseRow = (typeof aurora.releaseRows)[number]

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut', delay },
  }),
}

function StatusMark({ status }: { status: string }) {
  return <span className={`al-status al-status--${status.replace(/\s/g, '-')}`}>{status}</span>
}

function ReleasePlan({
  rows,
  selectedId,
  onSelect,
  onAdd,
}: {
  rows: ReleaseRow[]
  selectedId: string
  onSelect: (id: string) => void
  onAdd: () => void
}) {
  const selected = rows.find((row) => row.id === selectedId) ?? rows[0]

  return (
    <div className="al-plan" id="plan">
      <aside className="al-plan__rail" aria-label="Aurora 제품 메뉴">
        {['홈', '릴리스 플랜', '작업', '회의록', '문서', '팀'].map((item) => (
          <span className={item === '릴리스 플랜' ? 'is-active' : ''} key={item}>{item}</span>
        ))}
      </aside>

      <div className="al-plan__main">
        <div className="al-plan__toolbar">
          <div>
            <p className="al-ui-label">Q2 릴리스 플랜</p>
            <h2>복잡한 출시를 명확하게</h2>
          </div>
          <button type="button" onClick={onAdd}>+ 항목 추가</button>
        </div>

        <div className="al-table" role="table" aria-label="릴리스 작업 목록">
          <div className="al-table__head" role="row">
            <span>작업</span>
            <span>담당자</span>
            <span>팀</span>
            <span>마감</span>
            <span>상태</span>
          </div>
          {rows.map((row) => (
            <button
              className={`al-table__row${row.id === selectedId ? ' is-selected' : ''}`}
              key={row.id}
              onClick={() => onSelect(row.id)}
              type="button"
            >
              <span>{row.task}</span>
              <span>{row.owner}</span>
              <span>{row.team}</span>
              <span>{row.due}</span>
              <StatusMark status={row.status} />
            </button>
          ))}
        </div>

        <div className="al-plan__bottom">
          <section className="al-comments" aria-label="최근 코멘트">
            <div className="al-pane-title">댓글 2</div>
            {aurora.comments.map((comment) => (
              <article key={comment.time}>
                <strong>{comment.author}</strong>
                <time>{comment.time}</time>
                <p>{comment.body}</p>
              </article>
            ))}
          </section>
          <section className="al-blocker" aria-label="선택한 항목 세부 정보">
            <div className="al-pane-title">선택 항목</div>
            <h3>{selected.task}</h3>
            <StatusMark status={selected.status} />
            <p>{selected.detail}</p>
          </section>
        </div>
      </div>
    </div>
  )
}

function Header() {
  return (
    <header className="al-nav">
      <a href="#" className="al-brand" aria-label="Aurora 홈">
        <span>A</span>
        Aurora
      </a>
      <nav aria-label="주요 메뉴">
        {aurora.nav.map((item) => (
          <a href={item.href} key={item.label}>{item.label}</a>
        ))}
      </nav>
      <a href="#plan" className="al-nav__cta">시작하기</a>
    </header>
  )
}

function Hero() {
  const reduced = useReducedMotion() ?? false
  const [rows, setRows] = useState<ReleaseRow[]>(aurora.releaseRows)
  const [selectedId, setSelectedId] = useState(aurora.releaseRows[0].id)

  function addReleaseRow() {
    const nextIndex = rows.length + 1
    const nextRow: ReleaseRow = {
      id: `draft-${nextIndex}`,
      task: nextIndex % 2 === 0 ? '고객 안내 메일 승인' : '릴리스 리허설 체크',
      owner: nextIndex % 2 === 0 ? '한지우' : '정하린',
      team: nextIndex % 2 === 0 ? 'Marketing' : 'QA',
      due: nextIndex % 2 === 0 ? '5월 24일' : '5월 28일',
      status: '계획됨',
      detail:
        nextIndex % 2 === 0
          ? '새 고객군 안내 메일의 발송 대상과 승인자를 연결했습니다. 문구 검토 후 발송 목록에 반영됩니다.'
          : '출시 전 리허설에서 확인할 QA 항목을 추가했습니다. 담당자가 체크리스트를 정리합니다.',
    }

    setRows((current) => [...current, nextRow])
    setSelectedId(nextRow.id)
  }

  return (
    <section className="al-hero" id="product">
      <div className="al-hero__copy">
        <motion.p className="al-category" variants={fadeUp} initial={reduced ? false : 'hidden'} animate="visible">
          함께 만드는 더 좋은 출시
        </motion.p>
        <motion.h1 variants={fadeUp} custom={0.05} initial={reduced ? false : 'hidden'} animate="visible">
          {aurora.hero.title}
          <span>{aurora.hero.category}</span>
        </motion.h1>
        <motion.p className="al-hero__body" variants={fadeUp} custom={0.1} initial={reduced ? false : 'hidden'} animate="visible">
          {aurora.hero.copy}
        </motion.p>
        <motion.div className="al-actions" variants={fadeUp} custom={0.15} initial={reduced ? false : 'hidden'} animate="visible">
          <a href="#plan" className="al-button al-button--primary">{aurora.hero.primary}</a>
          <a href="#workflow" className="al-button al-button--secondary">{aurora.hero.secondary}</a>
        </motion.div>
      </div>
      <motion.div variants={fadeUp} custom={0.2} initial={reduced ? false : 'hidden'} animate="visible">
        <ReleasePlan rows={rows} selectedId={selectedId} onSelect={setSelectedId} onAdd={addReleaseRow} />
      </motion.div>
    </section>
  )
}

function Workflow() {
  return (
    <section className="al-workflow" id="workflow">
      <div className="al-section-copy">
        <p className="al-category">운영 방식</p>
        <h2>릴리스 문맥을 잃지 않는 협업</h2>
      </div>
      <div className="al-workflow__list">
        {aurora.workflow.map((item, index) => (
          <article key={item.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(aurora.pricing[1].name)

  return (
    <section className="al-pricing" id="pricing">
      <div className="al-section-copy">
        <p className="al-category">요금</p>
        <h2>출시 규모에 맞춰 시작하세요</h2>
      </div>
      <div className="al-pricing__grid">
        {aurora.pricing.map((plan) => (
          <article className={selectedPlan === plan.name ? 'is-selected' : ''} key={plan.name}>
            <h3>{plan.name}</h3>
            {selectedPlan === plan.name && <span className="al-plan-picked">선택됨</span>}
            <strong>{plan.price}</strong>
            <p>{plan.body}</p>
            <button type="button" onClick={() => setSelectedPlan(plan.name)}>
              {plan.name === 'Studio' ? '상담 요청' : '선택하기'}
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default function AuroraLanding() {
  return (
    <div className="sample-aurora-landing">
      <Header />
      <main>
        <Hero />
        <Workflow />
        <Pricing />
      </main>
      <footer className="al-footer">
        <span>Aurora</span>
        <p>© 2026 Aurora Labs. 모든 권리 보유.</p>
      </footer>
    </div>
  )
}
