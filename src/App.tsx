import Navbar from './components/layout/Navbar'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import SkillsSection from './components/sections/SkillsSection'
import ProjectsSection from './components/sections/ProjectsSection'
import ContactSection from './components/sections/ContactSection'

export default function App() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-xl focus:bg-primary focus:text-on-primary focus:font-headline focus:font-bold focus:outline-none"
      >
        Skip to content
      </a>

      <div className="bg-orbs" aria-hidden="true">
        <div className="orb orb-purple"  />
        <div className="orb orb-indigo"  />
        <div className="orb orb-cyan"    />
        <div className="orb orb-pink"    />
      </div>

      <Navbar />

      <main id="main-content" className="relative z-10">
        <HeroSection    />
        <AboutSection   />
        <SkillsSection  />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  )
}
