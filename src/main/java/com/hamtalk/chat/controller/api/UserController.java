package com.hamtalk.chat.controller.api;

import com.hamtalk.chat.model.request.UserSignupRequest;
import com.hamtalk.chat.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name ="UserController", description = "사용자 관련 API")
public class UserController {
    private final UserService userService;

    @PostMapping
    @Operation(summary = "회원가입", description = "새로운 사용자를 등록합니다.")
    public ResponseEntity<String> signup(UserSignupRequest dto) {
        String message = userService.signup(dto);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/email-check")
    @Operation(summary = "이메일 중복 검사", description = "이메일 중복일 경우 false, 회원가입이 가능할 경우 true 반환")
    public ResponseEntity<Boolean> emailCheck(@RequestParam String email) {
        boolean isDuplicated = userService.emailCheck(email);
        if(isDuplicated) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(false);
        }
        return ResponseEntity.ok(true);
    }

}
