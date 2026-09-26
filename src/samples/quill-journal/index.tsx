import { useRef, useState } from 'react'
import { articles, topics, type Article } from './mock'
import './quill-journal.css'

export default function QuillJournal() {
  const [topic, setTopic] = useState('전체')
  const [selected, setSelected] = useState<Article | null>(null)
  const [saved, setSaved] = useState<string[]>([])
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const visible = topic === '보관한 글' ? articles.filter(a => saved.includes(a.id)) : articles.filter(a => topic === '전체' || a.category === topic)
  const lead = visible[0]
  function openArticle(article: Article | null) {
    setSelected(article)
    requestAnimationFrame(() => { heading.current?.focus(); heading.current?.scrollIntoView({ block: 'start' }) })
  }
  return <div className="sample-quill-journal">
    <header className="qj-header">
      <div className="qj-masthead"><h1 ref={heading} tabIndex={-1}>QUILL<span>저널</span></h1><div><p>일상과 도시를 오래 읽습니다.</p><small>ISSUE 08<br />SEPTEMBER 2026</small></div></div>
      <nav aria-label="저널 카테고리">{[...topics, '보관한 글'].map(t => <button key={t} aria-pressed={topic === t} onClick={() => { setTopic(t); setSelected(null) }}>{t}{t === '보관한 글' && saved.length > 0 ? ` (${saved.length})` : ''}</button>)}</nav>
    </header>
    <main>
      {selected ? <article className="qj-reader">
        <button className="qj-back" onClick={() => openArticle(null)}>← 목록으로</button>
        <p className="qj-category">{selected.category} / {selected.readTime}분</p><h2>{selected.title}</h2>
        <p className="qj-deck">{selected.excerpt}</p><p className="qj-byline">글 {selected.author} · 2026.09.18</p>
        <figure><img src={selected.image} alt={selected.alt} /><figcaption>{selected.caption}</figcaption></figure>
        {selected.body.map((paragraph, i) => <p className="qj-prose" key={i}>{paragraph}</p>)}
        <button className="qj-save" aria-pressed={saved.includes(selected.id)} onClick={() => setSaved(s => s.includes(selected.id) ? s.filter(id => id !== selected.id) : [...s, selected.id])}>{saved.includes(selected.id) ? '보관함에서 빼기' : '이 글 보관하기'}</button>
      </article> : <>
        {lead ? <section className="qj-lead-layout">
          <button className="qj-lead qj-story" onClick={() => openArticle(lead)}><img src={lead.image} alt={lead.alt} /><span className="qj-category">{lead.category} / 에디터의 선택</span><h2>{lead.title}</h2><p>{lead.excerpt}</p><span className="qj-byline">{lead.author} · {lead.readTime}분 읽기</span></button>
          <aside className="qj-index"><h2>{topic === '전체' ? '이번 호의 기록' : topic}</h2>{visible.map((a, i) => <button key={a.id} onClick={() => openArticle(a)}><span>0{i + 1}</span><div><h3>{a.title}</h3><p>{a.category} · {a.author}</p></div></button>)}<figure><img src="/media/quill-journal/library.jpg" alt="도서관의 층층이 이어지는 책장" /><figcaption>책과 사람이 머무는 자리</figcaption></figure></aside>
        </section> : <div className="qj-empty"><h2>아직 보관한 글이 없습니다.</h2><button onClick={() => setTopic('전체')}>이번 호 읽기 →</button></div>}
        {visible.length > 1 && <section className="qj-latest"><h2>새로 쓴 이야기 <span>{String(visible.length - 1).padStart(2, '0')}</span></h2><div>{visible.slice(1).map(a => <button className="qj-story" key={a.id} onClick={() => openArticle(a)}><img src={a.image} alt={a.alt} loading="lazy" /><span className="qj-category">{a.category}</span><h3>{a.title}</h3><p>{a.excerpt}</p><span className="qj-byline">{a.author} · {a.readTime}분 읽기</span></button>)}</div></section>}
      </>}
      <section className="qj-newsletter"><div><h2>금요일에는, 조금 다른 이야기.</h2><p>한 주에 한 번 보내는 편집부의 편지.</p></div><form onSubmit={e => { e.preventDefault(); setSubscribed(true) }}><label htmlFor="qj-email">이메일 주소</label><div><input id="qj-email" type="email" placeholder="mail@example.com" value={email} onChange={e => { setEmail(e.target.value); setSubscribed(false) }} required /><button type="submit">구독 신청 →</button></div><small role="status">{subscribed ? `${email} 구독 신청을 미리 확인했습니다. 실제 메일은 발송되지 않습니다.` : '샘플 신청 폼 · 개인정보를 전송하지 않습니다.'}</small></form></section>
    </main><footer><strong>QUILL</strong><span>독립 문화 저널 · 가상의 기사와 편집부</span><span>© 2026 QUILL</span></footer>
  </div>
}
