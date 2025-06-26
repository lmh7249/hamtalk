package com.hamtalk.chat.pubsub;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RedisPublisher {
    private final RedisTemplate<String, Object> redisTemplate;

    // topic -> chatRoomId
    public <T> void publish(String topicName, T message) {
        // 레디스에서 convertAndSend -> 서버 간 메세지를 전달하는 용도
        redisTemplate.convertAndSend(topicName, message);
    }

}
