import { useEffect, useState } from 'react'
import { NAVIGATE_EVENT } from '../lib/router'

export function useScrollSpy(sectionIds: readonly string[], enabled = true): string {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (!enabled) {
      return
    }

    let frame = 0

    const getSections = () => sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    const updateActiveSection = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const sections = getSections()
        if (sections.length === 0) {
          setActiveId('')
          return
        }

        const activationLine = Math.min(window.innerHeight * 0.35, 280)
        let active = sections[0]

        for (const section of sections) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= activationLine && rect.bottom > 0) {
            active = section
          }
        }

        setActiveId((current) => (current === active.id ? current : active.id))
      })
    }

    const observer = new IntersectionObserver(
      updateActiveSection,
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold:  [0, 0.01, 0.25, 0.5, 1],
      },
    )

    getSections().forEach((section) => observer.observe(section))
    updateActiveSection()

    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    window.addEventListener('hashchange', updateActiveSection)
    window.addEventListener(NAVIGATE_EVENT, updateActiveSection)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
      window.removeEventListener('hashchange', updateActiveSection)
      window.removeEventListener(NAVIGATE_EVENT, updateActiveSection)
    }
  }, [sectionIds, enabled])

  return enabled ? activeId : ''
}
