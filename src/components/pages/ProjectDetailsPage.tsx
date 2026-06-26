import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft, ExternalLink, Target, Zap, Layers, Gauge,
  Maximize2, X, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { projects, type Project } from '../../data/projects'
import { Link } from '../../lib/Link'
import Container from '../ui/Container'
import Button from '../ui/Button'
import GithubIcon from '../icons/GithubIcon'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

/** Minimum horizontal distance (px) a touch must travel to count as a swipe. */
const SWIPE_THRESHOLD = 50

function BackToProjects() {
  return (
    <Link
      to="/#projects"
      className="inline-flex items-center gap-2 h-10 px-4 rounded-full
                 border border-outline-variant/20 bg-white/[0.05] backdrop-blur-md
                 shadow-[0_8px_24px_rgba(0,0,0,0.25)]
                 font-headline font-semibold text-sm text-on-surface-variant
                 hover:text-primary hover:border-outline-variant/50 hover:bg-surface-container-high hover:-translate-y-0.5
                 transition-all duration-200
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
    >
      <ArrowLeft size={16} aria-hidden="true" />
      Back to Projects
    </Link>
  )
}

/* Lightweight fullscreen screenshot viewer: dialog semantics, Escape /
   backdrop / close-button dismissal, arrow-key navigation, a minimal Tab
   trap across its buttons, body scroll-lock while open, and mobile swipe
   navigation.
   
   Rendered via createPortal to document.body so it escapes any parent
   stacking context (the main content sits at z-10) and reliably covers
   the navbar (z-40). */
function ImageLightbox({
  title,
  gallery,
  galleryAlts,
  index,
  onClose,
  onNavigate,
  reduced,
}: {
  title: string
  gallery: string[]
  galleryAlts: string[]
  index: number
  onClose: () => void
  onNavigate: (nextIndex: number) => void
  reduced: boolean
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const multiple = gallery.length > 1

  // ── Touch / swipe state (refs to avoid re-renders) ──
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const touchSwiped = useRef(false)

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  // Lock body scroll, compensating for the scrollbar to avoid layout shift.
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const prevOverflow = document.body.style.overflow
    const prevPadding = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`
    return () => {
      document.body.style.overflow = prevOverflow
      document.body.style.paddingRight = prevPadding
    }
  }, [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (multiple && e.key === 'ArrowRight') {
        onNavigate((index + 1) % gallery.length)
        return
      }
      if (multiple && e.key === 'ArrowLeft') {
        onNavigate((index - 1 + gallery.length) % gallery.length)
        return
      }
      if (e.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>('button')
        if (!focusables || focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [index, gallery.length, multiple, onClose, onNavigate])

  // ── Touch handlers for mobile swipe navigation ──
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    touchSwiped.current = false
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    if (!multiple) return

    const deltaX = e.touches[0].clientX - touchStartX.current
    const deltaY = e.touches[0].clientY - touchStartY.current

    // Only count as a horizontal swipe if the horizontal movement dominates
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD && !touchSwiped.current) {
      touchSwiped.current = true
      if (deltaX < 0) {
        // Swipe left → next image
        onNavigate((index + 1) % gallery.length)
      } else {
        // Swipe right → previous image
        onNavigate((index - 1 + gallery.length) % gallery.length)
      }
    }
  }, [multiple, index, gallery.length, onNavigate])

  const handleTouchEnd = useCallback(() => {
    touchStartX.current = null
    touchStartY.current = null
    touchSwiped.current = false
  }, [])

  const controlClass =
    'flex items-center justify-center w-11 h-11 rounded-full bg-white/[0.08] border border-white/15 ' +
    'text-on-surface backdrop-blur-md transition-colors duration-200 hover:bg-white/[0.18] ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'

  return createPortal(
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} screenshot — full-size preview`}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      {...(reduced
        ? {}
        : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2, ease: EASE } })}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#05080f]/[0.93] backdrop-blur-sm"
    >
      <img
        src={gallery[index]}
        alt={galleryAlts[index] ?? `${title} screenshot ${index + 1} of ${gallery.length}`}
        onClick={(e) => e.stopPropagation()}
        draggable={false}
        className="max-w-[calc(100vw-1.5rem)] max-h-[calc(100svh-7rem)] sm:max-w-[calc(100vw-8rem)]
                   object-contain rounded-lg shadow-[0_40px_120px_rgba(0,0,0,0.7)]
                   select-none touch-pan-y"
      />

      <button
        ref={closeRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        aria-label="Close full-size preview"
        className={`absolute top-4 right-4 sm:top-5 sm:right-5 ${controlClass}`}
      >
        <X size={20} aria-hidden="true" />
      </button>

      {multiple && (
        <>
          {/* Prev/Next arrows — hidden on mobile, visible on sm+ */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onNavigate((index - 1 + gallery.length) % gallery.length)
            }}
            aria-label="Previous screenshot"
            className={`absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 hidden sm:flex ${controlClass}`}
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onNavigate((index + 1) % gallery.length)
            }}
            aria-label="Next screenshot"
            className={`absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 hidden sm:flex ${controlClass}`}
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>

          {/* Image counter */}
          <p
            aria-live="polite"
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full
                       bg-white/[0.06] border border-white/10 backdrop-blur-md
                       font-label text-xs tracking-wide text-on-surface-variant"
          >
            {index + 1} / {gallery.length}
          </p>
        </>
      )}
    </motion.div>,
    document.body,
  )
}

function ProjectCaseStudy({ project }: { project: Project }) {
  const reduced = useReducedMotion()
  const gallery = project.gallery ?? [project.imageUrl]
  const galleryAlts = gallery.map((_, index) => project.galleryAlts?.[index] ?? project.imageAlt ?? `${project.title} screenshot`)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeCaption = project.galleryCaptions?.[activeIndex]
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const previewTriggerRef = useRef<HTMLButtonElement>(null)

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    previewTriggerRef.current?.focus()
  }, [])

  const details = [
    { icon: Target, label: 'Problem',      text: project.details.problem },
    { icon: Zap,    label: 'Solution',     text: project.details.solution },
    { icon: Layers, label: 'Architecture', text: project.details.architecture },
    { icon: Gauge,  label: 'Performance',  text: project.details.performance },
  ]

  const fadeUp = (delay = 0) =>
    reduced
      ? {}
      : {
          initial:    { opacity: 0, y: 24 },
          animate:    { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: EASE },
        }

  const fadeRight = reduced
    ? {}
    : {
        initial:    { opacity: 0, x: 32 },
        animate:    { opacity: 1, x: 0 },
        transition: { duration: 0.6, delay: 0.1, ease: EASE },
      }

  return (
    <main id="main-content" className="relative z-10 pt-20 sm:pt-24 pb-14 sm:pb-16">
      <Container className="space-y-7 sm:space-y-10">
        <motion.div {...fadeUp(0)}>
          <BackToProjects />
        </motion.div>

        {/* Hero split — summary on the left, gallery card on the right.
            The main screenshot and its thumbnails live inside one glass card
            so they read as a single gallery component. */}
        <section aria-labelledby="project-title">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 lg:items-center">
            {/* min-w-0 on both grid items: on mobile the grid track is auto-sized,
                so without it the nested thumbnail scroller's intrinsic width
                (all thumbnails side by side) blows the column past the viewport. */}
            <motion.header {...fadeUp(0.05)} className="min-w-0 lg:col-span-5 space-y-4 sm:space-y-5">
              <p className="flex items-center gap-3 font-label text-xs uppercase tracking-[0.15em] text-primary font-semibold">
                <span
                  className="h-px w-8 shrink-0 bg-gradient-to-r from-primary via-primary/60 to-transparent"
                  aria-hidden="true"
                />
                {project.discipline ?? 'Case Study'}
              </p>
              <h1
                id="project-title"
                className="font-headline text-3xl sm:text-4xl xl:text-5xl font-bold tracking-tight text-on-surface leading-[1.08]"
              >
                {project.title}
              </h1>
              <p className="text-on-surface-variant/80 text-base sm:text-lg leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="skill-chip inline-flex items-center px-3 py-1.5 rounded-full text-xs font-label font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {(project.liveUrl || project.githubUrl) && (
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {project.liveUrl && (
                    <Button variant="primary" size="sm" href={project.liveUrl} external>
                      Live Demo <ExternalLink size={16} aria-hidden="true" />
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button variant="secondary" size="sm" href={project.githubUrl} external>
                      GitHub <GithubIcon size={16} aria-hidden="true" />
                    </Button>
                  )}
                </div>
              )}
            </motion.header>

            <motion.div {...fadeRight} className="min-w-0 lg:col-span-7">
              <div
                className="glass-panel gradient-border rounded-3xl p-2 sm:p-3"
                style={{
                  boxShadow: '0 30px 80px rgba(0, 0, 0, 0.45), 0 0 60px rgba(192, 193, 255, 0.06)',
                }}
              >
                <figure className="relative m-0">
                  <button
                    ref={previewTriggerRef}
                    type="button"
                    aria-describedby={activeCaption ? `${project.id}-screenshot-caption` : undefined}
                    onClick={() => setLightboxOpen(true)}
                    className="group relative block w-full aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden
                               cursor-zoom-in transition-shadow duration-200
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    style={{ background: project.imageBg }}
                  >
                    <img
                      src={gallery[activeIndex]}
                      alt={galleryAlts[activeIndex] ?? `${project.title} screenshot`}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                    <span className="sr-only">(open full-size preview)</span>
                    <div
                      className="absolute -bottom-12 -right-12 w-56 h-56 rounded-full pointer-events-none"
                      style={{ background: 'radial-gradient(circle, rgba(192,193,255,0.1) 0%, transparent 70%)' }}
                      aria-hidden="true"
                    />
                    <div
                      className="absolute -top-8 -left-8 w-36 h-36 rounded-full pointer-events-none"
                      style={{ background: 'radial-gradient(circle, rgba(75,77,216,0.16) 0%, transparent 70%)' }}
                      aria-hidden="true"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 inline-flex items-center gap-1.5
                                 h-8 px-3 rounded-full bg-black/55 backdrop-blur-md border border-white/15
                                 font-label text-xs text-white/90
                                 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 group-focus-visible:opacity-100
                                 transition-opacity duration-200"
                    >
                      <Maximize2 size={13} aria-hidden="true" />
                      <span className="hidden sm:inline">View full image</span>
                    </span>
                  </button>
                  {activeCaption && (
                    <figcaption id={`${project.id}-screenshot-caption`} className="sr-only">
                      {activeCaption}
                    </figcaption>
                  )}
                </figure>

                {gallery.length > 1 && (
                  <ul
                    aria-label={`${project.title} screenshot thumbnails`}
                    className="flex gap-2 sm:gap-2.5 mt-2 sm:mt-2.5 px-0.5 py-1 list-none
                               overflow-x-auto scrollbar-hide snap-x"
                  >
                    {gallery.map((src, idx) => {
                      const isActive = idx === activeIndex
                      return (
                        <li key={src} className="flex-shrink-0 snap-start">
                          <button
                            type="button"
                            onClick={() => setActiveIndex(idx)}
                            aria-label={`View screenshot ${idx + 1} of ${project.title}`}
                            aria-current={isActive ? 'true' : undefined}
                            className={`relative block w-24 sm:w-28 aspect-[16/9] rounded-lg overflow-hidden
                                        transition-all duration-200
                                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                                        ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                            style={{
                              background: project.imageBg,
                              border: isActive
                                ? '1px solid rgba(192,193,255,0.65)'
                                : '1px solid rgba(255,255,255,0.1)',
                              boxShadow: isActive
                                ? '0 0 0 1px rgba(192,193,255,0.5), 0 0 18px rgba(192,193,255,0.2)'
                                : 'none',
                            }}
                          >
                            <img
                              src={src}
                              alt=""
                              loading="lazy"
                              className="absolute inset-0 w-full h-full object-contain"
                            />
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Case study breakdown */}
        <motion.section
          {...fadeUp(0.25)}
          aria-label="Case study details"
          className="grid gap-3 sm:gap-4 sm:grid-cols-2"
        >
          {details.map((detail) => {
            const Icon = detail.icon
            return (
              <div key={detail.label} className="glass-panel rounded-2xl p-4 sm:p-6 flex gap-3 sm:gap-4">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(192,193,255,0.12) 0%, rgba(75,77,216,0.08) 100%)',
                    border:     '1px solid rgba(192,193,255,0.15)',
                  }}
                >
                  <Icon size={18} className="text-primary" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-headline text-sm font-bold text-primary mb-1">{detail.label}</h2>
                  <p className="text-on-surface-variant/85 text-sm leading-relaxed">{detail.text}</p>
                </div>
              </div>
            )
          })}
        </motion.section>

        <div className="pt-2">
          <BackToProjects />
        </div>
      </Container>

      {lightboxOpen && (
        <ImageLightbox
          title={project.title}
          gallery={gallery}
          galleryAlts={galleryAlts}
          index={activeIndex}
          onClose={closeLightbox}
          onNavigate={setActiveIndex}
          reduced={!!reduced}
        />
      )}
    </main>
  )
}

export default function ProjectDetailsPage({ projectId }: { projectId: string }) {
  const project = projects.find((p) => p.id === projectId)

  // Always open a project page at the top, even when arriving from a scrolled
  // homepage or switching between projects.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [projectId])

  if (!project) {
    return (
      <main id="main-content" className="relative z-10 min-h-screen flex items-center">
        <Container className="py-32 text-center">
          <p className="font-label text-xs uppercase tracking-[0.15em] text-primary mb-3">404</p>
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-4">
            Project not found
          </h1>
          <p className="text-on-surface-variant/70 max-w-md mx-auto mb-8">
            We couldn&rsquo;t find the project you&rsquo;re looking for. It may have been moved or renamed.
          </p>
          <BackToProjects />
        </Container>
      </main>
    )
  }

  // Keyed by project id so the active screenshot resets when switching projects.
  return <ProjectCaseStudy key={project.id} project={project} />
}
