import { Suspense, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ErrorBoundary } from '../components/ErrorBoundary'
import type { Sample } from '../samples/registry'

interface SampleFrameProps {
  sample: Sample
}

export function SampleFrame({ sample }: SampleFrameProps) {
  const { Component } = sample
  useEffect(() => {
    document.title = `${sample.title} · Interface Index`
    return () => { document.title = '인터페이스 아카이브' }
  }, [sample.title])
  return (
    <div style={{ minHeight: '100vh' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.5rem 1rem',
          fontSize: '0.875rem',
          background: '#fafafa',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <Link
          to="/"
          style={{
            color: '#111827',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          ← 갤러리
        </Link>
        <span style={{ color: '#6b7280' }}>·</span>
        <span style={{ color: '#6b7280' }}>{sample.title}</span>
      </div>

      <ErrorBoundary>
        <Suspense
          fallback={
            <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
              <div
                aria-label="샘플 로딩 중"
                role="status"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '3px solid rgba(0,0,0,0.12)',
                  borderTopColor: sample.accent,
                  animation: 'sampleframe-spin 0.8s linear infinite',
                }}
              />
              <style>{`@keyframes sampleframe-spin { to { transform: rotate(360deg); } } @media (prefers-reduced-motion: reduce) { [aria-label="샘플 로딩 중"] { animation: none !important; } }`}</style>
            </div>
          }
        >
          <Component />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default SampleFrame
