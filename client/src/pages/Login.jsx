import React, { useState} from "react";
import {
    Button,
    TextField,
    Link,
    Box,
    Grid,
    Alert,
    Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom';

import AuthService from "../services/AuthService";


export const Login = () => {

    const [loading, setLoading] = useState(false)
    const [responseMessage , setResponseMessage] = useState('')
    const [responseStatus , setResponseStatus] = useState(0)

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        
        setResponseStatus(0)
        setResponseMessage('')
        setLoading(true);

        const data = new FormData(e.currentTarget);

        AuthService.login(data.get('username'),data.get('password')).then(
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
                    window.location.reload();
                },3000)
            },
            (error) => {
                const statusCode = error.response.status
                const statusMessage = error.response.data.message
                setResponseStatus(statusCode)
                setResponseMessage(statusMessage)
                console.log(responseStatus)
                console.log(responseMessage)
                setLoading(false);
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
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
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
                        
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoFocus
                            
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
                            Login
                        </Button>
                        <Grid item>
                            <Link href='/register' variant='body2'>
                                {"Don't have an account? Create new account"}
                            </Link>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>


        /*
        <Grid container sx={{ height: '100vh'}}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoFocus
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
                            sx={{ mt: 3, mb: 2}}
                        >
                            Login
                        </Button>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign up"}
                            </Link>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
        */
    )
}