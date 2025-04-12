package com.hamtalk.chat.controller.api;

import com.hamtalk.chat.model.request.UserSignupRequest;
import com.hamtalk.chat.model.response.UserProfileByEmailResponse;
import com.hamtalk.chat.model.response.UserProfileByIdResponse;
import com.hamtalk.chat.service.UserService;
import com.hamtalk.common.model.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "UserController", description = "사용자 관련 API")
@Slf4j
public class UserController {
    private final UserService userService;

    @PostMapping
    @Operation(summary = "회원가입", description = "회원가입 성공 시, 해당 유저의 이름 반환")
    public ResponseEntity<ApiResponse<String>> signup(@Valid @RequestBody UserSignupRequest dto) {
        if(!userService.signup(dto)) {
//            return ResponseEntity.status(HttpStatus.CONFLICT).body(ApiResponse.fail("회원가입 실패"));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(dto.getName()));
    }

    // TODO: 추후 api명 restful하게 변경하기. 동작이 포함되어 있어 부적절
    @GetMapping("/email-check")
    @Operation(summary = "이메일 중복 검사", description = "이메일 중복일 경우 에러 메세지 반환, 회원가입이 가능할 경우 true 반환")
    public ResponseEntity<ApiResponse<Boolean>> emailCheck(@RequestParam String email) {
        if (userService.emailCheck(email)) {
//            return ResponseEntity.status(HttpStatus.CONFLICT).body(ApiResponse.fail("이미 사용중인 이메일입니다. 다른 이메일을 사용해주세요."));
        }
        return ResponseEntity.ok(ApiResponse.ok(true));
    }
    // TODO: @GetMapping("/email-check") -> 변경할때 함께 변경해보기.
    @GetMapping
    @Operation(summary = "이메일로 친구 조회", description = "이메일을 입력하면 해당 유저의 프로필 사진과 닉네임을 반환")
    public ResponseEntity<ApiResponse<UserProfileByEmailResponse>> getUserByEmail(@RequestParam String email) {
        log.info("이메일로 친구 조회 요청: {}", email);
        return ResponseEntity.ok(ApiResponse.ok(userService.getUserByEmail(email)));
    }


    @GetMapping("/{id}")
    @Operation(summary = "유저 id값으로 유저 프로필 조회", description = "id 입력 시, 해당 유저의 프로필 사진, 닉네임, 이메일, 상태메시지 반환")
    public ResponseEntity<ApiResponse<UserProfileByIdResponse>> getUserProfileById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(userService.getUserProfileById(id)));
    }


//    유저 정보 조회 (GET /api/users/{id})
//    회원가입 (POST /api/users)
//    회원정보 수정 (PUT /api/users/{id})
//    회원탈퇴 (DELETE /api/users/{id})
}