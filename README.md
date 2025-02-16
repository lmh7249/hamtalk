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
