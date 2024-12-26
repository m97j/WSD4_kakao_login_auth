import axios from "axios";

// TMDB API 키를 .env 파일에서 가져옴
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

if (!apiKey) {
    console.error('TMDB API 키가 설정되지 않았습니다. .env 파일을 확인하세요.');
    throw new Error('TMDB API 키가 설정되지 않았습니다.');
}

// 대표 영화 가져오기
const fetchFeaturedMovie = async () => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR`);
        console.log(response.data.results[0]);
        return response.data.results[0];
    } catch (error) {
        console.error('Error fetching featured movie:', error);
        throw error; // 에러를 호출한 곳으로 전달
    }
};

// 인기 영화 URL 생성
const getURL4PopularMovies = (page: number = 1) => {
    return `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=${page}`;
};

// 현재 상영 영화 URL 생성
const getURL4ReleaseMovies = (page: number = 1) => {
    return `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=ko-KR&page=${page}`;
};

// 장르별 영화 URL 생성
const getURL4GenreMovies = (genre: string, page: number = 1) => {
    return `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&language=ko-KR&page=${page}`;
};

export { fetchFeaturedMovie, getURL4PopularMovies, getURL4ReleaseMovies, getURL4GenreMovies };
