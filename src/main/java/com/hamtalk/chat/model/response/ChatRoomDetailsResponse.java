package com.hamtalk.chat.model.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatRoomDetailsResponse {
    private Long chatRoomId;
    private String chatRoomName;
    private Long creatorId;
    private List<ChatRoomParticipantResponse> participants;
}
