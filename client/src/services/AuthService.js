import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "user/";


export const register = createAsyncThunk(
    'user/register', 
    async(registerValue, {rejectWithValue}) => {
        try {
            const {
                username,
                password,
                firstName,
                lastName} = registerValue;
            const payload =  await axios.post(
                API_URL + "register" , {
                    username,
                    password,
                    firstName,
                    lastName,
                }
            )

            return payload.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const login = createAsyncThunk(
    'user/login' , 
    async(loginValue, {rejectWithValue}) => {
        try {
            const {username, password} = loginValue;
            const payload = await axios.post(
                API_URL + "login" , {
                    username,
                    password
                }
            )
            return payload.data

        } catch (error){
            return rejectWithValue(error.response.data)
        }
    }
)

export const getListUsers = createAsyncThunk(
    'user/getAllUser',
    async(tokenValue, {rejectWithValue}) => {
        try {
            const payload = await axios.get(
                API_URL + "getAllUser" , {
                    headers: {
                        Authorization: `Bearer ${tokenValue}`
                    }
                }
            )
            return payload.data
        } catch(error){
            console.log("ERROR " , error)
            return rejectWithValue(error.message)
        }
    }
)