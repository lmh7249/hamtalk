package com.hamtalk.chat.pubsub;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hamtalk.chat.model.response.ChatMessageResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class RedisSubscriber implements MessageListener {
    private final ObjectMapper objectMapper;
    private final SimpMessagingTemplate messagingTemplate;


    @Override
    public void onMessage(Message message, byte[] pattern) {
        log.info("Received Redis message!! : {}", message);
        String body = new String(message.getBody());
        try {
            ChatMessageResponse chatMessage = objectMapper.readValue(body, ChatMessageResponse.class);

            // 채팅방 ID 기준으로 WebSocket 브로드캐스트
            String destination = "/topic/chat/" + chatMessage.getChatRoomId();
            // WebSocket 브로드캐스트
            messagingTemplate.convertAndSend(destination, chatMessage);

        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

    }
}
