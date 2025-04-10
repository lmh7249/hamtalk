package com.hamtalk.chat.pubsub;

import com.hamtalk.chat.model.response.ChatMessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RedisPublisher {
    private final RedisTemplate<String, Object> redisTemplate;

    // topic -> chatRoomId
    public void publish(String topicName, ChatMessageResponse message) {
        redisTemplate.convertAndSend(topicName, message);
    }

}
