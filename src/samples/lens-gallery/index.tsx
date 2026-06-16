import './lens-gallery.css'
import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { photos, photographer, type Photo } from './mock'

/* ── animation variants ─────────────────────────────────── */
const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
  exit:    { opacity: 0 },
}

const lightboxVariants = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1 },
  exit:    { opacity: 0, scale: 0.96 },
}

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
})

const fadeIn = (delay = 0) => ({
  initial:    { opacity: 0 },
  animate:    { opacity: 1 },
  transition: { duration: 0.45, delay },
})

/* ── Lightbox ───────────────────────────────────────────── */
interface LightboxProps {
  photos:  Photo[]
  index:   number
  onClose: () => void
  onPrev:  () => void
  onNext:  () => void
  reduced: boolean
}

function Lightbox({ photos, index, onClose, onPrev, onNext, reduced }: LightboxProps) {
  const photo = photos[index]

  // keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  const transition = reduced
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] as const }

  // Ken Burns animate props — only when not reduced
  const kenBurnsAnimate = !reduced
    ? {
        scale: [1, 1.06] as number[],
        x: ['0%', '-1%'] as string[],
        y: ['0%', '-1%'] as string[],
      }
    : {}

  const kenBurnsTransition = !reduced
    ? {
        duration: 12,
        ease: 'easeInOut' as const,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        delay: 0.5,
      }
    : { duration: 0 }

  return (
    <motion.div
      className="lg-lightbox-backdrop"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={transition}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-label={`사진: ${photo.title}`}
    >
      <motion.div
        className="lg-lightbox-inner"
        variants={lightboxVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={transition}
        onClick={(e) => e.stopPropagation()}
      >
        {/* close */}
        <button
          className="lg-lb-close"
          onClick={onClose}
          aria-label="라이트박스 닫기"
        >
          &#x2715;
        </button>

        {/* photo — Ken Burns wrapper (outer) + layoutId morph (inner) */}
        <motion.div
          className="lg-lightbox-img-ken-wrap"
          animate={kenBurnsAnimate}
          transition={kenBurnsTransition}
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <motion.div
            className="lg-lightbox-img"
            layoutId={!reduced ? `photo-${photo.id}` : undefined}
            layout
            data-aspect={photo.aspect}
            style={{ background: photo.gradient }}
            role="img"
            aria-label={photo.title}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </motion.div>

        {/* meta */}
        <div className="lg-lightbox-meta">
          <div className="lg-lightbox-title">{photo.title}</div>
          <div className="lg-lightbox-loc">{photo.location}</div>
        </div>

        {/* prev / counter / next */}
        <div className="lg-lightbox-controls">
          <button
            className="lg-lb-btn"
            onClick={onPrev}
            aria-label="이전 사진"
          >
            &#8592;
          </button>
          <span className="lg-lb-counter">
            {index + 1} / {photos.length}
          </span>
          <button
            className="lg-lb-btn"
            onClick={onNext}
            aria-label="다음 사진"
          >
            &#8594;
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── PhotoCard ──────────────────────────────────────────── */
interface PhotoCardProps {
  photo:   Photo
  index:   number
  onClick: () => void
  reduced: boolean
}

function PhotoCard({ photo, index: i, onClick, reduced }: PhotoCardProps) {
  const staggerDelay = Math.min(i * 0.06, 0.4)

  return (
    <motion.div
      className="lg-photo-wrap"
      data-aspect={photo.aspect}
      onClick={onClick}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: staggerDelay, ease: 'easeOut' }}
      role="button"
      tabIndex={0}
      aria-label={`${photo.title} 열기`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
    >
      <motion.div
        className="lg-photo-img"
        layoutId={!reduced ? `photo-${photo.id}` : undefined}
        layout
        style={{ background: photo.gradient }}
        aria-hidden="true"
        whileHover={!reduced ? { scale: 1.06 } : undefined}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      />
      <div className="lg-photo-caption" aria-hidden="true">
        <div className="lg-caption-title">{photo.title}</div>
        <div className="lg-caption-loc">{photo.location}</div>
      </div>
    </motion.div>
  )
}

/* ── LensGallery (main) ─────────────────────────────────── */
export default function LensGallery() {
  const reduced = useReducedMotion() ?? false

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox  = useCallback((i: number) => setLightboxIndex(i), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const prevPhoto = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length))
  }, [])

  const nextPhoto = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length))
  }, [])

  return (
    <div className="sample-lens-gallery">

      {/* ── nav ── */}
      <nav className="lg-nav" aria-label="Site navigation">
        <div className="lg-nav-inner">
          <span className="lg-nav-name">{photographer.name}</span>
          <ul className="lg-nav-links">
            {(['작업', '소개', '연락처'] as const).map((s, i) => (
              <li key={s}>
                <a href={['#work', '#about', '#contact'][i]}>{s}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── intro ── */}
      <motion.div className="lg-intro" {...fadeUp(0.1)}>
        <p className="lg-intro-tagline">{photographer.tagline}</p>
      </motion.div>

      {/* ── masonry gallery ── */}
      <section className="lg-gallery-section" id="work" aria-label="Photo gallery">
        <div className="lg-masonry">
          {photos.map((photo, i) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={i}
              onClick={() => openLightbox(i)}
              reduced={reduced}
            />
          ))}
        </div>
      </section>

      {/* ── lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={photos}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
            reduced={reduced}
          />
        )}
      </AnimatePresence>

      {/* ── about strip ── */}
      <section className="lg-about" id="about" aria-label="About">
        <motion.div {...fadeIn(0)} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="lg-about-label">소개</div>
          <h2 className="lg-about-heading">렌즈 뒤의 눈</h2>
        </motion.div>
        <motion.p
          className="lg-about-bio"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {photographer.bio}
        </motion.p>
      </section>

      {/* ── contact footer ── */}
      <footer className="lg-contact" id="contact" aria-label="Contact">
        <motion.div
          className="lg-contact-links"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <a href={`mailto:${photographer.email}`} className="lg-contact-item">
            {photographer.email}
          </a>
          <a
            href="https://instagram.com"
            className="lg-contact-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            {photographer.instagram}
          </a>
        </motion.div>
        <p className="lg-footer-copy">
          &copy; 2025 {photographer.name} — 모든 권리 보유
        </p>
      </footer>

    </div>
  )
}
