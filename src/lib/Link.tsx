import { type AnchorHTMLAttributes, type MouseEvent } from 'react'
import { navigate } from './router'

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string
}

/** Accessible anchor that performs SPA navigation on plain left-click. */
export function Link({ to, onClick, target, children, ...rest }: LinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    // Let the browser handle anything that isn't a plain left-click so
    // "open in new tab", middle-click, etc. keep working.
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ||
      (target && target !== '_self')
    ) {
      return
    }
    e.preventDefault()
    navigate(to)
  }

  return (
    <a href={to} target={target} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
