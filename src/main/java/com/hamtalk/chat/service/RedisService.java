package com.hamtalk.chat.service;

import com.hamtalk.chat.config.jwt.JwtProperties;
import com.hamtalk.common.constant.EmailConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@Slf4j
@RequiredArgsConstructor
public class RedisService {
    private final RedisTemplate<String, String> redisTemplate;
    private final JwtProperties jwtProperties;
    // Hash 형식으로 값 저장
    // 추후 30분 이내 호출 5회 미만 설정하기
    public void saveAuthCode(String email, String authCode) {
        String key = "emailAuth: " + email;
        redisTemplate.opsForHash().put(key, "code", authCode);
        redisTemplate.opsForHash().put(key, "createdAt", String.valueOf(System.currentTimeMillis()));
        redisTemplate.expire(key, EmailConstants.AUTH_CODE_EXPIRE_TIME, TimeUnit.SECONDS);
    }

    public boolean verifyAuthCode(String email, String inputCode) {
        String savedCode = getAuthCode(email);
        return savedCode != null && savedCode.equals(inputCode);
    }

    private String getAuthCode(String email) {
        String key = "emailAuth: " + email;
        return (String) redisTemplate.opsForHash().get(key, "code");
    }

    public void saveRefreshToken(String email, String refreshToken) {
        String key = "auth:refresh-token:" + email;
        redisTemplate.opsForValue().set(key, refreshToken, jwtProperties.getRefreshTtl(), TimeUnit.MILLISECONDS);
    }

    public String getRefreshToken(String email) {
        String key = "auth:refresh-token:" + email;
        return redisTemplate.opsForValue().get(key);
    }

    public void deleteByRefresh(String email) {
        String key = "auth:refresh-token:" + email;
        redisTemplate.delete(key);
    }



}
