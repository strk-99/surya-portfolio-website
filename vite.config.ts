import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    base: '/surya-portfolio-website/', // Set this to your repository name for GitHub Pages
    appType: 'mpa', // Explicitly disable SPA fallback
    build: {
        rollupOptions: {
            input: {
                main: resolve(process.cwd(), 'index.html'),
                about: resolve(process.cwd(), 'about/index.html'),
                skills: resolve(process.cwd(), 'skills/index.html'),
                projects: resolve(process.cwd(), 'projects/index.html'),
                apps: resolve(process.cwd(), 'apps/index.html'),
                contact: resolve(process.cwd(), 'contact/index.html')
            }
        }
    }
})
