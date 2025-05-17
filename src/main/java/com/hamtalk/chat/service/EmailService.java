package com.hamtalk.chat.service;

import com.hamtalk.chat.model.request.EmailVerificationCodeRequest;
import com.hamtalk.common.constant.EmailConstants;
import com.hamtalk.chat.model.request.EmailAuthRequest;
import com.hamtalk.common.exeption.custom.EmailSendFailedException;
import com.hamtalk.common.exeption.custom.InvalidEmailFormatException;
import com.hamtalk.common.exeption.custom.InvalidEmailVerificationCodeException;
import com.hamtalk.common.exeption.custom.RedisOperationException;
import com.hamtalk.common.util.EmailValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.concurrent.ThreadLocalRandom;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender javaMailSender;
    private final RedisService redisService;

    public void sendEmailVerificationCode(EmailAuthRequest request) {
        String email = request.getEmail();
        if(!EmailValidator.isValidEmailFormat(email)) {
            throw new InvalidEmailFormatException();
        }
        String authCode = createAuthCode();
        // 레디스에 authCode 저장, TTL 5분
        try {
            redisService.saveAuthCode(email, authCode);
        } catch (Exception e) {
            log.error("Redis 저장 실패: {}", email, e);
            throw new RedisOperationException();
        }

        try {
            SimpleMailMessage emailForm = createAuthEmailForm(email, authCode);
            javaMailSender.send(emailForm);
        } catch (Exception e) {
            log.error("이메일 전송 실패: {}", email, e);
            throw new EmailSendFailedException();
        }
    }

    public void verifyAuthCode(EmailVerificationCodeRequest request) {
        boolean result = redisService.verifyAuthCode(request.getEmail(), request.getVerificationCode());
        if (!result) {
            throw new InvalidEmailVerificationCodeException();
        }
    }

    private SimpleMailMessage createAuthEmailForm(String email, String authCode) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject(EmailConstants.AUTH_EMAIL_TITLE);
        message.setText(String.format(EmailConstants.AUTH_EMAIL_TEMPLATE, authCode));
        return message;
    }

    // 인증번호 6자리 생성
    private String createAuthCode() {
        return String.valueOf(ThreadLocalRandom.current().nextInt(100000, 1000000));
    }

}
