import { useMemo, useState } from 'react'
import './pulse-dashboard.css'
import {
  events,
  funnel,
  metricsByPeriod,
  navItems,
  pages,
  periodLabels,
  seriesByPeriod,
  type PageRow,
  type PeriodKey,
} from './mock'

const periods: PeriodKey[] = ['7d', '30d', '90d']

function Icon({ name }: { name: 'menu' | 'search' | 'sort' }) {
  if (name === 'search') {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="7" cy="7" r="4.5" />
        <path d="m10.5 10.5 3 3" />
      </svg>
    )
  }
  if (name === 'sort') {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="M5 3v10m0 0 2-2m-2 2-2-2M11 13V3m0 0 2 2m-2-2L9 5" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2.5 4h11M2.5 8h11M2.5 12h11" />
    </svg>
  )
}

function TrendChart({ period }: { period: PeriodKey }) {
  const data = seriesByPeriod[period]
  const width = 760
  const height = 250
  const pad = { top: 18, right: 28, bottom: 34, left: 54 }
  const chartWidth = width - pad.left - pad.right
  const chartHeight = height - pad.top - pad.bottom
  const maxSessions = Math.max(...data.map(point => point.sessions))
  const maxConversions = Math.max(...data.map(point => point.conversions))
  const x = (index: number) => pad.left + (index / (data.length - 1)) * chartWidth
  const ySessions = (value: number) => pad.top + chartHeight - (value / maxSessions) * chartHeight
  const yConversions = (value: number) => pad.top + chartHeight - (value / maxConversions) * chartHeight
  const sessionsPath = data.map((point, index) => `${index === 0 ? 'M' : 'L'}${x(index)} ${ySessions(point.sessions)}`).join(' ')
  const conversionsPath = data.map((point, index) => `${index === 0 ? 'M' : 'L'}${x(index)} ${yConversions(point.conversions)}`).join(' ')
  const areaPath = `${sessionsPath} L${x(data.length - 1)} ${pad.top + chartHeight} L${pad.left} ${pad.top + chartHeight} Z`

  return (
    <svg className="pd-trend-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="세션과 전환 추이">
      {[0, 0.25, 0.5, 0.75, 1].map(tick => {
        const y = pad.top + chartHeight - tick * chartHeight
        return (
          <g key={tick}>
            <line x1={pad.left} x2={width - pad.right} y1={y} y2={y} />
            <text x={pad.left - 10} y={y + 4} textAnchor="end">{Math.round((maxSessions * tick) / 1000)}k</text>
          </g>
        )
      })}
      <path className="pd-chart-area-fill" d={areaPath} />
      <path className="pd-chart-line sessions" d={sessionsPath} />
      <path className="pd-chart-line conversions" d={conversionsPath} />
      {data.map((point, index) => (
        <text key={point.label} x={x(index)} y={height - 10} textAnchor="middle">{point.label}</text>
      ))}
    </svg>
  )
}

function sortPages(rows: PageRow[], key: keyof Pick<PageRow, 'sessions' | 'conversions' | 'conversionRate'>) {
  return [...rows].sort((a, b) => b[key] - a[key])
}

export default function PulseDashboard() {
  const [period, setPeriod] = useState<PeriodKey>('30d')
  const [activeNav, setActiveNav] = useState('대시보드')
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<keyof Pick<PageRow, 'sessions' | 'conversions' | 'conversionRate'>>('sessions')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filteredPages = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    const rows = normalized
      ? pages.filter(page => `${page.path} ${page.owner}`.toLowerCase().includes(normalized))
      : pages
    return sortPages(rows, sortKey)
  }, [query, sortKey])

  const selectedPage = filteredPages[0] ?? pages[0]
  const metrics = metricsByPeriod[period]

  return (
    <div className="sample-pulse-dashboard">
      <div className={`pd-mobile-scrim${sidebarOpen ? ' open' : ''}`} onClick={() => setSidebarOpen(false)} />
      <aside className={`pd-sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="pd-brand">
          <span className="pd-mark" aria-hidden="true"><span /><span /><span /></span>
          <strong>Pulse</strong>
        </div>
        <nav className="pd-nav" aria-label="Pulse navigation">
          {navItems.map(item => (
            <button
              key={item}
              className={activeNav === item ? 'active' : ''}
              onClick={() => { setActiveNav(item); setSidebarOpen(false) }}
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="pd-account">
          <span>데이터팀</span>
          <strong>Acme Corp.</strong>
        </div>
      </aside>

      <div className="pd-shell">
        <header className="pd-topbar">
          <button className="pd-icon-button pd-menu" onClick={() => setSidebarOpen(true)} aria-label="메뉴 열기">
            <Icon name="menu" />
          </button>
          <div>
            <p>제품 성과 대시보드</p>
            <h1>사용자가 전환 지점까지 도달하는 흐름</h1>
          </div>
          <label className="pd-search">
            <Icon name="search" />
            <input value={query} onChange={event => setQuery(event.target.value)} placeholder="페이지, 담당팀 검색" />
          </label>
          <div className="pd-periods" aria-label="기간 선택">
            {periods.map(key => (
              <button key={key} className={period === key ? 'active' : ''} onClick={() => setPeriod(key)}>
                {periodLabels[key]}
              </button>
            ))}
          </div>
        </header>

        <main className="pd-content">
          <section className="pd-metrics" aria-label="핵심 지표">
            {metrics.map(metric => (
              <article
                key={metric.id}
                className="pd-metric"
              >
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <em className={metric.positive ? 'positive' : 'negative'}>{metric.delta}</em>
              </article>
            ))}
          </section>

          <section className="pd-main-grid">
            <article className="pd-panel pd-trend-panel">
              <div className="pd-panel-head">
                <div>
                  <h2>세션 및 전환 추이</h2>
                  <p>{periodLabels[period]} 기준 이벤트 집계</p>
                </div>
                <div className="pd-legend">
                  <span><i className="sessions" />세션</span>
                  <span><i className="conversions" />전환</span>
                </div>
              </div>
              <TrendChart period={period} />
            </article>

            <article className="pd-panel">
              <div className="pd-panel-head">
                <div>
                  <h2>전환 단계</h2>
                  <p>방문부터 체크아웃까지</p>
                </div>
              </div>
              <div className="pd-funnel">
                {funnel.map(step => (
                  <div key={step.label} className="pd-funnel-row">
                    <div>
                      <strong>{step.label}</strong>
                      <span>{step.count.toLocaleString()}명</span>
                    </div>
                    <div className="pd-funnel-track">
                      <span style={{ width: `${step.rate}%` }} />
                    </div>
                    <em>{step.rate}%</em>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="pd-lower-grid">
            <article className="pd-panel">
              <div className="pd-panel-head">
                <div>
                  <h2>페이지 성과</h2>
                  <p>정렬 가능한 드릴다운 테이블</p>
                </div>
                <div className="pd-sorters">
                  {(['sessions', 'conversions', 'conversionRate'] as const).map(key => (
                    <button key={key} className={sortKey === key ? 'active' : ''} onClick={() => setSortKey(key)}>
                      <Icon name="sort" />
                      {key === 'sessions' ? '세션' : key === 'conversions' ? '전환' : '전환율'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pd-table-wrap">
                <table className="pd-table">
                  <thead>
                    <tr>
                      <th>페이지</th>
                      <th>담당</th>
                      <th>세션</th>
                      <th>전환</th>
                      <th>전환율</th>
                      <th>체류</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPages.map(page => (
                      <tr key={page.id}>
                        <td><strong>{page.path}</strong></td>
                        <td>{page.owner}</td>
                        <td>{page.sessions.toLocaleString()}</td>
                        <td>{page.conversions.toLocaleString()}</td>
                        <td>{page.conversionRate.toFixed(1)}%</td>
                        <td>{page.avgTime}</td>
                        <td><span className={`pd-status ${page.status}`}>{page.status === 'healthy' ? '정상' : page.status === 'watch' ? '관찰' : '하락'}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <aside className="pd-panel pd-drilldown">
              <div className="pd-panel-head">
                <div>
                  <h2>드릴다운</h2>
                  <p>{selectedPage.path}</p>
                </div>
              </div>
              <dl>
                <div><dt>세션</dt><dd>{selectedPage.sessions.toLocaleString()}</dd></div>
                <div><dt>전환</dt><dd>{selectedPage.conversions.toLocaleString()}</dd></div>
                <div><dt>전환율</dt><dd>{selectedPage.conversionRate.toFixed(1)}%</dd></div>
                <div><dt>담당팀</dt><dd>{selectedPage.owner}</dd></div>
              </dl>
              <h3>주요 이벤트</h3>
              <div className="pd-events">
                {events.map(event => (
                  <div key={event.id}>
                    <span>{event.event}</span>
                    <strong>{event.count.toLocaleString()}</strong>
                    <em className={event.change >= 0 ? 'positive' : 'negative'}>{event.change >= 0 ? '+' : ''}{event.change}%</em>
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
