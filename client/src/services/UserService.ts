import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserRequest, registerUserRequest } from "src/entities/requestEntities";
import AxiosApi from './AxiosApi';
import { AxiosResponse } from "axios";

/**
 * Paths of user endpoints 
 */

const PATHS = {
    REGISTER: "user/register",
    LOGIN: "user/login",
    LOGOUT: "user/logout",
    DELETE_USER: (username: string) => `/delete/${username}`,
    PROFILE: "user/profile",
    ALL_PROFILE: "user/getAllUser"
}


/**
 * User Service class 
 */
export class UserService {

    public static register(registerUserRequest: registerUserRequest): Promise<AxiosResponse> {
        return AxiosApi.post(PATHS.REGISTER, registerUserRequest)
    }

    public static login(loginUserRequest: loginUserRequest): Promise<AxiosResponse> {
        return AxiosApi.post(PATHS.LOGIN, loginUserRequest)
    }
}





// const serviceURL = "user"

// export const registerUser = createAsyncThunk(
//     '/register',
//     async(registerUserRequest:registerUserRequest, {rejectWithValue}) => {
//         try{
//             const{
//                 username,
//                 password,
//                 firstName,
//                 lastName
//             } = registerUserRequest;
//             const payload = await AxiosApi.post(
//                 `${serviceURL}/register` , {
//                     username,
//                     password,
//                     firstName,
//                     lastName
//                 }
//             )
//             const data = payload.data;
//             const responseStatus = payload.status;
//             return {data, responseStatus};
//         } catch(error){
//             return rejectWithValue(error.response.data)
//         }
//     }
// )

// export const loginUser = createAsyncThunk(
//     '/login',
//     async(loginUserRequest:loginUserRequest, {rejectWithValue}) => {
//         try{
//             const{
//                 username,
//                 password
//             } = loginUserRequest;
//             const payload = await AxiosApi.post(
//                 `${serviceURL}/login` , {
//                     username,
//                     password
//                 }
//             )
//             const data = payload.data;
//             const responseStatus = payload.status;
//             return {data, responseStatus};
//         } catch(error){
//             return rejectWithValue(error.response.data)
//         }
//     }
// )
