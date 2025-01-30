package com.hamtalk.chat.service;

import com.hamtalk.common.constant.EmailConstants;
import com.hamtalk.common.model.request.EmailAuthRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.ThreadLocalRandom;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender javaMailSender;
    private final RedisService redisService;

    @Transactional
    public void sendAuthEmail(EmailAuthRequest request) {
        String email = request.getEmail();
        String authCode = createAuthCode();

        SimpleMailMessage emailForm = createAuthEmailForm(email, authCode);
        javaMailSender.send(emailForm);

        // 레디스에 authCode를 저장, TTL 3분
        redisService.saveAuthCode(email, authCode);
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
