import React from 'react'
import { Link} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { login } from '../services/AuthService'
import {Alert, TextField} from "@mui/material"
import '../style.scss'

export const Login = () => {

    const loading = useSelector((state) => state.user.isLoading);
    const responseMessage = useSelector((state) => state.user.responseMessage);
    const responseStatus = useSelector((state) => state.user.responseStatus);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const loginValue = {
            username: data.get("username"),
            password: data.get("password")
        }
        await dispatch(login(loginValue))
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
