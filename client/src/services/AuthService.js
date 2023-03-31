import axios from 'axios';

const API_URL = "user/";

const register = (username, password,name,surname) => {
    return axios.post(API_URL + "register" , {
        username,
        password,
        name,
        surname,
    })
}

const login = (username, password) => {
    return axios.post(API_URL + "login" , {
        username,
        password,
    })
    .then((response) => {
        if(response.data.username){
            localStorage.setItem("user" , JSON.stringify(response.data));
        }
        return response
    })
}



const AuthService = {
    register,
    login,
}

export default AuthService;