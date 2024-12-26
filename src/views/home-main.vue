<script>
import BannerComponent from "@/components/main/BannerComponent.vue";
import MovieRow from "@/components/main/MovieRow.vue";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  fetchFeaturedMovie,
  getURL4GenreMovies,
  getURL4PopularMovies,
  getURL4ReleaseMovies
} from "@/script/movie/URL.ts";

library.add(faSearch, faUser);

export default {
  name: 'Home',
  components: {
    BannerComponent,
    MovieRow,
    FontAwesomeIcon
  },
  data() {
    return {
      apiKey: import.meta.env.VITE_TMDB_API_KEY || '', // 환경 변수에서 API 키 가져오기
      featuredMovie: null,
      popularMoviesUrl: '',
      newReleasesUrl: '',
      actionMoviesUrl: '',
    };
  },
  created() {
    if (!this.apiKey) {
      console.error('TMDB API 키가 설정되지 않았습니다. .env 파일을 확인하세요.');
      return; // API 키가 없으면 API 호출을 진행하지 않음
    }

    // URL 생성
    this.popularMoviesUrl = getURL4PopularMovies(this.apiKey);
    this.newReleasesUrl = getURL4ReleaseMovies(this.apiKey);
    this.actionMoviesUrl = getURL4GenreMovies(this.apiKey, '28');

    // 대표 영화 가져오기
    fetchFeaturedMovie(this.apiKey)
      .then((movie) => {
        this.featuredMovie = movie || null; // 결과가 없으면 null 설정
      })
      .catch((error) => {
        console.error('대표 영화를 가져오는 중 오류 발생:', error);
        this.featuredMovie = null; // 오류 발생 시 null로 설정
      });
  },
  methods: {
    handleScroll() {
      const header = document.querySelector('.app-header');
      if (!header) return; // 헤더가 없으면 아무 작업도 하지 않음

      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<template>
    <BannerComponent :movie="featuredMovie" />

    <movie-row title="인기 영화" :fetchUrl="popularMoviesUrl" />
    <movie-row title="최신 영화" :fetchUrl="newReleasesUrl" />
    <movie-row title="액션 영화" :fetchUrl="actionMoviesUrl" />
</template>

<style scoped>
html, body {
  overflow-y: scroll !important;
}

body {
  background-color: #141414 !important;
}
</style>
