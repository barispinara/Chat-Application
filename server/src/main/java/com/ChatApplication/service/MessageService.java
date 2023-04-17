package com.ChatApplication.service;

import com.ChatApplication.model.ChatRoom;
import com.ChatApplication.model.Message;
import com.ChatApplication.model.User;
import com.ChatApplication.payload.response.ChatMessageResponse;
import com.ChatApplication.repository.MessageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    public Message createMessage(String content,
                                 User senderUser,
                                 User receiverUser,
                                 ChatRoom currChatRoom){
        Message createdMessage = new Message(
                content,
                senderUser,
                receiverUser,
                currChatRoom
        );
        return messageRepository.save(createdMessage);
    }

    public List<ChatMessageResponse> getMessageByChatRoom(ChatRoom currChatRoom){
        List<Message> messageList = messageRepository.findMessagesByChatRoom(currChatRoom)
                .orElse(new ArrayList<>());
        List<ChatMessageResponse> messageResponseList = new ArrayList<>();
        for(Message message : messageList){
            messageResponseList.add(
                    new ChatMessageResponse(
                            message.getContent(),
                            message.getSender().getUsername(),
                            message.getReceiver().getUsername(),
                            message.getChatRoom().getId().intValue(),
                            message.getSendedAt(),
                            message.getIsSeen()
                    )
            );
        }

        return messageResponseList;
    }

    public ChatMessageResponse getLastSendedMessageByChatRoom(ChatRoom currChatRoom){
        Message lastMessage =  messageRepository.findFirstByChatRoomOrderBySendedAt(currChatRoom)
                .orElse(null);
        if(lastMessage != null) {
            return new ChatMessageResponse(
                    lastMessage.getContent(),
                    lastMessage.getSender().getUsername(),
                    lastMessage.getReceiver().getUsername(),
                    lastMessage.getChatRoom().getId().intValue(),
                    lastMessage.getSendedAt(),
                    lastMessage.getIsSeen()
            );
        }
        return null;
    }
}
