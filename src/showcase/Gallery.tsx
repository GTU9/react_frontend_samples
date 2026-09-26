import { Link } from 'react-router-dom'
import { useState } from 'react'
import { samples, samplesByCategory, categoryLabels, pageTypeLabels, visualStyleLabels } from '../samples/registry'
import type { Sample } from '../samples/registry'
import './gallery.css'

function Poster({ sample }: { sample: Sample }) {
  const [failed, setFailed] = useState(false)
  return <div className="gallery-poster" aria-hidden="true">
    {failed ? <span className="gallery-fallback" style={{ color: sample.accent }}>{sample.title}</span> : <img src={`/thumbnails/${sample.id}.png`} alt="" loading="lazy" width="1280" height="720" onError={() => setFailed(true)} />}
    <span className="gallery-open">↗</span>
  </div>
}

export function Gallery() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('전체')
  const groups = samplesByCategory().map(group => ({
    ...group,
    items: group.items.filter(s => (category === '전체' || category === s.category) && `${s.title} ${s.description} ${categoryLabels[s.category]} ${pageTypeLabels[s.pageType]} ${visualStyleLabels[s.visualStyle]}`.toLowerCase().includes(query.trim().toLowerCase())),
  })).filter(group => group.items.length)
  const count = groups.reduce((sum, g) => sum + g.items.length, 0)
  return <div id="top" className="showcase-gallery">
    <header className="gallery-header"><a href="#top" className="gallery-wordmark">INTERFACE INDEX<span>독립적인 화면들의 모음</span></a><span className="gallery-edition">COLLECTION 01 / 2026</span></header>
    <main>
      <div className="gallery-title"><div><h1>인터페이스 아카이브</h1><p>제품, 일, 그리고 일상의 장면들.</p></div><span className="gallery-total">{String(samples.length).padStart(2, '0')}<small>PROJECTS</small></span></div>
      <div className="gallery-toolbar"><nav aria-label="샘플 카테고리">{[{ label: '전체', value: '전체' }, ...samplesByCategory().map(g => ({ label: categoryLabels[g.category], value: g.category }))].map(c => <button key={c.value} aria-pressed={category === c.value} onClick={() => setCategory(c.value)}>{c.label}</button>)}</nav><label><span>검색</span><input type="search" placeholder="이름, 분야로 검색" aria-label="샘플 검색" value={query} onChange={e => setQuery(e.target.value)} /></label></div>
      <div className="gallery-result" role="status">{count}개의 프로젝트<span>웹 / 인터랙션 / 퍼블리싱</span></div>
      {groups.map(({ category: groupCategory, items }) => <section key={groupCategory} className="gallery-section">
        <div className="gallery-section-heading"><h2>{categoryLabels[groupCategory]}</h2><span>{String(items.length).padStart(2, '0')}</span></div>
        <div className="gallery-grid">{items.map(sample => <Link key={sample.id} to={`/sample/${sample.id}`} className="gallery-card"><Poster sample={sample} /><div className="gallery-card-heading"><h3>{sample.title}</h3><span>{String(samples.indexOf(sample) + 1).padStart(2, '0')}</span></div><p>{sample.description}</p><div className="gallery-meta"><span>{pageTypeLabels[sample.pageType]}</span><span>{visualStyleLabels[sample.visualStyle]}</span></div></Link>)}</div>
      </section>)}
      {!count && <section className="gallery-empty"><h2>일치하는 프로젝트가 없습니다.</h2><button onClick={() => { setQuery(''); setCategory('전체') }}>전체 프로젝트 보기 →</button></section>}
    </main><footer><span>INTERFACE INDEX / 24개 독립 샘플</span><a href="#top">맨 위로 ↑</a></footer>
  </div>
}
export default Gallery
