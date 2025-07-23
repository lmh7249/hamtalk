package com.hamtalk.chat.repository;
import com.hamtalk.chat.model.response.ChatRoomByParticipantsResponse;
import com.hamtalk.chat.model.response.ChatRoomDetailsResponse;

import java.util.List;
import java.util.Optional;

public interface CustomChatRoomRepository {
    // 정확히 일치하는 멤버로 구성된 채팅방들을 최신순으로 조회하는 메서드
    Optional<ChatRoomByParticipantsResponse> findChatRoomByExactParticipants(List<Long> participantIds);
    Optional<ChatRoomDetailsResponse> findChatRoomDetailsById(Long chatRoomId);

}
