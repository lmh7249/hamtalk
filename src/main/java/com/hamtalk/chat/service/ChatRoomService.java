package com.hamtalk.chat.service;

import com.hamtalk.chat.domain.entity.ChatRoom;
import com.hamtalk.chat.domain.entity.ChatRoomParticipant;
import com.hamtalk.chat.model.request.ChatRoomCreateRequest;
import com.hamtalk.chat.model.request.ChatRoomParticipantCreateRequest;
import com.hamtalk.chat.model.response.ChatRoomListResponse;
import com.hamtalk.chat.repository.ChatRoomParticipantRepository;
import com.hamtalk.chat.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
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

    @Transactional(readOnly = true)
    public List<ChatRoomListResponse> findChatRoomsByUserId(Long userId) {
        // 1. DB 접근해서 로그인한 유저의 모든 채팅 상대 불러오기
        List<ChatRoomListResponse> chatRoomsList = chatRoomRepository.findChatRoomsByUserId(userId);

        // 2. 채팅방 ID 기준으로 participants 리스트 묶기
        Map<Long, ChatRoomListResponse> chatRoomMap = new HashMap<>();

        for (ChatRoomListResponse chatRoomResponse : chatRoomsList) {
            // 채팅방 ID를 기준으로 데이터 그룹화
            Long chatRoomId = chatRoomResponse.getChatRoomId();

            // 채팅방 ID가 이미 맵에 존재하는 경우
            if (chatRoomMap.containsKey(chatRoomId)) {
                // 기존에 있던 채팅방에 현재 참여자를 추가
                ChatRoomListResponse existingChatRoom = chatRoomMap.get(chatRoomId);
                existingChatRoom.getParticipants().addAll(chatRoomResponse.getParticipants());
            } else {
                // 새로운 채팅방에 참여자 추가
                chatRoomMap.put(chatRoomId, chatRoomResponse);
            }
        }

        // 3. 결과값으로 반환할 데이터 리스트 생성
        List<ChatRoomListResponse> result = new ArrayList<>(chatRoomMap.values());

        log.info("DB 반환 값: {}", result);
        return result;
    }

}
