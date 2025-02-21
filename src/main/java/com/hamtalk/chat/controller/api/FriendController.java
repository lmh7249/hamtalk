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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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
    public ResponseEntity<ApiResponse<List<FriendResponse>>> getFriendList(@AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestParam(value = "friendStatusIds", required = true) List<Integer> friendStatusIds) {
        log.info("커스텀유저디테일 객체 생성 완료? : {}", customUserDetails.toString());
        log.info("유저 id : {}", customUserDetails.getId());
        log.info("유저 이메일 : {}", customUserDetails.getUsername());
        log.info("상태값은? : {}", friendStatusIds);
        return ResponseEntity.ok(friendService.getFriendList(customUserDetails.getId(), friendStatusIds));
    }
}
