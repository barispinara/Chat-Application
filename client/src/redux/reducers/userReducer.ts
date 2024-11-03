import { LOGIN, LOGOUT } from "./actions/UserAction";


const authValue: any = localStorage.getItem("auth");
const authJSON: any = JSON.parse(authValue);
const token: string | null = authValue && authJSON && authJSON.token ? authJSON.token : null;

export interface IUserState {
    id: string | null,
    username: string | null,
    firstName: string | null,
    lastName: string | null,
    isAuth: boolean,
    token: string | null
}

const initState : IUserState = {
    id: null,
    username: null,
    firstName: null,
    lastName: null,
    isAuth: authValue != null,
    token: token
}

const userReducer = (state = initState, action: any) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                id: action.user.id,
                username: action.user.username,
                firstName: action.user.firstName,
                lastName: action.user.lastName,
                isAuth: true,
                token: action.user.token
            };
        case LOGOUT:
            return initState;
        default:
            return state;
    }
}

export default userReducer;