
# 🎮 WSD4 | Kakao Login Auth SPA

> 대학 WSD4 과제로 진행된 **카카오 로그인 기반 사용자 인증 SPA 프로젝트**입니다.  
> React 기반으로 구성된 프론트엔드 중심 웹앱이며, OAuth2 흐름을 직접 구현하고, 사용자 상태 관리 및 UI 전환까지 설계했습니다.  
> 게임 클라이언트에서도 활용 가능한 **외부 인증 연동 + 사용자 정보 처리 + UI 흐름 구성 능력**을 실습한 프로젝트입니다.

---

## 🌐 데모 사이트

🚀 [👉 GitHub Pages 배포 링크](https://m97j.github.io/WSD4_kakao_login_auth)

---

## 📦 기술 스택

| 영역         | 사용 기술                                      |
|--------------|------------------------------------------------|
| Frontend     | React.js, React Router, Styled-components      |
| 인증 방식    | Kakao OAuth2 (REST API 기반)                   |
| 상태 관리    | SessionStorage, LocalStorage                   |
| API 연동     | Axios, Kakao Developers API                    |
| 배포         | GitHub Pages, gh-pages 브랜치                  |

---

## 🔐 카카오 로그인 안내

> 본 프로젝트는 **카카오 OAuth2 인증 흐름을 직접 구현**한 구조입니다.  
> 로그인 시, 카카오 계정 인증 → 인가 코드 발급 → 액세스 토큰 요청 → 사용자 정보 조회 순으로 진행됩니다.

✔️ 로그인 성공 시 사용자 정보가 화면에 표시되며, 세션에 저장됩니다.  
✔️ 로그아웃 및 연결 끊기 기능도 포함되어 있습니다.  
✔️ 카카오 앱 등록 및 Redirect URI 설정이 필요합니다.

📎 [카카오 개발자 페이지](https://developers.kakao.com/docs/latest/ko/tutorial/login)

---

## 🧩 폴더 구조

```bash
WSD4_kakao_login_auth/
├── public/
│   └── index.html           # 메인 HTML
├── src/
│   ├── App.tsx              # 라우팅 설정
│   ├── pages/
│   │   ├── Login.tsx        # 카카오 로그인 버튼 및 흐름
│   │   ├── Profile.tsx      # 사용자 정보 표시
│   ├── util/
│   │   ├── kakao.ts         # Kakao API 요청 유틸리티
│   │   ├── auth.ts          # 인증 흐름 처리
│   └── index.tsx            # 앱 엔트리 포인트
├── package.json
└── README.md
```

---

## 🚀 주요 기능

- ✅ 카카오 OAuth2 인증 흐름 직접 구현
  - 인가 코드 요청 → 액세스 토큰 발급 → 사용자 정보 조회
- ✅ 로그인 / 로그아웃 / 연결 끊기 기능
- ✅ 사용자 정보 세션 저장 및 UI 반영
- ✅ SPA 구조 + React Router 기반 페이지 전환
- ✅ 반응형 UI + CSS 트랜지션 효과

---

## 📝 회고 및 배운 점

- 외부 OAuth 인증 흐름을 직접 구현하며 **API 요청 구조와 보안 흐름**에 대한 이해도 향상
- 사용자 상태를 기반으로 UI를 동적으로 구성하는 방식 실습
- 게임 클라이언트에서도 활용 가능한 **외부 인증 연동 + 사용자 정보 처리 + UI 전환** 흐름을 경험
- GitHub Pages 배포 및 SPA 라우팅 처리에 대한 실무 감각 강화

---

## 🎮 게임 프론트엔드 개발 관점에서 본 프로젝트를 통해 향상된 역량

| 항목 | 설명 |
|------|------|
| 인증 흐름 이해 | OAuth2 구조를 직접 구현하며 외부 API 연동 능력 확인 가능 |
| 사용자 상태 처리 | 로그인 후 사용자 정보 기반 UI 구성 → 게임 유저 상태 처리와 유사 |
| UI 흐름 설계 | SPA 구조 + 페이지 전환 + 트랜지션 효과 → 클라이언트 인터페이스 구성 능력 |
| 배포 경험 | GitHub Pages를 통한 정적 배포 경험 → 클라이언트 배포 흐름 이해도 |

---

## 📬 문의 및 개선 제안

> 기능 제안, 개선 아이디어는 [Issues](https://github.com/m97j/WSD4_kakao_login_auth/issues)로 남겨주세요!
