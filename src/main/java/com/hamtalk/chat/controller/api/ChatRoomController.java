package com.hamtalk.chat.controller.api;

import com.hamtalk.chat.model.request.ParticipantUserIdsRequest;
import com.hamtalk.chat.model.response.*;
import com.hamtalk.chat.security.CustomUserDetails;
import com.hamtalk.chat.service.ChatReadStatusService;
import com.hamtalk.chat.service.ChatRoomService;
import com.hamtalk.chat.service.RedisService;
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
    private final ChatReadStatusService chatReadStatusService;
    private final RedisService redisService;

    @PostMapping
    @Operation(summary = "채팅방 생성", description = "첫 메세지를 보낸 유저의 id 값으로 채팅방 생성")
    public ResponseEntity<ApiResponse<ChatRoomCreateResponse>> createChatRoom(@AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestBody ParticipantUserIdsRequest request) {
        return ResponseEntity.ok(ApiResponse.ok(chatRoomService.createChatRoom(customUserDetails.getId(), request.getUserIds())));
    }

    @GetMapping
    @Operation(summary = "채팅방 목록 조회", description = "로그인 한 유저가 속한 모든 채팅방을 조회합니다.")
    public ResponseEntity<ApiResponse<List<ChatRoomListResponse>>> getChatRoomList(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(ApiResponse.ok(chatRoomService.getChatRoomsWithLastMessage(customUserDetails.getId())));
    }

    @GetMapping("/direct/{friendId}")
    @Operation(summary = "1:1 채팅방 조회", description = "로그인 유저 id와 친구 id 값으로 1:1 채팅방이 존재하는지 조회, 없을 경우 data 값 x")
    public ResponseEntity<ApiResponse<DirectChatRoomResponse>> findDirectChatRoom(@AuthenticationPrincipal CustomUserDetails customUserDetails, @PathVariable Long friendId) {
        return ResponseEntity.ok(ApiResponse.ok(chatRoomService.findDirectChatRoom(customUserDetails.getId(), friendId)));
    }

    @PostMapping("/enter/{chatRoomId}")
    @Operation(summary = "채팅방 접속 시간 기록", description = "로그인 유저의 특정 채팅방 접속 시간을 저장합니다.")
    public ResponseEntity<Void> enterChatRoom(@AuthenticationPrincipal CustomUserDetails customUserDetails, @PathVariable Long chatRoomId) {
        chatReadStatusService.updateLastReadTime(customUserDetails.getId(), chatRoomId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{chatRoomId}/participants")
    @Operation(summary = "채팅방 접속 유저 목록 조회", description = "Redis에서 현재 접속 중인 유저 목록을 조회합니다.")
    public ResponseEntity<ApiResponse<List<OnlineChatParticipantResponse>>> getChatParticipants(@PathVariable Long chatRoomId) {
        return ResponseEntity.ok(ApiResponse.ok(redisService.getOnlineParticipants(chatRoomId)));
    }

    @GetMapping("/{chatRoomId}/last-read")
    @Operation(summary = "채팅방 마지막 접속 시간 조회", description = "mongoDB chat_read_status에서 채팅방 별 채팅방 마지막 조회 시간을 가져옵니다.")
    public ResponseEntity<ApiResponse<List<ChatRoomLastReadAtResponse>>> getLastReadAtList(@PathVariable Long chatRoomId) {
        return ResponseEntity.ok(ApiResponse.ok(chatReadStatusService.getLastReadAtList(chatRoomId)));
    }

    @PostMapping("/verify")
    @Operation(summary = "채팅방 존재 여부 확인", description = "참여자들로 구성된 채팅방의 존재 여부를 확인하고, 없으면 생성 준비 정보를 반환합니다.")
    public ResponseEntity<ApiResponse<ChatRoomVerifyResponse>> verifyChatRoom(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestBody ParticipantUserIdsRequest request){
        return ResponseEntity.ok(ApiResponse.ok(chatRoomService.verifyChatRoom(customUserDetails.getId(), request.getUserIds())));
    }

    @DeleteMapping("/{chatRoomId}/participants/me")
    @Operation(summary = "특정 채팅방 나가기", description = "현재 로그인 한 유저가 특정 채팅방을 나갑니다")
    ResponseEntity<ApiResponse<String>> leaveChatRoom(@AuthenticationPrincipal CustomUserDetails customUserDetails, @PathVariable Long chatRoomId) {
        return ResponseEntity.ok(ApiResponse.ok(chatRoomService.leaveChatRoom(customUserDetails.getId(), chatRoomId)));
    }


        //    @GetMapping("/{chatRoomId}")
//    @Operation(summary = "특정 채팅방 조회", description = "특정 채팅방을 조회합니다.")
//    public ResponseEntity<ApiResponse<>> getChatRoomById() {
//        return null;
//    }

}
