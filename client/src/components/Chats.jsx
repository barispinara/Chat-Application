import { Avatar } from '@mui/material'
import React from 'react'
import StringAvatar from '../scripts/StringAvatar'

export const Chats = () => {
    return (
        <div className="chats">
            <div className="userChat">
                <Avatar {...StringAvatar("Test Test")} />
                <div className="userChatInfo">
                    <span>User1</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="userChat">
                <Avatar {...StringAvatar("Test Test")} />
                <div className="userChatInfo">
                    <span>User1</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="userChat">
                <Avatar {...StringAvatar("Test Test")} />
                <div className="userChatInfo">
                    <span>User1</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="userChat">
                <Avatar {...StringAvatar("Test Test")} />
                <div className="userChatInfo">
                    <span>User1</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="userChat">
                <Avatar {...StringAvatar("Test Test")} />
                <div className="userChatInfo">
                    <span>User1</span>
                    <p>Hello</p>
                </div>
            </div>
        </div>
    )
}
