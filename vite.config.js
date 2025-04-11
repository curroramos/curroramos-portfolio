import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Remove this line or set to '/' for Vercel
  base: '/',  // was '/curroramos-portfolio/'
  plugins: [react()],
})