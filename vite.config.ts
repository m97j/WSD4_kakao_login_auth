import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  base: '/WSD4_kakao_login_auth/', // GitHub Pages 배포용 base 경로 설정
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
