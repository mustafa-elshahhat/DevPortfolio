import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '../../lib/motion'
import SectionHeading from '../ui/SectionHeading'
import Container from '../ui/Container'

const FOCUS_AREAS = [
  { icon: '🧩', title: 'Backend APIs', desc: 'ASP.NET Core REST APIs & authentication' },
  { icon: '🗄️', title: 'Databases', desc: 'SQL Server modeling with EF Core' },
  { icon: '🎨', title: 'Front-End', desc: 'Angular & React, responsive UI' },
  { icon: '🔗', title: 'Full-Stack', desc: 'End-to-end features & dashboards' },
]

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const prefersReducedMotion = useReducedMotion()

  const animProps = prefersReducedMotion
    ? {}
    : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }

  return (
    <section
      id="about"
      ref={ref}
      aria-labelledby="about-heading"
      className="w-full bg-surface relative overflow-hidden py-16 md:py-20 lg:py-24"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom left, rgba(75,77,216,0.08) 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />

      <Container>
        <motion.div
          variants={staggerContainer}
          {...animProps}
          className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16"
        >
          <motion.div
            variants={fadeInLeft}
            className="flex-shrink-0 w-full lg:w-80 xl:w-96"
          >
            <div className="grid grid-cols-2 gap-3">
              {FOCUS_AREAS.map((area, i) => (
                <motion.div
                  key={area.title}
                  initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : undefined}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group p-4 rounded-2xl card-hover cursor-default"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="text-2xl mb-2">{area.icon}</div>
                  <p className="font-headline text-sm font-bold text-on-surface mb-1">
                    {area.title}
                  </p>
                  <p className="text-on-surface-variant/80 text-xs leading-relaxed">
                    {area.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInRight} className="flex-1 min-w-0 space-y-6">
            <motion.div variants={staggerContainer} {...animProps}>
              <SectionHeading
                eyebrow="01 / About"
                title="About Me"
                id="about-heading"
              />
            </motion.div>

            <motion.div variants={staggerContainer} className="space-y-4 mt-5">
              <motion.p variants={fadeInUp} className="text-on-surface-variant leading-relaxed text-lg">
                I am a Computer Science student on a full-stack .NET development track, building complete web and desktop applications end to end.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-on-surface-variant leading-relaxed">
                On the backend I work with ASP.NET Core and C# to build REST APIs, authentication, and SQL Server databases with Entity Framework Core. On the front-end I use Angular, React, and TypeScript to build responsive interfaces and admin dashboards.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-on-surface-variant leading-relaxed">
                I enjoy connecting the full stack — from data model to API to UI — and have also explored desktop apps with WPF and cross-platform development.
              </motion.p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-x-8 gap-y-4 pt-4"
            >
              {[
                { metric: 'ASP.NET Core', label: 'Backend' },
                { metric: 'Angular',      label: 'Front-End' },
                { metric: 'SQL Server',   label: 'Database' },
              ].map((item) => (
                <div key={item.metric} className="flex flex-col gap-1 group">
                  <span className="font-headline font-bold text-xl text-primary group-hover:text-glow transition-all duration-300">
                    {item.metric}
                  </span>
                  <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant/60">
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
