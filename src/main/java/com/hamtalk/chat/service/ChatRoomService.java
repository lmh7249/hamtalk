package com.hamtalk.chat.service;

import com.hamtalk.chat.domain.entity.ChatRoom;
import com.hamtalk.chat.domain.entity.ChatRoomParticipant;
import com.hamtalk.chat.model.request.ChatRoomCreateRequest;
import com.hamtalk.chat.model.request.ChatRoomParticipantCreateRequest;
import com.hamtalk.chat.repository.ChatRoomParticipantRepository;
import com.hamtalk.chat.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomParticipantRepository chatRoomParticipantRepository;

    @Transactional
    public Long createChatRoom(Long creatorId, List<Long> userIds) {
        List<ChatRoomParticipant> participants = new ArrayList<>();
        // 1. 채팅방 생성
        ChatRoomCreateRequest chatRoomCreateRequest = new ChatRoomCreateRequest(creatorId, 1);
        ChatRoom chatRoom = chatRoomRepository.save(chatRoomCreateRequest.toChatRoomEntity());
        // 2. 채팅방 생성자도 참여자로 추가
        participants.add(new ChatRoomParticipantCreateRequest(chatRoom.getId(), creatorId).toChatRoomParticipantEntity());
        // 3. 채팅방 생성한 id 값으로 채팅방 참여자 테이블 값 saveAll
        //TODO: 추후, BulkInsert 도입 고민해보기.
        for (Long userId : userIds) {
            ChatRoomParticipantCreateRequest participant = new ChatRoomParticipantCreateRequest(chatRoom.getId(), userId);
            participants.add(participant.toChatRoomParticipantEntity());
        }
        chatRoomParticipantRepository.saveAll(participants);
        // 3. 채팅 첫 메세지도 저장할듯 ? mongodb
        return chatRoom.getId();
    }

}
