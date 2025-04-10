package com.hamtalk.chat.service;

import com.hamtalk.chat.config.jwt.JwtProperties;
import com.hamtalk.common.constant.EmailConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
@RequiredArgsConstructor
public class RedisService {
    private final RedisTemplate<String, String> redisTemplate;
    private final JwtProperties jwtProperties;
    private final RedisMessageListenerContainer container;
    private final MessageListenerAdapter listenerAdapter;
    private final Set<String> subscribedChannels = ConcurrentHashMap.newKeySet();
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

    public void subscribe(Long chatRoomId) {
        String topicName = "chatRoom:" + chatRoomId;
        // 중복 구독 방지
        if(!subscribedChannels.contains(topicName)) {
            container.addMessageListener(listenerAdapter, new ChannelTopic(topicName));
            subscribedChannels.add(topicName);
        }

    }



}
