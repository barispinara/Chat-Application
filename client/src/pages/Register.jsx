import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../style.scss'
import { Alert, TextField } from '@mui/material'
import AuthService from '../services/AuthService'
export const Register = () => {

    const [loading,setLoading] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')
    const [responseStatus, setResponseStatus] = useState(0)

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        setResponseStatus(0)
        setResponseMessage('')
        setLoading(true)

        const data = new FormData(e.currentTarget);

        AuthService.register(data.get("name") , data.get("surname") , data.get("username"), data.get("password")).then(
            (response) => {
                const statusCode = response.status
                const statusMessage = response.data.message
                setResponseStatus(statusCode)
                setResponseMessage(statusMessage)
                setTimeout(() => {
                    navigate("/")
                    setLoading(false)
                },3000)
            },
            (error) => {
                const statusCode = error.response.status
                const statusMessage = error.response.data.message
                setResponseStatus(statusCode)
                setResponseMessage(statusMessage)
                setLoading(false)
            }
        )
    }



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
