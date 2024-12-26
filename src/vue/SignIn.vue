<template>
  <div>
    <div class="bg-image" />
    <div class="container">
      <div id="phone">
        <div id="content-wrapper">
          <!-- 로그인 카드 -->
          <div class="card" id="login">
            <h1>Sign in</h1>
            <p v-if="isAuthenticated" class="auth-message">이미 로그인된 상태입니다. 홈으로 이동합니다...</p>
            <button class="kakao-login" @click="handleKakaoLogin">
              <img src="https://developers.kakao.com/assets/img/about/logos/kakaologo.png" alt="카카오 로고" />
              카카오 로그인
            </button>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { tryLoginWithKakao } from '@/script/auth/Authentication.js';

export default {
  setup() {
    const router = useRouter();
    const isAuthenticated = ref(false);
    const errorMessage = ref('');

    // 로그인 상태 확인
    const checkAuthAndRedirect = () => {
      isAuthenticated.value = localStorage.getItem('authToken') !== null;
      if (isAuthenticated.value) {
        nextTick(() => {
          router.push('/'); // 로그인 후 홈으로 리다이렉션
        });
      }
    };

    // 카카오 로그인 처리
    const handleKakaoLogin = () => {
      tryLoginWithKakao(
        (user) => {
          console.log('로그인 성공:', user);
          nextTick(() => router.push('/')); // 로그인 후 홈으로 리다이렉션
        },
        (error) => {
          errorMessage.value = '로그인에 실패했습니다. 다시 시도해주세요.';
          console.error('카카오 로그인 실패:', error);
        }
      );
    };

    onMounted(() => {
      checkAuthAndRedirect();
    });

    return {
      handleKakaoLogin,
      isAuthenticated,
      errorMessage,
    };
  },
};

</script>

<style scoped>
/* 카카오 로그인 버튼 스타일 */
.kakao-login {
  background-color: #fee500;
  border: none;
  color: #000;
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px; /* 아이콘과 텍스트 간격 */
}

.kakao-login img {
  height: 24px;
  width: 24px;
}

.kakao-login:hover {
  background-color: #ffd400;
}

.auth-message {
  color: #666;
  font-size: 14px;
  margin-top: 20px;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
</style>
