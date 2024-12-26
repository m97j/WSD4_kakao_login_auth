import { ref, Ref } from 'vue';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date?: string;
    overview?: string;
    vote_average?: number;
}

export function useWishlist() {
    const wishlist: Ref<Movie[]> = ref([]);

    const loadWishlist = (): void => {
        try {
            const storedWishlist = localStorage.getItem('movieWishlist');
            if (storedWishlist) {
                wishlist.value = JSON.parse(storedWishlist);
            }
        } catch (error) {
            console.error('찜 목록을 불러오는 중 문제가 발생했습니다:', error);
        }
    };

    const saveWishlist = (): void => {
        try {
            localStorage.setItem('movieWishlist', JSON.stringify(wishlist.value));
        } catch (error) {
            console.error('찜 목록을 저장하는 중 문제가 발생했습니다:', error);
        }
    };

    const toggleWishlist = (movie: Movie): void => {
        const index = wishlist.value.findIndex(item => item.id === movie.id);
        if (index === -1) {
            wishlist.value.push(movie);
            alert(`${movie.title}이(가) 찜 목록에 추가되었습니다.`);
        } else {
            wishlist.value.splice(index, 1);
            alert(`${movie.title}이(가) 찜 목록에서 삭제되었습니다.`);
        }
        saveWishlist();
    };

    const isInWishlist = (movieId: number): boolean => {
        return wishlist.value.some(item => item.id === movieId);
    };

    const isWishlistEmpty = (): boolean => {
        return wishlist.value.length === 0;
    };

    // Load wishlist on initialization
    loadWishlist();

    return {
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistEmpty
    };
}
