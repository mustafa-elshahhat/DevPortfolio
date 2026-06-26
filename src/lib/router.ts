import { useSyncExternalStore } from 'react'

/* ── Minimal client-side router ─────────────────────────────
   The portfolio only has two routes ("/" and "/projects/:id"),
   so instead of pulling in react-router we drive navigation with
   the History API. `usePathname` subscribes to history changes
   and `navigate` performs SPA pushes. The accessible `Link`
   anchor lives in ./Link (kept separate so this module stays
   component-free for React Fast Refresh).
   ─────────────────────────────────────────────────────────── */

export const NAVIGATE_EVENT = 'app:navigate'

// Take ownership of scroll position. Pages handle their own scroll
// (detail pages jump to top, the homepage restores/anchors), so the
// browser's automatic restoration would only fight React's remounts.
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

function subscribe(callback: () => void) {
  window.addEventListener('popstate', callback)
  window.addEventListener('hashchange', callback)
  window.addEventListener(NAVIGATE_EVENT, callback)
  return () => {
    window.removeEventListener('popstate', callback)
    window.removeEventListener('hashchange', callback)
    window.removeEventListener(NAVIGATE_EVENT, callback)
  }
}

const getPathname = () => window.location.pathname
const getHash = () => window.location.hash

/** Current pathname, re-rendering the component on back/forward/navigate. */
export function usePathname(): string {
  return useSyncExternalStore(subscribe, getPathname, getPathname)
}

/** Current hash, re-rendering on SPA navigation, back/forward, and hash changes. */
export function useHash(): string {
  return useSyncExternalStore(subscribe, getHash, getHash)
}

/** Push a new SPA route (path, optionally with a #hash) and notify subscribers. */
export function navigate(to: string): void {
  const current = window.location.pathname + window.location.search + window.location.hash
  if (to !== current) {
    window.history.pushState(null, '', to)
  }
  window.dispatchEvent(new Event(NAVIGATE_EVENT))
}

/** Smooth-scroll to an in-page anchor (e.g. "#projects"), honoring reduced motion. */
export function scrollToHash(hash: string): void {
  if (!hash || hash === '#') return
  const el = document.querySelector(hash)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}
