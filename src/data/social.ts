import { Mail } from 'lucide-react'
import GithubIcon from '../components/icons/GithubIcon'
import LinkedinIcon from '../components/icons/LinkedinIcon'
import type { IconComponent } from '../components/icons/types'

export interface SocialLink {
  label: string
  href:  string
  icon:  IconComponent
}

export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    href:  'https://github.com/moustafa-elshahhat',
    icon:  GithubIcon,
  },
  {
    label: 'LinkedIn',
    href:  'https://www.linkedin.com/in/moustafa-elshahhat/',
    icon:  LinkedinIcon,
  },
  {
    label: 'Email',
    href:  'mailto:mustafaelshahhat@gmail.com',
    icon:  Mail,
  },
]
