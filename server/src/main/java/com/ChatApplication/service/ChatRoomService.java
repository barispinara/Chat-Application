package com.ChatApplication.service;


import com.ChatApplication.model.ChatRoom;
import com.ChatApplication.model.Message;
import com.ChatApplication.model.User;
import com.ChatApplication.payload.request.MessageRequest;
import com.ChatApplication.payload.response.ChatMessageResponse;
import com.ChatApplication.payload.response.ChatRoomResponse;
import com.ChatApplication.payload.response.UserResponse;
import com.ChatApplication.repository.ChatRoomRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Service
@AllArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    private final UserService userService;

    private final MessageService messageService;

    public ChatRoom createChatRoom(List<User> memberList){
        ChatRoom chatRoom = new ChatRoom(memberList);
        return chatRoomRepository.save(chatRoom);
    }

    public List<ChatRoomResponse> listChatRoomsByGivenUser(User user){
        List<ChatRoom> chatRoomList = chatRoomRepository.findChatRoomsByMembersContains(user)
                .orElse(new ArrayList<>());

        List<ChatRoomResponse> chatRoomResponseList = new ArrayList<>();
        for (ChatRoom chatRoom : chatRoomList) {
            List<User> currMemberList = chatRoom.getMembers();
            for(User x : currMemberList){
                if(x != user){
                    UserResponse newUserResponse = new UserResponse(
                            x.getUsername(),
                            x.getFullName(),
                            x.getLastSeenAt()
                    );
                    ChatMessageResponse lastMessage = messageService.getLastSendedMessageByChatRoom(chatRoom);
                    chatRoomResponseList.add(new ChatRoomResponse(
                            chatRoom.getId(),
                            newUserResponse,
                            lastMessage
                    ));
                }
            }
        }

        return chatRoomResponseList;
    }

    public ChatRoom findChatRoomById(Long chatRoomId){
        return chatRoomRepository.findChatRoomById(chatRoomId)
                .orElseThrow(NullPointerException::new);
    }
    public ChatRoomResponse findChatRoom(User hostUser , User givenUser){

        List<ChatRoom> chatRoomList = chatRoomRepository.findChatRoomsByMembersContains(hostUser)
                .orElse(new ArrayList<>());

        UserResponse newUserResponse = new UserResponse(
                givenUser.getUsername(),
                givenUser.getFullName(),
                givenUser.getLastSeenAt()
        );

        for(ChatRoom x: chatRoomList){
            if(x.getMembers().contains(givenUser)){
                ChatMessageResponse lastMessage = messageService.getLastSendedMessageByChatRoom(x);
                return new ChatRoomResponse(x.getId(), newUserResponse, lastMessage);
            }
        }
        ChatRoom createdChatRoom = createChatRoom(Arrays.asList(hostUser, givenUser));
        return new ChatRoomResponse(createdChatRoom.getId(), newUserResponse, null);
    }

}
