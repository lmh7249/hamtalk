package com.hamtalk.chat.repository;
import com.hamtalk.chat.model.response.ChatRoomByParticipantsResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import static com.hamtalk.chat.domain.entity.QChatRoom.chatRoom;
import static com.hamtalk.chat.domain.entity.QChatRoomParticipant.chatRoomParticipant;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class CustomChatRoomRepositoryImpl implements CustomChatRoomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Optional<ChatRoomByParticipantsResponse> findChatRoomByExactParticipants(List<Long> participantIds) {
        if (participantIds == null || participantIds.isEmpty()) {
            return Optional.empty();
        }

        int size = participantIds.size();

        return Optional.ofNullable(jpaQueryFactory
                .select(Projections.constructor(ChatRoomByParticipantsResponse.class,
                        chatRoom.id,
                        chatRoom.creatorId,
                        chatRoom.chatRoomTypeId,
                        chatRoom.name,
                        chatRoom.createdAt,
                        chatRoom.updatedAt,
                        chatRoom.deletedAt
                        ))
                .from(chatRoom)
                .where(chatRoom.id.in(
                        JPAExpressions
                                .select(chatRoomParticipant.chatRoomId)
                                .from(chatRoomParticipant)
                                .groupBy(chatRoomParticipant.chatRoomId)
                                .having(
                                        chatRoomParticipant.count().eq((long) size)
                                                .and(
                                                        new CaseBuilder()
                                                                .when(chatRoomParticipant.userId.in(participantIds))
                                                                .then(1)
                                                                .otherwise(0)
                                                                .sum()
                                                                .eq(size)
                                                )
                                )
                ))
                .orderBy(chatRoom.createdAt.desc())
                .limit(1)
                .fetchOne());
    }
}
