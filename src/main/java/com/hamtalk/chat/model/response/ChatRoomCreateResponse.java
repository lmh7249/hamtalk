package com.hamtalk.chat.model.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomCreateResponse {
    private Long chatRoomId;
    private String chatRoomName; // 1:1 채팅이면 상대방 이름, 그룹이면 그룹 이름
    private Long creatorId;
    private String chatRoomImageUrl; // 채팅방 생성시, 임시 채팅방 대표 이미지
    private List<ChatRoomParticipantResponse> participants; // 채팅에 참여한 모든 유저 정보 목록(본인 포함)
}
