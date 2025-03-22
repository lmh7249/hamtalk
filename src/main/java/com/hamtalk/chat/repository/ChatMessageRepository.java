package com.hamtalk.chat.repository;

import com.hamtalk.chat.domain.entity.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {
    List<ChatMessage> findAllByChatRoomId(Long chatRoomId);


}
