package com.hamtalk.chat.service;

import com.hamtalk.chat.domain.entity.ChatRoom;
import com.hamtalk.chat.domain.entity.ChatRoomParticipant;
import com.hamtalk.chat.model.projection.ChatMessageProjection;
import com.hamtalk.chat.model.request.ChatRoomCreateRequest;
import com.hamtalk.chat.model.request.ChatRoomParticipantCreateRequest;
import com.hamtalk.chat.model.response.ChatRoomListResponse;
import com.hamtalk.chat.model.response.DirectChatRoomResponse;
import com.hamtalk.chat.repository.ChatMessageRepository;
import com.hamtalk.chat.repository.ChatRoomParticipantRepository;
import com.hamtalk.chat.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomParticipantRepository chatRoomParticipantRepository;
    private final ChatMessageRepository chatMessageRepository;

    @Transactional
    public ChatRoom createChatRoom(Long creatorId, List<Long> userIds) {
        // TODO: 1. 해당 채팅방이 존재하는지 확인해야 함. -> 반환타입 Entity 말고 dto로 추후 변경하기.

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
        return chatRoom;
    }

    @Transactional(readOnly = true)
    public List<ChatRoomListResponse> getChatRoomsWithLastMessage(Long userId) {
        // 1. MySQL에서 로그인한 유저의 채팅방 목록 조회
        List<ChatRoomListResponse> chatRoomsList = chatRoomRepository.findChatRoomsByUserId(userId);

        // 2. 채팅방 ID 기준으로 데이터 그룹화
        Map<Long, ChatRoomListResponse> chatRoomMap = new HashMap<>();

        for (ChatRoomListResponse chatRoom : chatRoomsList) {
            Long chatRoomId = chatRoom.getChatRoomId();

            if (chatRoomMap.containsKey(chatRoomId)) {
                // 이미 존재하는 채팅방이면 참여자만 추가
                ChatRoomListResponse existingChatRoom = chatRoomMap.get(chatRoomId);
                existingChatRoom.getParticipants().addAll(chatRoom.getParticipants());
            } else {
                // 새로운 채팅방이면 맵에 추가
                chatRoomMap.put(chatRoomId, chatRoom);
            }
        }

        // 3. 중복 제거된 채팅방 목록 생성
        List<ChatRoomListResponse> uniqueChatRooms = new ArrayList<>(chatRoomMap.values());

        // 4. 채팅방 ID 목록 추출
        List<Long> chatRoomIds = uniqueChatRooms.stream()
                .map(ChatRoomListResponse::getChatRoomId)
                .collect(Collectors.toList());

        if (chatRoomIds.isEmpty()) {
            return uniqueChatRooms; // 채팅방이 없으면 바로 반환
        }

        // 5. MongoDB에서 마지막 메시지 조회
        List<ChatMessageProjection> lastMessages = chatMessageRepository.findLastMessagesByChatRoomIds(chatRoomIds);

        // 6. 채팅방 ID 기준으로 마지막 메시지 맵핑
        Map<Long, String> lastMessageMap = lastMessages.stream()
                .collect(Collectors.toMap(ChatMessageProjection::getChatRoomId,
                        ChatMessageProjection::getLastMessage,
                        (existing, replacement) -> existing)); // 중복 키가 있을 경우 기존 값 유지

        Map<Long, LocalDateTime> lastMessageTimeMap = lastMessages.stream()
                .collect(Collectors.toMap(ChatMessageProjection::getChatRoomId,
                        ChatMessageProjection::getLastMessageTime,
                        (existing, replacement) -> existing));

        // 7. 채팅방에 마지막 메시지와 시간 추가
        uniqueChatRooms.forEach(chatRoom -> {
            Long roomId = chatRoom.getChatRoomId();
            chatRoom.setLastMessage(lastMessageMap.getOrDefault(roomId, ""));
            chatRoom.setLastMessageTime(lastMessageTimeMap.getOrDefault(roomId, null));
        });

        // 8. 최신 메시지 순 정렬
        uniqueChatRooms.sort((a, b) -> {
            LocalDateTime timeA = a.getLastMessageTime();
            LocalDateTime timeB = b.getLastMessageTime();

            if (timeA == null && timeB == null) return 0;
            if (timeA == null) return 1;
            if (timeB == null) return -1;

            return timeB.compareTo(timeA);
        });


        log.info("최종 반환 값: {}", uniqueChatRooms);
        return uniqueChatRooms;
    }
    @Transactional(readOnly = true)
    public DirectChatRoomResponse findDirectChatRoom(Long myId, Long friendId) {
        // TODO: 해당 유저가 존재하는지 확인
        log.info("넘어 온 값 조회: {}, {}", myId, friendId);

        DirectChatRoomResponse directChatRoomResponse = chatRoomRepository.findDirectChatRoom(myId, friendId).orElse(null);
        log.info("객체에 저장된 값: {}", directChatRoomResponse);
        // 채팅방이 없으면 null 반환, orElse -> 없을 경우 무엇을 반환할지.
        return directChatRoomResponse;
    }

}
