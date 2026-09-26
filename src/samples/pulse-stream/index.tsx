import { useEffect, useRef, useState } from 'react'
import { films, type Film } from './mock'
import './pulse-stream.css'

export default function PulseStream() {
  const [category, setCategory] = useState('전체')
  const [query, setQuery] = useState('')
  const [watchlist, setWatchlist] = useState<string[]>([])
  const [library, setLibrary] = useState(false)
  const [selected, setSelected] = useState<Film | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const featured = films[0]
  const visible = films.filter(f => (!library || watchlist.includes(f.id)) && (category === '전체' || f.genre === category) && `${f.title} ${f.director}`.includes(query.trim()))
  useEffect(() => { if (selected) dialog.current?.showModal() }, [selected])
  function toggleSaved(id: string) { setWatchlist(ids => ids.includes(id) ? ids.filter(i => i !== id) : [...ids, id]) }
  return <div className="sample-pulse-stream">
    <header className="ps-header"><h1>FRAME<span>독립영화관</span></h1><nav aria-label="영화관"><button aria-pressed={!library} onClick={() => setLibrary(false)}>상영작</button><button aria-pressed={library} onClick={() => setLibrary(true)}>보관함 <span>{watchlist.length}</span></button></nav><label className="ps-search"><span>작품 검색</span><input aria-label="작품 또는 감독 검색" placeholder="작품, 감독 검색" value={query} onChange={e => setQuery(e.target.value)} /></label></header>
    {!library && !query && category === '전체' && <section className="ps-feature">
      <img src={featured.image} alt={featured.alt} />
      <div className="ps-feature-copy"><p>이달의 발견 · {featured.genre}</p><h2>{featured.title}</h2><p>{featured.director} · {featured.year} · {featured.duration}분</p><div><button className="ps-primary" onClick={() => setSelected(featured)}>작품 소개 ↗</button><button className="ps-save" aria-pressed={watchlist.includes(featured.id)} onClick={() => toggleSaved(featured.id)}>{watchlist.includes(featured.id) ? '✓ 보관함에 담김' : '+ 보관하기'}</button></div></div>
      <p className="ps-still-caption">도시가 잠든 뒤에도, 누군가의 하루는 계속된다.</p>
    </section>}
    <main><section className="ps-catalog"><div className="ps-section-heading"><h2>{library ? '나의 보관함' : '이번 주의 상영작'} <small>{visible.length}</small></h2><div aria-label="영화 장르">{['전체', '드라마', '다큐멘터리', '단편'].map(c => <button aria-pressed={category === c} key={c} onClick={() => setCategory(c)}>{c}</button>)}</div></div>
      {visible.length ? <div className="ps-films">{visible.map((film, i) => <article key={film.id}><button className="ps-film-open" onClick={() => setSelected(film)}><div className="ps-film-image"><img src={film.image} alt={film.alt} loading="lazy" /><span>{String(i + 1).padStart(2, '0')}</span></div><div className="ps-film-meta"><h3>{film.title}</h3><span>{film.year}</span></div><p>{film.director} · {film.genre} · {film.duration}분</p></button><button className="ps-film-save" aria-label={`${film.title} ${watchlist.includes(film.id) ? '보관 취소' : '보관하기'}`} aria-pressed={watchlist.includes(film.id)} title="보관함" onClick={() => toggleSaved(film.id)}>{watchlist.includes(film.id) ? '✓' : '+'}</button></article>)}</div> : <div className="ps-empty"><h3>{library ? '보관한 작품이 없습니다.' : '검색 결과가 없습니다.'}</h3><button onClick={() => { setQuery(''); setCategory('전체'); setLibrary(false) }}>모든 작품 보기 →</button></div>}
    </section>
    <section className="ps-editorial"><span>FRAME JOURNAL / 01</span><h2>한 장면이 오래 남는 이유.</h2><p>스크린이 꺼진 뒤 시작되는 대화. 이번 달에는 도시와 자연 사이를 오가는 세 편의 이야기를 골랐습니다.</p><button onClick={() => setSelected(films[1])}>에디터의 추천작 보기 ↗</button></section></main>
    <footer><strong>FRAME</strong><p>가상의 독립영화 큐레이션 · 작품 정보와 사진은 샘플입니다. 실제 영상은 제공하지 않습니다.</p><span>SEOUL, KR / 2026</span></footer>
    <dialog ref={dialog} onClose={() => setSelected(null)} aria-labelledby="ps-film-title" className="ps-dialog">{selected && <><button className="ps-close" aria-label="작품 소개 닫기" title="닫기" onClick={() => dialog.current?.close()}>×</button><img src={selected.image} alt={selected.alt} /><div className="ps-dialog-copy"><p>{selected.genre} · {selected.year} · {selected.duration}분</p><h2 id="ps-film-title">{selected.title}</h2><span>감독 {selected.director}</span><p className="ps-synopsis">{selected.synopsis}</p><h3>에디터 노트</h3><p>{selected.note}</p><button className="ps-primary" aria-pressed={watchlist.includes(selected.id)} onClick={() => toggleSaved(selected.id)}>{watchlist.includes(selected.id) ? '보관함에서 빼기' : '+ 보관함에 담기'}</button></div></>}</dialog>
  </div>
}
