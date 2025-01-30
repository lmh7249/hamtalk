package com.hamtalk.chat.controller.api;

import com.hamtalk.chat.model.request.UserSignupRequest;
import com.hamtalk.chat.service.UserService;
import com.hamtalk.common.model.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "UserController", description = "사용자 관련 API")
public class UserController {
    private final UserService userService;

    @PostMapping
    @Operation(summary = "회원가입", description = "회원가입 성공 시, 해당 유저의 이름 반환")
    public ResponseEntity<ApiResponse<String>> signup(@Valid @RequestBody UserSignupRequest dto) {
        if(!userService.signup(dto)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(ApiResponse.fail("회원가입 실패"));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(dto.getName()));
    }

    @GetMapping("/email-check")
    @Operation(summary = "이메일 중복 검사", description = "이메일 중복일 경우 에러 메세지 반환, 회원가입이 가능할 경우 true 반환")
    public ResponseEntity<ApiResponse<Boolean>> emailCheck(@RequestParam String email) {
        if (userService.emailCheck(email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(ApiResponse.fail("이미 사용중인 이메일입니다. 다른 이메일을 사용해주세요."));
        }
        return ResponseEntity.ok(ApiResponse.ok(true));
    }
}