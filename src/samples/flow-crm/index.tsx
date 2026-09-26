import { forwardRef, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import './flow-crm.css'
import {
  activities,
  initialDeals,
  navItems,
  owners,
  stageLabels,
  stageOrder,
  type Deal,
  type DealStage,
} from './mock'

const currency = (value: number) => `${Math.round(value / 1000000).toLocaleString('ko-KR')}백만원`

const emptyDraft: Omit<Deal, 'id'> = {
  company: '',
  contact: '',
  amount: 50000000,
  owner: owners[0],
  industry: 'SaaS',
  stage: 'lead',
  closeDate: '10월 30일',
  nextAction: '',
  priority: '보통',
}

function Icon({ type }: { type: 'search' | 'plus' | 'x' }) {
  if (type === 'plus') {
    return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3v10M3 8h10" /></svg>
  }
  if (type === 'x') {
    return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 4 8 8M12 4l-8 8" /></svg>
  }
  return <svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="4.5" /><path d="m10.5 10.5 3 3" /></svg>
}

const DealCard = forwardRef<HTMLButtonElement, { deal: Deal; selected: boolean; onSelect: (id: string) => void }>(
function DealCard({ deal, selected, onSelect }, ref) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.button
      ref={ref}
      type="button"
      layout={!reduceMotion}
      className={`fc-deal${selected ? ' selected' : ''}`}
      onClick={() => onSelect(deal.id)}
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
    >
      <span className={`fc-priority ${deal.priority}`}>{deal.priority}</span>
      <strong>{deal.company}</strong>
      <em>{currency(deal.amount)}</em>
      <span>{deal.nextAction}</span>
      <footer>
        <b>{deal.owner}</b>
        <time>{deal.closeDate}</time>
      </footer>
    </motion.button>
  )
})

function DealForm({
  draft,
  setDraft,
  onSubmit,
  submitLabel,
}: {
  draft: Omit<Deal, 'id'>
  setDraft: (draft: Omit<Deal, 'id'>) => void
  onSubmit: () => void
  submitLabel: string
}) {
  return (
    <div className="fc-form">
      <label>
        고객사
        <input value={draft.company} onChange={event => setDraft({ ...draft, company: event.target.value })} />
      </label>
      <label>
        담당자
        <input value={draft.contact} onChange={event => setDraft({ ...draft, contact: event.target.value })} />
      </label>
      <label>
        금액
        <input
          type="number"
          value={draft.amount}
          onChange={event => setDraft({ ...draft, amount: Number(event.target.value) || 0 })}
        />
      </label>
      <label>
        소유자
        <select value={draft.owner} onChange={event => setDraft({ ...draft, owner: event.target.value })}>
          {owners.map(owner => <option key={owner}>{owner}</option>)}
        </select>
      </label>
      <label>
        단계
        <select value={draft.stage} onChange={event => setDraft({ ...draft, stage: event.target.value as DealStage })}>
          {stageOrder.map(stage => <option key={stage} value={stage}>{stageLabels[stage]}</option>)}
        </select>
      </label>
      <label>
        다음 액션
        <input value={draft.nextAction} onChange={event => setDraft({ ...draft, nextAction: event.target.value })} />
      </label>
      <button type="button" className="fc-primary" onClick={onSubmit} disabled={!draft.company.trim() || !draft.nextAction.trim()}>
        {submitLabel}
      </button>
    </div>
  )
}

export default function FlowCrm() {
  const [deals, setDeals] = useState<Deal[]>(initialDeals)
  const [activeNav, setActiveNav] = useState('파이프라인')
  const [query, setQuery] = useState('')
  const [owner, setOwner] = useState('전체 담당자')
  const [stageFilter, setStageFilter] = useState<'전체 단계' | DealStage>('전체 단계')
  const [selectedId, setSelectedId] = useState(initialDeals[4].id)
  const [drawer, setDrawer] = useState<'detail' | 'new'>('detail')
  const [draft, setDraft] = useState<Omit<Deal, 'id'>>(emptyDraft)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const selectedDeal = deals.find(deal => deal.id === selectedId) ?? deals[0]
  const editDraft = selectedDeal ? { ...selectedDeal } : null

  const filteredDeals = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return deals.filter(deal => {
      const matchesQuery = !normalized || `${deal.company} ${deal.contact} ${deal.industry}`.toLowerCase().includes(normalized)
      const matchesOwner = owner === '전체 담당자' || deal.owner === owner
      const matchesStage = stageFilter === '전체 단계' || deal.stage === stageFilter
      return matchesQuery && matchesOwner && matchesStage
    })
  }, [deals, owner, query, stageFilter])

  const totalPipeline = filteredDeals.reduce((sum, deal) => sum + deal.amount, 0)
  const wonTotal = deals.filter(deal => deal.stage === 'contract').reduce((sum, deal) => sum + deal.amount, 0)

  const grouped = stageOrder.reduce<Record<DealStage, Deal[]>>((acc, stage) => {
    acc[stage] = filteredDeals.filter(deal => deal.stage === stage)
    return acc
  }, {} as Record<DealStage, Deal[]>)

  const addDeal = () => {
    const nextDeal: Deal = { ...draft, id: `d${Date.now()}` }
    setDeals(current => [nextDeal, ...current])
    setSelectedId(nextDeal.id)
    setDrawer('detail')
    setDraft(emptyDraft)
  }

  const updateSelectedDeal = (next: Deal) => {
    setDeals(current => current.map(deal => deal.id === next.id ? next : deal))
    setSelectedId(next.id)
  }

  return (
    <div className="sample-flow-crm">
      <div className={`fc-scrim${sidebarOpen ? ' open' : ''}`} onClick={() => setSidebarOpen(false)} />
      <aside className={`fc-sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="fc-brand"><span>F</span><strong>Flow</strong></div>
        <nav className="fc-nav" aria-label="Flow navigation">
          {navItems.map(item => (
            <button key={item} className={activeNav === item ? 'active' : ''} onClick={() => { setActiveNav(item); setSidebarOpen(false) }}>
              {item}
            </button>
          ))}
        </nav>
        <div className="fc-user">
          <span>영업팀</span>
          <strong>Acme Corp.</strong>
        </div>
      </aside>

      <div className="fc-shell">
        <header className="fc-topbar">
          <button className="fc-menu" onClick={() => setSidebarOpen(true)} aria-label="메뉴 열기">☰</button>
          <div>
            <p>파이프라인</p>
            <h1>다음 액션이 비어 있지 않은 영업 보드</h1>
          </div>
          <label className="fc-search">
            <Icon type="search" />
            <input value={query} onChange={event => setQuery(event.target.value)} placeholder="고객사, 담당자, 업종 검색" />
          </label>
          <button type="button" className="fc-primary fc-add" onClick={() => setDrawer('new')} aria-label="새 거래 등록">
            <Icon type="plus" />
            새 거래 등록
          </button>
        </header>

        <main className="fc-content">
          <section className="fc-stats">
            <article><span>파이프라인 금액</span><strong>{currency(totalPipeline)}</strong></article>
            <article><span>계약 단계</span><strong>{currency(wonTotal)}</strong></article>
            <article><span>진행 거래</span><strong>{filteredDeals.length}건</strong></article>
            <article><span>오늘 액션</span><strong>{activities.filter(item => item.due === '오늘').length}건</strong></article>
          </section>

          <section className="fc-toolbar">
            <select value={owner} onChange={event => setOwner(event.target.value)} aria-label="담당자 필터">
              <option>전체 담당자</option>
              {owners.map(item => <option key={item}>{item}</option>)}
            </select>
            <select value={stageFilter} onChange={event => setStageFilter(event.target.value as '전체 단계' | DealStage)} aria-label="단계 필터">
              <option>전체 단계</option>
              {stageOrder.map(stage => <option key={stage} value={stage}>{stageLabels[stage]}</option>)}
            </select>
          </section>

          <section className="fc-workspace">
            <div className="fc-board" aria-label="거래 보드">
              {stageOrder.map(stage => {
                const rows = grouped[stage]
                return (
                  <section className="fc-column" key={stage}>
                    <header>
                      <div>
                        <h2>{stageLabels[stage]}</h2>
                        <span>{currency(rows.reduce((sum, deal) => sum + deal.amount, 0))}</span>
                      </div>
                      <b>{rows.length}</b>
                    </header>
                    <div className="fc-cards">
                      <AnimatePresence mode="popLayout">
                        {rows.map(deal => (
                          <DealCard key={deal.id} deal={deal} selected={selectedId === deal.id} onSelect={(id) => { setSelectedId(id); setDrawer('detail') }} />
                        ))}
                      </AnimatePresence>
                    </div>
                  </section>
                )
              })}
            </div>

            <aside className="fc-drawer" aria-label="거래 상세">
              <div className="fc-drawer-head">
                <div>
                  <h2>{drawer === 'new' ? '새 거래' : selectedDeal.company}</h2>
                  <p>{drawer === 'new' ? '보드에 바로 추가됩니다.' : `${selectedDeal.contact} · ${selectedDeal.industry}`}</p>
                </div>
                {drawer === 'new' && (
                  <button className="fc-close" onClick={() => setDrawer('detail')} aria-label="닫기"><Icon type="x" /></button>
                )}
              </div>

              {drawer === 'new' ? (
                <DealForm draft={draft} setDraft={setDraft} onSubmit={addDeal} submitLabel="거래 추가" />
              ) : editDraft ? (
                <DealForm
                  draft={editDraft}
                  setDraft={(next) => updateSelectedDeal({ ...next, id: selectedDeal.id })}
                  onSubmit={() => undefined}
                  submitLabel="자동 저장됨"
                />
              ) : null}

              <div className="fc-activity">
                <h3>다음 액션</h3>
                {activities.map(item => (
                  <div key={item.id}>
                    <time>{item.due}</time>
                    <strong>{item.company}</strong>
                    <span>{item.task}</span>
                  </div>
                ))}
              </div>
            </aside>
          </section>
        </main>
      </div>
    </div>
  )
}
