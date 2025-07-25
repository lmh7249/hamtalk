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
    private Long chatRoomId;  // 전역 알림 구독을 위해 추가.
    private Long senderId; // 보낸 사람 ID
    private Long receiverId; // 받는 사람 ID, 전역 알림 구독을 위해 추가.
    private String senderNickName; // 보낸 사람 닉네임
    private String profileImageUrl;
    private String message; // MongoDB 메세지 내용
    private int unreadCount; // 해당 메세지를 읽지 않은 사용자의 수
    private LocalDateTime createdAt; // MongoDB 메세지 생성 시간
}
