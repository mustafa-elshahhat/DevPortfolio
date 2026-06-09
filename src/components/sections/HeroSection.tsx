import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'
import { ArrowRight } from 'lucide-react'
import { heroContainer, fadeInUp, fadeInRight, slideUpReveal } from '../../lib/motion'
import { socialLinks } from '../../data/social'
import Button from '../ui/Button'
import IconLink from '../ui/IconLink'

const KEYWORDS = ['ASP.NET Core', 'C#', 'Angular', 'SQL Server', 'REST APIs']

function useTypewriter(words: string[], typingSpeed = 80, deletingSpeed = 50, pauseDuration = 2000) {
  const [displayText, setDisplayText] = useState('')
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
    const speed = isDeleting ? deletingSpeed : typingSpeed
    const timer = setTimeout(tick, speed)
    return () => clearTimeout(timer)
  }, [tick, isDeleting, typingSpeed, deletingSpeed])

  return displayText
}

export default function HeroSection() {
  const reduced = useReducedMotion()
  const cp      = reduced ? {} : { variants: heroContainer, initial: 'hidden', animate: 'visible' }
  const ip      = reduced ? {} : { variants: fadeInUp }
  const rp      = reduced ? {} : { variants: fadeInRight }

  const typedKeyword = useTypewriter(KEYWORDS)

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24"
    >
      <div className="hero-gradient-mesh" aria-hidden="true" />

      <motion.div
        {...cp}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 w-full
                   flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20
                   h-full pt-16 lg:pt-0"
      >
        <div className="flex-1 space-y-8">
          <motion.p
            {...ip}
            className="font-label text-sm tracking-[0.08em] text-primary font-medium"
          >
            Moustafa Elshahhat Elsayed Abdelaziz
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={reduced ? undefined : slideUpReveal}
            className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold
                       tracking-tight text-on-surface leading-[1.04]"
          >
            Computer Science{' '}
            <span className="block">Student</span>
            <span className="gradient-text text-glow">Full-Stack .NET</span>
          </motion.h1>

          <motion.p
            {...ip}
            className="text-lg md:text-xl text-on-surface-variant/80
                       font-light leading-relaxed max-w-xl"
          >
            Computer Science student on a full-stack .NET track. I build web and desktop
            applications with <span className="keyword-highlight">ASP.NET Core</span>,{' '}
            <span className="keyword-highlight">C#</span>,
            <span className="keyword-highlight"> Angular</span> and{' '}
            <span className="keyword-highlight">SQL Server</span> — REST APIs,
            authentication, databases, dashboards and responsive UI.
          </motion.p>

          <motion.div {...ip} className="flex items-center gap-3">
            <span className="font-mono text-sm text-on-surface-variant/40 tracking-wide">
              {'> '}focused_on:
            </span>
            <span className="font-mono text-sm text-primary font-medium">
              {typedKeyword}
            </span>
            <span className="typing-cursor" aria-hidden="true" />
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
              Let&apos;s Work Together <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button
              variant="secondary"
              size="md"
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
          className="order-first lg:order-none flex-1 flex justify-center w-full max-w-[260px] sm:max-w-xs lg:max-w-md"
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
              src="/images/hero/moustafa-elshahhat-hero.png"
              alt="Moustafa Elshahhat, Computer Science student and full-stack .NET developer"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
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
