package com.hamtalk.chat.controller.api;

import com.hamtalk.chat.model.request.ChatMessageRequest;
import com.hamtalk.chat.model.response.ChatMessageResponse;
import com.hamtalk.chat.model.response.ChatRoomMessagesResponse;
import com.hamtalk.chat.security.CustomUserDetails;
import com.hamtalk.chat.service.ChatMessageService;
import com.hamtalk.common.model.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/chat")
@Tag(name = "ChatMessageController", description = "채팅 메세지 관련 API")
@RequiredArgsConstructor
public class ChatMessageController {
    private final ChatMessageService chatMessageService;

    // TODO: 메세지 조회 시, 무한 스크롤로 구현 + 가장 최신 메세지가 가장 나중에 오게.
    @GetMapping("/rooms/{chatRoomId}")
    @Operation(summary = "메세지 조회", description = "채팅방 id의 메세지를 조회합니다.")
    public ResponseEntity<ApiResponse<ChatRoomMessagesResponse>> getMessageList(@AuthenticationPrincipal CustomUserDetails customUserDetails, @PathVariable Long chatRoomId) {
        ChatRoomMessagesResponse chatMessageList = chatMessageService.getChatMessageList(customUserDetails.getId(), chatRoomId);
        return ResponseEntity.ok(ApiResponse.ok(chatMessageList));
    }

    @GetMapping("/rooms/{chatRoomId}/messages/unread-count")
    @Operation(summary = "읽지 않은 메세지 수 조회", description = "로그인 한 유저의 읽지 않은 메세지 수를 반환합니다.")
    public ResponseEntity<ApiResponse<Long>> getUnreadMessageCount(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @PathVariable Long chatRoomId
    ) {
        long unreadCount = chatMessageService.countUnreadMessages(customUserDetails.getId(), chatRoomId);
        return ResponseEntity.ok(ApiResponse.ok(unreadCount));
    }


}
