import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import './halo-neon.css'
import { seedPosts } from './mock'
import type { Post } from './mock'

// ——— types ———

type Mode = 'list' | 'read' | 'write'

interface FormState {
  title: string
  body: string
  tag: string
  author: string
}

interface FormErrors {
  title?: string
  body?: string
}

// ——— motion variants ———

const fadeSlide = (reduced: boolean) => ({
  initial: reduced ? {} : { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: reduced ? {} : { opacity: 0, y: -12 },
  transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as number[] },
})

const staggerItem = (reduced: boolean, i: number) => ({
  initial: reduced ? {} : { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.38,
    delay: reduced ? 0 : i * 0.06,
    ease: [0.22, 1, 0.36, 1] as number[],
  },
})

// ——— PostCard ———

function PostCard({
  post,
  index,
  reduced,
  onSelect,
}: {
  post: Post
  index: number
  reduced: boolean
  onSelect: (post: Post) => void
}) {
  return (
    <motion.article
      className="hn-post-card"
      {...staggerItem(reduced, index)}
      layout
      onClick={() => onSelect(post)}
      role="button"
      tabIndex={0}
      aria-label={`글 읽기: ${post.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onSelect(post)
      }}
    >
      <img className="hn-post-card__image" src={post.image} alt={post.imageAlt} loading="lazy" />
      <div className="hn-post-card__body">
        <span className="hn-post-card__tag">{post.tag}</span>
        <h2 className="hn-post-card__title">{post.title}</h2>
        <p className="hn-post-card__excerpt">{post.excerpt}</p>
      </div>
      <div className="hn-post-card__footer">
        <span className="hn-post-card__author">{post.author}</span>
        <span className="hn-post-card__views">조회 {post.views.toLocaleString()}</span>
      </div>
      <div className="hn-post-card__meta">
        <span className="hn-post-card__date">{post.date}</span>
      </div>
    </motion.article>
  )
}

// ——— ListView ———

function ListView({
  posts,
  reduced,
  onSelect,
}: {
  posts: Post[]
  reduced: boolean
  onSelect: (post: Post) => void
}) {
  return (
    <motion.div key="list" {...fadeSlide(reduced)}>
      <div className="hn-section-label">글 목록</div>
      {posts.length === 0 ? (
        <div className="hn-empty">
          <p className="hn-empty__text">아직 게시글이 없습니다.</p>
        </div>
      ) : (
        <div className="hn-post-grid">
          {posts.map((post, i) => (
            <PostCard
              key={post.id}
              post={post}
              index={i}
              reduced={reduced}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

// ——— ArticleView ———

function ArticleView({
  post,
  reduced,
  onBack,
}: {
  post: Post
  reduced: boolean
  onBack: () => void
}) {
  return (
    <motion.div key="article" {...fadeSlide(reduced)}>
      <article className="hn-article">
        <button className="hn-article__back" type="button" onClick={onBack}>
          &larr; 목록
        </button>
        <img className="hn-article__image" src={post.image} alt={post.imageAlt} />
        <span className="hn-article__tag">{post.tag}</span>
        <h1 className="hn-article__title">{post.title}</h1>
        <div className="hn-article__meta">
          <span className="hn-article__author">{post.author}</span>
          <span className="hn-article__sep">/</span>
          <span className="hn-article__date">{post.date}</span>
          <span className="hn-article__sep">/</span>
          <span className="hn-article__views">조회 {post.views.toLocaleString()}</span>
        </div>
        <div className="hn-article__frame">
          <div className="hn-article__body">
            {post.body.map((para, i) => (
              <motion.p
                key={i}
                className="hn-article__para"
                initial={reduced ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: reduced ? 0 : 0.1 + i * 0.07,
                  ease: 'easeOut',
                }}
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </article>
    </motion.div>
  )
}

// ——— today's date helper ———

function todayString(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}.${m}.${day}`
}

// ——— LivePreview ———

function LivePreview({ form }: { form: FormState }) {
  const hasTitle = form.title.trim().length > 0
  const hasBody = form.body.trim().length > 0
  const hasTag = form.tag.trim().length > 0
  const hasAuthor = form.author.trim().length > 0

  return (
    <div className="hn-preview">
      <p className="hn-preview__heading">미리보기</p>
      <span className={`hn-preview__tag${hasTag ? '' : ' hn-preview__tag--empty'}`}>
        {hasTag ? form.tag : '태그 없음'}
      </span>
      <p className={`hn-preview__title${hasTitle ? '' : ' hn-preview__title--empty'}`}>
        {hasTitle ? form.title : '제목을 입력하세요'}
      </p>
      <p className="hn-preview__body">
        {hasBody ? form.body : '본문을 입력하면 여기에 표시됩니다...'}
      </p>
      <div className="hn-preview__divider" />
      <div className="hn-preview__meta">
        <span className="hn-preview__author">
          {hasAuthor ? form.author : '@익명'}
        </span>
        <span className="hn-preview__date">{todayString()}</span>
      </div>
    </div>
  )
}

// ——— WriteView ———

function WriteView({
  reduced,
  onPublish,
  onCancel,
}: {
  reduced: boolean
  onPublish: (post: Post) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState<FormState>({
    title: '',
    body: '',
    tag: '',
    author: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  function validate(): boolean {
    const next: FormErrors = {}
    if (!form.title.trim()) next.title = '제목을 입력해주세요.'
    if (!form.body.trim()) next.body = '본문을 입력해주세요.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handlePublish() {
    if (!validate()) return
    const newPost: Post = {
      id: `post-${Date.now()}`,
      title: form.title.trim(),
      excerpt: form.body.trim().slice(0, 100) + (form.body.trim().length > 100 ? '…' : ''),
      body: form.body.trim().split(/\n{2,}/).filter(Boolean),
      author: form.author.trim() || '@익명',
      date: todayString(),
      tag: form.tag.trim() || '일반',
      views: 0,
      image: '/media/halo-neon/vinyl.jpg',
      imageAlt: '새 음악 글 기본 이미지',
    }
    onPublish(newPost)
  }

  const isReady = form.title.trim().length > 0 && form.body.trim().length > 0

  return (
    <motion.div key="write" {...fadeSlide(reduced)}>
      <div className="hn-section-label">새 글 쓰기</div>
      <div className="hn-composer">
        {/* Input panel */}
        <div className="hn-composer__panel">
          <p className="hn-composer__heading">글 작성</p>

          <div className="hn-field">
            <label className="hn-field__label" htmlFor="hn-title">
              제목 *
            </label>
            <input
              id="hn-title"
              className="hn-field__input"
              name="title"
              type="text"
              placeholder="글 제목을 입력하세요"
              value={form.title}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.title && (
              <span className="hn-field__error">{errors.title}</span>
            )}
          </div>

          <div className="hn-field">
            <label className="hn-field__label" htmlFor="hn-body">
              본문 *
            </label>
            <textarea
              id="hn-body"
              className="hn-field__textarea"
              name="body"
              placeholder="본문을 입력하세요 (단락 구분: 빈 줄)"
              value={form.body}
              onChange={handleChange}
            />
            {errors.body && (
              <span className="hn-field__error">{errors.body}</span>
            )}
          </div>

          <div className="hn-field">
            <label className="hn-field__label" htmlFor="hn-tag">
              태그
            </label>
            <input
              id="hn-tag"
              className="hn-field__input"
              name="tag"
              type="text"
              placeholder="예: 게임, 테크, 음악"
              value={form.tag}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="hn-field">
            <label className="hn-field__label" htmlFor="hn-author">
              작성자 핸들
            </label>
            <input
              id="hn-author"
              className="hn-field__input"
              name="author"
              type="text"
              placeholder="@핸들"
              value={form.author}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="hn-composer__actions">
            <button
              className="hn-btn hn-btn--ghost"
              type="button"
              onClick={onCancel}
            >
              취소
            </button>
            <button
              className="hn-btn hn-btn--publish"
              type="button"
              onClick={handlePublish}
              disabled={!isReady}
            >
              발행
            </button>
          </div>
        </div>

        {/* Live preview */}
        <LivePreview form={form} />
      </div>
    </motion.div>
  )
}

// ——— Root export ———

export default function HaloNeon() {
  const reduced = useReducedMotion() ?? false
  const [posts, setPosts] = useState<Post[]>(seedPosts)
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

  function handlePublish(post: Post) {
    setPosts((prev) => [post, ...prev])
    setMode('list')
  }

  return (
    <div className="sample-halo-neon">
      <div className="hn-content">
        {/* Top bar */}
        <header className="hn-topbar">
          <div className="hn-topbar-inner">
            <span className="hn-brand" aria-label="Halo 블로그">
              HALO
            </span>
            <nav className="hn-topbar-actions" aria-label="화면 전환">
              <button
                className={`hn-btn hn-btn--mag${mode === 'write' ? ' hn-btn--active' : ''}`}
                type="button"
                onClick={goWrite}
                aria-pressed={mode === 'write'}
              >
                새 글 쓰기
              </button>
              <button
                className={`hn-btn hn-btn--cyan${mode !== 'write' ? ' hn-btn--active' : ''}`}
                type="button"
                onClick={goList}
                aria-pressed={mode !== 'write'}
              >
                글 보기
              </button>
            </nav>
          </div>
        </header>

        {/* Main */}
        <main className="hn-main">
          <AnimatePresence mode="wait">
            {mode === 'list' && (
              <ListView
                key="list"
                posts={posts}
                reduced={reduced}
                onSelect={openPost}
              />
            )}
            {mode === 'read' && activePost && (
              <ArticleView
                key="article"
                post={activePost}
                reduced={reduced}
                onBack={goList}
              />
            )}
            {mode === 'write' && (
              <WriteView
                key="write"
                reduced={reduced}
                onPublish={handlePublish}
                onCancel={goList}
              />
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
