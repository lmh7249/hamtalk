package com.hamtalk.chat.repository;

import com.hamtalk.chat.domain.entity.ChatMessage;
import com.hamtalk.chat.model.projection.ChatMessageProjection;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {
    List<ChatMessage> findByChatRoomIdAndCreatedAtAfter(Long chatRoomId, LocalDateTime joinedAt);

    @Aggregation(pipeline = {
            "{ $match: { 'chatRoomId': { $in: ?0 } } }", // 특정 채팅방 ID 목록에 해당하는 메시지만 필터링
            "{ $sort: { 'createdAt': -1 } }",            // 최신 메시지 기준 정렬
            "{ $group: { _id: '$chatRoomId', chatRoomId: { $first: '$chatRoomId' }, lastMessage: { $first: '$message' }, lastMessageTime: { $first: '$createdAt' } } }"
    })
    List<ChatMessageProjection>findLastMessagesByChatRoomIds(List<Long> chatRoomIds);

    // 읽지 않은 메세지 수 구하기, 내가 보낸 메시지를 제외하고(SenderIdNot) 사용자의 마지막 읽은 시간(createdAt) 이후에 생성된 메세지 개수 반환.
    long countByChatRoomIdAndSenderIdNotAndCreatedAtAfter(Long chatRoomId, Long senderId, LocalDateTime createdAt);

    // 내가 보낸 메세지를 제외한 모든 메세지 수, -> 마지막 읽은 시간 정보가 null 일 경우에 사용함.
    long countByChatRoomIdAndSenderIdNot(Long chatRoomId, Long senderId);


}
