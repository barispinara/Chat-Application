import axios from "axios";

const API_URL = "user/";



const register = (username, password, firstName, lastName) => {
    return axios.post(API_URL + "register", {
        username,
        password,
        firstName,
        lastName,
    })
}


const login = (username, password) => {
    return axios.post(API_URL + "login", {
        username,
        password,
    })
        .then((response) => {
            if (response.data.username) {
                sessionStorage.setItem("user", JSON.stringify(response.data));
            }
            return response
        })
}

const profile = () => {

    const userToken = JSON.parse(sessionStorage.getItem("user")).token;

    return axios.get(API_URL + "profile", {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
        .then((response => {
            if (response.data.username) {
                sessionStorage.setItem("profile", JSON.stringify(response.data));
            }
            return response
        }))
}



const AuthService = {
    register,
    login,
    profile,
}

export default AuthService;