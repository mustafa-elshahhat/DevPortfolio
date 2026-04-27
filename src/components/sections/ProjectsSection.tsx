import { motion, useReducedMotion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ExternalLink, Code2, X, Zap, Layers, Target, Gauge } from 'lucide-react'
import { staggerContainer, fadeInUp, scaleIn, slideUpReveal } from '../../lib/motion'
import { projects, type Project } from '../../data/projects'
import Container from '../ui/Container'

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const details = [
    { icon: Target, label: 'Problem', text: project.details.problem },
    { icon: Zap,    label: 'Solution', text: project.details.solution },
    { icon: Layers, label: 'Architecture', text: project.details.architecture },
    { icon: Gauge,  label: 'Performance', text: project.details.performance },
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{
          background:           'rgba(11, 19, 38, 0.97)',
          backdropFilter:       'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border:               '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow:            '0 40px 100px rgba(0, 0, 0, 0.6), 0 0 80px rgba(192,193,255,0.05)',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center
                     bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200
                     border border-white/10"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-[42%] p-8 space-y-5 border-b md:border-b-0 md:border-r border-white/[0.06]"
               style={{ background: project.imageBg.replace('100%)', '30%)') }}>
            <h3 id="modal-title" className="font-headline text-2xl font-bold text-on-surface">
              {project.title}
            </h3>
            <p className="text-on-surface-variant/90 text-sm leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech}
                  className="skill-chip inline-flex items-center px-3 py-1.5 rounded-full text-xs font-label font-medium">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-5 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-1.5 text-primary hover:text-on-primary-container font-headline font-semibold text-sm transition-colors duration-200">
                  Live Demo <ExternalLink size={13} aria-hidden="true" />
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-1.5 text-on-surface-variant/60 hover:text-on-surface font-headline font-semibold text-sm transition-colors duration-200">
                  Code <Code2 size={13} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          <div className="md:w-[58%] p-8 space-y-4">
            <p className="font-label text-xs uppercase tracking-[0.15em] text-primary mb-1">Case Study</p>
            {details.map((detail) => {
              const Icon = detail.icon
              return (
                <div key={detail.label} className="flex gap-3">
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
                    style={{
                      background: 'linear-gradient(135deg, rgba(192,193,255,0.12) 0%, rgba(75,77,216,0.08) 100%)',
                      border:     '1px solid rgba(192,193,255,0.15)',
                    }}
                  >
                    <Icon size={16} className="text-primary" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-headline text-sm font-bold text-primary mb-0.5">
                      {detail.label}
                    </h4>
                    <p className="text-on-surface-variant/85 text-[13px] leading-relaxed">
                      {detail.text}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const ref      = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduced  = useReducedMotion()
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const ap = reduced ? {} : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }

  return (
    <>
      <section
        id="projects"
        ref={ref}
        aria-labelledby="projects-heading"
        className="min-h-screen w-full flex items-center relative py-24"
      >
        <Container>
          <motion.div
            variants={reduced ? undefined : staggerContainer}
            {...ap}
            className="space-y-2 mb-6"
          >
            <motion.p variants={reduced ? undefined : fadeInUp} className="font-label text-xs uppercase tracking-[0.18em] text-primary">
              03 / Work
            </motion.p>
            <motion.h2
              id="projects-heading"
              variants={reduced ? undefined : slideUpReveal}
              className="font-headline text-4xl md:text-5xl font-bold tracking-tight"
            >
              Featured Work
            </motion.h2>
            <motion.p variants={reduced ? undefined : fadeInUp} className="text-on-surface-variant/75 text-lg max-w-2xl">
              Production-grade software applications built with scalable architecture and optimized performance.
            </motion.p>
          </motion.div>

          <motion.div
            variants={reduced ? undefined : staggerContainer}
            {...ap}
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6"
          >
            {projects.map((project, i) => (
              <motion.article
                key={project.id}
                variants={reduced ? undefined : scaleIn}
                custom={i}
                onClick={() => setActiveProject(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveProject(project)
                  }
                }}
                className="group flex flex-col rounded-3xl overflow-hidden card-hover cursor-pointer gradient-border"
                style={{
                  background:           'rgba(255, 255, 255, 0.04)',
                  backdropFilter:       'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border:               '1px solid rgba(255, 255, 255, 0.07)',
                  boxShadow:            '0 8px 40px rgba(0,0,0,0.3)',
                }}
              >
                <div
                  className="h-32 lg:h-40 relative overflow-hidden"
                  style={{ background: project.imageBg }}
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,15,34,0.85)] to-transparent" />

                  <div className="absolute top-4 right-5 font-headline font-bold text-6xl"
                    style={{ color: 'rgba(192,193,255,0.08)' }}>
                    0{i + 1}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                    <span className="font-headline text-sm font-bold text-white px-5 py-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
                      View Case Study →
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow gap-4">
                  <div className="space-y-2">
                    <h3 className="font-headline text-xl font-bold text-on-surface group-hover:text-primary transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-on-surface-variant/70 text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="skill-chip inline-flex items-center px-3 py-1.5 rounded-full text-xs font-label font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div
                    className="flex gap-5 pt-4"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Live demo of ${project.title}`}
                        className="flex items-center gap-1.5 text-primary hover:text-on-primary-container font-headline font-semibold text-sm transition-colors duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Live Demo
                        <ExternalLink size={13} aria-hidden="true" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GitHub repo for ${project.title}`}
                        className="flex items-center gap-1.5 text-on-surface-variant/60 hover:text-on-surface font-headline font-semibold text-sm transition-colors duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Code
                        <Code2 size={13} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
