import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './components/pages/HomePage'
import ProjectDetailsPage from './components/pages/ProjectDetailsPage'
import { usePathname } from './lib/router'

export default function App() {
  const pathname = usePathname()
  const projectMatch = pathname.match(/^\/projects\/([^/]+)\/?$/)

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

      {projectMatch ? (
        <ProjectDetailsPage projectId={decodeURIComponent(projectMatch[1])} />
      ) : (
        <HomePage />
      )}

      <Footer />
    </>
  )
}
