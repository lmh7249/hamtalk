package com.hamtalk.chat.jwt;

import com.hamtalk.chat.domain.entity.User;
import com.hamtalk.chat.model.response.UserAuthenticationResponse;
import com.hamtalk.chat.security.CustomUserDetails;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;

@RequiredArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    // Authentication 객체를 만드는 필터

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // 헤더에서 access키에 담긴 토큰을 꺼냄
        String requestURI = request.getRequestURI();
        log.info("요청 URI: {}", requestURI);
        String bearerToken  = request.getHeader("Authorization");
        String accessToken = null;
        // 토큰이 없다면 다음 필터로 넘김
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            accessToken = bearerToken.substring(7);  // "Bearer " 이후의 토큰값만 추출
        }
        log.info("액세스 토큰 유무 확인: {}", accessToken);
        if (accessToken == null) {
            filterChain.doFilter(request, response);
            return;
        }
        // 토큰 만료 여부 확인, 만료시 다음 필터로 넘기지 않음
        try {
            jwtUtil.isExpired(accessToken);
        } catch (ExpiredJwtException e) {

            //response body
            PrintWriter writer = response.getWriter();
            writer.print("access token expired");

            //response status code
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        // 토큰이 access인지 확인 (발급시 페이로드에 명시)
        String category = jwtUtil.getCategory(accessToken);
        if (!category.equals("access")) {
            PrintWriter writer = response.getWriter();
            writer.print("invalid access token");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        // userId, username, role 값을 획득
        Long userId = jwtUtil.getUserId(accessToken);
        String email = jwtUtil.getEmail(accessToken);
        int roleId = jwtUtil.getRoleId(accessToken);
        UserAuthenticationResponse userAuthenticationResponse = new UserAuthenticationResponse();

        userAuthenticationResponse.setId(userId);
        userAuthenticationResponse.setEmail(email);
        userAuthenticationResponse.setRoleId(roleId);
        CustomUserDetails customUserDetails = new CustomUserDetails(userAuthenticationResponse);

        Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}
