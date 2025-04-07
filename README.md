# 햄톡 (HamTalk) 🐹
- 햄톡은 사용자 간 자유로운 소통을 바탕으로 구현한 실시간 채팅 웹사이트입니다.
  
※ 해당 프로젝트는 React, Spring Security, JWT 등 기술 학습을 위한 개인 토이 프로젝트입니다.

## 📌 프로젝트 개요
- **프로젝트명**: 햄톡 (채팅 웹사이트)
- **개발 기간**: 2025.01 ~ 2025.04 
- **인원**: 1인 개발

## 🛠 기술 스택

| **분류**       | **기술 및 도구**                                                                 |
|----------------|----------------------------------------------------------------------------------|
| **Backend**    | 	Java 17, Spring Boot 3.3.4, Spring Security, JWT, JPA                           |
| **Frontend**   |  React 18, TypeScript, Styled-Components, Redux Toolkit, React Router            |
| **Database**   |  MySQL 8.0, Redis 7.4, MongoDB 8.0.6                                             |
| **DevOps**     |  AWS(S3)                                                                         |
| **Tools**      |  IntelliJ,IntelliJ, Gradle, Git, GitHub, Swagger, DataGrip                        |

## 🗺️ 서버 구조



## 🚀 주요 기능
🗨️ 실시간 채팅 기능
  - WebSocket + STOMP 프로토콜 기반의 실시간 채팅 구현
  - 채팅방 입장, 메세지 전송/수신, 읽음 처리 기능
  - Redis Pub/Sub을 활용한 메시지 브로드캐스팅
🔐 JWT 기반 로그인 및 인증/인가
  - 로그인 시 Access Token + Refresh Token 발급
  - Spring Security + JWT 필터를 통한 인증 처리
  - 사용자 권한에 따른 페이지 접근 제어
📦 파일 업로드 및 S3 이미지 관리
  - AWS S3를 활용한 프로필 이미지 업로드
  - 기본 프로필 이미지 및 사용자별 디렉토리 구조 설정
  - S3 접근 권한 설정 및 URL 반환 처리
💬 SPA 기반 커뮤니티 UI
  - React + React Router 기반 싱글 페이지 앱
  - Redux Toolkit을 이용한 상태 관리


## 🏆 기술적 성과
-

## 🔜 향후 개선 계획
- 




# 📂 프로젝트 패키지 구조

```plaintext
src/main/java/com/hamtalk/
├── chat/                   # 핵심 애플리케이션 패키지
│   ├── config/             # 애플리케이션 설정 관련
│   │   ├── cors/           # CORS 설정
│   │   ├── mail/           # 이메일 관련 설정
│   │   ├── redis/          # Redis 관련 설정
│   │   ├── security/       # Spring Security 설정
│   │   └── swagger/        # Swagger API 문서 설정
│   │
│   ├── controller/         # REST API 컨트롤러 계층
│   │   └── api/            # API 엔드포인트 모음
│   │
│   ├── domain/             # 도메인 관련 패키지
│   │   ├── entity/         # JPA 엔티티 클래스
│   │   └── enums/          # Enum 클래스 모음
│   │
│   ├── exception/          # 전역 예외 처리 관련
│   │
│   ├── filter/             # Spring Security 및 요청 필터
│   │
│   ├── handler/            # 예외 및 전역 핸들러
│   │
│   ├── interceptor/        # 요청 인터셉터 관련
│   │
│   ├── jwt/                # JWT 관련 클래스 (JwtFilter, JwtUtil, LoginFilter 등 포함)
│   │
│   ├── model/              # 데이터 전송 객체 (DTO)
│   │   ├── dto/            # 공통 DTO
│   │   ├── request/        # 클라이언트 요청 객체
│   │   └── response/       # 서버 응답 객체
│   │
│   ├── repository/         # 데이터 접근 레이어 (Repository 인터페이스)
│   │
│   ├── security/           # 인증 및 보안 관련 (CustomUserDetails, Service 등 포함)
│   │
│   └── service/            # 비즈니스 로직을 처리하는 서비스 계층
│
└── common/                 # 공통적으로 사용되는 유틸리티 및 상수 모음
