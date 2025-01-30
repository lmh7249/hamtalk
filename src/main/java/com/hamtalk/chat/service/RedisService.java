package com.hamtalk.chat.service;

import com.hamtalk.common.constant.EmailConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class RedisService {
    private final RedisTemplate<String, String> redisTemplate;

    public void saveAuthCode(String email, String authCode) {
        redisTemplate.opsForValue().set(email, authCode, EmailConstants.AUTH_CODE_EXPIRE_TIME, TimeUnit.SECONDS);
    }
}
