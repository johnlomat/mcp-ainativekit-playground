import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'src/widget'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist/widget'),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/widget/index.html'),
      output: {
        // Single bundle for inline embedding in MCP resource HTML
        entryFileNames: 'assets/index.js',
        assetFileNames: 'assets/[name].[ext]',
        // Disable code splitting so everything is in one file
        manualChunks: undefined,
        inlineDynamicImports: true,
      },
    }
  }
})
