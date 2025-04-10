package com.hamtalk.chat.repository;

import com.hamtalk.chat.domain.entity.ChatReadStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatReadStatusRepository extends MongoRepository<ChatReadStatus, String> {
    Optional<ChatReadStatus> findByUserIdAndChatRoomId(Long userId, Long chatRoomId);


}
