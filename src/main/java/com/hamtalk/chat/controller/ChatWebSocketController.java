package com.hamtalk.chat.controller;

import com.hamtalk.chat.model.request.ChatMessageRequest;
import com.hamtalk.chat.model.response.ChatMessageResponse;
import com.hamtalk.chat.security.CustomUserDetails;
import com.hamtalk.chat.service.ChatMessageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@Tag(name = "ChatWebSocketController", description = "실시간 채팅 관련 API")
public class ChatWebSocketController {
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatMessageService chatMessageService;

    @MessageMapping("/chat/{chatRoomId}/sendMessage")
    @Operation(summary = "실시간 메세지 전송", description = "실시간 메세지 전송 + MongoDB 메세지 저장, 두 로직을 실행합니다." )
    public void chatSendMessage(@DestinationVariable Long chatRoomId,
                                ChatMessageRequest chatMessageRequest,
                                SimpMessageHeaderAccessor headerAccessor) {
        log.info("WebSocket/Stomp Message Send");
        Long userId = (Long) headerAccessor.getSessionAttributes().get("userId");
        log.info("User ID: {}", userId);
        ChatMessageResponse chatMessageResponse = chatMessageService.saveChatMessage(userId, chatRoomId, chatMessageRequest);
        messagingTemplate.convertAndSend("/topic/chat/"+ chatRoomId, chatMessageResponse);
    }
}
