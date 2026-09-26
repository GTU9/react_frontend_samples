import { forwardRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import './press-brut.css'
import { seedPosts, CATEGORIES } from './mock'
import type { Post, CategoryValue } from './mock'

// ——— Top bar ———
function TopBar({
  mode,
  onWrite,
  onList,
}: {
  mode: 'list' | 'read' | 'write'
  onWrite: () => void
  onList: () => void
}) {
  return (
    <header className="pr-topbar">
      <div className="pr-topbar__brand">PRESS</div>
      <nav className="pr-topbar__nav" aria-label="모드 전환">
        <button
          className={`pr-topbar__btn${mode !== 'write' ? ' pr-topbar__btn--active' : ''}`}
          type="button"
          onClick={onList}
          aria-current={mode !== 'write' ? 'page' : undefined}
        >
          글 보기
        </button>
        <button
          className={`pr-topbar__btn pr-topbar__btn--accent${mode === 'write' ? ' pr-topbar__btn--accent-active' : ''}`}
          type="button"
          onClick={onWrite}
          aria-current={mode === 'write' ? 'page' : undefined}
        >
          새 글 쓰기
        </button>
      </nav>
    </header>
  )
}

// ——— Post list item ———
const PostRow = forwardRef<
  HTMLElement,
  {
    post: Post
    onSelect: (post: Post) => void
    reduced: boolean
  }
>(function PostRow({ post, onSelect, reduced }, ref) {
  return (
    <motion.article
      ref={ref}
      className="pr-row"
      layout
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -16 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        className="pr-row__inner"
        type="button"
        onClick={() => onSelect(post)}
        aria-label={`${post.title} 읽기`}
      >
        <span className="pr-row__num" aria-hidden="true">
          {String(post.number).padStart(2, '0')}
        </span>
        <div className="pr-row__body">
          <div className="pr-row__meta">
            <span className="pr-row__cat">{post.category}</span>
            <span className="pr-row__date">{post.date}</span>
            <span className="pr-row__author">{post.author}</span>
          </div>
          <h2 className="pr-row__title">{post.title}</h2>
          <p className="pr-row__excerpt">{post.excerpt}</p>
        </div>
        <span className="pr-row__arrow" aria-hidden="true">→</span>
      </button>
    </motion.article>
  )
})

// ——— List view ———
function ListView({
  posts,
  onSelect,
  reduced,
}: {
  posts: Post[]
  onSelect: (post: Post) => void
  reduced: boolean
}) {
  const [activeCategory, setActiveCategory] = useState<CategoryValue>('전체')

  const filtered =
    activeCategory === '전체'
      ? posts
      : posts.filter((p) => p.category === activeCategory)

  return (
    <motion.div
      className="pr-list-view"
      key="list"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? undefined : { opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <div className="pr-list-header">
        <h1 className="pr-list-headline">
          독립 시민 지면<span className="pr-list-headline__accent">.</span>
        </h1>
        <p className="pr-list-count">{filtered.length}편</p>
      </div>

      <nav className="pr-cat-nav" aria-label="카테고리 필터">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`pr-cat-btn${activeCategory === cat ? ' pr-cat-btn--active' : ''}`}
            type="button"
            onClick={() => setActiveCategory(cat)}
            aria-pressed={activeCategory === cat}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className="pr-rows" role="list">
        <AnimatePresence mode="popLayout">
          {filtered.map((post) => (
            <PostRow
              key={post.id}
              post={post}
              onSelect={onSelect}
              reduced={reduced}
            />
          ))}
        </AnimatePresence>
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
  const paragraphs = post.body.split('\n\n').filter(Boolean)

  return (
    <motion.div
      className="pr-read-view"
      key={`read-${post.id}`}
      initial={reduced ? false : { opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduced ? undefined : { opacity: 0, x: -32 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <button className="pr-back-btn" type="button" onClick={onBack}>
        ← 목록
      </button>

      <div className="pr-read-inner">
        <div className="pr-read-meta">
          <span className="pr-read-cat">{post.category}</span>
          <span className="pr-read-num">NO. {String(post.number).padStart(2, '0')}</span>
        </div>

        <h1 className="pr-read-title">{post.title}</h1>

        <div className="pr-read-byline">
          <span className="pr-read-author">{post.author}</span>
          <span className="pr-read-date">{post.date}</span>
        </div>

        <div className="pr-read-rule" aria-hidden="true" />

        <div className="pr-read-body">
          {paragraphs.map((para, i) => (
            <motion.p
              key={i}
              className="pr-read-para"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: reduced ? 0 : 0.1 + i * 0.06 }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        <div className="pr-read-footer" aria-hidden="true">
          — END —
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
  onPublish: (post: Omit<Post, 'id' | 'number'>) => void
  onCancel: () => void
  reduced: boolean
}) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState<string>('에세이')
  const [error, setError] = useState<string | null>(null)

  const WRITE_CATEGORIES = CATEGORIES.filter((c) => c !== '전체')

  function handlePublish() {
    if (!title.trim()) {
      setError('제목을 입력하세요.')
      return
    }
    if (!body.trim()) {
      setError('본문을 입력하세요.')
      return
    }
    setError(null)
    const today = new Date().toISOString().slice(0, 10)
    onPublish({
      title: title.trim(),
      excerpt: body.trim().slice(0, 100) + (body.trim().length > 100 ? '…' : ''),
      body: body.trim(),
      author: '독자 기고',
      date: today,
      category,
    })
  }

  const hasPreview = title.trim().length > 0 || body.trim().length > 0

  return (
    <motion.div
      className="pr-write-view"
      key="write"
      initial={reduced ? false : { opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduced ? undefined : { opacity: 0, x: -32 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pr-write-inner">
        {/* Form column */}
        <div className="pr-write-form-col">
          <div className="pr-write-heading">
            <span className="pr-write-heading__label">오피니언 작성</span>
          </div>

          {error && (
            <div className="pr-write-error" role="alert">
              {error}
            </div>
          )}

          <div className="pr-field">
            <label className="pr-field__label" htmlFor="pr-title">
              제목
            </label>
            <input
              id="pr-title"
              className="pr-field__input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              maxLength={80}
              autoComplete="off"
            />
          </div>

          <div className="pr-field">
            <label className="pr-field__label" htmlFor="pr-category">
              카테고리
            </label>
            <select
              id="pr-category"
              className="pr-field__select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {WRITE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="pr-field pr-field--grow">
            <label className="pr-field__label" htmlFor="pr-body">
              본문
            </label>
            <textarea
              id="pr-body"
              className="pr-field__textarea"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="본문을 입력하세요. 단락은 빈 줄로 구분됩니다."
              rows={12}
            />
          </div>

          <div className="pr-write-actions">
            <button
              className="pr-write-cancel"
              type="button"
              onClick={onCancel}
            >
              취소
            </button>
            <button
              className="pr-write-publish"
              type="button"
              onClick={handlePublish}
            >
              발행
            </button>
          </div>
        </div>

        {/* Preview column */}
        <div className="pr-preview-col" aria-label="미리보기">
          <div className="pr-preview-heading">미리보기</div>
          {hasPreview ? (
            <div className="pr-preview-card">
              <div className="pr-preview-cat">{category}</div>
              <h2 className="pr-preview-title">
                {title.trim() || '(제목 없음)'}
              </h2>
              <div className="pr-preview-rule" aria-hidden="true" />
              <div className="pr-preview-body">
                {body.trim() ? (
                  body
                    .trim()
                    .split('\n\n')
                    .filter(Boolean)
                    .map((para, i) => (
                      <p key={i} className="pr-preview-para">
                        {para}
                      </p>
                    ))
                ) : (
                  <p className="pr-preview-empty">본문을 입력하면 여기에 표시됩니다.</p>
                )}
              </div>
            </div>
          ) : (
            <div className="pr-preview-empty-state">
              제목 또는 본문을 입력하면<br />미리보기가 나타납니다.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ——— Root export ———
export default function PressBrut() {
  const reduced = useReducedMotion() ?? false

  const [posts, setPosts] = useState<Post[]>(seedPosts)
  const [mode, setMode] = useState<'list' | 'read' | 'write'>('list')
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  function handleSelectPost(post: Post) {
    setSelectedPost(post)
    setMode('read')
  }

  function handleBackToList() {
    setMode('list')
    setSelectedPost(null)
  }

  function handleGoWrite() {
    setMode('write')
    setSelectedPost(null)
  }

  function handlePublish(data: Omit<Post, 'id' | 'number'>) {
    const newPost: Post = {
      ...data,
      id: `post-${Date.now()}`,
      number: posts.length + 1,
    }
    setPosts([newPost, ...posts])
    setMode('list')
  }

  return (
    <div className="sample-press-brut">
      <TopBar mode={mode} onWrite={handleGoWrite} onList={handleBackToList} />

      <main className="pr-main">
        <AnimatePresence mode="wait">
          {mode === 'list' && (
            <ListView
              key="list"
              posts={posts}
              onSelect={handleSelectPost}
              reduced={reduced}
            />
          )}
          {mode === 'read' && selectedPost && (
            <ReadView
              key={`read-${selectedPost.id}`}
              post={selectedPost}
              onBack={handleBackToList}
              reduced={reduced}
            />
          )}
          {mode === 'write' && (
            <WriteView
              key="write"
              onPublish={handlePublish}
              onCancel={handleBackToList}
              reduced={reduced}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
