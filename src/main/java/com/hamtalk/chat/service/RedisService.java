package com.hamtalk.chat.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hamtalk.chat.config.jwt.JwtProperties;
import com.hamtalk.chat.model.request.ChatParticipantRedisRequest;
import com.hamtalk.chat.model.response.OnlineChatParticipantResponse;
import com.hamtalk.common.constant.EmailConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class RedisService {
    // 객체(JSON) 저장을 위한 템플릿
    private final RedisTemplate<String, Object> objectRedisTemplate;
    // 순수 문자열 저장을 위한 템플릿, boot에서 기본으로 만들어줘서 RedisConfig에 설정 안해줘도 됨.
    private final RedisTemplate<String, String> stringRedisTemplate;
    private final JwtProperties jwtProperties;
//    private final RedisMessageListenerContainer container;
//    private final MessageListenerAdapter listenerAdapter;
//    private final Set<String> subscribedChannels = ConcurrentHashMap.newKeySet();
    private final ObjectMapper objectMapper;

    // Hash 형식으로 값 저장
    //TODO: 추후 30분 이내 호출 5회 미만 설정하기
    public void saveAuthCode(String email, String authCode) {
        String key = "emailAuth: " + email;
        stringRedisTemplate.opsForHash().put(key, "code", authCode);
        stringRedisTemplate.opsForHash().put(key, "createdAt", String.valueOf(System.currentTimeMillis()));
        stringRedisTemplate.expire(key, EmailConstants.AUTH_CODE_EXPIRE_TIME, TimeUnit.SECONDS);
    }

    public boolean verifyAuthCode(String email, String inputCode) {
        String savedCode = getAuthCode(email);
        return savedCode != null && savedCode.equals(inputCode);
    }

    private String getAuthCode(String email) {
        String key = "emailAuth: " + email;
        return (String) stringRedisTemplate.opsForHash().get(key, "code");
    }

    public void saveRefreshToken(String email, String refreshToken) {
        String key = "auth:refresh-token:" + email;
        stringRedisTemplate.opsForValue().set(key, refreshToken, jwtProperties.getRefreshTtl(), TimeUnit.MILLISECONDS);
    }

    public String getRefreshToken(String email) {
        String key = "auth:refresh-token:" + email;
        return stringRedisTemplate.opsForValue().get(key);
    }

    public void deleteByRefresh(String email) {
        String key = "auth:refresh-token:" + email;
        stringRedisTemplate.delete(key);
    }


    public void saveUserToChatRoom(Long chatRoomId, Long userId, String nickname, LocalDateTime now) {
        String key = "chatroom:users:" + chatRoomId;

        ChatParticipantRedisRequest participantInfo = new ChatParticipantRedisRequest(
                nickname,
                now.toString() // LocalDateTime은 ISO-8601 문자열로 변환해서 저장하는 게 일반적
        );
        log.info("{}", participantInfo);
        objectRedisTemplate.opsForHash().put(key, String.valueOf(userId), participantInfo);
    }

    public void deleteUserToChatRoom(Long chatRoomId, Long userId) {
        String key = "chatroom:users:" + chatRoomId;
        objectRedisTemplate.opsForHash().delete(key, String.valueOf(userId));
    }

    public List<OnlineChatParticipantResponse> getOnlineParticipants(Long chatRoomId) {
        String key = "chatroom:users:" + chatRoomId;
        Map<Object, Object> entries = objectRedisTemplate.opsForHash().entries(key);
        log.info("Redis entries: {}", entries);
        return entries.entrySet().stream()
                .map(entry -> {
                    Long userId = Long.valueOf(entry.getKey().toString());
                    Object rawValue = entry.getValue();
                    // JSON 문자열로 변환 후 다시 객체로 변환
                    ChatParticipantRedisRequest participantData = objectMapper.convertValue(rawValue, ChatParticipantRedisRequest.class);

                    //ChatParticipantRedisRequest participantData = (ChatParticipantRedisRequest) entry.getValue();
                    return new OnlineChatParticipantResponse(
                            chatRoomId,
                            userId,
                            participantData.getNickname(),
                            participantData.getEnteredAt()
                    );
                })
                .collect(Collectors.toList());
    }
}
