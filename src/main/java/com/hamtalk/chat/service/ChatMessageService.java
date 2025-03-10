package com.hamtalk.chat.service;

import com.hamtalk.chat.model.request.ChatMessageRequest;
import com.hamtalk.chat.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;

    //TODO: 몽고 DB 테스트
    public Boolean saveChatMessage(ChatMessageRequest chatMessageRequest) {
        chatMessageRepository.save(chatMessageRequest.toChatMessageEntity());
        return true;
    }


}
