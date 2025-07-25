package com.hamtalk.chat.repository;

import com.hamtalk.chat.domain.entity.ChatRoom;
import com.hamtalk.chat.model.response.ChatRoomListResponse;
import com.hamtalk.chat.model.response.DirectChatRoomResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long>, CustomChatRoomRepository {

    @Query("SELECT new com.hamtalk.chat.model.response.ChatRoomListResponse(cr, crp2, up) " +
            "FROM ChatRoomParticipant crp1 " +
            "JOIN ChatRoomParticipant crp2 ON crp1.chatRoomId = crp2.chatRoomId " +
            "JOIN UserProfile up ON crp2.userId = up.userId " +
            "JOIN ChatRoom cr ON crp1.chatRoomId = cr.id " +
            "WHERE crp1.userId = :userId " +
            "AND crp1.deletedAt IS NULL") // 조건 1: 내가 나가지 않은 방만 조회
//            "AND crp2.deletedAt IS NULL")   // 조건 2: 해당 방의 현재 참여자만 조회)
    List<ChatRoomListResponse> findChatRoomsByUserId(@Param("userId") Long userId);

    @Query("select new com.hamtalk.chat.model.response.DirectChatRoomResponse(cr, crp1, crp2) " +
            "from ChatRoom cr " +
            "join ChatRoomParticipant crp1 on cr.id = crp1.chatRoomId " +
            "join ChatRoomParticipant crp2 on cr.id = crp2.chatRoomId " +
            "where crp1.userId = :myId " +
            "and crp2.userId = :friendId " +
            "and cr.chatRoomTypeId = 1 " +
            "and cr.deletedAt is null ")
    Optional<DirectChatRoomResponse> findDirectChatRoom(@Param("myId") Long myId, @Param("friendId") Long friendId);

}
