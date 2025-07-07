package com.hamtalk.chat.config.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.DefaultManagedTaskScheduler;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker // WebSocket, STOMP 사용
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final StompAuthChannelInterceptor stompAuthChannelInterceptor;
    @Value("${websocket.heartbeat}")
    private long heartbeat;

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
        // STOMP 레벨의 하트비트를 10초 간격으로 사용하도록 명시적으로 설정(yml 파일)
        registry.enableSimpleBroker("/topic")
                .setTaskScheduler(taskScheduler())
                .setHeartbeatValue(new long[]{heartbeat, heartbeat}); // 메세지 받을 경로(구독), 서버 -> 클라이언트
        // 예: convertAndSend("/topic/chat/1", message) -> 구독중인 모든 클라이언트에게 전송.
        registry.setApplicationDestinationPrefixes("/app"); // 클라이언트 -> 서버(발행)
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(stompAuthChannelInterceptor);
    }

    @Bean
    public TaskScheduler taskScheduler() {
        ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
        // 하트비트 전용 스레드 풀 크기 설정
        scheduler.setPoolSize(1);
        // 스레드 이름 접두사 설정
        scheduler.setThreadNamePrefix("websocket-heartbeat-scheduler-");
        // Spring 컨텍스트가 종료될 때 스케줄러도 함께 종료되도록 설정
        scheduler.setDaemon(true);
        return scheduler;
    }

}
