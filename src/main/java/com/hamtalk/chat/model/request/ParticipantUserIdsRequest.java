package com.hamtalk.chat.model.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ParticipantUserIdsRequest {
    private List<Long> userIds;
}
