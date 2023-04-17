import { createSlice } from "@reduxjs/toolkit"
import { findRoom, getUserChatRooms, getChatRoomMessages } from "../../services/ChatService"

const initialState = {
    selectedChat: {
        id: '',
        targetUser: {
            username: '',
            fullName: '',
            lastSeenAt: '',
        }
    },
    messages:[],
    chatList: [],
    isLoading: false,
    isChatSelected: false,
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        resetSelectedChat: (state) => {
            state.selectedChat = initialState.selectedChat;
            state.isChatSelected = false;
        },
        setSelectedChat: (state, {payload}) => {
            state.selectedChat = payload;
            state.isChatSelected = true;
        },
        updateMessageOnChat: (state, {payload}) => {
            for(var i = 0; i < state.chatList.length; i++){
                if(state.chatList[i].id === payload.roomId){
                    state.chatList[i].message = payload;
                }
            }
            state.messages.push(payload);
        }
    },
    extraReducers: {
        [findRoom.pending]: (state) => {
            state.isLoading = true;
        },
        [findRoom.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.chatList.push(payload);
        },
        [findRoom.rejected]: (state, {payload}) => {
            state.isLoading = false;
        },
        [getUserChatRooms.pending]: (state) => {
            state.isLoading = true;
        },
        [getUserChatRooms.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.chatList = payload;
        },
        [getUserChatRooms.rejected]: (state, {payload}) => {
            state.isLoading = false;
        },
        [getChatRoomMessages.pending]: (state) => {
            state.isLoading = true;
        },
        [getChatRoomMessages.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.messages = payload;
        },
        [getChatRoomMessages.rejected]: (state, {payload}) => {
            state.isLoading = false;
        }
    }
})

export const {resetSelectedChat, setSelectedChat, updateMessageOnChat} = chatSlice.actions;

export default chatSlice.reducer;