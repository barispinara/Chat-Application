import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from "../services/AuthService"
import {Alert, TextField} from "@mui/material"
import '../style.scss'

export const Login = () => {

    const[loading, setLoading] = useState(false);
    const[responseMessage, setResponseMessage] = useState('');
    const[responseStatus, setResponseStatus] = useState(0);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        setResponseStatus(0)
        setResponseMessage('')
        setLoading(true)

        const data = new FormData(e.currentTarget);

        AuthService.login(data.get("username"), data.get('password')).then(
            (response) => {
                const statusCode = response.status
                const statusMessage = response.data.message
                setResponseStatus(statusCode)
                setResponseMessage(statusMessage)
                AuthService.profile();
                setTimeout(() => {
                    navigate("/")
                    setLoading(false)
                    window.location.reload();
                },5000)
            },
            (error) => {
                const statusCode = error.response.status;
                const statusMessage = error.response.data.message;
                setResponseStatus(statusCode);
                setResponseMessage(statusMessage);
                setLoading(false);
            }
        )
    }



    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Chat App</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    {responseStatus === 400 && (
                        <Alert severity="error">
                            {responseMessage}
                        </Alert>
                    )}
                    {responseStatus === 401 && (
                        <Alert severity="warning">
                            {responseMessage}
                        </Alert>
                    )}
                    {responseStatus === 200 && (
                        <Alert severity="success">
                            {responseMessage}
                        </Alert>
                    )}

                    <TextField required id="username" label="Username" name="username" variant="outlined" />
                    <TextField required id="password" label="Password" name="password" variant="outlined" />
                    <button disabled={loading}>Sign in</button>
                </form>
                <p>
                    You don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    )
}
