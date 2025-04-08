import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3031,
    proxy: {
      '/api': {
        target: 'http://localhost:5031',
        changeOrigin: true,
      },
    },
  },
})
