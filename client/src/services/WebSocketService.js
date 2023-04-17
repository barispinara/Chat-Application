import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import {updateMessageOnChat } from '../redux/slices/ChatSlice';

var stompClient = null;

function Connect(hostUser, dispatch){
    const userJoin = () => {
        stompClient.send("/app/joinMessage", {}, hostUser.username);
    }

    const onMessageReceived = (payload) => {
        console.log("onMessageReceived " , payload.body)
        dispatch(updateMessageOnChat(JSON.parse(payload.body)));
    }

    const onConnected = () => {
        stompClient.subscribe("/chatroom/"+hostUser.username+"/message", onMessageReceived);
        userJoin();
    }

    const onError = (err) => {
        console.log("onError " , err);
    }

    let sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(sock);
    stompClient.debug = () => {};
    stompClient.connect({}, () => onConnected(hostUser), onError);

}

function SendMessage(hostUser, selectedChat , messageValue){
    if(stompClient) {
        var chatMessage = {
            content: messageValue,
            senderUsername: hostUser.username,
            receiverUsername: selectedChat.targetUser.username,
            roomId: selectedChat.id,
        };
    }
    stompClient.send("/app/message" , {} , JSON.stringify(chatMessage))
}

const WebSocketService = {
    Connect,
    SendMessage,
}

export default WebSocketService
