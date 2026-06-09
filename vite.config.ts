import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          const n = id.replace(/\\/g, '/')
          if (n.includes('framer-motion')) return 'motion'
          if (
            n.includes('/react/') ||
            n.includes('/react-dom/') ||
            n.includes('/scheduler/')
          ) {
            return 'react'
          }
          return 'vendor'
        },
      },
    },
  },
})
