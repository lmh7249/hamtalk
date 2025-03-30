package com.hamtalk.chat.config.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker // WebSocket, STOMP 사용
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final StompAuthChannelInterceptor stompAuthChannelInterceptor;

    // 엔드포인트를 "/ws"로 설정 -> /ws로 도착하는 요청은 stomp 통신으로 인식함.
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-chat") // http(=ws)://localhost:8080/ws-chat -> 클라이언트가 웹소켓 연결할 주소
                .setAllowedOriginPatterns("*") // cors 허용
                .withSockJS(); // SockJS 지원 : 웹소켓을 지원하지 않는 브라우저에서도 동작하도록.
    }

    // sub, pub 설정 -> /sub 경로는 구독(브로커에게), /pub 은 메세지 발행(서버)
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 메세지를 받을 엔드포인트(prefix)
        registry.enableSimpleBroker("/topic"); // 메세지 받을 경로(구독), 서버 -> 클라이언트
        // 예: convertAndSend("/topic/chat/1", message) -> 구독중인 모든 클라이언트에게 전송.
        registry.setApplicationDestinationPrefixes("/app"); // 클라이언트 -> 서버(발행)
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(stompAuthChannelInterceptor);
    }
}
