import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'surface':               '#0b1326',
        'surface-dim':           '#0b1326',
        'surface-bright':        '#31394d',
        'surface-container-lowest': '#060e20',
        'surface-container-low': '#131b2e',
        'surface-container':     '#171f33',
        'surface-container-high':'#222a3d',
        'surface-container-highest': '#2d3449',
        'surface-variant':       '#2d3449',
        'on-surface':            '#dae2fd',
        'on-surface-variant':    '#c7c4d8',
        'primary':               '#c0c1ff',
        'primary-container':     '#4b4dd8',
        'on-primary':            '#1000a9',
        'on-primary-container':  '#d9d8ff',
        'secondary':             '#c3c0ff',
        'secondary-container':   '#413f82',
        'on-secondary':          '#2a276a',
        'on-secondary-container':'#b0aef9',
        'outline':               '#918fa1',
        'outline-variant':       '#464555',
        'background':            '#0b1326',
        'on-background':         '#dae2fd',
        'error':                 '#ffb4ab',
        'error-container':       '#93000a',
        'on-error':              '#690005',
        'on-error-container':    '#ffdad6',
        'success':               '#22c55e',
      },
      fontFamily: {
        headline: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body:     ['Manrope', 'system-ui', 'sans-serif'],
        label:    ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono:     ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        sm:      '0.25rem',
        md:      '0.5rem',
        lg:      '0.75rem',
        xl:      '1rem',
        '2xl':   '1.25rem',
        '3xl':   '1.5rem',
        full:    '9999px',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #c0c1ff 0%, #4b4dd8 100%)',
      },
      boxShadow: {
        'glow-sm':  '0 0 15px rgba(192, 193, 255, 0.1)',
        'glow-md':  '0 0 30px rgba(192, 193, 255, 0.15)',
        'glow-lg':  '0 20px 50px rgba(192, 193, 255, 0.05)',
        'card':     '0 4px 24px rgba(6, 14, 32, 0.6)',
        'card-hover': '0 8px 40px rgba(6, 14, 32, 0.8), 0 0 0 1px rgba(192,193,255,0.15)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
