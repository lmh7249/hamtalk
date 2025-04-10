package com.hamtalk.chat.controller;

import com.hamtalk.chat.model.request.ChatMessageRequest;
import com.hamtalk.chat.model.response.ChatMessageResponse;
import com.hamtalk.chat.pubsub.RedisPublisher;
import com.hamtalk.chat.service.ChatMessageService;
import com.hamtalk.chat.service.RedisService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@Tag(name = "ChatWebSocketController", description = "실시간 채팅 관련 API")
public class ChatWebSocketController {
    private final ChatMessageService chatMessageService;
    private final RedisPublisher redisPublisher;
    private final RedisService redisService;

    @MessageMapping("/chat/{chatRoomId}/sendMessage")
    @Operation(summary = "실시간 메세지 전송", description = "실시간 메세지 전송 + MongoDB 메세지 저장, 두 로직을 실행합니다." )
    public void chatSendMessage(@DestinationVariable Long chatRoomId,
                                ChatMessageRequest chatMessageRequest,
                                SimpMessageHeaderAccessor headerAccessor) {
        log.info("WebSocket/Stomp Message Send");
        Long userId = (Long) headerAccessor.getSessionAttributes().get("userId");
        log.info("User ID: {}", userId);
        ChatMessageResponse chatMessageResponse = chatMessageService.saveChatMessage(userId, chatRoomId, chatMessageRequest);
        // 채팅방 Redis 채널 구독 (최초 메시지 전송 시)
        redisService.subscribe(chatRoomId);
        // Redis 발행
        redisPublisher.publish("chatRoom:" +chatRoomId, chatMessageResponse);
    }
}
