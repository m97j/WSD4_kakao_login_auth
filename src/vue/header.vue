<template>
  <div id="container">
    <header class="app-header" :class="{ 'scrolled': isScrolled }">
      <div class="header-left">
        <div class="logo">
          <a href="/#/">
            <font-awesome-icon :icon="['fas', 'ticket']" style="height: 100%; color: #E50914;" />
          </a>
        </div>
        <nav class="nav-links desktop-nav">
          <ul>
            <li><a href="/#/">홈</a></li>
            <li><a href="/#/search">찾아보기</a></li>
            <li><a href="/#/wishlist">내가 찜한 리스트</a></li>
          </ul>
        </nav>
      </div>
      <div class="header-right">
        <!-- 사용자 이름 및 로그아웃 -->
        <span v-if="user" class="user-info">
          {{ user.nickname }}님
        </span>
        <button v-if="user" class="icon-button" @click="logout">
          로그아웃
        </button>
        <button class="icon-button mobile-menu-button" @click="toggleMobileMenu">
          <font-awesome-icon :icon="['fas', 'bars']" />
        </button>
      </div>
    </header>

    <!-- Mobile Navigation -->
    <div class="mobile-nav" :class="{ 'open': isMobileMenuOpen }">
      <button class="close-button" @click="toggleMobileMenu">
        <font-awesome-icon :icon="['fas', 'times']" />
      </button>
      <nav>
        <ul>
          <li><a href="/#/" @click="toggleMobileMenu">홈</a></li>
          <li><a href="/#/popular" @click="toggleMobileMenu">대세 콘텐츠</a></li>
          <li><a href="/#/search" @click="toggleMobileMenu">찾아보기</a></li>
          <li><a href="/#/wishlist" @click="toggleMobileMenu">내가 찜한 리스트</a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch, faUser, faTicket, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faSearch, faUser, faTicket, faBars, faTimes);

export default {
  name: "MainHeader",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      isScrolled: false,
      isMobileMenuOpen: false,
      user: null, // 사용자 정보 상태
    };
  },
  methods: {
    fetchUser() {
      const kakaoUser = localStorage.getItem("kakaoUser");
      if (kakaoUser) {
        this.user = JSON.parse(kakaoUser); // 사용자 정보 불러오기
      }
    },
    async logout() {
      try {
        if (window.Kakao && window.Kakao.Auth.getAccessToken()) {
          // 카카오 로그아웃 처리
          await window.Kakao.Auth.logout(() => {
            console.log("카카오 로그아웃 완료");
          });
        } else {
          console.warn("카카오에 로그인된 사용자가 없습니다.");
        }

        // 로컬 스토리지 초기화 및 사용자 정보 초기화
        localStorage.removeItem("kakaoUser");
        localStorage.removeItem("authToken");
        this.user = null;

        // Vue Router로 리다이렉션
        this.$router.push("/signin");
      } catch (error) {
        console.error("로그아웃 중 오류 발생:", error);
      }
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
  },
  mounted() {
    this.fetchUser(); // 사용자 정보 로드
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style>
.app-header {
  height: 60px; /* 기존보다 높이 증가 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 4%;
  background-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: background-color 0.3s ease;
}

.app-header:hover,
.app-header.scrolled {
  background-color: #141414;
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
}

.logo {
  height: 30px;
  margin-right: 25px;
  justify-items: center;
  align-items: center;
}

.nav-links ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin-right: 20px;
}

.nav-links a {
  color: #e5e5e5;
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #b3b3b3;
}

.user-info {
  color: white;
  font-size: 1rem;
  margin-right: 20px;
  font-weight: bold;
}

.icon-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  margin-left: 20px;
  cursor: pointer;
}

.icon-button:hover {
  opacity: 0.5;
}

.mobile-menu-button {
  display: none;
}

.mobile-nav {
  display: none;
  position: fixed;
  top: 0;
  right: -100%;
  width: 50%;
  height: 100%;
  background-color: #141414;
  z-index: 1001;
  transition: right 0.3s ease;
}

.mobile-nav.open {
  right: 0;
}

.mobile-nav ul {
  list-style-type: none;
  padding: 0;
  margin-top: 60px;
}

.mobile-nav li {
  margin: 20px 0;
}

.mobile-nav a {
  color: #e5e5e5;
  text-decoration: none;
  font-size: 1.2rem;
  display: block;
  padding: 10px 20px;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .mobile-menu-button {
    display: block;
  }

  .mobile-nav {
    display: block;
  }

  .icon-button {
    font-size: 0.75rem;
    margin-left: 10px;
  }

  a {
    text-align: left;
    font-size: 1.15rem !important;
  }
}
</style>
