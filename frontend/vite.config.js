import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true
    },
    allowedHosts: ['internstreetph.site', 'www.internstreetph.site'],
    hmr: { clientPort: 5173 },
    // Same-origin /api like on Vercel, so local dev needs no CORS
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})
