# 햄톡 (HamTalk) 🐹
- 햄톡은 사용자 간 자유로운 소통을 바탕으로 구현한 실시간 채팅 웹사이트입니다.

## 📌 프로젝트 개요
- **프로젝트명**: 햄톡 (채팅 웹사이트)
- **개발 기간**: 2025. 01 ~ 2025. 04 
- **인원**: 1인 개발

## 🛠 기술 스택

| **분류**       | **기술 및 도구**                                                                 |
|----------------|----------------------------------------------------------------------------------|
| **Backend**    | 	Java 17, Spring Boot 3.3.4, Spring Security, JWT, JPA                           |
| **Frontend**   |  React 18, TypeScript, Styled-Components, Redux Toolkit, React Router            |
| **Database**   |  MySQL 8.0, Redis 7.4, MongoDB 8.0.6                                             |
| **DevOps**     |  AWS(S3, RDS, EC2, CloudFront, Route53, ECR, CodeDeploy), Docker, Github Actions |
| **Tools**      |  IntelliJ, Gradle, Git, GitHub, Swagger, DataGrip                                |

## 🗺️ 서버 구조
![햄톡(서버구조)](https://github.com/user-attachments/assets/32f0ab9d-7d7d-44a9-9fcf-432707998f33)

## 🚀 주요 기능
🗨️ **실시간 채팅 기능**
  - WebSocket + STOMP 프로토콜 기반의 실시간 채팅 구현
  - 채팅방 입장, 메세지 전송/수신, 읽음 처리 기능
  - Redis Pub/Sub을 활용한 메시지 브로드캐스팅
    
🔐 **JWT 기반 로그인 및 인증/인가**
  - 로그인 시 Access Token + Refresh Token 발급
  - Spring Security + JWT 필터를 통한 인증 처리
  - 사용자 권한에 따른 페이지 접근 제어
    
📦 **파일 업로드 및 S3 이미지 관리**
  - AWS S3를 활용한 프로필 이미지 업로드
  - 기본 프로필 이미지 및 사용자별 디렉토리 구조 설정
    
💬 **SPA 기반 커뮤니티 UI**
  - React + React Router 기반 싱글 페이지 앱
  - Redux Toolkit을 이용한 상태 관리
    
🌐 **S3, CloudFront를 활용한 프론트엔드 배포**
  - React 빌드 파일을 AWS S3에 정적 호스팅
  - CloudFront를 통해 빌드 파일을 빠르게 전달할 수 있도록 CDN 구성 및 HTTPS 적용
  
🐳 **Docker 기반 백엔드 배포 환경 구성**  
  - Spring Boot 서버를 Docker 이미지로 빌드
  - Nginx, Certbot을 이용한 HTTPS 적용 및 리버스 프록시 설정
    
⚙️ **CI/CD 자동화**
  - GitHub Actions + AWS CodeDeploy 기반의 배포 자동화
  - main 브랜치에 PR Merge 시, 자동 배포되도록 구성

## 🔜 향후 개선 계획
- 코드 리팩토링
- 추가 기능 고도화





