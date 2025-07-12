
---
# 🔐 Kakao Login API Service (Node.js + Express + MongoDB)

이 프로젝트는 **카카오 소셜 로그인 기능**을 구현한 RESTful API 서비스입니다.  
사용자는 카카오 계정으로 간편하게 회원가입 · 로그인할 수 있으며,  
JWT 기반 인증을 통해 안전하게 사용자 세션을 관리합니다.

---

## 📌 주요 목적

- **OAuth 2.0 기반 소셜 로그인 경험**
- **JWT 토큰 발급 및 세션 관리**
- **Express 기반 API 서버 개발** 실습
- **MongoDB에 사용자 데이터 저장 및 조회**

🎯 게임 개발자로서, **카카오 로그인을 Unity 클라이언트에 연동**할 수 있는 기반 기술로 활용 가능

---

## 🛠 사용 기술

- **Node.js** 및 **Express**  
- **MongoDB** + **Mongoose**  
- **axios** – 카카오 REST API 호출  
- **jsonwebtoken (JWT)** – 인증 토큰 생성  
- **dotenv** – 환경변수 관리  
- **CORS** – 클라이언트 요청 허용  

---

## 🌐 주요 기능

| 기능 | 설명 |
|------|------|
| 👤 카카오 로그인 | 클라이언트에서 받은 카카오 Access Token으로 사용자 정보 조회 |
| 🗄 DB 저장 | Kakao 고유 ID, 이메일 등 정보 MongoDB에 저장 (신규 사용자 등록) |
| 🔑 JWT 발급 | 로그인 시 사용자에게 JWT 토큰 반환 |
| 📄 사용자 검증 | JWT로 보호된 엔드포인트 접근 제어 |

API 경로 예시:


POST  /api/auth/kakao  → 카카오 로그인 처리
GET   /api/profile     → JWT 인증 사용자 정보 조회


API URL 예시:

```
https://your-service.onrender.com/api/auth/kakao  
https://your-service.onrender.com/api/profile  
```

---

## 🧩 Unity 게임 개발과의 연계

| WSD4 — 카카오 로그인       | 게임 API 구조       | 연계 가능성                                   |
| -------------------- | --------------- | ---------------------------------------- |
| REST API로 카카오 로그인 구현 | OAuth 기반 로그인 처리 | C# Unity 클라이언트에서 HTTP 요청으로 카카오 로그인 연동 가능 |
| JWT 인증 기반 세션 관리      | 게임내 로그인 유지 방식   | Unity Token 저장 후 서버 검증 및 사용자 정보 호출       |
| 사용자 정보 MongoDB 저장    | 유저 프로필 관리       | 게임에서 유저 데이터 기반 기능 확장 가능 (랭킹, 인벤토리 등)     |

---

## ✅ 프로젝트를 통해 얻은 역량

* OAuth 기반 소셜 로그인 흐름 이해 (카카오 OAuth REST API 연동)
* JWT 인증 및 세션 관리 구조 설계
* 클라우드 배포 / CI/CD 방식의 구조 이해
* API 보안, CORS, 환경변수 관리 실습


---

## 📬 연락처

* 📧 [your\_email@example.com](mailto:your_email@example.com)
* 💼 [https://linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile) (선택)


---
