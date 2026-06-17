import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import './mono-devlog.css'
import { seedPosts } from './mock'
import type { Post, Block } from './mock'

// ── Block renderer ──

function CodeBlock({ lang, filename, code }: { lang: string; filename: string; code: string }) {
  return (
    <div className="md-code-block">
      <div className="md-code-header">
        <div className="md-code-dots" aria-hidden="true">
          <span className="md-code-dot" />
          <span className="md-code-dot" />
          <span className="md-code-dot" />
        </div>
        <span className="md-code-filename">{filename}</span>
        <span className="md-code-lang">{lang}</span>
      </div>
      <pre className="md-code-pre">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function BlockRenderer({ block }: { block: Block }) {
  if (block.kind === 'code') {
    return <CodeBlock lang={block.lang} filename={block.filename} code={block.code} />
  }
  return <p className="md-para">{block.text}</p>
}

// ── Live preview parser ──
// Lines fenced by a line that is exactly ``` toggle code mode.

function parseBodyPreview(raw: string): Block[] {
  const lines = raw.split('\n')
  const blocks: Block[] = []
  let inCode = false
  let codeLines: string[] = []
  let paragraphLines: string[] = []

  const flushParagraph = () => {
    const text = paragraphLines.join('\n').trim()
    if (text) blocks.push({ kind: 'p', text })
    paragraphLines = []
  }

  for (const line of lines) {
    if (line.trim() === '```') {
      if (!inCode) {
        flushParagraph()
        inCode = true
        codeLines = []
      } else {
        blocks.push({
          kind: 'code',
          lang: 'code',
          filename: 'preview',
          code: codeLines.join('\n'),
        })
        inCode = false
        codeLines = []
      }
    } else if (inCode) {
      codeLines.push(line)
    } else {
      paragraphLines.push(line)
    }
  }

  if (inCode && codeLines.length > 0) {
    blocks.push({ kind: 'code', lang: 'code', filename: 'preview', code: codeLines.join('\n') })
  } else {
    flushParagraph()
  }

  return blocks
}

// ── Post list view ──

interface PostListProps {
  posts: Post[]
  onSelect: (post: Post) => void
  reduced: boolean
}

function PostList({ posts, onSelect, reduced }: PostListProps) {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0 : 0.07 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <div className="md-page">
      <div className="md-list-header">
        <span className="md-list-title">포스트 목록</span>
        <span className="md-list-count">// {posts.length}개</span>
      </div>
      <motion.div
        className="md-post-list"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {posts.map((post) => (
          <motion.div
            key={post.id}
            className="md-post-card"
            variants={itemVariants}
            onClick={() => onSelect(post)}
            role="button"
            tabIndex={0}
            aria-label={`${post.title} 읽기`}
            onKeyDown={(e) => e.key === 'Enter' && onSelect(post)}
          >
            <h2 className="md-post-title">{post.title}</h2>
            <p className="md-post-excerpt">{post.excerpt}</p>
            <div className="md-post-meta">
              <span className="md-post-date">{post.date}</span>
              <span className="md-post-sep">·</span>
              <span className="md-post-readtime">{post.readTime} 읽기</span>
              <div className="md-tag-list">
                {post.tags.map((tag) => (
                  <span key={tag} className="md-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// ── Post reader view ──

interface PostReaderProps {
  post: Post
  onBack: () => void
  reduced: boolean
}

function PostReader({ post, onBack, reduced }: PostReaderProps) {
  return (
    <motion.div
      className="md-page"
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <button className="md-back-btn" type="button" onClick={onBack} aria-label="목록으로 돌아가기">
        <span className="md-back-arrow" aria-hidden="true">←</span>
        목록
      </button>

      <header className="md-article-header">
        <h1 className="md-article-title">{post.title}</h1>
        <div className="md-article-meta">
          <span className="md-article-date">{post.date}</span>
          <span className="md-post-sep">·</span>
          <span className="md-article-readtime">{post.readTime} 읽기</span>
          <div className="md-tag-list">
            {post.tags.map((tag) => (
              <span key={tag} className="md-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="md-article-body">
        {post.body.map((block, i) => (
          <BlockRenderer key={i} block={block} />
        ))}
      </div>
    </motion.div>
  )
}

// ── Composer view ──

interface ComposerProps {
  onPublish: (post: Post) => void
  reduced: boolean
}

function Composer({ onPublish, reduced }: ComposerProps) {
  const [title, setTitle] = useState('')
  const [tagsRaw, setTagsRaw] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState('')

  const previewBlocks = parseBodyPreview(body)

  const handlePublish = () => {
    if (!title.trim()) {
      setError('제목을 입력해 주세요.')
      return
    }
    if (!body.trim()) {
      setError('본문을 입력해 주세요.')
      return
    }
    setError('')

    const tags = tagsRaw
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    const now = new Date()
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    const wordCount = body.trim().split(/\s+/).length
    const readMinutes = Math.max(1, Math.round(wordCount / 200))

    const newPost: Post = {
      id: `post-${Date.now()}`,
      title: title.trim(),
      excerpt: body.trim().replace(/```[\s\S]*?```/g, '[코드]').slice(0, 120) + '...',
      tags,
      date: dateStr,
      readTime: `${readMinutes}분`,
      body: parseBodyPreview(body),
    }

    onPublish(newPost)
  }

  return (
    <motion.div
      className="md-page"
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="md-composer">
        <div className="md-composer-header">
          <span className="md-composer-heading">
            새 글 작성
            <span className="md-cursor" aria-hidden="true">▍</span>
          </span>
          <button
            className="md-publish-btn"
            type="button"
            onClick={handlePublish}
            disabled={!title.trim() || !body.trim()}
          >
            발행
          </button>
        </div>

        {error && <div className="md-error" role="alert">{error}</div>}

        <div className="md-field">
          <label className="md-field-label" htmlFor="md-title-input">제목</label>
          <input
            id="md-title-input"
            className="md-input"
            type="text"
            placeholder="글 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="md-field">
          <label className="md-field-label" htmlFor="md-tags-input">태그</label>
          <input
            id="md-tags-input"
            className="md-input md-tags-input"
            type="text"
            placeholder="React, TypeScript, 알고리즘 (쉼표로 구분)"
            value={tagsRaw}
            onChange={(e) => setTagsRaw(e.target.value)}
          />
        </div>

        <div className="md-hint">
          코드 블록은 줄 전체가 정확히 ` ``` ` 인 줄로 감싸면 자동 인식됩니다.
        </div>

        <div className="md-editor-layout">
          <div className="md-editor-pane">
            <span className="md-editor-pane-label">에디터</span>
            <textarea
              className="md-textarea"
              placeholder={`본문을 마크다운으로 작성하세요.\n\n코드 블록 예시:\n\`\`\`\nconst hello = 'world'\n\`\`\``}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              aria-label="본문 에디터"
            />
          </div>

          <div className="md-editor-pane">
            <span className="md-editor-pane-label">미리보기</span>
            <div className="md-preview-pane">
              <div className="md-preview-header">
                <span className="md-preview-dot" aria-hidden="true" />
                live preview
              </div>
              {previewBlocks.length === 0 ? (
                <p className="md-preview-empty">// 내용을 입력하면 여기에 미리보기가 표시됩니다</p>
              ) : (
                <div className="md-preview-body">
                  {previewBlocks.map((block, i) =>
                    block.kind === 'code' ? (
                      <CodeBlock
                        key={i}
                        lang={block.lang}
                        filename={block.filename}
                        code={block.code}
                      />
                    ) : (
                      <p key={i} className="md-preview-para">{block.text}</p>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Mode type ──

type Mode = 'list' | 'read' | 'write'

// ── Root export ──

export default function MonoDevlog() {
  const reduced = useReducedMotion() ?? false
  const [posts, setPosts] = useState<Post[]>(seedPosts)
  const [mode, setMode] = useState<Mode>('list')
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post)
    setMode('read')
  }

  const handleBackToList = () => {
    setMode('list')
    setSelectedPost(null)
  }

  const handlePublish = (post: Post) => {
    setPosts((prev) => [post, ...prev])
    setMode('list')
  }

  const handleToggle = (target: 'list' | 'write') => {
    if (target === 'list') {
      setMode('list')
      setSelectedPost(null)
    } else {
      setMode('write')
    }
  }

  return (
    <div className="sample-mono-devlog">
      {/* Top bar */}
      <header className="md-topbar">
        <div className="md-brand">
          <div className="md-brand-icon" aria-hidden="true">M</div>
          <span className="md-brand-name">
            Mono<span>.devlog</span>
          </span>
        </div>
        <span className="md-brand-sep" aria-hidden="true">//</span>

        <div className="md-topbar-spacer" />

        <nav className="md-topbar-toggle" aria-label="모드 전환">
          <button
            className={`md-toggle-btn${mode !== 'write' ? ' active' : ''}`}
            type="button"
            onClick={() => handleToggle('list')}
            aria-pressed={mode !== 'write'}
          >
            글 보기
          </button>
          <button
            className={`md-toggle-btn${mode === 'write' ? ' active' : ''}`}
            type="button"
            onClick={() => handleToggle('write')}
            aria-pressed={mode === 'write'}
          >
            새 글 쓰기
          </button>
        </nav>
      </header>

      {/* Main content — AnimatePresence for mode transitions */}
      <AnimatePresence mode="wait">
        {mode === 'list' && (
          <motion.div
            key="list"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <PostList posts={posts} onSelect={handleSelectPost} reduced={reduced} />
          </motion.div>
        )}

        {mode === 'read' && selectedPost && (
          <PostReader
            key={`read-${selectedPost.id}`}
            post={selectedPost}
            onBack={handleBackToList}
            reduced={reduced}
          />
        )}

        {mode === 'write' && (
          <Composer key="write" onPublish={handlePublish} reduced={reduced} />
        )}
      </AnimatePresence>
    </div>
  )
}
