import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '../../lib/motion'
import SectionHeading from '../ui/SectionHeading'
import Container from '../ui/Container'

const FOCUS_AREAS = [
  { icon: '⚡', title: 'Performance', desc: 'Optimized rendering & change detection' },
  { icon: '🏗️', title: 'Architecture', desc: 'Scalable, modular component systems' },
  { icon: '🔄', title: 'State Mgmt', desc: 'Reactive state management patterns' },
  { icon: '🎨', title: 'UI Systems', desc: 'Design systems & responsive layouts' },
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
      className="min-h-screen w-full flex items-center bg-surface relative overflow-hidden py-24"
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
          className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24"
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
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                  }}
                >
                  <div className="text-2xl mb-2">{area.icon}</div>
                  <h4 className="font-headline text-sm font-bold text-on-surface mb-1">
                    {area.title}
                  </h4>
                  <p className="text-on-surface-variant/65 text-xs leading-relaxed">
                    {area.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInRight} className="flex-1 space-y-6">
            <motion.div variants={staggerContainer} {...animProps}>
              <SectionHeading
                eyebrow="01 / About"
                title="About Me"
                id="about-heading"
              />
            </motion.div>

            <motion.div variants={staggerContainer} className="space-y-5 mt-6">
              <motion.p variants={fadeInUp} className="text-on-surface-variant leading-relaxed text-lg">
                I am a Front-End Software Engineer specializing in building scalable, high-performance web applications.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-on-surface-variant leading-relaxed">
                I work primarily with Angular and TypeScript, focusing on creating maintainable, production-ready systems with advanced state management and clean architecture principles.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-on-surface-variant leading-relaxed">
                My approach emphasizes performance optimization, scalable component architecture, clean and maintainable codebases, and real-world production readiness.
              </motion.p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-8 pt-6"
            >
              {[
                { metric: 'Angular',    label: 'Primary Framework' },
                { metric: 'TypeScript', label: 'Daily Language' },
                { metric: 'RxJS',       label: 'Reactive Patterns' },
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
