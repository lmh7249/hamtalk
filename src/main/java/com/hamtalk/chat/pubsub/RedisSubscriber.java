package com.hamtalk.chat.pubsub;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hamtalk.chat.model.response.ChatMessageResponse;
import com.hamtalk.chat.model.response.ChatUserStatusResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@RequiredArgsConstructor
@Slf4j
public class RedisSubscriber implements MessageListener {
    private final ObjectMapper objectMapper;
    private final SimpMessagingTemplate messagingTemplate;

    // Redis에서 메시지가 오면 아래 코드가 실행됨. 예: 누군가 Redis로 "chatRoom:4"에 메시지 발행하면 이 코드 실행됨
    // 웹소켓을 통해 프론트에 보내는 역할
    @Override
    public void onMessage(Message message, byte[] pattern) {
        log.info("Received Redis message!! : {}", message);
        String body = new String(message.getBody());
        String channel = new String(message.getChannel());
        log.info("🔥 Redis 채널 이름: {}", channel); // userNotify:23 이 되어야 함
        log.info("📦 Redis 메시지 본문: {}", body);

        try {
            // Redis 채널 이름 추출
            if (channel.startsWith("chatRoom:")) {
                JsonNode jsonNode = objectMapper.readTree(body);

                if (jsonNode.has("status")) {
                    // ChatUserStatusResponse 처리 (status 필드가 있으면)
                    ChatUserStatusResponse statusMessage = objectMapper.readValue(body, ChatUserStatusResponse.class);
                    String destination = "/topic/chat/" + statusMessage.getChatRoomId();
                    log.info("📡 유저 입퇴장 메세지 전송: {}", destination);
                    messagingTemplate.convertAndSend(destination, statusMessage);

                } else {
                    // ChatMessageResponse 처리 (일반 채팅 메시지)
                    ChatMessageResponse chatMessage = objectMapper.readValue(body, ChatMessageResponse.class);
                    String destination = "/topic/chat/" + chatMessage.getChatRoomId();
                    log.info("📡 채팅방 실시간 메세지 전송: {}", destination);
                    messagingTemplate.convertAndSend(destination, chatMessage);
                }
            } else if (channel.startsWith("userNotify:")) {
                ChatMessageResponse chatMessage = objectMapper.readValue(body, ChatMessageResponse.class);
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
