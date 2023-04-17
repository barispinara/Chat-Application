import { Backdrop, CircularProgress, Grid } from '@mui/material'
import React, { useEffect} from 'react'
import { Sidebar} from '../components/Sidebar'
import { Chat} from '../components/Chat'
import { useDispatch, useSelector } from 'react-redux'
import WebSocketService from '../services/WebSocketService'

export const Home = () => {
    const isChatSelected = useSelector((state) => state.chat.isChatSelected)
    const hostUser = useSelector((state) => state.user.hostUser)
    const isConnected = useSelector((state) => state.chat.isConnected);
    const dispatch = useDispatch();
    
    useEffect(() => {
        WebSocketService.Connect(hostUser, dispatch);
    },[])
    

    return (
        <div style={{height: '100vh' , display: 'flex', justifyContent: 'center' , alignItems: 'center'}}>
            {isConnected &&(
                <Backdrop
                sx={{ color: '#fff', zIndex: 1 }}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
            )}
            <Grid 
                container
                direction="row"
                sx={{height: "80%" , width: "80%", border: '2px solid black' , borderRadius:1}}
            >
                <Grid item xs={4} sx={{height: "100%" , width: "100%", borderRadius: 1, borderRight: "1px solid black"}}>
                    <Sidebar/>
                    
                </Grid>
                <Grid item xs={8} sx={{height: "100%" , width: "100%", borderRadius: 1}}>
                    {isChatSelected
                    ? <Chat/>
                    : <div>TEST</div>}
                </Grid>
            </Grid>
        </div>
    )
}
