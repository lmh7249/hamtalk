package com.hamtalk.chat.config.websocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker // WebSocket, STOMP 사용
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    // 엔드포인트를 "/ws"로 설정 -> /ws로 도착하는 요청은 stomp 통신으로 인식함.
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOrigins("*") // cors 허용
                .withSockJS(); // SockJS 지원 : 웹소켓을 지원하지 않는 브라우저에서도 동작하도록.
    }

    // topic, app 설정 -> /topic 경로는 구독(브로커에게), /app 은 메세지 발행(서버)
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic");
        registry.setApplicationDestinationPrefixes("/app");
    }
}
