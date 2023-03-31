import React, { useState} from "react";
import {
    Button,
    TextField,
    Link,
    Box,
    Grid,
    Alert,
    Typography,
    CircularProgress
} from '@mui/material'
import { useNavigate } from 'react-router-dom';

import AuthService from "../services/AuthService";

const delay = ms => new Promise(
    resolve => setTimeout(resolve,ms)
)

export const Register = () => {

    const [loading, setLoading] = useState(false)
    const [responseMessage , setResponseMessage] = useState('')
    const [responseStatus , setResponseStatus] = useState(0)

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        setResponseStatus(0)
        setResponseMessage('')
        setLoading(true)

        const data = new FormData(e.currentTarget);

        AuthService.register(data.get('username'), data.get('password'), data.get('name'), data.get('surname')).then(
            (response) => {
                console.log(response)
                console.log(data)
                const statusCode = response.status
                const statusMessage = response.data.message
                setResponseStatus(statusCode)
                setResponseMessage(statusMessage)
                setTimeout(() => {
                    navigate('/')
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

    return(
        <Grid container
        sx={{
            height: '100vh',
            }}>
        <Grid item xs={false} sm={4} md={7} className="imageGrid"
            sx={{
                backgroundImage: 'url("images/background.jpg")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />
        <Grid item xs={12} sm={8} md={5}>
            <Box 
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '75vh',
                }}
            >
                <Box component="img" src="images/logo.png"/>
                <Typography component="h1" variant="h5">
                    Create an account
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
                    {responseStatus === 400 && (
                        <Alert severity="error">
                            {responseMessage}
                        </Alert>
                    )}
                    {responseStatus === 200 && (
                        <Alert severity="success">
                            {responseMessage}
                        </Alert>
                    )}
                    <TextField
                        margin="normal"
                        fullWidth
                        required
                        id="name"
                        label="Name"
                        name="name"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        required
                        id="surname"
                        label="Surname"
                        name="surname"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        disabled = {loading}
                    >
                        {loading ? <CircularProgress/> : "Submit"}
                    </Button>
                    <Grid item>
                        <Link href='/' variant='body2'>
                            Back to Login
                        </Link>
                    </Grid>
                </Box>
            </Box>
        </Grid>
    </Grid>
    )



   
}