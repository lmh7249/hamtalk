package com.hamtalk.chat.repository;

import com.hamtalk.chat.domain.entity.ChatRoom;
import com.hamtalk.chat.model.response.ChatRoomListResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {


    @Query("SELECT new com.hamtalk.chat.model.response.ChatRoomListResponse(cr, crp2, up) " +
            "FROM ChatRoomParticipant crp1 " +
            "JOIN ChatRoomParticipant crp2 ON crp1.chatRoomId = crp2.chatRoomId " +
            "JOIN UserProfile up ON crp2.userId = up.userId " +
            "JOIN ChatRoom cr ON crp1.chatRoomId = cr.id " +
            "WHERE crp1.userId = :userId AND crp2.userId != :userId")
    List<ChatRoomListResponse> findChatRoomsByUserId(@Param("userId") Long userId);

}
