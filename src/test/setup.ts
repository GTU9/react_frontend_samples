import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Unmount React trees between tests.
afterEach(() => cleanup())

// jsdom lacks several browser APIs that framer-motion and responsive UI touch.
// Provide minimal no-op polyfills so sample components mount without throwing.

if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia
}

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

;(globalThis as Record<string, unknown>).IntersectionObserver ??= MockIntersectionObserver
;(globalThis as Record<string, unknown>).ResizeObserver ??= MockResizeObserver

if (!window.scrollTo) {
  window.scrollTo = (() => {}) as typeof window.scrollTo
}

// jsdom does not implement scrollIntoView; components that auto-scroll (e.g. a
// chat thread) call it in effects. No-op it so mounting does not throw.
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function scrollIntoView() {}
}
