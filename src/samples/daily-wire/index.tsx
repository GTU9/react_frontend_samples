import { useRef, useState } from 'react'
import { articles, categories, type Article } from './mock'
import './daily-wire.css'

export default function DailyWire() {
  const [category, setCategory] = useState('전체')
  const [query, setQuery] = useState('')
  const [saved, setSaved] = useState<string[]>([])
  const [selected, setSelected] = useState<Article | null>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const visible = articles.filter(a => (category === '보관함' ? saved.includes(a.id) : category === '전체' || a.category === category) && `${a.headline} ${a.excerpt}`.includes(query.trim()))
  function open(article: Article | null) {
    setSelected(article)
    requestAnimationFrame(() => { heading.current?.focus(); heading.current?.scrollIntoView({ block: 'start' }) })
  }
  function save(id: string) { setSaved(ids => ids.includes(id) ? ids.filter(i => i !== id) : [...ids, id]) }
  return <div className="sample-daily-wire">
    <header className="dw-masthead"><div><span>2026년 9월 · 기획호</span><span>지역의 오늘을 기록합니다.</span></div><h1 ref={heading} tabIndex={-1}>데일리 서울<span>DAILY SEOUL</span></h1><p>도시의 변화, 생활의 발견</p></header>
    <div className="dw-wrap"><nav className="dw-nav" aria-label="뉴스 분야">{[...categories, '보관함'].map(c => <button key={c} aria-pressed={category === c} onClick={() => { setCategory(c); setSelected(null) }}>{c}{c === '보관함' ? ` ${saved.length}` : ''}</button>)}<input type="search" aria-label="기사 검색" placeholder="기사 검색" value={query} onChange={e => { setQuery(e.target.value); setSelected(null) }} /></nav>
    <div className="dw-edition"><strong>9월의 기록</strong><p>걷고, 읽고, 머무는 도시</p><span>가상의 지역 매체 · 샘플 기사</span></div>
    <main>{selected ? <article className="dw-reader"><button className="dw-back" onClick={() => open(null)}>← 기사 목록</button><p className="dw-category">{selected.category}</p><h2>{selected.headline}</h2><p className="dw-deck">{selected.excerpt}</p><p className="dw-meta">{selected.author} 기자 · 2026.09.18 · {selected.minutes}분 읽기</p><figure><img src={selected.image} alt={selected.alt} /><figcaption>{selected.alt} / 자료사진 Unsplash</figcaption></figure>{selected.body.map((p, i) => <p className="dw-prose" key={i}>{p}</p>)}<button className="dw-save" onClick={() => save(selected.id)} aria-pressed={saved.includes(selected.id)}>{saved.includes(selected.id) ? '보관 취소' : '기사 보관'}</button></article> : visible.length ? <>
      <section className="dw-front"><button className="dw-lead dw-article-link" onClick={() => open(visible[0])}><img src={visible[0].image} alt={visible[0].alt} /><span className="dw-category">{visible[0].category} / 현장 기록</span><h2>{visible[0].headline}</h2><p>{visible[0].excerpt}</p><span className="dw-meta">{visible[0].author} 기자 · {visible[0].minutes}분 읽기</span></button>
      <div className="dw-secondaries">{visible.slice(1, 4).map((a, i) => <button key={a.id} className="dw-article-link" onClick={() => open(a)}><span className="dw-category">{a.category}</span><h3>{a.headline}</h3>{i === 0 && <img src={a.image} alt={a.alt} />}<p>{a.excerpt}</p><span className="dw-meta">{a.author} 기자</span></button>)}</div>
      <aside className="dw-aside"><h2>{category === '보관함' ? '보관한 기사' : query || category !== '전체' ? '선택한 기사' : '편집부가 고른 기사'}</h2>{visible.slice(0, 4).map((a, i) => <button key={a.id} onClick={() => open(a)}><span>{i + 1}</span><h3>{a.headline}</h3></button>)}{category === '전체' && !query && <div className="dw-note"><span>편집장의 편지</span><h3>뉴스는 멀리만<br />있지 않습니다.</h3><p>출근길의 나무 한 그루, 동네 가게의 작은 변화에서 이야기를 시작합니다.</p><button onClick={() => open(articles[5])}>이달의 글 읽기 →</button></div>}</aside></section>
      {visible.length > 4 && <section className="dw-more"><h2>생활의 발견</h2><div>{visible.slice(4).map(a => <button key={a.id} className="dw-article-link" onClick={() => open(a)}><img src={a.image} alt={a.alt} loading="lazy" /><span className="dw-category">{a.category}</span><h3>{a.headline}</h3><p>{a.excerpt}</p><span className="dw-meta">{a.author} 기자 · {a.minutes}분</span></button>)}</div></section>}
    </> : <section className="dw-empty"><h2>{category === '보관함' ? '보관한 기사가 없습니다.' : '조건에 맞는 기사가 없습니다.'}</h2><button onClick={() => { setCategory('전체'); setQuery('') }}>전체 기사 보기 →</button></section>}</main>
    <footer><strong>데일리 서울</strong><p>이 사이트는 가상의 뉴스 매체입니다. 기사와 인물은 디자인 샘플을 위해 작성되었습니다.</p><span>© 2026 DAILY SEOUL</span></footer></div>
  </div>
}
