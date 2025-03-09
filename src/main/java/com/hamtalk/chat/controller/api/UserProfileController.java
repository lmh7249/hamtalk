package com.hamtalk.chat.controller.api;

import com.hamtalk.chat.model.response.MyProfileResponse;
import com.hamtalk.chat.security.CustomUserDetails;
import com.hamtalk.chat.service.UserProfileService;
import com.hamtalk.common.model.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profiles")
@RequiredArgsConstructor
@Tag(name = "UserProfileController", description = "사용자 프로필 관련 API")
public class UserProfileController {
    private final UserProfileService userProfileService;
    //TODO: 나중에 내 프로필 수정, 친구 아닌 사람의 프로필 조회하는 기능 넣기(이메일 검색)
    // TODO: 서비스 레이어에서 예외를 그대로 발생 시키고, 전역 예외 처리를 작성하자.

    @GetMapping("/me")
    @Operation(summary = "내 프로필 조회하기", description = "JWT에서 추출한 로그인 유저 ID로 User, UserProfile Join")
    public ResponseEntity<ApiResponse<MyProfileResponse>> getMyProfile(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(ApiResponse.ok(userProfileService.getMyProfile(customUserDetails.getId())));
    }

}
