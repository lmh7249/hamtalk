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
| **DevOps**     |  AWS(S3, RDS, EC2, CloudFront, Route53, ECR, CodeDeploy), Docker, Github Actions |
| **Tools**      |  IntelliJ,IntelliJ, Gradle, Git, GitHub, Swagger, DataGrip                       |

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





