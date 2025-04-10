package com.hamtalk.chat.model.response;

import com.hamtalk.chat.domain.entity.ChatRoom;
import com.hamtalk.chat.domain.entity.ChatRoomParticipant;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DirectChatRoomResponse {
    private Long chatRoomId;
    private Long creatorId;
    private String chatRoomName;
    private Long friendId;

    public DirectChatRoomResponse(ChatRoom chatRoom, ChatRoomParticipant crp1, ChatRoomParticipant crp2) {
        this.chatRoomId = chatRoom.getId();
        this.creatorId = chatRoom.getCreatorId();
        this.chatRoomName = chatRoom.getName();
        this.friendId = crp2.getUserId();
    }
}
