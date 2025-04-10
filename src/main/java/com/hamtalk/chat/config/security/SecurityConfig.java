package com.hamtalk.chat.config.security;

import com.hamtalk.chat.config.jwt.JwtProperties;
import com.hamtalk.chat.jwt.CustomLogoutFilter;
import com.hamtalk.chat.jwt.JwtFilter;
import com.hamtalk.chat.jwt.JwtUtil;
import com.hamtalk.chat.jwt.LoginFilter;
import com.hamtalk.chat.service.RedisService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.multipart.support.MultipartFilter;

import java.util.Collections;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    //AuthenticationManager가 인자로 받을 AuthenticationConfiguraion 객체 생성자 주입
    private final AuthenticationConfiguration authenticationConfiguration;
    private static final Logger log = LoggerFactory.getLogger(SecurityConfig.class);
    private final JwtUtil jwtUtil;
    private final JwtProperties jwtProperties;
    private final RedisService redisService;

    //AuthenticationManager Bean 등록
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    //TODO: multipart 필터 설정을 해줘야 403Error가 안나옴.
    @Bean
    public FilterRegistrationBean<MultipartFilter> multipartFilter() {
        FilterRegistrationBean<MultipartFilter> registration = new FilterRegistrationBean<>();
        registration.setFilter(new MultipartFilter());
        registration.setOrder(Ordered.HIGHEST_PRECEDENCE); // 가장 먼저 실행되도록 설정
        return registration;
    }


    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        log.info("BCryptPasswordEncoder bCryptPasswordEncoder 메서드 실행");
        return new BCryptPasswordEncoder();
        // 회원가입 비밀번호 암호화
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http    // 로그인 필터(JWT) 등에서 발생하는 CORS 문제를 해결하는 설정
                .cors((corsCustomizer -> corsCustomizer.configurationSource(new CorsConfigurationSource() {

                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {

                        CorsConfiguration configuration = new CorsConfiguration();

                        configuration.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
                        configuration.setAllowedMethods(Collections.singletonList("*")); // 모든 HTTP 메서드 허용
                        configuration.setAllowCredentials(true); // 자격증명 허용
                        configuration.setAllowedHeaders(Collections.singletonList("*")); // 모든 헤더값 허용
                        configuration.setMaxAge(3600L);

                        configuration.setExposedHeaders(Collections.singletonList("Authorization"));

                        return configuration;
                    }
                })));


        //csrf disable
        http
                .csrf((auth) -> auth.disable());
        //From 로그인 방식 disable
        http
                .formLogin((auth) -> auth.disable());
        //http basic 인증 방식 disable -> 일반적으로 잘 안쓰기에 설정 끄기.
        http
                .httpBasic((auth) -> auth.disable());

        //경로별 인가 작업
        http
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers(
                                "/",
                                "/index.html",
                                "/static/**"
                        ).permitAll()
                        .requestMatchers("/api/user/signup",
                                "/api/login",
                                "/api/users/email-check",
                                "/api/auth/email-verification/code",
                                "/api/auth/email-verification/code/verify",
                                "/api/auth/login",
                                "/api/auth/refresh",
                                "/ws-chat/**", // 웹소켓 핸드셰이크 엔드포인트는 허용
                                "/swagger-ui/**",
                                "/v3/api-docs/**" // swagger-ui 허용
                        ).permitAll()

                        // POST 방식 /api/users는 인증 없이 허용 (회원가입)
                        .requestMatchers(HttpMethod.POST, "/api/users").permitAll()
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        // 나머지 모든 요청은 React 라우팅으로 처리되도록 허용
                        .anyRequest().authenticated()
                );
        http
                .addFilterBefore(new JwtFilter(jwtUtil), LoginFilter.class);
        LoginFilter loginFilter = new LoginFilter(
                authenticationManager(authenticationConfiguration),
                jwtUtil,
                jwtProperties,
                redisService
        );
        loginFilter.setFilterProcessesUrl("/api/auth/login");  // URL 설정

// 설정된 필터를 추가
        http.addFilterAt(loginFilter, UsernamePasswordAuthenticationFilter.class);
        http
                .addFilterBefore(new CustomLogoutFilter(jwtUtil, redisService), LogoutFilter.class);

        //세션 방식을 사용하지 않음. 토큰 방식 사용.
        // 로그인 방식은 세션, 토큰 방식 2가지.
        // JWT를 통한 인증/인가를 위해서 세션을 STATELESS 상태로 설정하는 것이 중요하다.
        http
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }
}
