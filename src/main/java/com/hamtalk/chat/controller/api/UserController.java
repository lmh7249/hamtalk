package com.hamtalk.chat.controller.api;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hamtalk.chat.model.request.UserSignupRequest;
import com.hamtalk.chat.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    @Operation(summary = "회원가입", description = "새로운 사용자를 등록합니다.")
    public ResponseEntity<String> signup(UserSignupRequest dto) {
        String message = userService.signup(dto);
        return ResponseEntity.ok(message);
    }
}
