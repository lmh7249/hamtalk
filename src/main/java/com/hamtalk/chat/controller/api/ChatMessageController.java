package com.hamtalk.chat.controller.api;

import com.hamtalk.chat.model.request.ChatMessageRequest;
import com.hamtalk.chat.service.ChatMessageService;
import com.hamtalk.common.model.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatMessageController {
    private final ChatMessageService chatMessageService;

    //TODO: 몽고 DB 테스트 api
    @PostMapping("/send")
    public ResponseEntity<ApiResponse<Boolean>> sendMessage(@RequestBody ChatMessageRequest chatMessageRequest) {
        return ResponseEntity.ok(ApiResponse.ok(chatMessageService.saveChatMessage(chatMessageRequest)));
    }


}
