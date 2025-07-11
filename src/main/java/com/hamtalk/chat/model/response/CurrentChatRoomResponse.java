package com.hamtalk.chat.model.response;

import lombok.Builder;
import lombok.Getter;
import java.util.List;

@Getter
@Builder
public class CurrentChatRoomResponse {
    private Long chatRoomId;
    private String chatRoomName;
    private Long creatorId;
    private String chatRoomImageUrl;
    private List<ChatRoomParticipantResponse> participants;
}
