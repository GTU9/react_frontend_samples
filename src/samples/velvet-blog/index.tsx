import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import './velvet-blog.css'
import { seedPosts } from './mock'
import type { Post } from './mock'

// ——— Animation variants ———

function fadeUp(reduced: boolean, delay = 0) {
  return {
    initial: reduced ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as number[] },
  }
}

function fadeIn(reduced: boolean, delay = 0) {
  return {
    initial: reduced ? false : { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.35, delay },
  }
}

// ——— Mode type ———
type Mode = 'list' | 'read' | 'compose'

// ——— Top Bar ———
function TopBar({
  mode,
  onList,
  onCompose,
}: {
  mode: Mode
  onList: () => void
  onCompose: () => void
}) {
  return (
    <header className="vb-topbar">
      <div className="vb-container">
        <div className="vb-topbar__inner">
          <span className="vb-topbar__brand">Velvet</span>
          <div className="vb-topbar__actions">
            <button
              type="button"
              className={`vb-btn ${mode !== 'compose' ? 'vb-btn--outline' : 'vb-btn--ghost'}`}
              onClick={onList}
            >
              글 보기
            </button>
            <button
              type="button"
              className={`vb-btn ${mode === 'compose' ? 'vb-btn--primary' : 'vb-btn--primary'}`}
              onClick={onCompose}
            >
              새 글 쓰기
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

// ——— Post Card ———
function PostCard({
  post,
  index,
  reduced,
  onClick,
}: {
  post: Post
  index: number
  reduced: boolean
  onClick: () => void
}) {
  return (
    <motion.article
      className="vb-post-card"
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.45,
        delay: reduced ? 0 : index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`${post.title} 글 읽기`}
    >
      <div className="vb-post-card__header">
        <img className="vb-post-card__image" src={post.image} alt={post.imageAlt} loading="lazy" />
        <div className="vb-post-card__meta">
          <h2 className="vb-post-card__title">{post.title}</h2>
          <p className="vb-post-card__excerpt">{post.excerpt}</p>
        </div>
      </div>
      <div className="vb-post-card__footer">
        <div className="vb-avatar" aria-hidden="true">
          {post.authorInitial}
        </div>
        <span className="vb-post-card__author">{post.author}</span>
        <span className="vb-dot" aria-hidden="true" />
          <span className="vb-post-card__date">{post.date}</span>
          <span className="vb-tag">{post.tag}</span>
          <span className="vb-place">{post.mood}</span>
        <div className="vb-post-card__likes" aria-label={`좋아요 ${post.likes}개`}>
          <span className="vb-heart-icon" aria-hidden="true">♡</span>
          {post.likes}
        </div>
      </div>
    </motion.article>
  )
}

// ——— Post List View ———
function PostListView({
  posts,
  reduced,
  onRead,
}: {
  posts: Post[]
  reduced: boolean
  onRead: (post: Post) => void
}) {
  return (
    <section className="vb-feed" aria-label="게시글 목록">
      <div className="vb-container">
        <motion.div {...fadeUp(reduced, 0.05)} className="vb-hero">
          <h1 className="vb-hero__title">여행이 남긴, 조금 더 나은 하루</h1>
          <p className="vb-hero__sub">장소의 빛과 냄새, 골목의 소리까지 천천히 적어 두는 개인 여행 노트</p>
        </motion.div>

        {posts.length === 0 ? (
          <div className="vb-empty">
            <span className="vb-empty__icon" aria-hidden="true">✍️</span>
            <p className="vb-empty__text">아직 작성된 글이 없어요</p>
            <p className="vb-empty__sub">첫 번째 글을 남겨보세요</p>
          </div>
        ) : (
          <div className="vb-feed__grid">
            {posts.map((post, i) => (
              <PostCard
                key={post.id}
                post={post}
                index={i}
                reduced={reduced}
                onClick={() => onRead(post)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// ——— Article Read View ———
function ArticleView({
  post,
  reduced,
  onBack,
}: {
  post: Post
  reduced: boolean
  onBack: () => void
}) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)

  function handleLike() {
    if (liked) {
      setLiked(false)
      setLikeCount((c) => c - 1)
    } else {
      setLiked(true)
      setLikeCount((c) => c + 1)
    }
  }

  return (
    <article className="vb-article" aria-label={post.title}>
      <div className="vb-container">
        <motion.div {...fadeIn(reduced, 0)}>
          <button
            type="button"
            className="vb-article__back"
            onClick={onBack}
            aria-label="목록으로 돌아가기"
          >
            ← 목록
          </button>
        </motion.div>

        <motion.div
          className="vb-article__header"
          {...fadeUp(reduced, 0.05)}
        >
          <span className="vb-article__mood" aria-hidden="true">
            {post.mood}
          </span>
          <img className="vb-article__image" src={post.image} alt={post.imageAlt} />
          <h1 className="vb-article__title">{post.title}</h1>
          <div className="vb-article__byline">
            <div className="vb-avatar" aria-hidden="true">
              {post.authorInitial}
            </div>
            <span className="vb-article__author-name">{post.author}</span>
            <span className="vb-dot" aria-hidden="true" />
            <span className="vb-article__date">{post.date}</span>
            <span className="vb-article__tag">{post.tag}</span>
          </div>
        </motion.div>

        <motion.div
          className="vb-article__body"
          {...fadeUp(reduced, 0.12)}
        >
          {post.body.map((para, i) => (
            <p key={i} className="vb-article__para">
              {para}
            </p>
          ))}

          <div className="vb-article__actions">
            <motion.button
              type="button"
              className={`vb-like-btn${liked ? ' vb-like-btn--liked' : ''}`}
              onClick={handleLike}
              aria-pressed={liked}
              aria-label={liked ? `좋아요 취소 (${likeCount}개)` : `좋아요 (${likeCount}개)`}
              whileTap={reduced ? {} : { scale: 0.94 }}
            >
              <motion.span
                className="vb-like-btn__heart"
                aria-hidden="true"
                animate={reduced ? {} : liked ? { scale: [1, 1.5, 1] } : { scale: 1 }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              >
                {liked ? '♥' : '♡'}
              </motion.span>
              {likeCount}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </article>
  )
}

// ——— Mood options ———
const MOODS = ['바다', '골목', '책', '아침', '손일', '시장', '기차', '정원']

// ——— Live Preview Card ———
function LivePreview({
  title,
  body,
  tag,
  mood,
}: {
  title: string
  body: string
  tag: string
  mood: string
}) {
  const hasContent = title.trim() || body.trim()
  const excerptText = body.trim().slice(0, 100) + (body.trim().length > 100 ? '…' : '')

  return (
    <div className="vb-preview-card" aria-live="polite" aria-label="미리보기">
      <div className="vb-preview-card__label">
        <span className="vb-preview-card__label-dot" aria-hidden="true" />
        미리보기
      </div>
      <div className={`vb-preview-inner${hasContent ? '' : ' vb-preview-inner--empty'}`}>
        {hasContent ? (
          <>
            {mood && (
              <span className="vb-preview__mood" aria-hidden="true">
                {mood}
              </span>
            )}
            <p className="vb-preview__title">
              {title || <span style={{ color: 'var(--vb-muted)' }}>제목을 입력해주세요</span>}
            </p>
            {excerptText && (
              <p className="vb-preview__excerpt">{excerptText}</p>
            )}
            <div className="vb-preview__footer">
              {tag && <span className="vb-tag">{tag}</span>}
              <span className="vb-preview__author">나 · 방금 전</span>
            </div>
          </>
        ) : (
          <p>글을 작성하면 미리보기가 표시돼요</p>
        )}
      </div>
    </div>
  )
}

// ——— Compose View ———
function ComposeView({
  reduced,
  onPublish,
}: {
  reduced: boolean
  onPublish: (post: Post) => void
}) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tag, setTag] = useState('')
  const [mood, setMood] = useState('')
  const [error, setError] = useState('')

  function handlePublish() {
    if (!title.trim() || !body.trim()) {
      setError('제목과 본문을 모두 입력해주세요.')
      return
    }
    setError('')

    const now = new Date()
    const dateStr = `${now.getFullYear()}. ${now.getMonth() + 1}. ${now.getDate()}`

    const newPost: Post = {
      id: `p-${Date.now()}`,
      title: title.trim(),
      excerpt: body.trim().slice(0, 120) + (body.trim().length > 120 ? '…' : ''),
      body: body.trim().split('\n\n').filter(Boolean),
      author: '나',
      authorInitial: '나',
      date: dateStr,
      tag: tag.trim() || '일상',
      mood: mood || '✍️',
      likes: 0,
      image: '/media/velvet-blog/canal.jpg',
      imageAlt: '새 여행 글 기본 이미지',
    }

    onPublish(newPost)
  }

  return (
    <section className="vb-compose" aria-label="새 글 작성">
      <div className="vb-container">
        <motion.div {...fadeUp(reduced, 0.05)} className="vb-hero">
          <span className="vb-hero__tagline">오늘의 이야기</span>
          <h1 className="vb-hero__title">새 글 쓰기</h1>
          <p className="vb-hero__sub">소소한 일상을 기록해보세요</p>
        </motion.div>

        <motion.div
          className="vb-compose__layout"
          {...fadeUp(reduced, 0.1)}
        >
          {/* Form */}
          <div className="vb-compose__form-card">
            <p className="vb-compose__form-title">✍️ 글 작성</p>

            <div className="vb-compose__field">
              <label htmlFor="vb-title" className="vb-compose__label">
                제목
              </label>
              <input
                id="vb-title"
                type="text"
                className="vb-input"
                placeholder="오늘의 제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={80}
              />
            </div>

            <div className="vb-compose__field">
              <label htmlFor="vb-body" className="vb-compose__label">
                본문
              </label>
              <textarea
                id="vb-body"
                className="vb-textarea"
                placeholder="오늘의 이야기를 자유롭게 적어보세요. 단락은 빈 줄로 구분돼요."
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>

            <div className="vb-compose__field">
              <label htmlFor="vb-tag" className="vb-compose__label">
                태그
              </label>
              <input
                id="vb-tag"
                type="text"
                className="vb-input"
                placeholder="카페, 여행, 독서, 취미…"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                maxLength={16}
              />
            </div>

            <div className="vb-compose__field">
              <span className="vb-compose__label">오늘의 무드</span>
              <div className="vb-mood-picker" role="group" aria-label="무드 선택">
                {MOODS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`vb-mood-btn${mood === m ? ' vb-mood-btn--selected' : ''}`}
                    onClick={() => setMood(mood === m ? '' : m)}
                    aria-label={`무드 ${m}${mood === m ? ' (선택됨)' : ''}`}
                    aria-pressed={mood === m}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="vb-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="button"
              className="vb-publish-btn"
              onClick={handlePublish}
              disabled={!title.trim() || !body.trim()}
            >
              발행하기
            </button>
          </div>

          {/* Live Preview */}
          <LivePreview title={title} body={body} tag={tag} mood={mood} />
        </motion.div>
      </div>
    </section>
  )
}

// ——— Root export ———
export default function VelvetBlog() {
  const reduced = useReducedMotion() ?? false

  const [mode, setMode] = useState<Mode>('list')
  const [posts, setPosts] = useState<Post[]>(seedPosts)
  const [activePost, setActivePost] = useState<Post | null>(null)

  function handleRead(post: Post) {
    setActivePost(post)
    setMode('read')
  }

  function handleBack() {
    setActivePost(null)
    setMode('list')
  }

  function handlePublish(post: Post) {
    setPosts((prev) => [post, ...prev])
    setMode('list')
  }

  const pageVariants = {
    initial: reduced ? {} : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    exit: reduced ? {} : { opacity: 0, y: -10 },
  }

  const pageTransition = {
    duration: reduced ? 0 : 0.32,
    ease: [0.22, 1, 0.36, 1] as number[],
  }

  return (
    <div className="sample-velvet-blog">
      <TopBar
        mode={mode}
        onList={handleBack}
        onCompose={() => setMode('compose')}
      />

      <AnimatePresence mode="wait">
        {mode === 'list' && (
          <motion.div
            key="list"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <PostListView
              posts={posts}
              reduced={reduced}
              onRead={handleRead}
            />
          </motion.div>
        )}

        {mode === 'read' && activePost && (
          <motion.div
            key={`read-${activePost.id}`}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <ArticleView
              post={activePost}
              reduced={reduced}
              onBack={handleBack}
            />
          </motion.div>
        )}

        {mode === 'compose' && (
          <motion.div
            key="compose"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <ComposeView reduced={reduced} onPublish={handlePublish} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
