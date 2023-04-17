package com.ChatApplication.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class ChatMessageResponse {
    private String content;
    private String senderUsername;
    private String receiverUsername;
    private Integer roomId;
    private String sendedAt;
    private Boolean isSeen;
}
