import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import './converse-chat.css'
import { conversations, ME, type Conversation, type Message } from './mock'

// ── Icon components (inline SVG) ─────────────────────────────────────────────

function IconChat({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M2 2h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5l-3 2V3a1 1 0 0 1 1-1z" strokeLinejoin="round" />
    </svg>
  )
}

function IconSearch({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="6.5" cy="6.5" r="4.5" />
      <path d="M10 10l3.5 3.5" strokeLinecap="round" />
    </svg>
  )
}

function IconPlus({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 3v10M3 8h10" strokeLinecap="round" />
    </svg>
  )
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 2h3l1.5 3.5-1.8 1.1a9 9 0 0 0 3.7 3.7l1.1-1.8L14 10v3a1 1 0 0 1-1 1A12 12 0 0 1 2 3a1 1 0 0 1 1-1z" strokeLinejoin="round" />
    </svg>
  )
}

function IconVideo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="4" width="10" height="8" rx="1.5" />
      <path d="M11 7l4-2v6l-4-2" strokeLinejoin="round" />
    </svg>
  )
}

function IconInfo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="7" />
      <path d="M8 7v5M8 5h.01" strokeLinecap="round" />
    </svg>
  )
}

function IconArrowLeft({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconEmoji({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="7" />
      <path d="M5 9.5s1 2 3 2 3-2 3-2" strokeLinecap="round" />
      <circle cx="5.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconPaperclip({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13.5 7.5l-6 6a4 4 0 0 1-5.66-5.66l6.5-6.5a2.5 2.5 0 0 1 3.54 3.54L5.4 11.36a1 1 0 0 1-1.42-1.42l5.7-5.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconSend({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M14.5 1.5L1 6l5 2.5L8.5 15 14.5 1.5z" />
    </svg>
  )
}

// ── Avatar ────────────────────────────────────────────────────────────────────

interface AvatarProps {
  initials: string
  color: string
  size?: 'default' | 'sm' | 'lg'
  showOnline?: boolean
  online?: boolean
  activeConv?: boolean
}

function Avatar({ initials, color, size = 'default', showOnline, online, activeConv }: AvatarProps) {
  const sizeClass = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : ''
  return (
    <div className="cc-avatar-wrap">
      <div className={`cc-avatar${sizeClass ? ` ${sizeClass}` : ''}`} style={{ background: color }}>
        {initials}
      </div>
      {showOnline && online && (
        <div className={`cc-online-dot${activeConv ? ' active-conv' : ''}`}>
          <div className="cc-online-dot-pulse" />
        </div>
      )}
    </div>
  )
}

// ── Day separator helpers ─────────────────────────────────────────────────────

function DaySeparator({ label }: { label: string }) {
  return (
    <div className="cc-day-sep">
      <div className="cc-day-sep-line" />
      <span className="cc-day-sep-label">{label}</span>
      <div className="cc-day-sep-line" />
    </div>
  )
}

function getDayLabel(timestamp: string): string {
  if (timestamp.startsWith('Today')) return '오늘'
  if (timestamp.startsWith('Yesterday')) return '어제'
  if (timestamp.startsWith('Mon')) return '월요일'
  if (timestamp.startsWith('Fri')) return '금요일'
  return timestamp.split(' ')[0]
}

// ── Typing indicator ──────────────────────────────────────────────────────────

function TypingIndicator({ avatar, color }: { avatar: string; color: string }) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <div className="cc-typing-row">
      <Avatar initials={avatar} color={color} size="sm" />
      <div className="cc-typing-bubble">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="cc-typing-dot"
            animate={shouldReduceMotion ? { opacity: 0.5 } : { y: [0, -6, 0] }}
            transition={shouldReduceMotion ? {} : {
              duration: 0.7,
              delay: i * 0.15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ── Message bubble ────────────────────────────────────────────────────────────

interface BubbleProps {
  msg: Message
  isOut: boolean
  showAvatar: boolean
  participantAvatar: string
  participantColor: string
}

function MessageBubble({ msg, isOut, showAvatar, participantAvatar, participantColor }: BubbleProps) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div
      className={`cc-msg-row${isOut ? ' out' : ''}`}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.88, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={shouldReduceMotion
        ? { duration: 0.15 }
        : { type: 'spring', stiffness: 420, damping: 28, mass: 0.8 }
      }
      layout
    >
      <div className="cc-msg-avatar-slot">
        {!isOut && showAvatar && (
          <Avatar initials={participantAvatar} color={participantColor} size="sm" />
        )}
      </div>
      <div className={`cc-bubble${isOut ? ' out' : ' in'}`}>
        {msg.text}
        <span className="cc-bubble-time">{msg.timestamp}</span>
      </div>
    </motion.div>
  )
}

// ── Conversation list item ────────────────────────────────────────────────────

interface ConvItemProps {
  conv: Conversation
  isActive: boolean
  searchQuery: string
  onClick: () => void
}

function ConvItem({ conv, isActive, searchQuery, onClick }: ConvItemProps) {
  const { participant, messages, unreadCount } = conv
  const lastMsg = messages[messages.length - 1]
  const lastTime = lastMsg ? lastMsg.timestamp.replace(/^(Today|Yesterday|Mon|Fri)\s/, '') : ''
  const preview = lastMsg ? (lastMsg.senderId === 'me' ? `나: ${lastMsg.text}` : lastMsg.text) : ''

  // Basic search highlight — filter happens in parent
  const name = participant.name

  // Dim if search is active and name doesn't match
  if (searchQuery && !name.toLowerCase().includes(searchQuery.toLowerCase())) return null

  return (
    <button
      className={`cc-conv-item${isActive ? ' active' : ''}`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      <Avatar
        initials={participant.avatar}
        color={participant.avatarColor}
        showOnline
        online={participant.online}
        activeConv={isActive}
      />
      <div className="cc-conv-body">
        <div className="cc-conv-top">
          <span className="cc-conv-name">{name}</span>
          <span className="cc-conv-time">{lastTime}</span>
        </div>
        <div className="cc-conv-bottom">
          <span className={`cc-conv-preview${unreadCount > 0 ? ' unread' : ''}`}>{preview}</span>
          {unreadCount > 0 && (
            <span className="cc-unread-badge">{unreadCount}</span>
          )}
        </div>
      </div>
    </button>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ConverseChat() {
  // conversation state — each conv has its own messages array (for sending)
  const [convs, setConvs] = useState<Conversation[]>(conversations)
  const [activeId, setActiveId] = useState<string>(conversations[0].id)
  const [searchQuery, setSearchQuery] = useState('')
  const [composerText, setComposerText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // mobile: show thread or list
  const [mobileView, setMobileView] = useState<'list' | 'thread'>('list')

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const composerRef = useRef<HTMLInputElement>(null)
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const activeConv = convs.find(c => c.id === activeId) ?? convs[0]

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeConv.messages, isTyping])

  // Handle conversation switch
  const selectConv = useCallback((id: string) => {
    setActiveId(id)
    setMobileView('thread')
    // Clear unread badge on open
    setConvs(prev => prev.map(c => c.id === id ? { ...c, unreadCount: 0 } : c))
  }, [])

  // Handle send message
  const handleSend = useCallback(() => {
    const text = composerText.trim()
    if (!text) return

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'me',
      text,
      timestamp: 'Just now',
      dateMs: Date.now(),
    }

    setConvs(prev => prev.map(c =>
      c.id === activeId
        ? { ...c, messages: [...c.messages, newMsg] }
        : c
    ))
    setComposerText('')

    // Simulate reply typing indicator after a short delay
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current)
    typingTimerRef.current = setTimeout(() => {
      setIsTyping(true)
      typingTimerRef.current = setTimeout(() => {
        setIsTyping(false)
      }, 2200)
    }, 600)
  }, [composerText, activeId])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Group messages by day for separators
  function buildMessageRows(messages: Message[]) {
    const rows: Array<{ type: 'sep'; label: string } | { type: 'msg'; msg: Message; showAvatar: boolean }> = []
    let lastDay = ''

    messages.forEach((msg, i) => {
      const day = getDayLabel(msg.timestamp)
      if (day !== lastDay) {
        rows.push({ type: 'sep', label: day })
        lastDay = day
      }
      // Show avatar only on last message in a cluster of same sender
      const nextMsg = messages[i + 1]
      const isLastInCluster = !nextMsg || nextMsg.senderId !== msg.senderId || getDayLabel(nextMsg.timestamp) !== day
      rows.push({ type: 'msg', msg, showAvatar: isLastInCluster })
    })

    return rows
  }

  const messageRows = buildMessageRows(activeConv.messages)

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current)
    }
  }, [])

  const participant = activeConv.participant

  return (
    <div className="sample-converse-chat">
      {/* ── Sidebar: conversation list ── */}
      <div className={`cc-sidebar${mobileView === 'thread' ? ' hidden' : ''}`}>
        {/* Sidebar header */}
        <div className="cc-sidebar-header">
          <div className="cc-sidebar-logo">
            <div className="cc-logo-icon">
              <IconChat />
            </div>
            Converse
          </div>
          <button className="cc-new-chat-btn" aria-label="새 대화">
            <IconPlus />
          </button>
        </div>

        {/* Search */}
        <div className="cc-search-wrap">
          <div className="cc-search">
            <IconSearch />
            <input
              className="cc-search-input"
              type="text"
              placeholder="대화 검색…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="대화 검색"
            />
          </div>
        </div>

        {/* Conversation list */}
        <div className="cc-conv-list" role="list">
          {convs.map(conv => (
            <ConvItem
              key={conv.id}
              conv={conv}
              isActive={conv.id === activeId}
              searchQuery={searchQuery}
              onClick={() => selectConv(conv.id)}
            />
          ))}
        </div>
      </div>

      {/* ── Chat thread ── */}
      <div className={`cc-thread${mobileView === 'thread' ? ' visible' : ''}`}>
        {/* Thread header */}
        <div className="cc-thread-header">
          <button
            className="cc-back-btn"
            onClick={() => setMobileView('list')}
            aria-label="대화 목록으로 돌아가기"
          >
            <IconArrowLeft />
          </button>

          <Avatar
            initials={participant.avatar}
            color={participant.avatarColor}
            showOnline
            online={participant.online}
          />

          <div className="cc-thread-info">
            <div className="cc-thread-name">{participant.name}</div>
            <div className="cc-thread-status">
              <div className={`cc-thread-status-dot${participant.online ? '' : ' offline'}`} />
              {participant.online ? '지금 활동 중' : '오프라인'}
              {participant.role && ` · ${participant.role}`}
            </div>
          </div>

          <div className="cc-thread-actions">
            <button className="cc-icon-btn" aria-label="음성 통화">
              <IconPhone />
            </button>
            <button className="cc-icon-btn" aria-label="영상 통화">
              <IconVideo />
            </button>
            <button className="cc-icon-btn" aria-label="연락처 정보">
              <IconInfo />
            </button>
          </div>
        </div>

        {/* Messages */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeId}
            className="cc-messages"
            role="log"
            aria-live="polite"
            aria-label="메시지"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {messageRows.map((row, i) => {
              if (row.type === 'sep') {
                return <DaySeparator key={`sep-${i}`} label={row.label} />
              }
              const { msg, showAvatar } = row
              const isOut = msg.senderId === 'me'
              return (
                <MessageBubble
                  key={msg.id}
                  msg={msg}
                  isOut={isOut}
                  showAvatar={showAvatar}
                  participantAvatar={participant.avatar}
                  participantColor={participant.avatarColor}
                />
              )
            })}

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 6, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 26 }}
                >
                  <TypingIndicator avatar={participant.avatar} color={participant.avatarColor} />
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </motion.div>
        </AnimatePresence>

        {/* Composer */}
        <div className="cc-composer">
          <button className="cc-composer-icon-btn" aria-label="이모지 추가">
            <IconEmoji />
          </button>
          <button className="cc-composer-icon-btn" aria-label="파일 첨부">
            <IconPaperclip />
          </button>
          <div className="cc-composer-input-wrap">
            <input
              ref={composerRef}
              className="cc-composer-input"
              type="text"
              placeholder={`${participant.name}에게 메시지…`}
              value={composerText}
              onChange={e => setComposerText(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="메시지 입력"
            />
          </div>
          <motion.button
            className="cc-send-btn"
            onClick={handleSend}
            disabled={!composerText.trim()}
            aria-label="메시지 보내기"
            whileTap={{ scale: 0.84 }}
            whileHover={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 500, damping: 22 }}
          >
            <IconSend />
          </motion.button>
        </div>
      </div>

      {/* ── Right info panel (wide screens) ── */}
      <div className="cc-info-panel">
        <div
          className="cc-info-avatar"
          style={{ background: participant.avatarColor }}
        >
          {participant.avatar}
        </div>
        <div className="cc-info-name">{participant.name}</div>
        {participant.role && (
          <div className="cc-info-role">{participant.role}</div>
        )}
        <div className="cc-info-status-badge">
          <div className={`cc-info-status-dot${participant.online ? '' : ' offline'}`} />
          {participant.online ? '지금 활동 중' : '오프라인'}
        </div>

        <div className="cc-info-divider" />

        <div className="cc-info-actions">
          <button className="cc-info-action-btn">
            <IconPhone />
            전화
          </button>
          <button className="cc-info-action-btn">
            <IconVideo />
            영상
          </button>
        </div>

        <div className="cc-info-divider" />

        <div className="cc-info-section-title">정보</div>
        <div className="cc-info-stat">
          <span>메시지</span>
          <span>{activeConv.messages.length}</span>
        </div>
        <div className="cc-info-stat">
          <span>상태</span>
          <span>{participant.online ? '온라인' : '오프라인'}</span>
        </div>
        {ME.name && (
          <div className="cc-info-stat">
            <span>나</span>
            <span>{ME.name}</span>
          </div>
        )}
      </div>
    </div>
  )
}
