export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export interface User {
    id: number | null;
    username: string;
    token?: string;
    firstName: string;
    lastName: string;
}

export const login = (user: User) => {
    localStorage.setItem("auth", JSON.stringify(user));
    return {
        type: LOGIN,
        user
    };
}

export const logout = () => {
    localStorage.removeItem("auth");
    window.location.replace("/");
    return{
        type: LOGOUT
    }
}