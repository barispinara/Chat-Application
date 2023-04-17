package com.ChatApplication.controller;


import com.ChatApplication.model.ChatRoom;
import com.ChatApplication.model.Message;
import com.ChatApplication.model.User;
import com.ChatApplication.payload.request.MessageRequest;
import com.ChatApplication.payload.response.ChatMessageResponse;
import com.ChatApplication.payload.response.ChatRoomResponse;
import com.ChatApplication.payload.response.ModelMessageResponse;
import com.ChatApplication.service.ChatRoomService;
import com.ChatApplication.service.MessageService;
import com.ChatApplication.service.UserService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Objects;

import static java.lang.String.format;

@Controller
@AllArgsConstructor
public class ChatRoomController {

    private static final Logger logger = LoggerFactory.getLogger(ChatRoomController.class);

    private final UserService userService;
    private final ChatRoomService chatRoomService;

    private final MessageService messageService;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/joinMessage")
    public ResponseEntity<?> receiveJoinMessage(@Payload String userUsername, SimpMessageHeaderAccessor headerAccessor){
        logger.info(userUsername + " is connected");
        User currUser = userService.loadUserByUsername(userUsername);
        userService.updateLastSeenAt(currUser, "Online");
        Objects.requireNonNull(headerAccessor.getSessionAttributes()).put("User" , currUser);
        return ResponseEntity
                .ok()
                .body(userUsername + " is connected");
    }

    @MessageMapping("/message")
    public ChatMessageResponse recMessage(@Payload MessageRequest messageRequest){
        User senderUser = userService.loadUserByUsername(messageRequest.getSenderUsername());
        User receiverUser = userService.loadUserByUsername(messageRequest.getReceiverUsername());
        ChatRoom currChatRoom = chatRoomService.findChatRoomById(Long.valueOf(messageRequest.getRoomId()));

        Message createdMessage = messageService.createMessage(
                messageRequest.getContent(),
                senderUser,
                receiverUser,
                currChatRoom
        );

        ChatMessageResponse createdMessageResponse = new ChatMessageResponse(
                createdMessage.getContent(),
                createdMessage.getSender().getUsername(),
                createdMessage.getReceiver().getUsername(),
                createdMessage.getChatRoom().getId().intValue(),
                createdMessage.getSendedAt(),
                createdMessage.getIsSeen()
        );
        messagingTemplate.convertAndSend("/chatroom/" + messageRequest.getSenderUsername()+"/message",createdMessageResponse);
        messagingTemplate.convertAndSend("/chatroom/" + messageRequest.getReceiverUsername()+"/message",createdMessageResponse);
        return createdMessageResponse;
    }

    @GetMapping(value="/chat/getMessages/{room_id}")
    public ResponseEntity<?> getMessagesByChatRoom(@PathVariable("room_id") Integer chatRoomId){
        ChatRoom currChatRoom = chatRoomService.findChatRoomById(Long.valueOf(chatRoomId));
        List<ChatMessageResponse> messageList = messageService.getMessageByChatRoom(currChatRoom);
        return ResponseEntity
                .ok()
                .body(messageList);
    }

    @GetMapping(value="/chat/getListRoomsByUser")
    public ResponseEntity<?> getAllChatRoomsByGivenUser(@RequestHeader("Authorization") String jwtToken){
        User user = userService.findUserFromJwtToken(jwtToken);
        if(user == null){
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid Jwt Token");
        }

        List<ChatRoomResponse> chatRoomResponseList = chatRoomService.listChatRoomsByGivenUser(
                user
        );

        return ResponseEntity
                .ok()
                .body(chatRoomResponseList);
    }

    @GetMapping(value="/chat/findRoom/{username}")
    public ResponseEntity<?> createRoom(@RequestHeader("Authorization") String jwtToken,
                                        @PathVariable("username") String username){
        User hostUser = userService.findUserFromJwtToken(jwtToken);
        if(hostUser == null){
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid Jwt Token");
        }
        User givenUser = userService.loadUserByUsername(username);

        ChatRoomResponse chatRoomResponse = chatRoomService.findChatRoom(hostUser, givenUser);
        return ResponseEntity
                .ok()
                .body(chatRoomResponse);
    }
}
