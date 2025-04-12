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

    //TODO: 추후 커스텀 예외 리팩토링
    public void reissueTokens(HttpServletRequest request, HttpServletResponse response) {
        // 1. 쿠키에서 리프레시 토큰 추출
        log.info("==== 리이슈 서비스 시작 - 모든 쿠키 목록 ====");
        String refreshToken = getRefreshTokenFromCookie(request);
        log.info("검증1_쿠키에서 추출한 리프레시 토큰: {}", refreshToken);
        if (refreshToken == null) {
            throw new InvalidRefreshTokenException(ErrorCode.MISSING_REFRESH_TOKEN);
        }

        // 2. Redis에 저장된 리프레시 토큰과 비교
        String email = jwtUtil.getEmail(refreshToken);
        log.info("검증2_쿠키에서 추출한 이메일: {}", email);
        String storedRefreshToken = redisService.getRefreshToken(email);
        log.info("검증2_레디스에서 추출한 리프레시 토큰: {}", storedRefreshToken);
        if (!refreshToken.equals(storedRefreshToken)) {
            throw new InvalidRefreshTokenException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        // 3. 토큰 만료 검증
        try {
            jwtUtil.isExpired(refreshToken);
        } catch (ExpiredJwtException e) {
            throw new InvalidRefreshTokenException(ErrorCode.EXPIRED_REFRESH_TOKEN);
        }
        // 4. 토큰 타입이 refresh인지 확인
        String category = jwtUtil.getCategory(refreshToken);
        if (!category.equals("refresh")) {
            throw new InvalidRefreshTokenException(ErrorCode.INVALID_TOKEN_CATEGORY);
        }
        Long userId = jwtUtil.getUserId(refreshToken);

        // 5. 새 토큰 발급
        int authorityId = jwtUtil.getRoleId(refreshToken);
        String newAccessToken = jwtUtil.createJwt("access", userId, email, authorityId, jwtProperties.getAccessTtl());
        String newRefreshToken = jwtUtil.createJwt("refresh", userId, email, authorityId, jwtProperties.getRefreshTtl());

        // 6. Redis 업데이트 및 응답 설정
        redisService.saveRefreshToken(email, newRefreshToken);
        response.setHeader("access", "Bearer " + newAccessToken);
        addRefreshTokenCookie(response, newRefreshToken);

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

