package com.ChatApplication.payload.response;


import com.ChatApplication.model.Message;
import com.ChatApplication.payload.request.MessageRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class ChatRoomResponse {
    private Long id;
    private UserResponse targetUser;
    private ChatMessageResponse message;
}
