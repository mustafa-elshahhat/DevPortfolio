import { Code2, Mail } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface SocialLink {
  label: string
  href:  string
  icon:  LucideIcon
}

export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    href:  'https://github.com/mustafaelshahhat-art',
    icon:  Code2,
  },
  {
    label: 'Email',
    href:  'mailto:mustafaelshahhat@gmail.com',
    icon:  Mail,
  },
]
