package com.hamtalk.chat.controller;

import com.hamtalk.chat.domain.entity.ChatRoomParticipant;
import com.hamtalk.chat.domain.enums.ChatParticipantStatus;
import com.hamtalk.chat.model.request.ChatMessageRequest;
import com.hamtalk.chat.model.request.ChatUserEnterRequest;
import com.hamtalk.chat.model.response.ChatMessageResponse;
import com.hamtalk.chat.model.response.ChatUserStatusResponse;
import com.hamtalk.chat.pubsub.RedisPublisher;
import com.hamtalk.chat.repository.ChatRoomParticipantRepository;
import com.hamtalk.chat.service.ChatMessageService;
import com.hamtalk.chat.service.ChatRoomParticipantService;
import com.hamtalk.chat.service.RedisService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@Tag(name = "ChatWebSocketController", description = "실시간 채팅 관련 API")
public class ChatWebSocketController {
    private final ChatMessageService chatMessageService;
    private final RedisPublisher redisPublisher;
    private final RedisService redisService;
    private final ChatRoomParticipantRepository chatRoomParticipantRepository;
    private final ChatRoomParticipantService chatRoomParticipantService;

    /*  TODO: 웹소켓 + Redis 전송 흐름
     * 1. 유저가 메세지 보냄 -> ChatWebSocketController 도착
     * 2. RedisPublisher -> Redis 채널에 "발행"
     * 3. redisTemplate.convertAndSend() -> Redis에 "새 메세지 있다."고 알림.
     * 4. RedisSubscriber onMessage 메서드가 콜백함수로 동작 -> Redis 메세지를 수신
     * 5. messagingTemplate.convertAndSend -> 코드 동작 시, 웹소켓 구독 중인 브라우저로 전달.
     * */
    @MessageMapping("/chat/{chatRoomId}/sendMessage")
    @Operation(summary = "실시간 메세지 전송", description = "실시간 메세지 전송 + MongoDB 메세지 저장, 두 로직을 실행합니다.")
    public void chatSendMessage(@DestinationVariable Long chatRoomId,
                                ChatMessageRequest chatMessageRequest,
                                SimpMessageHeaderAccessor headerAccessor) {
        log.info("WebSocket/Stomp Message Send");
        Long senderId = (Long) headerAccessor.getSessionAttributes().get("userId");
        log.info("User ID: {}", senderId);

        // 메세지 저장 전, 메세저 보내는 사람이 나간 상태라면 해당 채팅방에 재참여하는 로직.
        chatRoomParticipantService.validateAndRejoinParticipant(chatRoomId, senderId);

        chatRoomParticipantService.rejoinOpponentIfOneOnOne(chatRoomId, senderId);

        ChatMessageResponse chatMessageResponse = chatMessageService.saveChatMessage(senderId, chatRoomId, chatMessageRequest);
        // 1. redis 채팅방 채널에 발행 → 채팅방 열려있으면 실시간 메시지 수신
        redisPublisher.publish("chatRoom:" + chatRoomId, chatMessageResponse);

        List<Long> participantsUserIds = chatRoomParticipantRepository.findUserIdsByChatRoomId(chatRoomId);
        // 2. redis 상대방의 알림 채널에 발행 → 리스트에서 실시간 반영 가능
        participantsUserIds.stream()
                .filter(receiverId -> !receiverId.equals(senderId))
                .forEach(receiverId -> {
                    log.info("받는사람: {}", receiverId);
                    redisPublisher.publish("userNotify:" + receiverId, chatMessageResponse);
                });
    }

    // 2. 채팅방 입장
    @MessageMapping("/chat/{chatRoomId}/enter")
    @Operation(summary = "실시간 채팅방 입장", description = "실시간으로 채팅방에 입장한 유저의 id, nickname을 전송합니다.")
    public void enterChatRoom(@DestinationVariable Long chatRoomId,
                              @Payload ChatUserEnterRequest request,
                              SimpMessageHeaderAccessor headerAccessor) {
        // 입장한 유저 정보 Redis에 저장 + 브로드캐스팅
        Long userId = (Long) headerAccessor.getSessionAttributes().get("userId");
        String nickname = request.getNickname();
        // 입장한 유저의 id와, nickname을 redis에 저장 -> 현재 채팅방 접속자 리스트를 뽑기 위해 필요.
        LocalDateTime now = LocalDateTime.now();
//        redisService.subscribeChatRoom(chatRoomId);
        redisService.saveUserToChatRoom(chatRoomId, userId, nickname, now);
        ChatUserStatusResponse enterMessage = new ChatUserStatusResponse(chatRoomId, userId, nickname, ChatParticipantStatus.ENTERED, now);
        redisPublisher.publish("chatRoom:" + chatRoomId, enterMessage);
    }

    // 3. 채팅방 퇴장
    @MessageMapping("/chat/{chatRoomId}/exit")
    public void exitChatRoom(@DestinationVariable Long chatRoomId,
                             @Payload ChatUserEnterRequest request,
                             SimpMessageHeaderAccessor headerAccessor) {
        // 퇴장한 유저 정보 Redis에서 제거 + 브로드캐스팅
        Long userId = (Long) headerAccessor.getSessionAttributes().get("userId");
        String nickname = request.getNickname();
        // 삭제
        LocalDateTime now = LocalDateTime.now();
        redisService.deleteUserToChatRoom(chatRoomId, userId);
        ChatUserStatusResponse enterMessage = new ChatUserStatusResponse(chatRoomId, userId, nickname, ChatParticipantStatus.EXITED, now);
        redisPublisher.publish("chatRoom:" + chatRoomId, enterMessage);
    }


}
