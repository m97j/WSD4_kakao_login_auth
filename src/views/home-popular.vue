<script setup lang="ts">
import MovieGrid from "@/components/popular/MovieTable.vue";
import { getURL4PopularMovies } from "@/script/movie/URL.ts";
import { defineComponent, onMounted, onBeforeUnmount, ref } from "vue";
import { faTh, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import MovieInfiniteScroll from "@/components/popular/MovieInfiniteScroll.vue";

library.add(faTh, faBars);

defineComponent({
  components: {
    FontAwesomeIcon,
  },
});

const apiKey = import.meta.env.VITE_TMDB_API_KEY || '';
if (!apiKey) {
  console.error('TMDB API 키가 설정되지 않았습니다. .env 파일을 확인하세요.');
}
const fetchURL = apiKey ? getURL4PopularMovies(apiKey) : '';
if (!fetchURL) {
  console.error('유효한 fetchURL이 생성되지 않았습니다. API 키를 확인하세요.');
}

const currentView = ref('grid');

const setGridView = () => {
  currentView.value = 'grid';
  disableScroll();
};

const setListView = () => {
  currentView.value = 'list';
  enableScroll();
};

const disableScroll = () => {
  document.body.style.overflow = 'hidden';
};

const enableScroll = () => {
  document.body.style.overflow = 'auto';
};

onMounted(() => {
  disableScroll();
});

onBeforeUnmount(() => {
  enableScroll();
});
</script>

<template>
  <div class="popular-container">
    <div v-if="fetchURL">
      <div class="view-toggle">
        <button @click="setGridView" :class="{ active: currentView === 'grid' }">
          <font-awesome-icon :icon="['fas', 'th']" />
        </button>
        <button @click="setListView" :class="{ active: currentView === 'list' }">
          <font-awesome-icon :icon="['fas', 'bars']" />
        </button>
      </div>
      <MovieGrid v-if="currentView === 'grid'" title="인기 영화" :fetchUrl="fetchURL" />
      <MovieInfiniteScroll v-if="currentView === 'list'" title="인기 영화" :fetchUrl="fetchURL" />
    </div>
    <p v-else>영화를 불러오는 중입니다. 잠시만 기다려주세요...</p>
  </div>
</template>

<style scoped>
.view-toggle {
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
}

.view-toggle button {
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 15px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 4px;
}

.view-toggle button.active {
  background-color: #535bf2;
}

@media (max-width: 768px) {
  .view-toggle {
    margin-top: 80px;
  }
}
</style>
