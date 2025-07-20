import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/isamm-microsoft-club/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})