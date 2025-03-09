package com.hamtalk.chat.controller.api;

import com.hamtalk.chat.model.request.ParticipantUserIdsRequest;
import com.hamtalk.chat.security.CustomUserDetails;
import com.hamtalk.chat.service.ChatRoomService;
import com.hamtalk.common.model.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat-rooms")
public class ChatRoomController {
    private final ChatRoomService chatRoomService;

    @PostMapping
    @Operation(summary = "채팅방 생성", description = "첫 메세지를 보낸 유저의 id 값으로 채팅방 생성")
    public ResponseEntity<ApiResponse<Long>> createChatRoom(@AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestBody ParticipantUserIdsRequest request) {
        return ResponseEntity.ok(ApiResponse.ok(chatRoomService.createChatRoom(customUserDetails.getId(), request.getUserIds())));
    }

//    @GetMapping
//    @Operation(summary = "채팅방 목록 조회", description = "로그인 한 유저가 속한 모든 채팅방을 조회합니다.")
//    public ResponseEntity<ApiResponse<>> getChatRoomList() {
//        return null;
//    }

    //    @GetMapping("/{id}")
//    @Operation(summary = "특정 채팅방 조회", description = "특정 채팅방을 조회합니다.")
//    public ResponseEntity<ApiResponse<>> getChatRoomById() {
//        return null;
//    }
//    @DeleteMapping("/{id}")
//    @Operation(summary = "채팅방 삭제", description = "특정 채팅방을 삭제합니다.")
//    public ResponseEntity<ApiResponse<>> getChatRoomList() {
//        return null;
//    }


}
