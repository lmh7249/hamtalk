package com.hamtalk.chat.repository;

import com.hamtalk.chat.domain.entity.ChatRoom;
import com.hamtalk.chat.model.response.ChatRoomByParticipantsResponse;
import com.hamtalk.chat.model.response.ChatRoomDetailsResponse;
import com.hamtalk.chat.model.response.ChatRoomParticipantResponse;
import com.hamtalk.chat.model.response.QChatRoomParticipantResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import static com.hamtalk.chat.domain.entity.QChatRoom.chatRoom;
import static com.hamtalk.chat.domain.entity.QChatRoomParticipant.chatRoomParticipant;
import static com.hamtalk.chat.domain.entity.QUserProfile.userProfile;

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

    @Override
    public Optional<ChatRoomDetailsResponse> findChatRoomDetailsById(Long chatRoomId) {

        // 채팅방 기본 정보 조회
        ChatRoom room = jpaQueryFactory
                .selectFrom(chatRoom)
                .where(chatRoom.id.eq(chatRoomId))
                .fetchOne();

        if (room == null) {
            return Optional.empty();
        }

        List<ChatRoomParticipantResponse> participants = jpaQueryFactory
                .select(new QChatRoomParticipantResponse(
                        userProfile.userId,
                        userProfile.nickname,
                        userProfile.profileImageUrl,
                        chatRoomParticipant.deletedAt.isNull()
                ))
                .from(chatRoomParticipant)
                .join(userProfile).on(chatRoomParticipant.userId.eq(userProfile.userId))
                .where(chatRoomParticipant.chatRoomId.eq(chatRoomId))
                .fetch();

        return Optional.of(
        ChatRoomDetailsResponse.builder()
                .chatRoomId(room.getId())
                .chatRoomName(room.getName())
                .creatorId(room.getCreatorId())
                .participants(participants)
                .build());
    }
}
