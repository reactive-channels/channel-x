import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";



export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'app',
      remotes: {
        remote_app: "http://localhost:4173/assets/remoteEntry.js",
      },
      shared: ['react']
    })
  ],
  preview: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
