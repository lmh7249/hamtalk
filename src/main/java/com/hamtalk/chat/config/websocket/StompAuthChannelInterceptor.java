package com.hamtalk.chat.config.websocket;

import com.hamtalk.chat.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class StompAuthChannelInterceptor implements ChannelInterceptor {

    private final JwtUtil jwtUtil;
    // STOMP가 CONNECT, SUBSCRIBE, SEND, DISCONNECT 될 때 실행.
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        StompCommand command = accessor.getCommand();

        if(command == StompCommand.CONNECT) {
            // 1. WebSocket 연결 요청이 들어오면 JWT 검증 진행
            log.info(" WebSocket CONNECT - JWT 검증 시작");
            String bearerToken = accessor.getFirstNativeHeader("Authorization");
            if(bearerToken == null || !bearerToken.startsWith("Bearer ")) {
                throw new AuthenticationServiceException("Authorization 헤더가 없음 또는 Bearer 형식이 아님");
            }

            try {
                // 2. JWT 검증 및 로그인 유저의 ID 값 가져오기
                String token = bearerToken.substring(7);
                if(jwtUtil.isExpired(token)) {
                    throw new AuthenticationServiceException("JWT 토큰 만료");
                }
                //TODO: 채팅방 구독 검증하는 로직 넣기.
                Long userId = jwtUtil.getUserId(token);  // JWT에서 userId를 추출
                accessor.getSessionAttributes().put("userId", userId);  // 세션에 userId 저장
                log.info("WebSocket CONNECT - User ID: {}", userId);

            } catch (Exception e) {
                log.error(" JWT 검증 실패: {}", e.getMessage());
                throw new AuthenticationServiceException("JWT 검증 실패");
            }
        }
        return message;
    }
}


