package com.hamtalk.chat.repository;

import com.hamtalk.chat.domain.entity.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {
}
