import React, { useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../style.scss'
import { Alert, TextField } from '@mui/material'
import { register } from '../services/AuthService'
import {resetResponseMessage, resetResponseStatus} from '../redux/slices/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
export const Register = () => {

    const loading = useSelector((state) => state.user.isLoading);
    const responseMessage = useSelector((state) => state.user.responseMessage);
    const responseStatus = useSelector((state) => state.user.responseStatus)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const registerValue = {
            username: data.get("username"),
            password: data.get("password"),
            firstName: data.get("name"),
            lastName: data.get("surname") 
        }
        await dispatch(register(registerValue))
    }

    useEffect(() => {
        if(responseStatus === 200){
            setTimeout(() => {
                dispatch(resetResponseMessage());
                dispatch(resetResponseStatus());
                navigate("/")
            },2000)
        }
    }, [responseStatus])



    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Chat App</span>
                <span className="title">Register</span>
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
                    <TextField required id="name" label="Name" name="name" variant="outlined"/>
                    <TextField required id="surname" label="Surname" name="surname" variant="outlined"/>
                    <TextField required id="username" label="Username" name="username" variant="outlined"/>
                    <TextField required id="password" label="Password" name="password" variant="outlined"/>
                    <button disabled={loading}>Sign up</button>
                </form>
                <p>
                    You do have an account? <Link to="/">Login</Link>
                </p>
            </div>
        </div>
    )
}
