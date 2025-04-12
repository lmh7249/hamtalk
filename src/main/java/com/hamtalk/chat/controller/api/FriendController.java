package com.hamtalk.chat.controller.api;

import com.hamtalk.chat.model.response.FriendResponse;
import com.hamtalk.chat.security.CustomUserDetails;
import com.hamtalk.chat.service.FriendService;
import com.hamtalk.common.model.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/friends")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "FriendController", description = "친구 관련 API")
public class FriendController {
    private final FriendService friendService;
//  TODO: @AuthenticationPrincipal == SecurityContextHolder.getContext().getAuthentication().getPrincipal());

    @GetMapping
    @Operation(summary = "친구 목록 조회", description = "friendStatusIds 값에 따른 친구 목록 조회(1,2: 내 친구, 3: 삭제한 친구, 4: 차단한 친구")
    public ResponseEntity<ApiResponse<List<FriendResponse>>> getAllFriends(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        log.info("커스텀유저디테일 객체 생성 완료? : {}", customUserDetails.toString());
        log.info("유저 id : {}", customUserDetails.getId());
        log.info("유저 이메일 : {}", customUserDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok(friendService.getAllFriends(customUserDetails.getId())));
    }

    @PostMapping("/{toUserId}")
    @Operation(summary = "친구 추가", description = "toUserId를 가진 사용자를 친구로 추가합니다.")
    public ResponseEntity<ApiResponse<String>> addFriend(
            @AuthenticationPrincipal CustomUserDetails customUserDetails, @PathVariable Long toUserId) {
        log.info("친구 추가 요청 - from: {}, to: {}", customUserDetails.getId(), toUserId);
        return ResponseEntity.ok(ApiResponse.ok(friendService.addFriend(customUserDetails.getId(), toUserId)));
    }

    //TODO: customUserDetails.getId() -> NullPointerException 예외 처리 필요
    @GetMapping("/{toUserId}")
    @Operation(summary = "단일 친구 조회", description = "toUserId를 가진 사용자와 로그인 사용자가 친구인지 확인합니다.")
    public ResponseEntity<ApiResponse<Boolean>> checkFriendship(@AuthenticationPrincipal CustomUserDetails customUserDetails, @PathVariable Long toUserId) {
        return ResponseEntity.ok(ApiResponse.ok(friendService.isFriend(customUserDetails.getId(), toUserId)));
    };
}
