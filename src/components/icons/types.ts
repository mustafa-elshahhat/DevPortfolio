import type { ComponentType, SVGProps } from 'react'

/**
 * Props shared by lucide-react icons and our local inline-SVG brand icons.
 * Mirrors the subset of lucide's API we actually use (`size` + standard SVG
 * attributes) so the two are interchangeable at call sites.
 */
export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  /** Width/height in px (or any CSS length). Matches lucide's `size` prop. */
  size?: number | string
}

/**
 * Any icon component the UI accepts — a lucide-react icon or one of the local
 * brand marks under `components/icons`. Lets data and shared components stay
 * agnostic about which one they render.
 */
export type IconComponent = ComponentType<IconProps>
