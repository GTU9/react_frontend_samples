import './lens-gallery.css'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { categories, photographer, photos, type Photo, type PhotoCategory } from './mock'

interface LightboxProps {
  photos: Photo[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  reduced: boolean
}

function Lightbox({ photos, index, onClose, onPrev, onNext, reduced }: LightboxProps) {
  const photo = photos[index]

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrev()
      if (event.key === 'ArrowRight') onNext()
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onNext, onPrev])

  return (
    <motion.div
      className="lg-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.title} 사진 크게 보기`}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="lg-lightbox-frame"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: reduced ? 0 : 0.24, ease: 'easeOut' }}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="lg-close" onClick={onClose} aria-label="닫기">×</button>
        <img src={photo.src} alt={`${photo.title}, ${photo.location}`} />
        <div className="lg-lightbox-meta">
          <span>{photo.title}</span>
          <span>{photo.location}</span>
          <span>{index + 1} / {photos.length}</span>
        </div>
        <div className="lg-lightbox-controls">
          <button type="button" onClick={onPrev} aria-label="이전 사진">←</button>
          <button type="button" onClick={onNext} aria-label="다음 사진">→</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function PhotoTile({
  photo,
  index,
  onOpen,
  reduced,
}: {
  photo: Photo
  index: number
  onOpen: () => void
  reduced: boolean
}) {
  return (
    <motion.button
      type="button"
      className="lg-photo"
      data-aspect={photo.aspect}
      onClick={onOpen}
      aria-label={`${photo.title} 열기`}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: reduced ? 0 : 0.38, delay: Math.min(index * 0.035, 0.18) }}
    >
      <img src={photo.src} alt="" aria-hidden="true" />
      <span className="lg-frame-number">{String(index + 1).padStart(2, '0')}</span>
      <span className="lg-caption">
        <strong>{photo.title}</strong>
        <small>{photo.location}</small>
      </span>
    </motion.button>
  )
}

export default function LensGallery() {
  const reduced = useReducedMotion() ?? false
  const [activeCategory, setActiveCategory] = useState<PhotoCategory>('전체')
  const filteredPhotos = useMemo(
    () => activeCategory === '전체' ? photos : photos.filter((photo) => photo.category === activeCategory),
    [activeCategory],
  )
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    setLightboxIndex(null)
  }, [activeCategory])

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevPhoto = useCallback(() => {
    setLightboxIndex((index) => (index === null ? null : (index - 1 + filteredPhotos.length) % filteredPhotos.length))
  }, [filteredPhotos.length])
  const nextPhoto = useCallback(() => {
    setLightboxIndex((index) => (index === null ? null : (index + 1) % filteredPhotos.length))
  }, [filteredPhotos.length])

  return (
    <div className="sample-lens-gallery">
      <nav className="lg-nav" aria-label="Lens navigation">
        <a href="#work" className="lg-name">{photographer.name}</a>
        <div className="lg-nav-links">
          <a href="#work">작업</a>
          <a href="#about">소개</a>
          <a href="#contact">연락</a>
        </div>
      </nav>

      <header className="lg-hero">
        <img src="/media/lens-gallery/contact-sheet.jpg" alt="흑백 거리 사진 콘택트 시트" />
        <div>
          <h1>{photographer.name}</h1>
          <p>빛이 지나간 방향과 필름에 남은 선택을 함께 보여주는 흑백 사진 아카이브.</p>
        </div>
      </header>

      <main id="work" className="lg-main">
        <div className="lg-toolbar" aria-label="사진 필터">
          <div className="lg-filter-group">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={category === activeCategory ? 'is-active' : ''}
                aria-pressed={category === activeCategory}
              >
                {category}
              </button>
            ))}
          </div>
          <span>{filteredPhotos.length} frames</span>
        </div>

        <section className="lg-contact-sheet" aria-label="사진 목록">
          {filteredPhotos.map((photo, index) => (
            <PhotoTile
              key={photo.id}
              photo={photo}
              index={index}
              reduced={reduced}
              onOpen={() => setLightboxIndex(index)}
            />
          ))}
        </section>
      </main>

      <section className="lg-about" id="about">
        <span>About</span>
        <p>{photographer.bio}</p>
      </section>

      <footer className="lg-footer" id="contact">
        <a href={`mailto:${photographer.email}`}>{photographer.email}</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">{photographer.instagram}</a>
      </footer>

      <AnimatePresence>
        {lightboxIndex !== null && filteredPhotos.length > 0 && (
          <Lightbox
            photos={filteredPhotos}
            index={lightboxIndex}
            reduced={reduced}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
