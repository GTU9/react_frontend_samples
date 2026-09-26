import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { Suspense } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, waitFor } from '@testing-library/react'
import { samples, samplesByCategory, categoryOrder } from '../samples/registry'
import Gallery from '../showcase/Gallery'

// Runtime render smoke tests: mount every sample (and the gallery) in jsdom and
// assert it reaches the DOM with zero console.error — the runtime check that a
// type-only `tsc`/`vite build` cannot provide.

let errorSpy: ReturnType<typeof vi.spyOn>
let warnSpy: ReturnType<typeof vi.spyOn>

beforeEach(() => {
  errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => {
  errorSpy.mockRestore()
  warnSpy.mockRestore()
})

describe('registry integrity', () => {
  it('has 24 samples across 6 ordered, non-empty categories with unique ids', () => {
    expect(samples).toHaveLength(24)
    const ids = new Set(samples.map((s) => s.id))
    expect(ids.size).toBe(samples.length)

    const groups = samplesByCategory()
    expect(groups.map((g) => g.category)).toEqual(categoryOrder)
    for (const g of groups) {
      expect(g.items.length).toBeGreaterThan(0)
    }
  })
})

describe('Gallery', () => {
  it('renders one card link per sample with no console errors', () => {
    const { container } = render(
      <MemoryRouter>
        <Gallery />
      </MemoryRouter>,
    )
    const links = container.querySelectorAll('a[href^="/sample/"]')
    expect(links.length).toBe(samples.length)
    expect(errorSpy).not.toHaveBeenCalled()
  })
})

describe('samples render', () => {
  for (const sample of samples) {
    it(`${sample.id} mounts and reaches the DOM without console errors`, async () => {
      const Component = sample.Component
      const { container, unmount } = render(
        <MemoryRouter>
          <Suspense fallback={<div data-testid="loading" />}>
            <Component />
          </Suspense>
        </MemoryRouter>,
      )

      // Wait for the lazy chunk to resolve and the scoped root to mount.
      await waitFor(() => {
        expect(container.querySelector(`.sample-${sample.id}`)).toBeTruthy()
      }, { timeout: 5000 })

      expect(errorSpy, `${sample.id} logged a console.error`).not.toHaveBeenCalled()
      unmount()
    })
  }
})
