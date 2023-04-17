import { Autocomplete, Avatar, Button, CardHeader, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Tab, Tabs, TextField} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import { getListUsers } from '../services/AuthService';
import { getUserChatRooms, findRoom } from '../services/ChatService';
import { setSelectedChat } from '../redux/slices/ChatSlice';

export const Sidebar = () => {
    const hostUser = useSelector((state) => state.user.hostUser)
    const userList = useSelector((state) => state.user.userList)
    const authSliceLoading = useSelector((state) => state.user.isLoading)
    
    const selectedChat = useSelector((state) => state.chat.selectedChat)
    const chatList = useSelector((state) => state.chat.chatList);
    const chatSliceLoading = useSelector((state) => state.chat.isLoading);

    const isLoading = authSliceLoading || chatSliceLoading

    const [tabValue , setTabValue] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        updateTab(0);
    }, []);

    async function updateTab (newTabValue){
        if(newTabValue === 0){
            await dispatch(getUserChatRooms(hostUser.jwtToken));
        }
        else if(newTabValue === 1){
            await dispatch(getListUsers(hostUser.jwtToken));
        }
    }

    const handleTabChange = async (event, newTabValue) => {
        await updateTab(newTabValue);
        setTabValue(newTabValue);
    }

    const handleSelectedChat = async(selectedChat) => {
        dispatch(setSelectedChat(selectedChat))
    }

    const handleGetChatRoom = async(targetUser) => {
        const findRoomValue = {
            token: hostUser.jwtToken,
            username: targetUser.username,
        };
        await dispatch(findRoom(findRoomValue))
        await updateTab(0);
        setTabValue(0);
    }

    return (
        <Grid
            container
            direction="column"
            height="100%"
        >
            <Grid item xs={1}>
                <CardHeader
                    avatar={
                        <Avatar/>
                    }
                    action={
                        <Button sx={{color: 'gray'}}>
                            <LogoutIcon/>
                        </Button>
                    }
                    titleTypographyProps={{variant: 'body1'}}
                    title = {hostUser.fullName}
                    subheaderTypographyProps={{variant: 'body2'}}
                    subheader= {hostUser.lastSeenAt}
                />
            </Grid>
            <Grid item xs={1}>
                    <Autocomplete
                        disablePortal
                        options={chatList}
                        fullWidth
                        getOptionLabel={(options) => options.targetUser.fullName}
                        renderInput={(params) => 
                            <TextField {...params} label="Search"/>
                        }
                    />
            </Grid>
            <Grid item xs={1}>
                    <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
                        <Tab label="Chats"/>
                        <Tab label="People"/>
                    </Tabs>
            </Grid>
            <Grid item xs={8.5}>
                    {tabValue === 0 &&(
                        <List sx={{padding: 0}}>
                        {chatList.map((item) => (
                            <ListItem key={item.id} alignItems="flex-start" sx={{padding: 0}}>
                                <ListItemButton onClick={() => handleSelectedChat(item)}>
                                    <ListItemAvatar>
                                        <Avatar/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary = {item.targetUser.fullName}
                                        secondary = {item.message === null
                                                    ? "No Message History"
                                                    : item.message.content}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        </List>
                    )}
                    {tabValue === 1 &&(
                        <List sx={{padding: 0}}>
                            {userList.map((item) => (
                                <ListItem key={item.username} alignItems="flex-start" sx={{padding: 0}}>
                                    <ListItemButton onClick={() => handleGetChatRoom(item)}>
                                        <ListItemAvatar>
                                            <Avatar/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary = {item.fullName}
                                            secondary = {item.lastSeenAt}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    )}
            </Grid>

        </Grid>
        
    )
}
