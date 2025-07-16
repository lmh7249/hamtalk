package com.hamtalk.chat.repository;

import com.hamtalk.chat.domain.entity.ChatRoomParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface ChatRoomParticipantRepository extends JpaRepository<ChatRoomParticipant, Long> {

    @Query("SELECT crp.chatRoomId FROM ChatRoomParticipant crp WHERE crp.userId = :userId")
    List<Long> findChatRoomIdsByUserId(@Param("userId") Long userId);

    @Query("SELECT crp.userId FROM ChatRoomParticipant crp WHERE crp.chatRoomId = :chatRoomId")
    List<Long> findUserIdsByChatRoomId(@Param("chatRoomId") Long chatRoomId);

    Optional<ChatRoomParticipant> findByUserIdAndChatRoomIdAndDeletedAtIsNull(Long userId, Long chatRoomId);
}
