package com.hamtalk.chat.jwt;

import com.hamtalk.chat.service.RedisService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

@RequiredArgsConstructor
@Slf4j
public class CustomLogoutFilter extends GenericFilterBean {
    private final JwtUtil jwtUtil;
    private final RedisService redisService;
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
    }

    private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        String requestUri = request.getRequestURI();
        if (!requestUri.matches("^\\/logout$")) {
            filterChain.doFilter(request, response);
            return;
        }
        String requestMethod = request.getMethod();
        if (!requestMethod.equals("POST")) {
            filterChain.doFilter(request, response);
            return;
        }
        //get refresh token
        String refreshToken = getRefreshTokenFromCookie(request);
        log.info("쿠키에 저장된 리프레시 토큰:{}", refreshToken);
        if (refreshToken == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            log.info("쿠키에 저장된 리프레시 토큰이 없습니다.");
            return;
        }
        //expired check
        try {
            jwtUtil.isExpired(refreshToken);
        } catch (ExpiredJwtException e) {
            //response status code
            log.info("리프레시 토큰이 만료되었습니다.");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        // 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
        String category = jwtUtil.getCategory(refreshToken);
        if (!category.equals("refresh")) {
            log.info("리프레시 토큰 카테고리가 아닙니다.");
            //response status code
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }
        //DB에 저장되어 있는지 확인
        String email = jwtUtil.getEmail(refreshToken);
        log.info("리프레시 토큰의 주인은? {}", email);
        String storedRefreshToken = redisService.getRefreshToken(email);
        log.info("레디스에 저장된 리프레시 토큰:{}", storedRefreshToken);
        if(!storedRefreshToken.equals(refreshToken)) {
            log.info("쿠키 리프레시 토큰과 레디스 리프레시 토큰이 일치하지 않습니다.");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }
        //로그아웃 진행
        //Refresh 토큰 DB에서 제거
        redisService.deleteByRefresh(email);
        //Refresh 토큰 Cookie 값 0
        Cookie cookie = new Cookie("refresh", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        response.addCookie(cookie);
        response.setStatus(HttpServletResponse.SC_OK);
        log.info("로그아웃 성공!");
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

}

