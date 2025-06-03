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
            // Redis 채널 이름 추출
            String channel = new String(message.getChannel());
            log.info("🔥 Redis 채널 이름: {}", channel); // userNotify:23 이 되어야 함
            log.info("📦 Redis 메시지 본문: {}", body);

            if (channel.startsWith("chatRoom:")) {
                // 채팅방 실시간 메시지
                String destination = "/topic/chat/" + chatMessage.getChatRoomId();
                log.info("📡 채팅방 실시간 메세지 전송: {}", destination);
                messagingTemplate.convertAndSend(destination, chatMessage);
            } else if (channel.startsWith("userNotify:")) {
                // 유저 전역 알림 (채팅방 리스트 갱신 등)
                String destination = "/topic/user/" + chatMessage.getReceiverId() + "/chat-notifications";
                log.info("📡 유저 전역 알림 전송: {}", destination);
                messagingTemplate.convertAndSend(destination, chatMessage);
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
