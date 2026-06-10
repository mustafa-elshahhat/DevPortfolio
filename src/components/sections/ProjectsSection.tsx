import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink } from 'lucide-react'
import { staggerContainer, fadeInUp, scaleIn, slideUpReveal } from '../../lib/motion'
import { projects } from '../../data/projects'
import Container from '../ui/Container'
import GithubIcon from '../icons/GithubIcon'
import { Link } from '../../lib/Link'
import { cn } from '../../lib/utils'

// On mobile the grid shows two cards per row, so only the first few stack
// badges are shown with a "+N" overflow chip; the full list returns at sm+.
const MOBILE_BADGE_LIMIT = 3

export default function ProjectsSection() {
  const ref      = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduced  = useReducedMotion()

  const ap = reduced ? {} : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }

  return (
    <section
      id="projects"
      ref={ref}
      aria-labelledby="projects-heading"
      className="w-full relative py-16 md:py-20 lg:py-24"
    >
      <Container>
        <motion.div
          variants={reduced ? undefined : staggerContainer}
          {...ap}
          className="space-y-2 mb-8 sm:mb-10"
        >
          <motion.p variants={reduced ? undefined : fadeInUp} className="font-label text-xs uppercase tracking-[0.15em] text-primary">
            03 / Projects
          </motion.p>
          <motion.h2
            id="projects-heading"
            variants={reduced ? undefined : slideUpReveal}
            className="font-headline text-4xl md:text-5xl font-bold tracking-tight"
          >
            Projects
          </motion.h2>
          <motion.p variants={reduced ? undefined : fadeInUp} className="text-on-surface-variant/75 text-lg max-w-2xl">
            Practical full-stack and desktop applications I&apos;ve built as academic and personal projects — spanning ASP.NET Core APIs, SQL Server databases, and Angular, React, and Flutter front-ends.
          </motion.p>
        </motion.div>

        <motion.div
          variants={reduced ? undefined : staggerContainer}
          {...ap}
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6"
        >
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              variants={reduced ? undefined : scaleIn}
              custom={i}
              className="group flex flex-col rounded-3xl overflow-hidden card-hover gradient-border"
              style={{
                background:           'rgba(255, 255, 255, 0.04)',
                backdropFilter:       'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border:               '1px solid rgba(255, 255, 255, 0.07)',
                boxShadow:            '0 8px 40px rgba(0,0,0,0.3)',
              }}
            >
              <Link
                to={`/projects/${project.id}`}
                aria-label={`View case study for ${project.title}`}
                className="block w-full aspect-[16/9] relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                style={{ background: project.imageBg }}
              >
                <img
                  src={project.imageUrl}
                  alt={`${project.title} screenshot`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-contain"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,15,34,0.85)] to-transparent" aria-hidden="true" />

                <div className="absolute top-3 right-4 sm:top-4 sm:right-5 font-headline font-bold text-4xl sm:text-6xl"
                  style={{ color: 'rgba(192,193,255,0.08)' }}
                  aria-hidden="true">
                  0{i + 1}
                </div>

                <div className="absolute inset-0 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]" aria-hidden="true">
                  <span className="font-headline text-sm font-bold text-white px-5 py-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
                    View Case Study →
                  </span>
                </div>
              </Link>

              <div className="p-3 sm:p-5 flex flex-col flex-grow gap-2.5 sm:gap-4">
                <div className="space-y-1 sm:space-y-2">
                  <h3 className="font-headline text-base sm:text-xl font-bold leading-snug text-on-surface group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-on-surface-variant/70 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
                  {project.stack.map((tech, idx) => (
                    <span
                      key={tech}
                      className={cn(
                        'skill-chip inline-flex items-center rounded-full font-label font-medium px-2 py-0.5 text-[10px] sm:px-3 sm:py-1.5 sm:text-xs',
                        idx >= MOBILE_BADGE_LIMIT && 'hidden sm:inline-flex',
                      )}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > MOBILE_BADGE_LIMIT && (
                    <span className="skill-chip inline-flex sm:hidden items-center rounded-full font-label font-medium px-2 py-0.5 text-[10px]">
                      +{project.stack.length - MOBILE_BADGE_LIMIT}
                    </span>
                  )}
                </div>

                <div
                  className="flex flex-wrap gap-x-3 gap-y-1.5 sm:gap-x-5 pt-2.5 sm:pt-4"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Live demo of ${project.title}`}
                      className="flex items-center gap-1.5 whitespace-nowrap text-primary hover:text-on-primary-container font-headline font-semibold text-xs sm:text-sm transition-colors duration-200"
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
                      className="flex items-center gap-1.5 whitespace-nowrap text-on-surface-variant/60 hover:text-on-surface font-headline font-semibold text-xs sm:text-sm transition-colors duration-200"
                    >
                      Code
                      <GithubIcon size={13} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
