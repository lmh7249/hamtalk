package com.hamtalk.chat.config.cors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {

        corsRegistry.addMapping("/**")
                .allowedOrigins(
                        "https://hamtalk.shop",
                        "https://www.hamtalk.shop",
                        "http://localhost:3000"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .exposedHeaders("Authorization")
                .allowedHeaders("*")  // 모든 헤더 허용
                .allowCredentials(true);  // 쿠키 포함 요청 허용
    }
}