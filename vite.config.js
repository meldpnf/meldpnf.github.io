import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// Le site a plusieurs pages : on les liste pour que `npm run build` les inclue toutes
export default defineConfig({
  // Écoute sur toutes les adresses : localhost seul ne répondait pas sur cette machine
  server: {
    host: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        dev: resolve(import.meta.dirname, 'dev/index.html'),
        qa: resolve(import.meta.dirname, 'qa/index.html'),
        visuals: resolve(import.meta.dirname, 'visuals/index.html'),
        music: resolve(import.meta.dirname, 'music/index.html'),
        socialMeily: resolve(import.meta.dirname, 'social/meily/index.html'),
        socialCathy: resolve(import.meta.dirname, 'social/cathy/index.html'),
        contact: resolve(import.meta.dirname, 'contact/index.html'),
      },
    },
  },
})
