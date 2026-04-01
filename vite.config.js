import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    cssMinify: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React ecosystem — always needed, single chunk
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom') || id.includes('node_modules/scheduler')) {
            return 'react-vendor';
          }
          // Charting — only loaded when a simulator opens
          if (id.includes('node_modules/recharts') || id.includes('node_modules/victory')) {
            return 'recharts-vendor';
          }
          // Analytics — lazy, loaded after consent
          if (id.includes('node_modules/posthog-js')) {
            return 'analytics-vendor';
          }
          // Supabase — lazy, loaded only on user action
          if (id.includes('node_modules/@supabase')) {
            return 'supabase-vendor';
          }
          // D3 geo + topojson — only for world map page
          if (id.includes('node_modules/topojson') || id.includes('node_modules/d3-geo') || id.includes('node_modules/d3-selection') || id.includes('node_modules/d3-zoom')) {
            return 'geo-vendor';
          }
          // City SEO data — heavy JSX, only for city SEO pages
          if (id.includes('src/data/seoVilles')) {
            return 'seo-villes-data';
          }
          // City comparison data — only for simulator
          if (id.includes('src/data/villes')) {
            return 'villes-data';
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
    reportCompressedSize: false,
  },
})
