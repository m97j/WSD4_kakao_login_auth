// TMDB API 키 가져오기
const getTMDbApiKey = () => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    if (!apiKey) {
        console.error('TMDB API 키가 설정되지 않았습니다. .env 파일을 확인하세요.');
        throw new Error('TMDB API 키가 설정되지 않았습니다.');
    }
    return apiKey;
};

// 카카오 로그인 처리
const tryLoginWithKakao = (success, fail) => {
    if (!window.Kakao.isInitialized()) {
        window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY); // Vite 환경 변수 사용
    }

    window.Kakao.Auth.login({
        success: (authObj) => {
            window.Kakao.API.request({
                url: '/v2/user/me',
                success: (response) => {
                    const user = {
                        id: response.id,
                        nickname: response.kakao_account.profile.nickname,
                        email: response.kakao_account.email || null,
                    };
                    localStorage.setItem('kakaoUser', JSON.stringify(user)); // 사용자 정보 저장
                    localStorage.setItem('authToken', authObj.access_token); // 액세스 토큰 저장
                    success(user);
                },
                fail: (error) => {
                    console.error('카카오 사용자 정보 요청 실패:', error);
                    fail('사용자 정보 요청에 실패했습니다. 다시 시도해주세요.');
                },
            });
        },
        fail: (error) => {
            console.error('카카오 로그인 실패:', error);
            fail('카카오 로그인이 실패했습니다. 다시 시도해주세요.');
        },
    });
};

// 로그아웃 처리
const logout = () => {
    if (window.Kakao.Auth.getAccessToken()) {
        window.Kakao.Auth.logout(() => {
            localStorage.removeItem('kakaoUser');
            localStorage.removeItem('authToken');
            alert('로그아웃 되었습니다.');
        });
    } else {
        console.warn('사용자가 로그인되어 있지 않습니다.');
    }
};

export { tryLoginWithKakao, getTMDbApiKey, logout };

