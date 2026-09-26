import { useMemo, useState } from 'react'
import './vault-finance.css'
import { accounts, assets, navItems, transactions, type Account, type Asset } from './mock'

const formatWon = (value: number) => `${value < 0 ? '-' : ''}${Math.abs(value).toLocaleString('ko-KR')}원`

function MiniBars({ selected }: { selected: Account }) {
  const values = [48, 58, 44, 62, 71, 64, 76, 82, 78, 88]
  return (
    <div className="vf-bars" aria-label={`${selected.name} 잔액 흐름`}>
      {values.map((value, index) => (
        <span key={index} style={{ height: `${value}%`, backgroundColor: selected.color }} />
      ))}
    </div>
  )
}

function AllocationRing({ selected }: { selected: Asset }) {
  const radius = 44
  const circumference = 2 * Math.PI * radius
  const stroke = (selected.allocation / 100) * circumference
  return (
    <svg className="vf-ring" viewBox="0 0 120 120" role="img" aria-label={`${selected.name} 비중 ${selected.allocation}%`}>
      <circle cx="60" cy="60" r={radius} />
      <circle cx="60" cy="60" r={radius} strokeDasharray={`${stroke} ${circumference - stroke}`} />
      <text x="60" y="56" textAnchor="middle">{selected.allocation}%</text>
      <text x="60" y="74" textAnchor="middle">비중</text>
    </svg>
  )
}

export default function VaultFinance() {
  const [activeNav, setActiveNav] = useState('자산')
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0].id)
  const [selectedAssetId, setSelectedAssetId] = useState(assets[0].id)
  const [statusFilter, setStatusFilter] = useState<'전체' | '확정' | '검토' | '보류'>('전체')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const selectedAccount = accounts.find(account => account.id === selectedAccountId) ?? accounts[0]
  const selectedAsset = assets.find(asset => asset.id === selectedAssetId) ?? assets[0]
  const visibleTransactions = useMemo(() => (
    transactions.filter(tx => (statusFilter === '전체' || tx.status === statusFilter) && tx.accountId === selectedAccountId)
  ), [selectedAccountId, statusFilter])

  const totalAssets = accounts.reduce((sum, account) => sum + account.balance, 0)
  const pendingCount = transactions.filter(tx => tx.status !== '확정').length

  return (
    <div className="sample-vault-finance">
      <div className={`vf-scrim${sidebarOpen ? ' open' : ''}`} onClick={() => setSidebarOpen(false)} />
      <aside className={`vf-sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="vf-brand">
          <span aria-hidden="true">V</span>
          <strong>Vault</strong>
        </div>
        <nav className="vf-nav" aria-label="Vault navigation">
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
        <div className="vf-ledger-note">
          <span>최근 동기화</span>
          <strong>2026.09.27 10:24</strong>
        </div>
      </aside>

      <div className="vf-shell">
        <header className="vf-topbar">
          <button className="vf-menu" onClick={() => setSidebarOpen(true)} aria-label="메뉴 열기">☰</button>
          <div>
            <p>자산 현황</p>
            <h1>계좌와 현금 흐름을 한 장부에서 검토</h1>
          </div>
          <div className="vf-top-summary">
            <span>총 자산</span>
            <strong>{formatWon(totalAssets)}</strong>
          </div>
        </header>

        <main className="vf-content">
          <section className="vf-hero">
            <article
              className="vf-balance-panel"
            >
              <div className="vf-panel-head">
                <div>
                  <h2>{selectedAccount.name}</h2>
                  <p>{selectedAccount.bank} · {selectedAccount.type}</p>
                </div>
                <select value={selectedAccountId} onChange={event => setSelectedAccountId(event.target.value)} aria-label="계좌 선택">
                  {accounts.map(account => <option key={account.id} value={account.id}>{account.name}</option>)}
                </select>
              </div>
              <strong className="vf-balance">{formatWon(selectedAccount.balance)}</strong>
              <span className={selectedAccount.change >= 0 ? 'vf-good' : 'vf-bad'}>
                전일 대비 {formatWon(selectedAccount.change)}
              </span>
              <MiniBars selected={selectedAccount} />
            </article>

            <article className="vf-review-panel">
              <span>검토 필요</span>
              <strong>{pendingCount}건</strong>
              <p>분류 또는 증빙 확인이 필요한 거래입니다.</p>
            </article>
          </section>

          <section className="vf-grid">
            <article className="vf-panel">
              <div className="vf-panel-head">
                <div>
                  <h2>주요 자산</h2>
                  <p>선택한 자산의 비중과 위험도를 확인합니다.</p>
                </div>
              </div>
              <div className="vf-assets">
                {assets.map(asset => (
                  <button
                    key={asset.id}
                    className={selectedAssetId === asset.id ? 'active' : ''}
                    onClick={() => setSelectedAssetId(asset.id)}
                  >
                    <span>
                      <strong>{asset.name}</strong>
                      <em>{asset.institution}</em>
                    </span>
                    <b>{formatWon(asset.value)}</b>
                  </button>
                ))}
              </div>
            </article>

            <aside className="vf-panel vf-asset-detail">
              <div className="vf-panel-head">
                <div>
                  <h2>{selectedAsset.name}</h2>
                  <p>{selectedAsset.institution}</p>
                </div>
              </div>
              <AllocationRing selected={selectedAsset} />
              <dl>
                <div><dt>평가액</dt><dd>{formatWon(selectedAsset.value)}</dd></div>
                <div><dt>위험도</dt><dd>{selectedAsset.risk}</dd></div>
                <div><dt>수익률</dt><dd>{selectedAsset.yield.toFixed(1)}%</dd></div>
              </dl>
            </aside>
          </section>

          <section className="vf-panel">
            <div className="vf-panel-head">
              <div>
                <h2>거래내역</h2>
                <p>{selectedAccount.name} 기준 장부</p>
              </div>
              <div className="vf-filter">
                {(['전체', '확정', '검토', '보류'] as const).map(status => (
                  <button key={status} className={statusFilter === status ? 'active' : ''} onClick={() => setStatusFilter(status)}>
                    {status}
                  </button>
                ))}
              </div>
            </div>
            <div className="vf-table-wrap">
              <table className="vf-table">
                <thead>
                  <tr>
                    <th>일자</th>
                    <th>거래처</th>
                    <th>메모</th>
                    <th>분류</th>
                    <th>금액</th>
                    <th>잔액</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleTransactions.map(tx => (
                    <tr key={tx.id}>
                      <td>{tx.date}</td>
                      <td><strong>{tx.merchant}</strong></td>
                      <td>{tx.memo}</td>
                      <td>{tx.category}</td>
                      <td className={tx.amount >= 0 ? 'vf-good' : 'vf-bad'}>{formatWon(tx.amount)}</td>
                      <td>{formatWon(tx.balance)}</td>
                      <td><span className={`vf-status ${tx.status}`}>{tx.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
