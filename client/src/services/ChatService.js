import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "chat/";

export const findRoom = createAsyncThunk(
    '/chat/findRoom',
    async(findRoomValue, {rejectedWithValue}) => {
        try{
            const {token , username} = findRoomValue;
            const payload = await axios.get(
                API_URL + "findRoom/" + username,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            )
            return payload.data
        } catch(error){
            return rejectedWithValue(error)
        }
    }
)

export const getUserChatRooms = createAsyncThunk(
    '/chat/getListRoomsByUser',
    async(tokenValue, {rejectedWithValue}) => {
        try{
            const payload = await axios.get(
                API_URL + "getListRoomsByUser", {
                    headers:{
                        Authorization: `Bearer ${tokenValue}`
                    }
                }
            )
            return payload.data
        } catch(error){
            console.log("getUserChatRooms ERROR " , error)
            return rejectedWithValue(error)
        }
    }
)

export const getChatRoomMessages = createAsyncThunk(
    '/chat/getMessages',
    async(roomValue, {rejectedWithValue}) => {
        try{
            const payload = await axios.get(
                API_URL + "getMessages/" + roomValue
            )
            return payload.data
        } catch(error){
            console.log("getChatRoomMessages ERROR " , error);
            return rejectedWithValue(error);
        }
    }
)

/*
const findRoom = (givenUsername) => {
    const userToken = JSON.parse(sessionStorage.getItem("user")).token;

    return axios.get(API_URL + "findRoom/" + givenUsername ,{
        headers: {
            Authorization: `Bearer ${userToken}`
        },
    })
}

const listUserChatRoom = () => {
    const currUser = JSON.parse(sessionStorage.getItem("user"));

    return axios.get(API_URL + "getListRoomsByUser", {
        headers: {
            Authorization: `Bearer ${currUser.token}`
        }
    })
}

const ChatService = {
    findRoom,
    listUserChatRoom,
}

export default ChatService;
*/