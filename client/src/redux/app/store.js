import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../slices/AuthSlice'
import chatReducer from '../slices/ChatSlice'

export const store = configureStore({
    reducer: {
        user : authReducer,
        chat : chatReducer,
    },
})