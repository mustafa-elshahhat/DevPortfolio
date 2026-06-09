import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Target, Zap, Layers, Gauge } from 'lucide-react'
import { projects, type Project } from '../../data/projects'
import { Link } from '../../lib/Link'
import Container from '../ui/Container'
import GithubIcon from '../icons/GithubIcon'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

function BackToProjects() {
  return (
    <Link
      to="/#projects"
      className="inline-flex items-center gap-2 rounded-md font-headline font-semibold text-sm text-on-surface-variant/70 hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <ArrowLeft size={16} aria-hidden="true" />
      Back to Projects
    </Link>
  )
}

function ProjectGallery({ project }: { project: Project }) {
  const gallery = project.gallery ?? [project.imageUrl]
  const [activeImage, setActiveImage] = useState(gallery[0])

  return (
    <section aria-label={`${project.title} screenshots`} className="space-y-4">
      <p className="font-label text-xs uppercase tracking-[0.15em] text-primary">Screenshots</p>

      <div
        className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden gradient-border"
        style={{ background: project.imageBg }}
      >
        <img
          src={activeImage}
          alt={`${project.title} screenshot`}
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>

      {gallery.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1" role="list" aria-label={`${project.title} screenshot thumbnails`}>
          {gallery.map((src, idx) => {
            const isActive = src === activeImage
            return (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImage(src)}
                aria-label={`View screenshot ${idx + 1} of ${project.title}`}
                aria-current={isActive}
                className="relative flex-shrink-0 w-24 sm:w-32 aspect-[16/9] rounded-lg overflow-hidden transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                style={{
                  background: project.imageBg,
                  border:     isActive ? '2px solid rgba(192,193,255,0.7)' : '1px solid rgba(255,255,255,0.1)',
                  opacity:    isActive ? 1 : 0.6,
                }}
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </button>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default function ProjectDetailsPage({ projectId }: { projectId: string }) {
  const reduced = useReducedMotion()
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

  const details = [
    { icon: Target, label: 'Problem',      text: project.details.problem },
    { icon: Zap,    label: 'Solution',     text: project.details.solution },
    { icon: Layers, label: 'Architecture', text: project.details.architecture },
    { icon: Gauge,  label: 'Performance',  text: project.details.performance },
  ]

  const entrance = reduced
    ? {}
    : {
        initial:    { opacity: 0, y: 20 },
        animate:    { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: EASE },
      }

  return (
    <main id="main-content" className="relative z-10 pt-24 sm:pt-28 pb-20 sm:pb-24">
      <Container className="space-y-10 sm:space-y-12">
        <BackToProjects />

        {/* Header — title, summary, stack, external links */}
        <motion.header {...entrance} className="space-y-5 max-w-3xl">
          <p className="font-label text-xs uppercase tracking-[0.15em] text-primary">Case Study</p>
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-on-surface">
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
            <div className="flex flex-wrap gap-5 pt-1">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-primary hover:text-on-primary-container font-headline font-semibold text-sm transition-colors duration-200"
                >
                  Live Demo <ExternalLink size={14} aria-hidden="true" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-on-surface-variant/70 hover:text-on-surface font-headline font-semibold text-sm transition-colors duration-200"
                >
                  Code <GithubIcon size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </motion.header>

        {/* Screenshots gallery */}
        <ProjectGallery project={project} />

        {/* Case study breakdown */}
        <section aria-label="Case study details" className="grid gap-4 sm:grid-cols-2">
          {details.map((detail) => {
            const Icon = detail.icon
            return (
              <div key={detail.label} className="glass-panel rounded-2xl p-5 sm:p-6 flex gap-4">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
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
        </section>

        <div className="pt-2">
          <BackToProjects />
        </div>
      </Container>
    </main>
  )
}
