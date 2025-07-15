package com.hamtalk.chat.service;

import com.hamtalk.chat.domain.entity.ChatRoom;
import com.hamtalk.chat.domain.entity.ChatRoomParticipant;
import com.hamtalk.chat.domain.enums.ChatRoomType;
import com.hamtalk.chat.model.projection.ChatMessageProjection;
import com.hamtalk.chat.model.request.ChatRoomCreateRequest;
import com.hamtalk.chat.model.request.ChatRoomParticipantCreateRequest;
import com.hamtalk.chat.model.response.*;
import com.hamtalk.chat.repository.*;
import com.hamtalk.common.exeption.custom.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomParticipantRepository chatRoomParticipantRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    @Value("${app.chat.max-participants}")
    private int maxParticipants;

    @Transactional
    public ChatRoomCreateResponse createChatRoom(Long creatorId, List<Long> userIds) {
        if (userIds == null || userIds.isEmpty()) {
            throw new EmptyParticipantsException();
        }

        if (userIds.size() == 1 && creatorId.equals(userIds.get(0))) {
            throw new SelfChatNotAllowedException();
        }

        // 채팅방 참여 인원을 초과하면 바로 예외 발생.
        if ((1 + userIds.size()) > maxParticipants) {
            throw new ParticipantLimitExceededException();
        }

        // 1. 요청자(creatorId)와 초대된 사용자(userIds)를 합쳐, 중복을 제거한 전체 참여자 ID 리스트를 생성
        List<Long> allParticipantIds = Stream.concat(
                        Stream.of(creatorId), // 방장 ID
                        userIds.stream()      // 나머지 참여자 ID
                ).distinct() // 중복 제거 (혹시 userIds에 방장 ID가 포함될 경우 대비)
                .collect(Collectors.toList());

        // 2. 모든 참여자 ID가 실제 DB에 존재하는 사용자인지 한 번의 쿼리로 검증
        long existingUserCount = userRepository.countByIdIn(allParticipantIds);
        if (existingUserCount != allParticipantIds.size()) {
            throw new InvalidParticipantException();
        }

        // 3. 1:1 채팅의 경우, 두 사용자 간의 채팅방이 이미 존재하는지 확인하여 중복 생성을 방지
        if (userIds.size() == 1) {
            Long otherUserId = userIds.get(0);
            chatRoomRepository.findDirectChatRoom(creatorId, otherUserId).ifPresent(chatRoom -> {
                throw new ChatRoomAlreadyExistsException();
            });
        }

        // 4. 채팅방의 타입(1:1/그룹)을 결정하고, ChatRoom 엔티티를 생성하여 DB에 먼저 저장
        int chatRoomTypeId = (userIds.size() == 1) ? ChatRoomType.DIRECT.getCode() : ChatRoomType.GROUP.getCode();
        ChatRoomCreateRequest chatRoomCreateRequest = new ChatRoomCreateRequest(creatorId, chatRoomTypeId);
        ChatRoom newChatRoom = chatRoomRepository.save(chatRoomCreateRequest.toChatRoomEntity());

        List<ChatRoomParticipant> participants = allParticipantIds.stream()
                .map(participantId -> new ChatRoomParticipantCreateRequest(newChatRoom.getId(), participantId).toChatRoomParticipantEntity())
                .collect(Collectors.toList());
        chatRoomParticipantRepository.saveAll(participants);

        // 클라이언트에게 반환할 최종 DTO를 생성
        List<ChatRoomParticipantResponse> participantResponses =
                userProfileRepository.findParticipantInfoByUserIds(allParticipantIds);

        String initialChatRoomName = determineChatRoomName(creatorId, participantResponses);

        String chatRoomImageUrl = determineChatRoomImageUrl(creatorId, participantResponses);

        // 반환타입 객체 세팅, chatRoomName은 기본값 null -> ct쪽에서 처리.
        return ChatRoomCreateResponse.builder()
                .chatRoomId(newChatRoom.getId())
                .chatRoomName(initialChatRoomName)
                .creatorId(creatorId)
                .chatRoomImageUrl(chatRoomImageUrl)
                .participants(participantResponses)
                .build();
    }

    // 채팅방 존재 유무 검증
    @Transactional(readOnly = true)
    public ChatRoomVerifyResponse verifyChatRoom(Long loginUserId, List<Long> userIds) {
        if (userIds == null || userIds.isEmpty()) {
            throw new EmptyParticipantsException();
        }

        if (userIds.size() == 1 && loginUserId.equals(userIds.get(0))) {
            throw new SelfChatNotAllowedException();
        }

        // 채팅방 참여 인원을 초과하면 바로 예외 발생.
        if ((1 + userIds.size()) > maxParticipants) {
            throw new ParticipantLimitExceededException();
        }

        List<Long> allParticipantIds = Stream.concat(
                Stream.of(loginUserId),
                userIds.stream()
        ).distinct().collect(Collectors.toList());

        long existingUserCount = userRepository.countByIdIn(allParticipantIds);

        if (existingUserCount != allParticipantIds.size()) {
            throw new InvalidParticipantException();
        }

        // --------------- 여기까지 코드 동일
        if (userIds.size() == 1) {
            Long otherUserId = userIds.get(0);
            Optional<DirectChatRoomResponse> directChatRoom = chatRoomRepository.findDirectChatRoom(loginUserId, otherUserId);
            if (directChatRoom.isPresent()) {
                List<ChatRoomParticipantResponse> participantResponses =
                        userProfileRepository.findParticipantInfoByUserIds(allParticipantIds);
                String chatRoomImageUrl = determineChatRoomImageUrl(loginUserId, participantResponses);
                String chatRoomName = directChatRoom.get().getChatRoomName() != null
                        ? directChatRoom.get().getChatRoomName()
                        : determineChatRoomName(loginUserId, participantResponses);

                return ChatRoomVerifyResponse.builder()
                        .resultType("EXISTING_DIRECT")
                        .currentChatRoom(
                                CurrentChatRoomResponse.builder()
                                        .chatRoomId(directChatRoom.get().getChatRoomId())
                                        .chatRoomName(chatRoomName)
                                        .creatorId(directChatRoom.get().getCreatorId())
                                        .chatRoomImageUrl(chatRoomImageUrl)
                                        .participants(participantResponses)
                                        .build()
                        )
                        .build();
            };
        } else if (userIds.size() > 1) {
            Optional<ChatRoomByParticipantsResponse> groupChatRoom = chatRoomRepository.findChatRoomByExactParticipants(allParticipantIds);
            if(groupChatRoom.isPresent()) {
                List<ChatRoomParticipantResponse> participantResponses =
                        userProfileRepository.findParticipantInfoByUserIds(allParticipantIds);
                String chatRoomImageUrl = determineChatRoomImageUrl(loginUserId, participantResponses);
                String chatRoomName = groupChatRoom.get().getName() != null
                        ? groupChatRoom.get().getName()
                        : determineChatRoomName(loginUserId, participantResponses);

                return ChatRoomVerifyResponse.builder()
                        .resultType("EXISTING_GROUP")
                        .currentChatRoom(
                                CurrentChatRoomResponse.builder()
                                        .chatRoomId(groupChatRoom.get().getId())
                                        .chatRoomName(chatRoomName)
                                        .creatorId(groupChatRoom.get().getCreatorId())
                                        .chatRoomImageUrl(chatRoomImageUrl)
                                        .participants(participantResponses)
                                        .build()
                        )
                        .build();
            }
        }
        // 위 분기에 모두 해당하지 않으면 (= 채팅방이 존재하지 않는다면) 채팅방 생성을 위한 정보 세팅
        List<ChatRoomParticipantResponse> participantResponses =
                userProfileRepository.findParticipantInfoByUserIds(allParticipantIds);
        String newChatRoomImageUrl = determineChatRoomImageUrl(loginUserId, participantResponses);
        String newChatRoomName = determineChatRoomName(loginUserId, participantResponses);
        return ChatRoomVerifyResponse.builder()
                .resultType("NEW")
                .currentChatRoom(
                        CurrentChatRoomResponse.builder()
                                .chatRoomId(null)
                                .chatRoomName(newChatRoomName)
                                .creatorId(null)
                                .chatRoomImageUrl(newChatRoomImageUrl)
                                .participants(participantResponses)
                                .build()
                )
                .build();
}

// 수정 안해도 됨.
@Transactional(readOnly = true)
public List<ChatRoomListResponse> getChatRoomsWithLastMessage(Long userId) {
    // 1. 로그인한 유저의 채팅방 목록 조회
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
    log.info("넘어 온 값 조회: {}, {}", myId, friendId);
    userRepository.findById(friendId).orElseThrow(UserNotFoundException::new);
    DirectChatRoomResponse directChatRoomResponse = chatRoomRepository.findDirectChatRoom(myId, friendId).orElse(null);
    log.info("객체에 저장된 값: {}", directChatRoomResponse);
    // 채팅방이 없으면 null 반환, orElse -> 없을 경우 무엇을 반환할지.
    return directChatRoomResponse;
}

private String determineChatRoomName(Long creatorId, List<ChatRoomParticipantResponse> participants) {
    // 참여자가 2명 이하일 경우 (1:1 채팅 또는 자기 자신과의 채팅)
    if (participants.size() <= 2) {
        // 내가 아닌 다른 사람의 닉네임을 찾아서 채팅방 이름으로 설정
        return participants.stream()
                .filter(p -> !p.getUserId().equals(creatorId))
                .findFirst()
                .map(ChatRoomParticipantResponse::getNickname)
                .orElse("나 자신과의 대화"); // 다른 참여자가 없으면(참여자가 1명)
    } else { // 그룹 채팅일 경우
        // 나를 제외한 참여자의 닉네임을 콤마(,)로 이어서 채팅방 이름으로 설정
        return participants.stream()
                .filter(p -> !p.getUserId().equals(creatorId))
                .map(ChatRoomParticipantResponse::getNickname)
                .collect(Collectors.joining(", "));
    }
}

private String determineChatRoomImageUrl(Long creatorId, List<ChatRoomParticipantResponse> participants) {
    // 나를 제외한 다른 참여자 목록을 찾아서
    return participants.stream()
            .filter(p -> !p.getUserId().equals(creatorId))
            .findFirst() // 그 중 첫 번째 사람을 찾고
            .map(ChatRoomParticipantResponse::getProfileImageUrl) // 그 사람의 프로필 이미지 URL을 반환한다.
            .orElse(null); // 다른 참여자가 없으면 null 반환
}
}
