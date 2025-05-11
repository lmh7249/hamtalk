package com.hamtalk.chat.model.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessageResponse {

    private String messageId; // MongoDB _id값
    private Long chatRoomId;
    private Long senderId; // 보낸 사람 ID
    private String senderNickName; // 보낸 사람 닉네임
    private String profileImageUrl;
    private String message; // MongoDB 메세지 내용
    private LocalDateTime createdAt; // MongoDB 메세지 생성 시간
}
