package com.ChatApplication.payload.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class MessageRequest {
    private String content;
    private String senderUsername;
    private String receiverUsername;
    private Integer roomId;
}
