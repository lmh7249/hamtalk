package com.hamtalk.chat.controller.api;

import com.hamtalk.chat.service.EmailService;
import com.hamtalk.common.model.request.EmailAuthRequest;
import com.hamtalk.common.model.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final EmailService emailService;


    @PostMapping("/email-verification")
    @Operation(summary = "이메일 인증번호 발송", description = "인증번호(숫자 6자리)를 사용할 이메일로 전송합니다.")
    public ResponseEntity<ApiResponse<Boolean>> sendEmail(@RequestBody EmailAuthRequest dto) {
        emailService.sendAuthEmail(dto);
        return ResponseEntity.ok(ApiResponse.ok(true));
    }


//    @PostMapping("/login")
//    public ResponseEntity<String> login() {
//
//    }






}
