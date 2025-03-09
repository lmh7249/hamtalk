package com.hamtalk.chat.model.response;

import com.hamtalk.chat.domain.entity.ChatRoom;
import com.hamtalk.chat.domain.entity.ChatRoomParticipant;
import com.hamtalk.chat.domain.entity.UserProfile;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoomListResponse {
    private Long chatRoomId;
    private String chatRoomName;
    private Long otherUserId;
    private String otherUserNickname;
    private String otherUserProfileImageUrl;


    public ChatRoomListResponse(ChatRoom chatRoom, ChatRoomParticipant chatRoomParticipant, UserProfile userProfile) {
        this.chatRoomId = chatRoom.getId();
        this.chatRoomName = chatRoom.getName();
        this.otherUserId = chatRoomParticipant.getUserId();
        this.otherUserNickname = userProfile.getNickname();
        this.otherUserProfileImageUrl = userProfile.getProfileImageUrl();
    }
}
