package com.hamtalk.chat.model.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessageRedisDto {
    private String messageId;
    private Long chatRoomId;
    private Long senderId;
    private String senderNickName;
    private String profileImageUrl;
    private String message;
    private String createdAt; // 직렬화 문제 해결을 위해 여기만 String 선언
}
