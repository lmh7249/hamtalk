package com.hamtalk.chat.controller.api;

import com.hamtalk.chat.model.request.StatusMessageUpdateRequest;
import com.hamtalk.chat.model.request.UpdateProfileRequest;
import com.hamtalk.chat.model.response.MyProfileResponse;
import com.hamtalk.chat.model.response.UpdateProfileResponse;
import com.hamtalk.chat.security.CustomUserDetails;
import com.hamtalk.chat.service.UserProfileService;
import com.hamtalk.common.model.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/profiles")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "UserProfileController", description = "사용자 프로필 관련 API")
public class UserProfileController {
    private final UserProfileService userProfileService;

    @GetMapping("/me")
    @Operation(summary = "내 프로필 조회하기", description = "JWT에서 추출한 로그인 유저 ID로 User, UserProfile Join")
    public ResponseEntity<ApiResponse<MyProfileResponse>> getMyProfile(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(ApiResponse.ok(userProfileService.getMyProfile(customUserDetails.getId())));
    }

    @PatchMapping("/me")
    @Operation(summary = "내 프로필 데이터 수정하기", description = "닉네임, 상태메세지, 프로필 이미지를 수정합니다. 수정된 사용자 정보를 반환합니다")
    public ResponseEntity<ApiResponse<UpdateProfileResponse>> updateMyProfile(@AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestBody UpdateProfileRequest request) {
        return ResponseEntity.ok(ApiResponse.ok(userProfileService.updateMyProfile(customUserDetails.getId(), request)));
    }

    @PatchMapping("/me/image")
    @Operation(summary = "내 프로필 이미지 수정하기", description = "프로필 이미지를 AWS S3에 보관하고 해당 이미지의 URL을 반환합니다.")
    //TODO: multipart/form-data 방식은 requestParam으로 받음.
    public ResponseEntity<ApiResponse<String>> updateMyProfileImage(@RequestParam("image") MultipartFile image,
                                                                    @AuthenticationPrincipal CustomUserDetails customUserDetails) {

        log.info("이미지 뭐가 들어갈까? : {}", image);
        String imageUrl = userProfileService.updateMyProfileImage(customUserDetails.getId(), image);
        log.info(imageUrl);
        return ResponseEntity.ok(ApiResponse.ok(imageUrl));
    }

    @PatchMapping("/me/status-message")
    @Operation(summary =  "내 상태메세지 수정하기", description = "내 상태메세지를 변경합니다.")
    public ResponseEntity<ApiResponse<String>> updateMyStatusMessage(@AuthenticationPrincipal CustomUserDetails customUserDetails, @Valid @RequestBody StatusMessageUpdateRequest request) {
        String result = userProfileService.updateMyStatusMessage(customUserDetails.getId(), request.getStatusMessage());
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

}
