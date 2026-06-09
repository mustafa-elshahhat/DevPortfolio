import { useEffect, useRef, useState } from 'react'
import {
  Menu, X,
  Home,
  User,
  Cpu,
  FolderOpen,
  Mail,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import Button from '../ui/Button'
import { cn } from '../../lib/utils'
import { usePathname, navigate, scrollToHash } from '../../lib/router'

const NAV_LINKS = [
  { label: 'Home',     href: '#hero',     icon: Home       },
  { label: 'About',    href: '#about',    icon: User       },
  { label: 'Skills',   href: '#skills',   icon: Cpu        },
  { label: 'Projects', href: '#projects', icon: FolderOpen },
  { label: 'Contact',  href: '#contact',  icon: Mail       },
]

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'contact']

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const activeId                    = useScrollSpy(SECTION_IDS)
  const pathname                    = usePathname()

  // The mobile menu docks directly beneath the navbar. Instead of hard-coding a
  // height (brittle once the webfont loads or the scrolled border toggles), we
  // measure the navbar and offset the menu by its real height plus a small gap.
  const navRef                      = useRef<HTMLElement>(null)
  const [navHeight, setNavHeight]   = useState(64)
  const MENU_GAP                    = 8

  // Keep navHeight in sync with the rendered navbar across font load, the
  // scrolled-state border change, and any viewport resize.
  useEffect(() => {
    const el = navRef.current
    if (!el) return
    const measure = () => setNavHeight(el.offsetHeight)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Track scroll so we can strengthen the backdrop when user scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the menu when resizing up to desktop so it never stays stuck open.
  // Desktop nav starts at lg (1024px): below that, the logo + 5-link pill +
  // "Hire Me" measurably overflow the row (e.g. 881px needed at 768px wide).
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setIsMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // While the menu is open: close on Escape and lock body scroll.
  // Cleanup restores scroll + removes the listener on close/unmount.
  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsMenuOpen(false) }
    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Nav-link clicks already close the menu via handleNavClick; this also
  // closes it on browser back/forward so it can't stay stuck open across pages.
  useEffect(() => {
    const close = () => setIsMenuOpen(false)
    window.addEventListener('popstate', close)
    return () => window.removeEventListener('popstate', close)
  }, [])

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false)
    if (pathname !== '/') {
      // On a sub-route (e.g. a project page) the homepage sections don't exist
      // yet — navigate home and let it scroll to the section on mount.
      navigate('/' + href)
    } else {
      scrollToHash(href)
    }
  }

  return (
    <>
      {/* ── Navbar row ─────────────────────────────────────────
          The full-width row has a dark background so NO content
          bleeds through it while scrolling.

          Z-INDEX LAYER SYSTEM:
            z-0          background orbs
            z-10         main page content (normal flow)
            z-20         mobile menu backdrop
            z-30         mobile menu drawer (docked just beneath the navbar via
                         the measured navHeight; above backdrop, below navbar so
                         the navbar's close button stays clickable)
            z-40         navbar (this element)
            z-[200]      skip link (always reachable for keyboard users)
       ─────────────────────────────────────────────────────── */}
      <nav
        ref={navRef}
        role="navigation"
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 sm:px-10 py-3 transition-all duration-300"
        style={{
          /* Solid dark background that fully blocks scrolling content */
          background: scrolled
            ? 'rgba(8, 15, 34, 0.95)'
            : 'rgba(8, 15, 34, 0.80)',
          backdropFilter:       'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid transparent',
          boxShadow: scrolled
            ? '0 4px 40px rgba(0,0,0,0.5)'
            : 'none',
        }}
      >
        {/* ── Logo ── */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero') }}
          className="font-headline font-bold text-lg tracking-tight text-primary hover:opacity-80 transition-opacity shrink-0"
        >
          Mustafa Elshahhat
        </a>

        {/* ── Center glass pill ── */}
        <div
          className="hidden lg:flex items-center gap-1 px-3 py-2 rounded-[24px]"
          style={{
            background:           'rgba(255, 255, 255, 0.05)',
            backdropFilter:       'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border:               '1px solid rgba(255, 255, 255, 0.09)',
            boxShadow:            '0 8px 32px rgba(0,0,0,0.35)',
          }}
        >
          {NAV_LINKS.map((link) => (
            <NavPillItem
              key={link.href}
              link={link}
              isActive={activeId === link.href.slice(1)}
              onClick={handleNavClick}
            />
          ))}
        </div>

        {/* ── Right: CV + hamburger ── */}
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
            ariaLabel="Hire Me"
            className="hidden lg:inline-flex"
          >
            Hire Me
          </Button>

          <button
            onClick={() => setIsMenuOpen((p) => !p)}
            className="lg:hidden p-2 rounded-xl text-on-surface-variant hover:text-primary hover:bg-white/5 transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ─────────────────────────────────────── */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop — sits below the navbar (z-40) so the close
                button stays clickable; click to dismiss. */}
            <motion.div
              key="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-20 lg:hidden bg-black/40 backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.div
              key="mobile-menu"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed left-0 right-0 z-30 lg:hidden mx-4 rounded-2xl overflow-hidden"
              style={{
              top:                  navHeight + MENU_GAP,
              background:           'rgba(10, 16, 40, 0.97)',
              backdropFilter:       'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border:               '1px solid rgba(255,255,255,0.08)',
              boxShadow:            '0 20px 50px rgba(0,0,0,0.6)',
            }}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeId === link.href.slice(1)
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-base font-headline font-medium transition-all duration-200',
                      isActive
                        ? 'text-primary bg-white/5'
                        : 'text-on-surface-variant/70 hover:text-primary hover:bg-white/5',
                    )}
                  >
                    <link.icon size={18} strokeWidth={1.5} aria-hidden="true" />
                    {link.label}
                  </a>
                )
              })}
              <div className="pt-2 pb-1">
                <Button variant="primary" size="md" href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }} className="w-full">
                  Hire Me
                </Button>
              </div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

/* ── NavPillItem ── slide-up icon animation ─────────────── */
interface NavPillItemProps {
  link:     { label: string; href: string; icon: React.ElementType }
  isActive: boolean
  onClick:  (href: string) => void
}

function NavPillItem({ link, isActive, onClick }: NavPillItemProps) {
  const Icon = link.icon
  return (
    <div className="relative">
      <a
        href={link.href}
        onClick={(e) => { e.preventDefault(); onClick(link.href) }}
        className="relative block overflow-hidden rounded-2xl"
        style={{ width: '96px', height: '44px' }}
        aria-label={link.label}
        aria-current={isActive ? 'page' : undefined}
      >
        {/* Slide container — 2 × 44px tall */}
        <div
          className="w-full transition-transform duration-500"
          style={{
            height:                   '88px',
            transform:                isActive ? 'translateY(-44px)' : 'translateY(0)',
            transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
          }}
        >
          {/* Top slot: text */}
          <div className="flex items-center justify-center" style={{ height: '44px' }}>
            <span
              className={cn(
                'text-sm font-headline font-semibold tracking-wide transition-colors duration-300',
                isActive ? 'text-white' : 'text-on-surface-variant/60',
              )}
            >
              {link.label}
            </span>
          </div>

          {/* Bottom slot: icon — slides up into view when active */}
          <div className="flex items-center justify-center" style={{ height: '44px' }}>
            <Icon
              size={19}
              strokeWidth={1.8}
              aria-hidden="true"
              className="text-primary drop-shadow-[0_0_8px_rgba(192,193,255,0.8)]"
            />
          </div>
        </div>

        {/* Hover bg */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: 'rgba(255,255,255,0.04)' }}
        />
      </a>

      {/* Active glow indicator */}
      <div
        className="absolute -bottom-1 left-1/2 h-[3px] rounded-full"
        style={{
          width:              '20px',
          background:         'linear-gradient(to right, #c0c1ff, #4b4dd8)',
          boxShadow:          '0 0 10px rgba(192,193,255,0.9)',
          transform:          `translateX(-50%) scaleX(${isActive ? 1 : 0})`,
          transition:         'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      />
    </div>
  )
}
