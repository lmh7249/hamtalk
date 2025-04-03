package com.hamtalk.chat.repository;

import com.hamtalk.chat.domain.entity.ChatMessage;
import com.hamtalk.chat.model.projection.ChatMessageProjection;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {
    List<ChatMessage> findAllByChatRoomId(Long chatRoomId);

    @Aggregation(pipeline = {
            "{ $match: { 'chatRoomId': { $in: ?0 } } }", // 특정 채팅방 ID 목록에 해당하는 메시지만 필터링
            "{ $sort: { 'createdAt': -1 } }",            // 최신 메시지 기준 정렬
            "{ $group: { _id: '$chatRoomId', chatRoomId: { $first: '$chatRoomId' }, lastMessage: { $first: '$message' }, lastMessageTime: { $first: '$createdAt' } } }"
    })
    List<ChatMessageProjection>findLastMessagesByChatRoomIds(List<Long> chatRoomIds);





}
