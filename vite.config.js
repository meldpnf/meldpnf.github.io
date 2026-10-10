import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// Le site a plusieurs pages : on les liste pour que `npm run build` les inclue toutes
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        dev: resolve(import.meta.dirname, 'dev/index.html'),
      },
    },
  },
})
