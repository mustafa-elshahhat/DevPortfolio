import { socialLinks } from '../../data/social'

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
          Moustafa Elshahhat
        </div>

        {/* Social links */}
        <div className="flex gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              className="text-on-surface-variant/60 hover:text-primary transition-all duration-200 hover:-translate-y-0.5 font-label text-sm uppercase tracking-widest"
              target={link.href.startsWith('mailto') || link.href.startsWith('tel') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') || link.href.startsWith('tel') ? undefined : 'noopener noreferrer'}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-on-surface-variant/60 text-xs font-label tracking-wide text-center">
          © {year} Moustafa Elshahhat. Crafted with precision.
        </p>
      </div>
    </footer>
  )
}
