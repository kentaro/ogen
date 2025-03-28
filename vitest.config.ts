import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  test: {
    environment: 'jsdom',
    include: ['**/*.test.ts', '**/*.test.tsx'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/app/api/**/*.ts', 'src/app/api/**/*.tsx', 'src/components/**/*.tsx', 'src/services/**/*.tsx'],
      exclude: [
        'node_modules/',
        'dist/',
        '.wrangler/',
        '.next/',
        'src/app/page.tsx',
        'next.config.js',
        'coverage/',
        'tests/'
      ]
    },
    globals: true
  }
}) 