import { cn } from '../../lib/utils'
import type { IconComponent } from '../icons/types'

interface IconLinkProps {
  href:       string
  icon:       IconComponent
  label:      string
  external?:  boolean
  className?: string
  size?:      number
}

export default function IconLink({
  href,
  icon: Icon,
  label,
  external,
  className,
  size = 20,
}: IconLinkProps) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex items-center justify-center',
        'w-10 h-10 rounded-full',
        'border border-outline-variant/20 bg-white/[0.04]',
        'text-on-surface-variant',
        'transition-all duration-200',
        'hover:border-outline-variant/50 hover:text-primary hover:bg-surface-container-high hover:-translate-y-0.5',
        'active:translate-y-0 active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
        className,
      )}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <Icon size={size} aria-hidden="true" strokeWidth={1.5} className="shrink-0" />
    </a>
  )
}
