package com.hamtalk.chat.model.response;

import com.hamtalk.chat.domain.entity.ChatRoom;
import com.hamtalk.chat.domain.entity.ChatRoomParticipant;
import com.hamtalk.chat.domain.entity.UserProfile;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ChatRoomListResponse {
    private Long chatRoomId;
    private String chatRoomName;
    private Long creatorId;
    private String lastMessage;
    private LocalDateTime lastMessageTime;
    private List<Participant> participants = new ArrayList<>(); // 참가자 리스트 추가

    // 참가자 정보를 담을 내부 클래스
    @Getter
    @Setter
    public static class Participant {
        private Long userId;
        private String nickname;
        private String profileImageUrl;

        public Participant(Long userId, String nickname, String profileImageUrl) {
            this.userId = userId;
            this.nickname = nickname;
            this.profileImageUrl = profileImageUrl;
        }
    }

    // 생성자: 채팅방, 참여자, 사용자 프로필 정보를 받아서 초기화
    public ChatRoomListResponse(ChatRoom chatRoom, ChatRoomParticipant chatRoomParticipant, UserProfile userProfile) {
        this.chatRoomId = chatRoom.getId();
        this.chatRoomName = chatRoom.getName();
        this.creatorId = chatRoom.getCreatorId();
        // 이미 생성된 Participant 객체를 participants 리스트에 추가하는 방식으로 수정
        this.participants.add(new Participant(chatRoomParticipant.getUserId(), userProfile.getNickname(), userProfile.getProfileImageUrl()));
    }
}
