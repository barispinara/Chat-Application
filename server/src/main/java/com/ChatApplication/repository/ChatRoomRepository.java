package com.ChatApplication.repository;


import com.ChatApplication.model.ChatRoom;
import com.ChatApplication.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRoomRepository extends CrudRepository<ChatRoom, Long> {
    Optional<ChatRoom> findChatRoomById(Long id);
    Optional<List<ChatRoom>> findChatRoomsByMembersContains(User user);

}
