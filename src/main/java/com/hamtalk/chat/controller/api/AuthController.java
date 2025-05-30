package com.hamtalk.chat.controller.api;

import com.hamtalk.chat.jwt.JWTUtil;
import com.hamtalk.chat.model.request.EmailVerificationCodeRequest;
import com.hamtalk.chat.service.EmailService;
import com.hamtalk.chat.model.request.EmailAuthRequest;
import com.hamtalk.chat.service.ReissueService;
import com.hamtalk.common.model.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Tag(name = "AuthController", description = "인증 관련 API")
@RequestMapping("/api/auth")
public class AuthController {
    private final EmailService emailService;
    private final JWTUtil jwtUtil;
    private final ReissueService reissueService;


    @PostMapping("email-verification/code")
    @Operation(summary = "이메일 인증번호 발송", description = "인증번호(숫자 6자리)를 사용할 이메일로 전송합니다.")
    public ResponseEntity<ApiResponse<Boolean>> sendEmailVerificationCode(@RequestBody EmailAuthRequest dto) {
        emailService.sendEmailVerificationCode(dto);
        return ResponseEntity.ok(ApiResponse.ok(true));
    }

    @PostMapping("/email-verification/code/verify")
    @Operation(summary = "이메일 인증번호 확인", description = "Redis에 저장된 인증번호와 사용자가 입력한 인증번호가 일치하는지 확인합니다.")
    public ResponseEntity<ApiResponse<Boolean>> verifyEmailVerificationCode(@RequestBody EmailVerificationCodeRequest dto) {
        emailService.verifyAuthCode(dto);
        return ResponseEntity.ok(ApiResponse.ok(true));
    }

    @PostMapping("/reissue")
    @Operation(summary = "액세스 토큰 재발급", description = "액세스 토큰 만료 시, 리프레시 토큰을 통해 액세스 토큰과 리프레시 토큰을 재발급 합니다.")
    public ResponseEntity<ApiResponse<Object>> reissue(HttpServletRequest request, HttpServletResponse response) {
        reissueService.reissueTokens(request, response);
        return ResponseEntity.ok(ApiResponse.ok("토큰이 재발급되었습니다."));

    }
}
