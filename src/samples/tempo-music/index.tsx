import { useState, useCallback, useEffect, type CSSProperties } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import './tempo-music.css'
import {
  tracks,
  recentlyPlayed,
  madeForYou,
  libraryPlaylists,
  featuredBanner,
  formatDuration,
  type Track,
} from './mock'

type RangeStyle = CSSProperties & { '--tm-range-value': string }

// ── Inline SVG icons ──────────────────────────────────────────────────────

function IconHome({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M2 7.5L9 2l7 5.5V16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 17V11h5v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconSearch({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="7.5" cy="7.5" r="5" />
      <path d="M11.5 11.5L16 16" strokeLinecap="round" />
    </svg>
  )
}

function IconLibrary({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2" y="2" width="5" height="14" rx="1" />
      <rect x="10" y="2" width="6" height="14" rx="1" />
    </svg>
  )
}

function IconMenu({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 5h14M3 10h14M3 15h14" strokeLinecap="round" />
    </svg>
  )
}

function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
    </svg>
  )
}

function IconPlay({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M5 3.5l9 4.5-9 4.5V3.5z" />
    </svg>
  )
}

function IconPause({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <rect x="3" y="2.5" width="3.5" height="11" rx="1" />
      <rect x="9.5" y="2.5" width="3.5" height="11" rx="1" />
    </svg>
  )
}

function IconSkipBack({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M12 3.5v9L5 8l7-4.5z" />
      <rect x="2" y="3" width="2" height="10" rx="1" />
    </svg>
  )
}

function IconSkipForward({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M4 3.5v9L11 8 4 3.5z" />
      <rect x="12" y="3" width="2" height="10" rx="1" />
    </svg>
  )
}

function IconVolume({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 5.5h3l4-3v11l-4-3H2v-5z" strokeLinejoin="round" />
      <path d="M11 4.5a5 5 0 0 1 0 7" strokeLinecap="round" />
    </svg>
  )
}

function IconStar({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="currentColor">
      <path d="M6 1l1.3 3.9H11L8.4 6.9l1 3.2L6 8.2l-3.4 1.9 1-3.2L1 4.9h3.7L6 1z" />
    </svg>
  )
}

// ── Album art component ────────────────────────────────────────────────────

function AlbumArt({
  src,
  title,
  size = 'md',
  isPlaying = false,
}: {
  src: string
  title: string
  size?: 'sm' | 'md' | 'lg'
  isPlaying?: boolean
}) {
  const shouldReduceMotion = useReducedMotion()
  const dims: Record<string, number> = { sm: 48, md: 160, lg: 200 }
  const px = dims[size]

  return (
    <motion.div
      className="tm-track-art"
      style={{ width: px, height: px, display: 'block' }}
      animate={(!shouldReduceMotion && isPlaying) ? { scale: [1, 1.015, 1] } : { scale: 1 }}
      transition={(!shouldReduceMotion && isPlaying)
        ? { repeat: Infinity, duration: 4, ease: 'easeInOut' }
        : { duration: 0.6, ease: 'easeOut' }
      }
    >
      <img src={src} alt={`${title} 커버`} loading="lazy" />
    </motion.div>
  )
}

// ── Waveform bars (playing indicator) ─────────────────────────────────────

function PlayingBars({ isPlaying }: { isPlaying: boolean }) {
  const shouldReduceMotion = useReducedMotion()

  const bars = [
    { x: 0,  scaleY: [0.3, 1,   0.3], dur: 0.55 },
    { x: 4,  scaleY: [1,   0.25, 1],  dur: 0.45 },
    { x: 8,  scaleY: [0.5, 1,   0.4], dur: 0.65 },
    { x: 12, scaleY: [0.8, 0.2, 0.8], dur: 0.5  },
    { x: 16, scaleY: [0.4, 1,   0.4], dur: 0.7  },
  ]

  return (
    <motion.span
      className="tm-track-playing-badge"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.2 }}
    >
      <svg width="20" height="12" viewBox="0 0 20 12" fill="currentColor">
        {bars.map((b, i) => (
          <motion.rect
            key={i}
            x={b.x} y="0" width="2" height="12" rx="1"
            animate={(!shouldReduceMotion && isPlaying)
              ? { scaleY: b.scaleY }
              : { scaleY: 0.3 }
            }
            transition={(!shouldReduceMotion && isPlaying)
              ? { repeat: Infinity, duration: b.dur, ease: 'easeInOut', delay: i * 0.07 }
              : {}
            }
            style={{ transformOrigin: 'bottom' }}
          />
        ))}
      </svg>
      미리듣기 중
    </motion.span>
  )
}

// ── Track card ────────────────────────────────────────────────────────────

function TrackCard({
  track,
  index,
  isPlaying,
  isActive,
  onSelect,
  onPlayPause,
}: {
  track: Track
  index: number
  isPlaying: boolean
  isActive: boolean
  onSelect: (t: Track) => void
  onPlayPause: () => void
}) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div
      className={`tm-track-card${isActive ? ' playing' : ''}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
      whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.02 }}
      onClick={() => onSelect(track)}
    >
      <div className="tm-track-art-wrap">
        <AlbumArt src={track.artUrl} title={track.album} size="md" isPlaying={isActive && isPlaying} />
        <div className="tm-track-play-overlay">
          <motion.button
            className="tm-track-play-btn"
            aria-label={isPlaying ? '일시정지' : '재생'}
            onClick={e => { e.stopPropagation(); isActive ? onPlayPause() : onSelect(track) }}
            whileHover={shouldReduceMotion ? {} : { scale: 1.12 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.88 }}
            transition={{ type: 'spring', stiffness: 500, damping: 22 }}
          >
            {isActive && isPlaying ? <IconPause size={14} /> : <IconPlay size={14} />}
          </motion.button>
        </div>
      </div>
      <div className="tm-track-title">{track.title}</div>
      <div className="tm-track-artist">{track.artist}</div>
      <div className="tm-track-meta">{track.year} · {track.format}</div>
      <AnimatePresence>
        {isActive && <PlayingBars isPlaying={isPlaying} />}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Progress bar (clickable) ───────────────────────────────────────────────

function ProgressBar({
  progress,
  duration,
  onSeek,
}: {
  progress: number
  duration: number
  onSeek: (p: number) => void
}) {
  const elapsed = Math.floor(progress * duration)
  const rangeStyle: RangeStyle = { '--tm-range-value': `${progress * 100}%` }

  return (
    <div className="tm-progress-row">
      <span className="tm-time">{formatDuration(elapsed)}</span>
      <input
        className="tm-progress-track"
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(progress * 100)}
        onChange={e => onSeek(Number(e.currentTarget.value) / 100)}
        aria-label="미리듣기 진행률"
        style={rangeStyle}
      />
      <span className="tm-time end">{formatDuration(duration)}</span>
    </div>
  )
}

// ── Volume slider ─────────────────────────────────────────────────────────

function VolumeSlider({
  volume,
  muted,
  onChange,
  onToggleMute,
}: {
  volume: number
  muted: boolean
  onChange: (v: number) => void
  onToggleMute: () => void
}) {
  const displayedVolume = muted ? 0 : volume
  const rangeStyle: RangeStyle = { '--tm-range-value': `${displayedVolume * 100}%` }

  return (
    <div className="tm-player-right">
      <button
        className={`tm-ctrl-btn${muted ? ' muted' : ''}`}
        onClick={onToggleMute}
        aria-label={muted ? '음소거 해제' : '음소거'}
        aria-pressed={muted}
      >
        <IconVolume size={16} />
      </button>
      <input
        className="tm-volume-track"
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(displayedVolume * 100)}
        onChange={e => onChange(Number(e.currentTarget.value) / 100)}
        aria-label="볼륨"
        style={rangeStyle}
      />
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────

export default function TempoMusic() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeNav, setActiveNav] = useState<'home' | 'search' | 'library'>('home')
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0.27)
  const [volume, setVolume] = useState(0.75)
  const [muted, setMuted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const toggleSidebar = useCallback(() => setSidebarOpen(p => !p), [])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  // Simulate playback progress when playing
  useEffect(() => {
    if (!isPlaying) return
    const id = setInterval(() => {
      setProgress(p => {
        if (p >= 1) { setIsPlaying(false); return 0 }
        return p + 1 / currentTrack.duration
      })
    }, 1000)
    return () => clearInterval(id)
  }, [isPlaying, currentTrack.duration])

  const handleSelectTrack = useCallback((track: Track) => {
    setCurrentTrack(track)
    setProgress(0)
    setIsPlaying(true)
  }, [])

  const handlePlayPause = useCallback(() => setIsPlaying(p => !p), [])

  const handleSkipForward = useCallback(() => {
    const idx = tracks.findIndex(t => t.id === currentTrack.id)
    const next = tracks[(idx + 1) % tracks.length]
    setCurrentTrack(next)
    setProgress(0)
    setIsPlaying(true)
  }, [currentTrack.id])

  const handleSkipBack = useCallback(() => {
    if (progress > 0.05) {
      setProgress(0)
      return
    }
    const idx = tracks.findIndex(t => t.id === currentTrack.id)
    const prev = tracks[(idx - 1 + tracks.length) % tracks.length]
    setCurrentTrack(prev)
    setProgress(0)
    setIsPlaying(true)
  }, [currentTrack.id, progress])

  const handleSeek = useCallback((ratio: number) => setProgress(ratio), [])
  const handleVolume = useCallback((v: number) => {
    setVolume(v)
    setMuted(v === 0)
  }, [])
  const handleToggleMute = useCallback(() => setMuted(prev => !prev), [])
  const showAllRecommendations = useCallback(() => {
    setSearchQuery('')
    setActiveNav('library')
  }, [])
  const filteredTracks = tracks.filter(track => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return true
    return [track.title, track.artist, track.album, track.mood].some(value => value.toLowerCase().includes(q))
  })

  return (
    <div className="sample-tempo-music">
      {/* Mobile overlay */}
      <div
        className={`tm-overlay${sidebarOpen ? ' open' : ''}`}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <aside className={`tm-sidebar${sidebarOpen ? ' open' : ''}`}>
          <div className="tm-sidebar-logo">
          <div className="tm-logo-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="4" fill="rgba(255,255,255,0.9)" />
              <circle cx="8" cy="8" r="1.5" fill="rgba(168,85,247,0.8)" />
              <path d="M8 1v3M8 12v3M1 8h3M12 8h3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          Tempo
        </div>

        <nav className="tm-sidebar-nav">
          {(
            [
              { id: 'home', label: '홈', Icon: IconHome },
              { id: 'search', label: '검색', Icon: IconSearch },
              { id: 'library', label: '내 보관함', Icon: IconLibrary },
            ] as const
          ).map(({ id, label, Icon }) => (
            <button
              key={id}
              className={`tm-nav-item${activeNav === id ? ' active' : ''}`}
              onClick={() => { setActiveNav(id); closeSidebar() }}
            >
              <Icon className="tm-nav-icon" />
              {label}
            </button>
          ))}
        </nav>

        <div className="tm-sidebar-section-title">플레이리스트</div>
        <div className="tm-library-list">
          {libraryPlaylists.map((pl, i) => (
            <button
              key={pl.id}
              className="tm-library-item"
              onClick={() => {
                setActiveNav('library')
                handleSelectTrack(tracks[i % tracks.length])
                closeSidebar()
              }}
            >
              <span>{pl.name}</span>
              <span className="tm-library-item-count">{pl.count}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main area */}
      <div className="tm-main">
        {/* Top bar */}
        <header className="tm-topbar">
          <button
            className="tm-menu-btn"
            onClick={toggleSidebar}
            aria-label="사이드바 열기/닫기"
          >
            {sidebarOpen ? <IconX /> : <IconMenu />}
          </button>

          <div className="tm-topbar-search">
            <span className="tm-search-icon-wrap">
              <IconSearch />
            </span>
            <input
              className="tm-search-input"
              type="text"
              placeholder="아티스트, 앨범, 무드 검색"
              aria-label="음악 검색"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="tm-topbar-actions">
            <div className="tm-topbar-avatar" aria-label="사용자 프로필">JS</div>
          </div>
        </header>

        {/* Page content */}
        <main className="tm-content">
          {/* Greeting */}
          <motion.h1
            className="tm-greeting"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            오늘 입고된 독립 음반
          </motion.h1>
          <p className="tm-intro">실제 음원 없이 로컬 UI 상태로 미리듣기 진행률을 시뮬레이션합니다.</p>

          {/* Recently played */}
          <section>
            <div className="tm-section-header">
              <h2 className="tm-section-title">{searchQuery ? '검색 결과' : '새로운 음악'}</h2>
              <button className="tm-section-link" onClick={() => setSearchQuery('')}>초기화</button>
            </div>
            <div className="tm-recently-grid">
              {(searchQuery ? filteredTracks : recentlyPlayed).map((track, i) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  index={i}
                  isActive={currentTrack.id === track.id}
                  isPlaying={isPlaying}
                  onSelect={handleSelectTrack}
                  onPlayPause={handlePlayPause}
                />
              ))}
            </div>
          </section>

          {/* Made for you */}
          <section>
            <div className="tm-section-header">
              <h2 className="tm-section-title">나를 위한 추천</h2>
              <button className="tm-section-link" onClick={showAllRecommendations}>전체 보기</button>
            </div>
            <div className="tm-playlist-grid">
              {madeForYou.map((pl, i) => (
                <motion.button
                  key={pl.id}
                  className="tm-playlist-card"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, delay: 0.1 + i * 0.07, ease: 'easeOut' }}
                  onClick={() => handleSelectTrack(tracks[i % tracks.length])}
                >
                  <img className="tm-playlist-art" src={pl.artUrl} alt={`${pl.name} 표지`} loading="lazy" />
                  <div className="tm-playlist-info">
                    <div className="tm-playlist-name">{pl.name}</div>
                    <div className="tm-playlist-count">{pl.trackCount}곡 · {pl.description}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </section>

          {/* Featured banner */}
          <motion.div
            className="tm-featured-banner"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: 0.3, ease: 'easeOut' }}
            onClick={() => handleSelectTrack(tracks[0])}
          >
            <img className="tm-featured-image" src={featuredBanner.artUrl} alt={`${featuredBanner.title} 커버`} loading="lazy" />
            <div className="tm-featured-copy">
            <div className="tm-featured-badge">
              <IconStar size={12} />
              에디터 추천
            </div>
            <div className="tm-featured-title">{featuredBanner.title}</div>
            <div className="tm-featured-subtitle">{featuredBanner.subtitle}</div>
            <div className="tm-featured-desc">{featuredBanner.description}</div>
            <button
              className="tm-featured-play-btn"
              onClick={e => { e.stopPropagation(); handleSelectTrack(tracks[0]) }}
            >
              <IconPlay size={14} />
              미리듣기
            </button>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Player bar */}
      <footer className="tm-player-bar">
        {/* Now playing */}
        <div className="tm-player-now">
          <div className="tm-player-art">
            <AlbumArt src={currentTrack.artUrl} title={currentTrack.album} size="sm" isPlaying={isPlaying} />
          </div>
          <div className="tm-player-track-info">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTrack.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <div className="tm-player-track-title">{currentTrack.title}</div>
                <div className="tm-player-track-artist">{currentTrack.artist} · 미리듣기 시뮬레이션</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Controls + progress */}
        <div className="tm-player-controls">
          <div className="tm-player-btns">
            <motion.button
              className="tm-ctrl-btn"
              aria-label="이전 곡"
              onClick={handleSkipBack}
              whileTap={{ scale: 0.82 }}
              transition={{ type: 'spring', stiffness: 500, damping: 22 }}
            >
              <IconSkipBack size={18} />
            </motion.button>
            <motion.button
              className="tm-ctrl-btn play-pause"
              aria-label={isPlaying ? '일시정지' : '재생'}
              onClick={handlePlayPause}
              whileHover={{ scale: 1.1, boxShadow: '0 0 0 6px rgba(200,79,50,0.22)' }}
              whileTap={{ scale: 0.88 }}
              transition={{ type: 'spring', stiffness: 460, damping: 20 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isPlaying ? 'pause' : 'play'}
                  initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.6, rotate: 15 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {isPlaying ? <IconPause size={16} /> : <IconPlay size={16} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <motion.button
              className="tm-ctrl-btn"
              aria-label="다음 곡"
              onClick={handleSkipForward}
              whileTap={{ scale: 0.82 }}
              transition={{ type: 'spring', stiffness: 500, damping: 22 }}
            >
              <IconSkipForward size={18} />
            </motion.button>
          </div>

          <ProgressBar
            progress={progress}
            duration={currentTrack.duration}
            onSeek={handleSeek}
          />
        </div>

        {/* Volume */}
        <VolumeSlider
          volume={volume}
          muted={muted}
          onChange={handleVolume}
          onToggleMute={handleToggleMute}
        />
      </footer>
    </div>
  )
}
