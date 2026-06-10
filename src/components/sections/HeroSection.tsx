import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'
import { ArrowRight } from 'lucide-react'
import { heroContainer, fadeInUp, fadeInRight, slideUpReveal } from '../../lib/motion'
import { socialLinks } from '../../data/social'
import Button from '../ui/Button'
import IconLink from '../ui/IconLink'

const KEYWORDS = ['ASP.NET Core', 'React', 'Angular', 'TypeScript', 'SQL Server', 'REST APIs']

function useTypewriter(words: string[], typingSpeed = 80, deletingSpeed = 50, pauseDuration = 2000, enabled = true) {
  const [displayText, setDisplayText] = useState(enabled ? '' : words[0])
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const tick = useCallback(() => {
    const currentWord = words[wordIndex]

    if (!isDeleting) {
      setDisplayText(currentWord.slice(0, displayText.length + 1))
      if (displayText.length + 1 === currentWord.length) {
        setTimeout(() => setIsDeleting(true), pauseDuration)
        return
      }
    } else {
      setDisplayText(currentWord.slice(0, displayText.length - 1))
      if (displayText.length - 1 === 0) {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
        return
      }
    }
  }, [displayText, isDeleting, wordIndex, words, pauseDuration])

  useEffect(() => {
    if (!enabled) return
    const speed = isDeleting ? deletingSpeed : typingSpeed
    const timer = setTimeout(tick, speed)
    return () => clearTimeout(timer)
  }, [tick, isDeleting, typingSpeed, deletingSpeed, enabled])

  return displayText
}

export default function HeroSection() {
  const reduced = useReducedMotion()
  const cp      = reduced ? {} : { variants: heroContainer, initial: 'hidden', animate: 'visible' }
  const ip      = reduced ? {} : { variants: fadeInUp }
  const rp      = reduced ? {} : { variants: fadeInRight }

  const typedKeyword = useTypewriter(KEYWORDS, 80, 50, 2000, !reduced)

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-svh w-full flex items-center justify-center overflow-hidden pt-20 pb-12 md:py-20"
    >
      <div className="hero-gradient-mesh" aria-hidden="true" />

      <motion.div
        {...cp}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 w-full
                   flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-16"
      >
        <div className="flex-1 min-w-0 space-y-4 sm:space-y-5 md:space-y-6">
          <motion.p
            {...ip}
            className="flex items-center gap-3 font-label text-sm sm:text-base md:text-lg
                       tracking-[0.02em] text-on-surface font-semibold"
          >
            <span
              className="h-px w-8 shrink-0 bg-gradient-to-r from-primary via-primary/60 to-transparent"
              aria-hidden="true"
            />
            Mustafa Elshahhat Elsayed Abdelaziz
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={reduced ? undefined : slideUpReveal}
            className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold
                       tracking-tight text-on-surface leading-[1.04]"
          >
            Computer Science{' '}
            <span className="block">Student</span>
            <span className="gradient-text text-glow">& Full-Stack Developer</span>
          </motion.h1>

          <motion.p
            {...ip}
            className="text-base sm:text-lg md:text-xl text-on-surface-variant/80
                       font-light leading-relaxed max-w-xl"
          >
            I build practical web applications using{' '}
            <span className="keyword-highlight">ASP.NET Core</span>,{' '}
            <span className="keyword-highlight">React</span>,{' '}
            <span className="keyword-highlight">Angular</span>,{' '}
            <span className="keyword-highlight">TypeScript</span>, and{' '}
            <span className="keyword-highlight">SQL Server</span> — with a focus on
            clean UI, secure APIs, databases, dashboards, i18n, deployment,
            and production-ready workflows.
          </motion.p>

          <motion.div {...ip} className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-mono text-sm text-on-surface-variant/40 tracking-wide">
              {'> '}focused_on:
            </span>
            <span className="font-mono text-sm text-primary font-medium">
              {typedKeyword}
            </span>
            {!reduced && <span className="typing-cursor" aria-hidden="true" />}
          </motion.div>

          <motion.div {...ip} className="flex flex-wrap gap-4 pt-2">
            <Button
              variant="primary"
              size="md"
              href="#contact"
              onClick={() => document
                .getElementById('contact')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            >
              Contact Me <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button
              variant="secondary"
              size="md"
              className="border-outline-variant/40 bg-white/[0.03] hover:border-outline-variant/60"
              href="#projects"
              onClick={() => document
                .getElementById('projects')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            >
              View Projects
            </Button>
          </motion.div>

          <motion.div {...ip} className="flex items-center gap-3 pt-2">
            {socialLinks.map((link) => (
              <IconLink
                key={link.label}
                href={link.href}
                icon={link.icon}
                label={link.label}
                external={!link.href.startsWith('mailto')}
              />
            ))}
          </motion.div>
        </div>

        <motion.div
          {...rp}
          className="order-first lg:order-none flex-1 flex justify-center w-full max-w-[220px] sm:max-w-[280px] lg:max-w-sm xl:max-w-[26rem]"
        >
          <div
            className="code-float w-full rounded-3xl p-3 relative overflow-hidden gradient-border"
            style={{
              background:           'rgba(255, 255, 255, 0.04)',
              backdropFilter:       'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border:               '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow:            '0 30px 80px rgba(0, 0, 0, 0.4), 0 0 60px rgba(192,193,255,0.06)',
            }}
          >
            <img
              src="/images/hero/moustafa-elshahhat-hero.webp"
              alt="Mustafa Elshahhat, Computer Science student and full-stack .NET developer"
              width={1122}
              height={1402}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-auto rounded-2xl object-cover aspect-[1122/1402]"
            />

            <div
              className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(192,193,255,0.12) 0%, transparent 70%)',
              }}
              aria-hidden="true"
            />

            <div
              className="absolute -top-6 -left-6 w-32 h-32 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(75,77,216,0.2) 0%, transparent 70%)',
              }}
              aria-hidden="true"
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-10"
        aria-hidden="true"
      >
        <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/30">
          scroll
        </span>
        <div
          className="w-px h-12 animate-pulse"
          style={{
            background: 'linear-gradient(to bottom, rgba(192,193,255,0.5), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}
