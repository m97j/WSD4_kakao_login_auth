import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  base: '/wsd_sj4/', // GitHub Pages 배포용 base 경로 설정
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
