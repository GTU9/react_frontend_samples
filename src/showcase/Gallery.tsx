import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  samples,
  samplesByCategory,
  categoryBlurbs,
  categoryLabels,
  pageTypeLabels,
  visualStyleLabels,
} from '../samples/registry'
import type { Category, Sample } from '../samples/registry'

/** Stable anchor id for a category section. */
function categorySlug(category: Category): string {
  return `cat-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function Poster({ sample }: { sample: Sample }) {
  const { accent } = sample
  const reduceMotion = useReducedMotion()
  return (
    <div
      aria-hidden="true"
      className="relative h-40 w-full overflow-hidden rounded-xl"
      style={{
        background: `linear-gradient(135deg, ${hexToRgba(accent, 0.95)}, ${hexToRgba(accent, 0.45)})`,
      }}
    >
      {/* floating orb (gentle pulse) */}
      <motion.div
        className="absolute -right-6 -top-8 h-28 w-28 rounded-full"
        style={{ background: hexToRgba('#ffffff', 0.25) }}
        animate={reduceMotion ? undefined : { scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-4 left-4 h-10 w-24 rounded-lg"
        style={{ background: hexToRgba('#ffffff', 0.18) }}
        animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-4 left-32 h-10 w-10 rounded-lg"
        style={{ background: hexToRgba('#000000', 0.15) }}
        animate={reduceMotion ? undefined : { y: [0, 4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />
      {/* shimmer sweep */}
      {!reduceMotion && (
        <motion.div
          className="absolute inset-y-0 w-1/3"
          style={{
            background: `linear-gradient(105deg, transparent, ${hexToRgba('#ffffff', 0.35)}, transparent)`,
          }}
          initial={{ x: '-150%' }}
          animate={{ x: '350%' }}
          transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' }}
        />
      )}
    </div>
  )
}

function Pill({ children }: { children: string }) {
  return (
    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
      {children}
    </span>
  )
}

function Card({ sample, index }: { sample: Sample; index: number }) {
  const reduceMotion = useReducedMotion()
  const hover = reduceMotion ? undefined : { scale: 1.03, y: -6 }
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hover}
    >
      <Link
        to={`/sample/${sample.id}`}
        className="group block h-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{ outlineColor: sample.accent }}
      >
        <Poster sample={sample} />
        <h3 className="mt-4 text-lg font-semibold">{sample.title}</h3>
        <p className="mt-1 text-sm text-gray-600">{sample.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Pill>{pageTypeLabels[sample.pageType]}</Pill>
          <Pill>{visualStyleLabels[sample.visualStyle]}</Pill>
        </div>
      </Link>
    </motion.div>
  )
}

export function Gallery() {
  const groups = samplesByCategory()

  return (
    <div id="top" className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">디자인 샘플 갤러리</h1>
          <p className="mt-2 max-w-2xl text-gray-600">
            {samples.length}개의 프론트엔드 디자인을 웹 목적별 {groups.length}개 카테고리로 분류한 쇼케이스입니다.
          </p>
        </header>

        {/* Sticky category quick-nav */}
        <nav
          aria-label="카테고리 바로가기"
          className="sticky top-0 z-10 -mx-6 mb-12 border-b border-gray-200 bg-gray-50/85 px-6 py-3 backdrop-blur"
        >
          <ul className="flex flex-wrap gap-2">
            {groups.map(({ category, items }) => (
              <li key={category}>
                <a
                  href={`#${categorySlug(category)}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                >
                  {categoryLabels[category]}
                  <span className="text-xs text-gray-400">{items.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-16">
          {groups.map(({ category, items }) => (
            <section
              key={category}
              id={categorySlug(category)}
              aria-labelledby={`${categorySlug(category)}-h`}
              className="scroll-mt-20"
            >
              <div className="mb-5 border-b border-gray-200 pb-3">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 id={`${categorySlug(category)}-h`} className="text-xl font-bold tracking-tight">
                    {categoryLabels[category]}
                  </h2>
                  <span className="shrink-0 text-sm text-gray-400">{items.length}개</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{categoryBlurbs[category]}</p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((s, i) => (
                  <Card key={s.id} sample={s} index={i} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#top"
            className="text-sm font-medium text-gray-500 underline-offset-4 hover:text-gray-900 hover:underline"
          >
            ↑ 맨 위로
          </a>
        </div>
      </div>
    </div>
  )
}

export default Gallery
