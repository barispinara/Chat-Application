package com.ChatApplication.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sender_id")
    private User sender;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "receiver_id")
    private User receiver;

    private String sendedAt;

    private Boolean isSeen;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "room_id")
    private ChatRoom chatRoom;


    public Message(String content,
                   User sender,
                   User receiver,
                   ChatRoom currChatRoom){
        this.content = content;
        this.sender = sender;
        this.receiver = receiver;
        this.chatRoom = currChatRoom;
        this.isSeen = false;
        this.sendedAt = getCurrentDateInFormat();
    }

    public String getCurrentDateInFormat(){
        SimpleDateFormat dateFormatter = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        return dateFormatter.format(new Date());
    }
}
