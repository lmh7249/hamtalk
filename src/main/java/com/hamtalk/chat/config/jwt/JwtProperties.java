package com.hamtalk.chat.config.jwt;

import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "spring.jwt")
@Slf4j
public class JwtProperties {
    private String secret;
    private long accessTtl;    // JWT 토큰용 (밀리초)
    private long refreshTtl;   // JWT 토큰용 (밀리초)
}
