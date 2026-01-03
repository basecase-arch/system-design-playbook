import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Use base path for GitHub Pages in production builds, but '/' for local dev server
  base: command === 'build' ? '/system-design-playbook/' : '/',
}))