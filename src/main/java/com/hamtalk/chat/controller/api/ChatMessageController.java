package com.hamtalk.chat.controller.api;

import com.hamtalk.chat.model.request.ChatMessageRequest;
import com.hamtalk.chat.security.CustomUserDetails;
import com.hamtalk.chat.service.ChatMessageService;
import com.hamtalk.common.model.response.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/chat")
@Tag(name = "ChatMessageController", description = "채팅 메세지 관련 API")
@RequiredArgsConstructor
public class ChatMessageController {
    private final ChatMessageService chatMessageService;

    //TODO: 몽고 DB 테스트 api
    @PostMapping("/rooms/{chatRoomId}/messages")
    public ResponseEntity<ApiResponse<Boolean>> sendMessage(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                                            @PathVariable Long chatRoomId,
                                                            @RequestBody ChatMessageRequest chatMessageRequest) {
        return ResponseEntity.ok(ApiResponse.ok(chatMessageService.saveChatMessage(customUserDetails.getId(), chatRoomId, chatMessageRequest)));
    }


}
