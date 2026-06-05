import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// Исходники лежат в src/, а готовая сборка кладётся в корень репозитория:
//   index.html  → корень
//   app.css/js  → assets/
// 3D_Models/ и .git при сборке не трогаются (emptyOutDir: false).
// base: './' — все пути относительные, работает на t-kaper.github.io/maketka/.
export default defineConfig({
  root: 'src',
  base: './',
  publicDir: 'public',
  plugins: [tailwindcss()],
  build: {
    outDir: '../',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/app.[ext]',
      },
    },
  },
})
