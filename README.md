<div align="center">
  <h1>  🛒 나혼자 안산다 (NotAloneMarket) </h1>
  <img width="160px" src="https://i.postimg.cc/R3ppBhF7/notalone-logo.png" alt="NotAloneMarket 로고" />
</div>

<br/>

> **2025-01 소프트웨어 시스템 개발 팀 프로젝트**

---

## 👥 팀 소개

|   김서진   |   박주희   |   한현서   |
|:----------:|:----------:|:----------:|
| ![김서진](https://avatars.githubusercontent.com/u/80455266?v=4) | ![박주희](https://avatars.githubusercontent.com/u/104891747?v=4) | ![한현서](https://avatars.githubusercontent.com/u/80339766?v=4) |
| [@seojin-kim12](https://github.com/seojin-kim12) | [@qkrwngml](https://github.com/qkrwngml)  | [@hyunseo-han](https://github.com/hyunseo-han) |

---

## 📌 프로젝트 개요

**나혼자 안산다**는 1인 가구를 위한 공동구매 플랫폼입니다.  
소규모 인원이 모여 물건을 함께 구매할 수 있도록 돕고, 구매자 간 채팅, 거래 상태, 참여 수량 등을 효율적으로 관리합니다.

---

## 🖥️ 화면 구성

| 온보딩 페이지 | 로그인 페이지 | 홈 | 상세보기 | 게시글 작성 |
|:------------:|:-------------:|:--:|:--------:|:------------:|
| ![](onboarding.png) | ![](login.png) | ![](home.png) | ![](detail.png) | ![](write.png) |

---

## 🌟 주요 기능

### 🔐 회원 기능
- 회원가입 / 로그인 / 로그아웃
- 프로필 조회 및 수정 (닉네임, 전화번호, 이미지)

### 📦 게시글 관리
- 게시글 목록, 상세보기, 작성, 검색, 카테고리 필터링
- 거래 완료 처리
- 내가 작성한 게시글 목록 확인

### 💬 채팅 기능
- WebSocket 기반 실시간 채팅
- 채팅방 목록 / 입장 / 메시지 송수신 / 거래 완료 처리

### 🛍️ 구매내역
- 내가 구매한 공동구매 목록 확인
- 채팅방 거래 완료 시 자동 등록

---

## 🛠️ 기술 스택

| 구분 | 사용 기술 |
|------|------------|
| Frontend | React, Vite, React Router, Zustand, TailwindCSS |
| Backend  | Spring Boot, Spring Security, JWT, WebSocket |
| Database | Oracle (JDBC + JPA) |
| Build Tool | Maven |
| Auth | JWT 기반 인증 및 인가 |
| Template | Thymeleaf (Onboarding, Login) |

---

## 🧪 테스트 계정

| ID    | PW        |
|-------|-----------|
| admin | admin!!   |

---

## 🗂️ 프로젝트 구조

### 🔗 GitHub

- **Backend**: [https://github.com/NotAloneMarket/notalone-market-be](https://github.com/NotAloneMarket/notalone-market-be)  
- **Frontend**: [https://github.com/NotAloneMarket/notalone-market-fe](https://github.com/NotAloneMarket/notalone-market-fe)

---

## 🚀 실행 방법

### Backend
```bash
cd notalone-market-be
./mvnw spring-boot:run
```

### Frontend
```bash
cd notalone-market-fe
pnpm install
pnpm run dev
```
