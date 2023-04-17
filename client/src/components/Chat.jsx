import { Avatar, Button, CardHeader, Grid, InputBase, List, ListItem, ListItemText, Paper } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChatRoomMessages } from '../services/ChatService'
import WebSocketService from '../services/WebSocketService'

export const Chat = () => {
    const hostUser = useSelector((state) => state.user.hostUser);
    const selectedChat = useSelector((state) => state.chat.selectedChat);
    const messages = useSelector((state) => state.chat.messages);
    const scrollRef = useRef(null);

    const [messageValue, setMessageValue] = useState("");

    useEffect(() => {
        dispatch(getChatRoomMessages(selectedChat.id))
    },[selectedChat])

    useEffect(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollIntoView({ behaviour: "smooth" });
        }
      }, [messages]);

    const handleInputChange = (event) => {
        setMessageValue(event.target.value);
    }

    const handleInputBtnClick = () => {

        if(messageValue !== ""){
            WebSocketService.SendMessage(
                hostUser,
                selectedChat,
                messageValue
            )
        }
        setMessageValue("");
    }

    const dispatch = useDispatch();

    return (
        <Grid
            container
            direction="column"
            height="100%"
        >
            <Grid item xs={1} borderBottom={"1px solid gray"}>
                <CardHeader
                    avatar={
                        <Avatar/>
                    }
                    titleTypographyProps={{variant: 'body1'}}
                    title = {selectedChat.targetUser.fullName}
                    subheaderTypographyProps={{variant: 'body2'}}
                    subheader = {selectedChat.targetUser.lastSeenAt}
                >
                </CardHeader>
            </Grid>
            <Grid item xs={9.8}>
                <List sx={{height: "60vh" , overflowY: 'auto'}}>
                    {messages.map((item, index) => (
                        <ListItem key={index} ref={scrollRef}>
                            <ListItemText 
                            align={item.senderUsername === hostUser.username
                                    ? "Right"
                                    : "Left"} 
                            primary={item.content}
                            secondary={item.sendedAt}
                            />
                        </ListItem>
                    ))}
                </List>
            </Grid>
            <Grid item xs={1}>
                <Paper
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: "100%",
                        paddingLeft: "2px",
                        paddingRight: "2px",
                        gap: "5px"
                    }}
                
                >
                    <InputBase
                        placeholder='Type Something...'
                        value={messageValue}
                        onChange={handleInputChange}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') handleInputBtnClick();
                        }}
                        fullWidth
                        sx={{border: "1px solid gray" , borderRadius: 2}}
                        />
                    <Button
                        variant="contained"
                        sx={{borderRadius: 2}}
                        onClick={handleInputBtnClick}
                    >
                        Submit
                    </Button>

                </Paper>
            </Grid>

        </Grid>
    )
}
