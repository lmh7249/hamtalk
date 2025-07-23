package com.hamtalk.chat.model.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoomParticipantResponse {
    private Long userId;
    private String nickname;
    private String profileImageUrl;
    private boolean isParticipating;

    @QueryProjection
    public ChatRoomParticipantResponse(Long userId, String nickname, String profileImageUrl, boolean isParticipating) {
        this.userId = userId;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
        this.isParticipating = isParticipating;
    }
}
