<script setup lang="ts">
import MovieSearch from "@/components/search/MovieSearch.vue";
import MovieInfiniteScroll from "@/components/popular/MovieInfiniteScroll.vue";
import { ref } from "vue";

const apiKey = import.meta.env.VITE_TMDB_API_KEY || '';

const genreId = ref('0'); // 기본값: 전체 장르
const ageId = ref(-1); // 기본값: 전체 평점
const sortId = ref('all'); // 기본값: 전체 정렬

const genreCode = {
  '장르 (전체)': 0,
  'Action': 28,
  'Adventure': 12,
  'Comedy': 35,
  'Crime': 80,
  'Family': 10751
};

const sortingCode = {
  '언어 (전체)': 'all',
  '영어': 'en',
  '한국어': 'ko'
};

const ageCode = {
  '평점 (전체)': -1,
  '9~10': 9,
  '8~9': 8,
  '7~8': 7,
  '6~7': 6,
  '5~6': 5,
  '4~5': 4,
  '4점 이하': -2
};

const changeOptions = (options: { originalLanguage?: string, translationLanguage?: string, sorting?: string }) => {
  genreId.value = `${genreCode[options.originalLanguage as keyof typeof genreCode] || 0}`;
  ageId.value = ageCode[options.translationLanguage as keyof typeof ageCode] || -1;
  sortId.value = sortingCode[options.sorting as keyof typeof sortingCode] || 'all';
};

const resetOptions = () => {
  genreId.value = '0';
  ageId.value = -1;
  sortId.value = 'all';
};
</script>

<template>
  <div class="container-search">
    <div class="container-search-bar">
      <MovieSearch
          @change-options="changeOptions"
      />
      <button @click="resetOptions" class="reset-button">검색 옵션 초기화</button>
    </div>
    <div class="content-search">
      <p v-if="!apiKey || !genreId || !sortId || !ageId">데이터를 불러오는 중...</p>
      <MovieInfiniteScroll
          v-else
          :api-key="apiKey"
          :genre-code="genreId"
          :sorting-order="sortId"
          :vote-average="ageId"
      />
    </div>
  </div>
</template>

<style scoped>
.container-search {
  margin-top: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.container-search-bar {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: right;
  margin-top: 10px;
}

.content-search {
  width: 100%;
}

.reset-button {
  background-color: #535bf2;
  color: white;
  border: none;
  padding: 8px 12px;
  margin-left: 10px;
  border-radius: 4px;
  cursor: pointer;
}

.reset-button:hover {
  background-color: #4344e2;
}
</style>
