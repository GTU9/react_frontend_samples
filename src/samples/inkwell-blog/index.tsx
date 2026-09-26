import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import './inkwell-blog.css'
import { SEED_POSTS, TAGS } from './mock'
import type { Post } from './mock'

type Mode = 'list' | 'read' | 'write'

// ——— Top bar ———
function TopBar({
  mode,
  onWrite,
  onList,
  reduced,
}: {
  mode: Mode
  onWrite: () => void
  onList: () => void
  reduced: boolean
}) {
  return (
    <motion.header
      className="ib-topbar"
      initial={reduced ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <button className="ib-brand" type="button" onClick={onList} aria-label="Inkwell 홈으로">
        Inkwell
      </button>
      <div className="ib-topbar__actions">
        {mode === 'write' ? (
          <button className="ib-btn ib-btn--ghost" type="button" onClick={onList}>
            글 보기
          </button>
        ) : (
          <button className="ib-btn ib-btn--primary" type="button" onClick={onWrite}>
            새 글 쓰기
          </button>
        )}
      </div>
    </motion.header>
  )
}

// ——— Post card in list view ———
function PostCard({
  post,
  index,
  onOpen,
  reduced,
}: {
  post: Post
  index: number
  onOpen: (post: Post) => void
  reduced: boolean
}) {
  return (
    <motion.article
      className="ib-card"
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: reduced ? 0 : index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onOpen(post)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(post)}
      aria-label={`${post.title} 읽기`}
    >
      <div className="ib-card__meta">
        <span className="ib-tag">{post.tag}</span>
        <span className="ib-card__dot" aria-hidden="true" />
        <span className="ib-card__time">{post.readTime} 읽기</span>
      </div>
      <h2 className="ib-card__title">{post.title}</h2>
      <p className="ib-card__excerpt">{post.excerpt}</p>
      <div className="ib-card__byline">
        <span className="ib-card__author">{post.author.name}</span>
        <span className="ib-card__dot" aria-hidden="true" />
        <span className="ib-card__date">{post.date}</span>
      </div>
    </motion.article>
  )
}

// ——— List view ———
function ListView({
  posts,
  onOpen,
  reduced,
}: {
  posts: Post[]
  onOpen: (post: Post) => void
  reduced: boolean
}) {
  return (
    <motion.div
      key="list"
      className="ib-view ib-list-view"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? {} : { opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="ib-container">
        <motion.div
          className="ib-list-header"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div>
            <h1 className="ib-list-header__title">조용한 문장들</h1>
            <p className="ib-list-header__note">읽고, 기록하고, 오래 남기는 흰 종이의 블로그</p>
          </div>
          <p className="ib-list-header__count">{posts.length}편</p>
        </motion.div>

        {posts.length === 0 ? (
          <motion.div
            className="ib-empty"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="ib-empty__text">아직 작성된 글이 없습니다.</p>
            <p className="ib-empty__sub">첫 번째 글을 써보세요.</p>
          </motion.div>
        ) : (
          <div className="ib-list-shell">
            <aside className="ib-margin-note" aria-label="편집 노트">
              <img src="/media/inkwell-blog/notebook-desk.jpg" alt="노트와 펜이 놓인 책상" />
              <p>좋은 문장은 조용히, 그러나 오래 남는다.</p>
              <span>Inkwell notebook</span>
            </aside>
            <div className="ib-post-list">
              {posts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} onOpen={onOpen} reduced={reduced} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ——— Read view ———
function ReadView({
  post,
  onBack,
  reduced,
}: {
  post: Post
  onBack: () => void
  reduced: boolean
}) {
  return (
    <motion.div
      key="read"
      className="ib-view ib-read-view"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? {} : { opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="ib-container ib-container--narrow">
        <button className="ib-back-btn" type="button" onClick={onBack} aria-label="목록으로 돌아가기">
          <span className="ib-back-btn__arrow" aria-hidden="true">←</span>
          목록
        </button>

        <header className="ib-article-header">
          <div className="ib-article-header__meta">
            <span className="ib-tag">{post.tag}</span>
            <span className="ib-card__dot" aria-hidden="true" />
            <span className="ib-card__time">{post.readTime} 읽기</span>
          </div>
          <h1 className="ib-article-title">{post.title}</h1>
          <div className="ib-article-byline">
            <span className="ib-article-byline__author">{post.author.name}</span>
            <span className="ib-card__dot" aria-hidden="true" />
            <span>{post.author.bio}</span>
            <span className="ib-card__dot" aria-hidden="true" />
            <span>{post.date}</span>
          </div>
          <div className="ib-article-rule" aria-hidden="true" />
        </header>

        <div className="ib-article-body">
          {post.body.map((para, i) => (
            <motion.p
              key={i}
              className="ib-article-para"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: reduced ? 0 : 0.1 + i * 0.06, ease: 'easeOut' }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        <div className="ib-article-footer">
          <button className="ib-back-btn" type="button" onClick={onBack}>
            <span className="ib-back-btn__arrow" aria-hidden="true">←</span>
            목록으로
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ——— Live preview panel ———
function PreviewPane({
  title,
  body,
  tag,
  reduced,
}: {
  title: string
  body: string
  tag: string
  reduced: boolean
}) {
  const paragraphs = body
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

  return (
    <motion.div
      className="ib-preview"
      initial={reduced ? false : { opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="ib-preview__label">미리보기</p>
      <div className="ib-preview__inner">
        {tag && <span className="ib-tag ib-tag--preview">{tag}</span>}
        {title ? (
          <h2 className="ib-preview__title">{title}</h2>
        ) : (
          <h2 className="ib-preview__title ib-preview__placeholder">제목을 입력하세요</h2>
        )}
        <div className="ib-preview__body">
          {paragraphs.length > 0 ? (
            paragraphs.map((p, i) => (
              <p key={i} className="ib-preview__para">
                {p}
              </p>
            ))
          ) : (
            <p className="ib-preview__placeholder">본문을 입력하면 여기에 표시됩니다.</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ——— Write view ———
function WriteView({
  onPublish,
  onCancel,
  reduced,
}: {
  onPublish: (title: string, body: string, tag: string) => void
  onCancel: () => void
  reduced: boolean
}) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tag, setTag] = useState<string>(TAGS[0])
  const [error, setError] = useState('')

  function handlePublish() {
    if (!title.trim()) {
      setError('제목을 입력해주세요.')
      return
    }
    if (!body.trim()) {
      setError('본문을 입력해주세요.')
      return
    }
    setError('')
    onPublish(title.trim(), body.trim(), tag)
  }

  return (
    <motion.div
      key="write"
      className="ib-view ib-write-view"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? {} : { opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="ib-write-layout">
        {/* Composer */}
        <div className="ib-composer">
          <div className="ib-composer__header">
            <h2 className="ib-composer__heading">새 글 작성</h2>
            <button className="ib-btn ib-btn--ghost" type="button" onClick={onCancel}>
              취소
            </button>
          </div>

          <div className="ib-field">
            <label className="ib-field__label" htmlFor="ib-title">
              제목
            </label>
            <input
              id="ib-title"
              className="ib-field__input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="글의 제목을 입력하세요"
              aria-required="true"
            />
          </div>

          <div className="ib-field">
            <label className="ib-field__label" htmlFor="ib-tag">
              태그
            </label>
            <select
              id="ib-tag"
              className="ib-field__select"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            >
              {TAGS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="ib-field ib-field--grow">
            <label className="ib-field__label" htmlFor="ib-body">
              본문
            </label>
            <textarea
              id="ib-body"
              className="ib-field__textarea"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={'단락을 구분하려면 Enter를 두 번 누르세요.\n첫 번째 단락을 써보세요.'}
              aria-required="true"
            />
          </div>

          {error && (
            <motion.p
              className="ib-error"
              initial={reduced ? false : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              role="alert"
            >
              {error}
            </motion.p>
          )}

          <div className="ib-composer__footer">
            <button
              className="ib-btn ib-btn--publish"
              type="button"
              onClick={handlePublish}
              aria-label="글 발행하기"
            >
              발행
            </button>
          </div>
        </div>

        {/* Live preview */}
        <PreviewPane title={title} body={body} tag={tag} reduced={reduced} />
      </div>
    </motion.div>
  )
}

// ——— Root export ———
export default function InkwellBlog() {
  const reduced = useReducedMotion() ?? false

  const [posts, setPosts] = useState<Post[]>(SEED_POSTS)
  const [mode, setMode] = useState<Mode>('list')
  const [activePost, setActivePost] = useState<Post | null>(null)

  function openPost(post: Post) {
    setActivePost(post)
    setMode('read')
  }

  function goList() {
    setMode('list')
    setActivePost(null)
  }

  function goWrite() {
    setMode('write')
    setActivePost(null)
  }

  function handlePublish(title: string, body: string, tag: string) {
    const paragraphs = body
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)

    const newPost: Post = {
      id: String(Date.now()),
      slug: title.toLowerCase().replace(/\s+/g, '-'),
      title,
      excerpt: paragraphs[0] ?? '',
      body: paragraphs,
      author: { name: '나', bio: '독자' },
      date: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      readTime: `${Math.max(1, Math.round(body.length / 500))}분`,
      tag,
    }

    setPosts((prev) => [newPost, ...prev])
    setMode('list')
    setActivePost(null)
  }

  return (
    <div className="sample-inkwell-blog">
      <TopBar mode={mode} onWrite={goWrite} onList={goList} reduced={reduced} />

      <main className="ib-main" aria-label="블로그 콘텐츠">
        <AnimatePresence mode="wait">
          {mode === 'list' && (
            <ListView key="list" posts={posts} onOpen={openPost} reduced={reduced} />
          )}
          {mode === 'read' && activePost && (
            <ReadView key="read" post={activePost} onBack={goList} reduced={reduced} />
          )}
          {mode === 'write' && (
            <WriteView key="write" onPublish={handlePublish} onCancel={goList} reduced={reduced} />
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
