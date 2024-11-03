import { combineReducers } from "@reduxjs/toolkit";
import userReducer, { IUserState } from "./userReducer";


export interface IRootReducer {
    user: IUserState
}

const rootReducer = combineReducers({
    user: userReducer
});

export default rootReducer;