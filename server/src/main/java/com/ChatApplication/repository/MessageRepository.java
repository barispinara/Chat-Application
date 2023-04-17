package com.ChatApplication.repository;


import com.ChatApplication.model.ChatRoom;
import com.ChatApplication.model.Message;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends CrudRepository<Message, Long> {
    Optional<Message> findMessageById(Long id);
    Optional<List<Message>> findMessagesByChatRoom(ChatRoom currChatRoom);
    Optional<Message> findFirstByChatRoomOrderBySendedAt(ChatRoom currChatRoom);
}
