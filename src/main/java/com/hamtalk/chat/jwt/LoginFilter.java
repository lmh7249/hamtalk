package com.hamtalk.chat.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hamtalk.chat.config.jwt.JwtProperties;
import com.hamtalk.chat.model.request.LoginRequest;
import com.hamtalk.chat.security.CustomUserDetails;
import com.hamtalk.chat.service.RedisService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import java.io.IOException;

@RequiredArgsConstructor
@Slf4j
public class LoginFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final JwtProperties jwtProperties;
    private final RedisService redisService;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            // 로그인 정보를 JSON 형식으로 받아올 예정이라 -> JSON 요청 본문을 읽어와서 파싱
            ObjectMapper objectMapper = new ObjectMapper();
            LoginRequest loginRequest = objectMapper.readValue(request.getInputStream(), LoginRequest.class);

            String email = loginRequest.getEmail();
            String password = loginRequest.getPassword();

            log.info("로그인 요청 - 이메일: {}", email);
            log.info("로그인 요청 - 비밀번호: {}", password);

            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(email, password, null);
            return authenticationManager.authenticate(authToken);

        } catch (IOException e) {
            log.error("JSON 요청을 읽는 중 오류 발생", e);
            throw new RuntimeException("로그인 요청을 처리하는 중 오류 발생");
        }
    }

    //로그인 성공시 실행하는 메소드 (여기서 JWT를 발급하면 됨)
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {
        log.info("로그인 성공! JWT 토큰 생성 중 ......... ");
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        String email = customUserDetails.getUsername();
        int authorityId = customUserDetails.getAuthorityId();
        //토큰 생성
        String accessToken = jwtUtil.createJwt("access", email, authorityId, jwtProperties.getAccessTtl());
        String refreshToken = jwtUtil.createJwt("refresh", email, authorityId, jwtProperties.getRefreshTtl());
        // 레디스에 리프레쉬 토큰 저장
        redisService.saveRefreshToken(email, refreshToken);
        //응답 설정
        response.setHeader("access", accessToken);
        response.addCookie(createCookie("refresh", refreshToken));
        response.setStatus(HttpStatus.OK.value());
    }

    //로그인 실패시 실행할 메소드
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {
        log.error("로그인 실패 !");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 에러
//        response.setContentType("application/json;charset=UTF-8");
//        String errorMessage = "이메일 또는 비밀번호를 다시 확인해주세요.";
//        if (failed instanceof BadCredentialsException) {
//            errorMessage = "이메일 또는 비밀번호가 일치하지 않습니다.";
//        } else if (failed instanceof DisabledException) {
//            errorMessage = "이 계정은 비활성화되었습니다. 관리자에게 문의하세요.";
//        } else if (failed instanceof LockedException) {
//            errorMessage = "이 계정은 잠겼습니다. 관리자에게 문의하세요.";
//        }
//
//        try {
//            response.getWriter().write("{\"error\": \"" + errorMessage + "\"}");
//        } catch (IOException e) {
//            log.error("에러 응답을 작성하는 중 오류 발생", e);
//        }

    }

    private Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24*60*60);
        cookie.setPath("/"); // 적용 패스
        cookie.setHttpOnly(true);
        log.info("로그인 필터에서 쿠키를 생성하는 중... {}", cookie.getValue());
        return cookie;
    }

}
