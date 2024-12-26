import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/',  // Netlify에서는 base 경로를 루트('/')로 설정
  build: {
    outDir: 'dist',  // 빌드 결과물 출력 디렉토리
    rollupOptions: {
      input: 'src/main.ts',  // main.ts를 엔트리 포인트로 설정
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
