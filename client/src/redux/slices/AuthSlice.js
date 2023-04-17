import {createSlice } from '@reduxjs/toolkit'
import { register, login, getListUsers } from '../../services/AuthService'

const initialState = {
    hostUser: {
        username: '',
        fullName: '',
        lastSeenAt: '',
        jwtToken: '',
    },
    userList: [],
    isLoading: false,
    responseStatus: 0,
    responseMessage: '',
}

export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetResponseMessage: (state) => {
            state.responseMessage = initialState.responseMessage
        },
        resetResponseStatus: (state) => {
            state.responseStatus = initialState.responseStatus
        }
    },
    extraReducers: {
        [register.pending] : (state) => {
            state.isLoading = true;
        },
        [register.fulfilled] : (state, {payload}) => {
            state.isLoading = false;
            state.responseStatus = 200;
            state.responseMessage = payload.message;
        },
        [register.rejected] : (state, {payload}) => {
            state.isLoading = false;
            state.responseStatus = 400;
            state.responseMessage = payload.message;
        },
        [login.pending] : (state) => {
            state.isLoading = true;
        },
        [login.fulfilled] : (state, {payload}) => {
            state.isLoading = false;
            state.hostUser= {
                username: payload.userResponse.username,
                fullName: payload.userResponse.fullName,
                lastSeenAt: payload.userResponse.lastSeenAt,
                jwtToken: payload.token,
            }
            state.responseStatus = 200;
            state.responseMessage = payload.message;
        },
        [login.rejected] : (state, {payload}) => {
            state.isLoading = false;
            state.responseStatus = payload.status;
            state.responseMessage = payload.message;
        },
        [getListUsers.pending] : (state) => {
            state.isLoading = true;
        },
        [getListUsers.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.userList = payload;
        },
        [getListUsers.rejected]: (state, {payload}) => {
            state.isLoading = false;
        }

    }
})

export const {resetResponseMessage, resetResponseStatus} = authSlice.actions;

export default authSlice.reducer;