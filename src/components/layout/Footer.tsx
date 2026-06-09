import { socialLinks } from '../../data/social'
import IconLink from '../ui/IconLink'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="bg-surface/50 border-t border-white/5 backdrop-blur-sm"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="font-headline font-bold text-xl text-primary tracking-tight">
          Mustafa Elshahhat
        </div>

        {/* Social links */}
        <div className="flex items-center gap-3">
          {socialLinks.map((link) => (
            <IconLink
              key={link.label}
              href={link.href}
              icon={link.icon}
              label={link.label}
              external={!link.href.startsWith('mailto') && !link.href.startsWith('tel')}
            />
          ))}
        </div>

        {/* Copyright */}
        <p className="text-on-surface-variant/60 text-xs font-label tracking-wide text-center">
          © {year} Mustafa Elshahhat. Crafted with precision.
        </p>
      </div>
    </footer>
  )
}
