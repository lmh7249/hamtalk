package com.hamtalk.chat.service;

import com.hamtalk.chat.config.jwt.JwtProperties;
import com.hamtalk.chat.jwt.JwtUtil;
import com.hamtalk.common.exeption.ErrorCode;
import com.hamtalk.common.exeption.custom.InvalidRefreshTokenException;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReissueService {
    private final JwtUtil jwtUtil;
    private final RedisService redisService;
    private final JwtProperties jwtProperties;

    public void reissueTokens(HttpServletRequest request, HttpServletResponse response) {
        // 1. 쿠키에서 리프레시 토큰 추출
        log.info("==== 리이슈 서비스 시작 - 모든 쿠키 목록 ====");
        String refreshToken = getRefreshTokenFromCookie(request);
        log.info("검증1_쿠키에서 추출한 리프레시 토큰: {}", refreshToken);
        if (refreshToken == null) {
            log.warn("❌ [1단계] 리프레시 토큰이 쿠키에 없음");
            throw new InvalidRefreshTokenException(ErrorCode.MISSING_REFRESH_TOKEN);
        }

        // 2. Redis에 저장된 리프레시 토큰과 비교
        String email = jwtUtil.getEmail(refreshToken);
        log.info("검증2_쿠키에서 추출한 이메일: {}", email);
        String storedRefreshToken = redisService.getRefreshToken(email);
        log.info("검증2_레디스에서 추출한 리프레시 토큰: {}", storedRefreshToken);
        if (!refreshToken.equals(storedRefreshToken)) {
            log.warn("❌ [2단계] 리프레시 토큰 불일치! 쿠키={}, Redis={}", refreshToken, storedRefreshToken);
            throw new InvalidRefreshTokenException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        // 3. 토큰 만료 검증
        try {
            jwtUtil.isExpired(refreshToken);
            log.info("✅ [3단계] 리프레시 토큰 유효함 (만료되지 않음)");
        } catch (ExpiredJwtException e) {
            log.warn("❌ [3단계] 리프레시 토큰이 만료됨");
            throw new InvalidRefreshTokenException(ErrorCode.EXPIRED_REFRESH_TOKEN);
        }
        // 4. 토큰 타입이 refresh인지 확인
        String category = jwtUtil.getCategory(refreshToken);
        log.info("✅ [4단계] 토큰 category: {}", category);
        if (!category.equals("refresh")) {
            log.warn("❌ [4단계] category가 refresh가 아님: {}", category);
            throw new InvalidRefreshTokenException(ErrorCode.INVALID_TOKEN_CATEGORY);
        }
        Long userId = jwtUtil.getUserId(refreshToken);

        // 5. 새 토큰 발급
        int authorityId = jwtUtil.getRoleId(refreshToken);
        String newAccessToken = jwtUtil.createJwt("access", userId, email, authorityId, jwtProperties.getAccessTtl());
        String newRefreshToken = jwtUtil.createJwt("refresh", userId, email, authorityId, jwtProperties.getRefreshTtl());
        log.info("✅ [5단계] 새로운 accessToken, refreshToken 생성 완료");

        // 6. Redis 업데이트 및 응답 설정
        redisService.saveRefreshToken(email, newRefreshToken);
        log.info("✅ [6단계] Redis에 새로운 리프레시 토큰 저장 완료");

        response.setHeader("access", "Bearer " + newAccessToken);
        addRefreshTokenCookie(response, newRefreshToken);
        log.info("✅ [6단계] 응답에 access 헤더, refresh 쿠키 설정 완료");
        log.info("==== [Reissue] 리이슈 서비스 종료 ====");
    }

    private String getRefreshTokenFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) return null;

        for (Cookie cookie : cookies) {
            if ("refresh".equals(cookie.getName())) {
                log.info("쿠키 발견: 이름={}, 값={}, 경로={}, 도메인={}",
                        cookie.getName(), cookie.getValue(), cookie.getPath(), cookie.getDomain());
                return cookie.getValue();
            }
        }
        return null;
    }

    private void addRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
        // 새 쿠키 추가
        Cookie cookie = new Cookie("refresh", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60);
        response.addCookie(cookie);

        log.info("쿠키 이름=refresh, 값={}", refreshToken);
    }
}

