import { useEffect } from 'react'
import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import SkillsSection from '../sections/SkillsSection'
import ProjectsSection from '../sections/ProjectsSection'
import ContactSection from '../sections/ContactSection'
import { scrollToHash } from '../../lib/router'

// Remembered across client-side navigations (module scope) so returning to the
// homepage with the browser Back button restores the previous scroll position
// instead of snapping to the top.
let savedScrollY = 0

export default function HomePage() {
  useEffect(() => {
    const hash = window.location.hash
    if (hash.length > 1) {
      // Arrived from another route targeting a section (e.g. "Back to
      // Projects" → /#projects): scroll to it once the layout exists.
      requestAnimationFrame(() => scrollToHash(hash))
    } else if (savedScrollY > 0) {
      requestAnimationFrame(() => window.scrollTo(0, savedScrollY))
    }
    return () => {
      savedScrollY = window.scrollY
    }
  }, [])

  return (
    <main id="main-content" className="relative z-10">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  )
}
