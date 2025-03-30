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

//    //TODO: 데이터 삽입, 추후 웹소켓 적용하면 사용 x
//    @PostMapping("/rooms/{chatRoomId}/messages")
//    @Operation(summary = "메세지 전송", description = "채팅방 id를 활용해, 메세지를 전송합니다.")
//    public ResponseEntity<ApiResponse<ChatMessageResponse>> sendMessage(@AuthenticationPrincipal CustomUserDetails customUserDetails,
//                                                                        @PathVariable Long chatRoomId,
//                                                                        @RequestBody ChatMessageRequest chatMessageRequest) {
//
//        return ResponseEntity.ok(ApiResponse.ok(chatMessageService.saveChatMessage(customUserDetails.getId(), chatRoomId, chatMessageRequest)));
//    }

    // TODO: 메세지 조회 시, 무한 스크롤로 구현 + 가장 최신 메세지가 가장 나중에 오게.
    @GetMapping("/rooms/{chatRoomId}")
    @Operation(summary = "메세지 조회", description = "채팅방 id의 메세지를 조회합니다.")
    public ResponseEntity<ApiResponse<ChatRoomMessagesResponse>> getMessageList(@AuthenticationPrincipal CustomUserDetails customUserDetails, @PathVariable Long chatRoomId) {
        ChatRoomMessagesResponse chatMessageList = chatMessageService.getChatMessageList(customUserDetails.getId(), chatRoomId);
        return ResponseEntity.ok(ApiResponse.ok(chatMessageList));
    }

}
