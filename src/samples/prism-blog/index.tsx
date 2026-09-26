import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import './prism-blog.css'
import { seedPosts } from './mock'
import type { Post } from './mock'

// ——— Motion variants ———

function fadeSlideVariants(reduced: boolean) {
  return {
    initial: reduced ? {} : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    exit: reduced ? {} : { opacity: 0, y: -12 },
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  }
}

function scaleInVariants(reduced: boolean) {
  return {
    initial: reduced ? {} : { opacity: 0, scale: 0.97 },
    animate: { opacity: 1, scale: 1 },
    exit: reduced ? {} : { opacity: 0, scale: 0.97 },
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  }
}

// ——— Top bar ———

type Mode = 'list' | 'read' | 'write'

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
    <div className="pb-topbar">
      <div className="pb-layout pb-topbar-inner">
        <motion.div
          className="pb-brand"
          initial={reduced ? false : { opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="pb-brand-mark" aria-hidden="true">P</div>
          Prism
        </motion.div>
        <div className="pb-topbar-actions">
          {mode !== 'list' && (
            <button
              type="button"
              className="pb-btn pb-btn-ghost"
              onClick={onList}
              aria-label="글 목록으로 이동"
            >
              글 보기
            </button>
          )}
          {mode !== 'write' && (
            <button
              type="button"
              className="pb-btn pb-btn-primary"
              onClick={onWrite}
              aria-label="새 글 쓰기"
            >
              새 글 쓰기
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ——— Post card ———

function PostCard({
  post,
  index,
  onClick,
  reduced,
  featured = false,
}: {
  post: Post
  index: number
  onClick: () => void
  reduced: boolean
  featured?: boolean
}) {
  return (
    <motion.article
      className={`pb-card${featured ? ' pb-card--featured' : ''}`}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: reduced ? 0 : index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`${post.title} 읽기`}
    >
      <img className="pb-card-image" src={post.image} alt={post.imageAlt} loading={featured ? 'eager' : 'lazy'} />
      <div className="pb-card-body">
        <span className="pb-card-tag">{post.tag}</span>
        <h3 className="pb-card-title">{post.title}</h3>
        <p className="pb-card-excerpt">{post.excerpt}</p>
        <div className="pb-card-meta">
          <span className="pb-card-author">
            <strong>{post.author}</strong> · {post.date}
          </span>
          <span className="pb-card-likes" aria-label={`저장 ${post.likes}회`}>
            저장 {post.likes}
          </span>
        </div>
      </div>
    </motion.article>
  )
}

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
  const vars = fadeSlideVariants(reduced)
  const [lead, ...rest] = posts
  return (
    <motion.div
      key="list"
      initial={vars.initial}
      animate={vars.animate}
      exit={vars.exit}
      transition={vars.transition}
    >
      <div className="pb-layout pb-page">
        <div className="pb-masthead">
          <h1 className="pb-section-heading">시각으로 세상을 다시 읽다</h1>
          <p className="pb-section-note">디자인, 사진, 출판, 도시 문화의 장면을 이미지와 글로 기록합니다.</p>
        </div>
        {posts.length === 0 ? (
          <div className="pb-empty">아직 게시된 글이 없습니다.</div>
        ) : (
          <div className="pb-grid">
            {lead && (
              <PostCard
                post={lead}
                index={0}
                onClick={() => onSelect(lead)}
                reduced={reduced}
                featured
              />
            )}
            {rest.map((post, i) => (
              <PostCard
                key={post.id}
                post={post}
                index={i + 1}
                onClick={() => onSelect(post)}
                reduced={reduced}
              />
            ))}
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
  const vars = fadeSlideVariants(reduced)
  return (
    <motion.div
      key={`read-${post.id}`}
      initial={vars.initial}
      animate={vars.animate}
      exit={vars.exit}
      transition={vars.transition}
    >
      <div className="pb-layout">
        <div className="pb-article-wrap">
          <button
            type="button"
            className="pb-btn-back"
            onClick={onBack}
            aria-label="목록으로 돌아가기"
          >
            ← 목록
          </button>

          <motion.div
            className="pb-article"
            initial={reduced ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="pb-article-header">
              <img className="pb-article-image" src={post.image} alt={post.imageAlt} />
              <span className="pb-article-tag">{post.tag}</span>
              <h1 className="pb-article-title">{post.title}</h1>
              <div className="pb-article-byline">
                <span className="pb-article-byline-author">{post.author}</span>
                <span className="pb-article-byline-sep">·</span>
                <span>{post.date}</span>
              </div>
            </header>

            <div className="pb-article-body" role="main">
              {post.body.map((para, i) => (
                <motion.p
                  key={i}
                  className="pb-article-para"
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: reduced ? 0 : 0.15 + i * 0.08,
                    ease: 'easeOut',
                  }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            <footer className="pb-article-footer">
              <span
                className="pb-article-likes"
                aria-label={`좋아요 ${post.likes}개`}
              >
                ♥ {post.likes}
              </span>
            </footer>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

// ——— Compose view ———

interface ComposeFields {
  title: string
  body: string
  tag: string
}

interface ComposeErrors {
  title?: string
  body?: string
}

function ComposeView({
  onPublish,
  onCancel,
  reduced,
}: {
  onPublish: (fields: ComposeFields) => void
  onCancel: () => void
  reduced: boolean
}) {
  const [fields, setFields] = useState<ComposeFields>({ title: '', body: '', tag: '' })
  const [errors, setErrors] = useState<ComposeErrors>({})

  const vars = scaleInVariants(reduced)

  function handleChange(key: keyof ComposeFields, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }))
    if (errors[key as keyof ComposeErrors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  function validate(): boolean {
    const next: ComposeErrors = {}
    if (!fields.title.trim()) next.title = '제목을 입력해 주세요.'
    if (!fields.body.trim()) next.body = '본문을 입력해 주세요.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handlePublish() {
    if (validate()) onPublish(fields)
  }

  const previewExcerpt = fields.body.trim().slice(0, 120) || ''

  return (
    <motion.div
      key="write"
      initial={vars.initial}
      animate={vars.animate}
      exit={vars.exit}
      transition={vars.transition}
    >
      <div className="pb-layout">
        <div className="pb-compose-wrap">
          {/* Form panel */}
          <div className="pb-compose-form">
            <h2 className="pb-compose-heading">새 글 쓰기</h2>

            <div className="pb-field">
              <label className="pb-label" htmlFor="pb-title">제목</label>
              <input
                id="pb-title"
                type="text"
                className="pb-input"
                placeholder="글 제목을 입력하세요"
                value={fields.title}
                onChange={(e) => handleChange('title', e.target.value)}
                aria-describedby={errors.title ? 'pb-title-err' : undefined}
              />
              {errors.title && (
                <span id="pb-title-err" className="pb-field-error" role="alert">
                  {errors.title}
                </span>
              )}
            </div>

            <div className="pb-field">
              <label className="pb-label" htmlFor="pb-body">본문</label>
              <textarea
                id="pb-body"
                className="pb-textarea"
                placeholder="글 내용을 입력하세요"
                value={fields.body}
                onChange={(e) => handleChange('body', e.target.value)}
                aria-describedby={errors.body ? 'pb-body-err' : undefined}
              />
              {errors.body && (
                <span id="pb-body-err" className="pb-field-error" role="alert">
                  {errors.body}
                </span>
              )}
            </div>

            <div className="pb-field">
              <label className="pb-label" htmlFor="pb-tag">태그</label>
              <input
                id="pb-tag"
                type="text"
                className="pb-input"
                placeholder="예: 디자인, 사진, 라이프스타일"
                value={fields.tag}
                onChange={(e) => handleChange('tag', e.target.value)}
              />
            </div>

            <div className="pb-compose-actions">
              <button
                type="button"
                className="pb-btn pb-btn-primary"
                onClick={handlePublish}
              >
                발행
              </button>
              <button
                type="button"
                className="pb-btn pb-btn-ghost"
                onClick={onCancel}
              >
                취소
              </button>
            </div>
          </div>

          {/* Live preview panel */}
          <div className="pb-preview-panel">
            <span className="pb-preview-label">미리보기</span>
            <div className="pb-preview-card">
              {fields.tag.trim() && (
                <span className="pb-preview-tag-pill">{fields.tag.trim()}</span>
              )}
              <p
                className={`pb-preview-title${!fields.title.trim() ? ' pb-preview-empty' : ''}`}
              >
                {fields.title.trim() || '제목 없음'}
              </p>
              <p
                className={`pb-preview-excerpt${!previewExcerpt ? ' pb-preview-empty' : ''}`}
              >
                {previewExcerpt || '본문을 입력하면 미리보기가 표시됩니다.'}
              </p>
              <div className="pb-preview-footer">
                <span className="pb-preview-meta">
                  {new Date().toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </span>
                <span className="pb-card-likes" aria-hidden="true">
                  <i className="pb-card-likes-icon">♥</i> 0
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ——— Root export ———

export default function PrismBlog() {
  const reduced = useReducedMotion() ?? false

  const [posts, setPosts] = useState<Post[]>(seedPosts)
  const [mode, setMode] = useState<Mode>('list')
  const [activePost, setActivePost] = useState<Post | null>(null)

  function handleSelectPost(post: Post) {
    setActivePost(post)
    setMode('read')
  }

  function handlePublish(fields: ComposeFields) {
    const now = new Date()
    const dateStr = now.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    const newPost: Post = {
      id: `new-${Date.now()}`,
      title: fields.title.trim(),
      excerpt: fields.body.trim().slice(0, 120),
      body: fields.body
        .trim()
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter(Boolean),
      author: '나',
      date: dateStr,
      tag: fields.tag.trim() || '일반',
      likes: 0,
      image: '/media/prism-blog/camera-culture.jpg',
      imageAlt: '새 글의 시각 문화 기본 이미지',
    }
    setPosts((prev) => [newPost, ...prev])
    setMode('list')
  }

  return (
    <div className="sample-prism-blog">
      <TopBar
        mode={mode}
        onWrite={() => setMode('write')}
        onList={() => setMode('list')}
        reduced={reduced}
      />

      {/* Page content with AnimatePresence transitions */}
      <AnimatePresence mode="wait">
        {mode === 'list' && (
          <ListView
            key="list"
            posts={posts}
            onSelect={handleSelectPost}
            reduced={reduced}
          />
        )}
        {mode === 'read' && activePost && (
          <ReadView
            key={`read-${activePost.id}`}
            post={activePost}
            onBack={() => setMode('list')}
            reduced={reduced}
          />
        )}
        {mode === 'write' && (
          <ComposeView
            key="write"
            onPublish={handlePublish}
            onCancel={() => setMode('list')}
            reduced={reduced}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
