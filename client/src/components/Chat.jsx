import React from 'react'
import { Messages } from "./Messages"
import { Input } from "./Input"
import { Avatar } from '@mui/material'
import StringAvatar from '../scripts/StringAvatar'

export const Chat = () => {
    return (
        <div className='chat'>
            <div className="chatInfo">
                <span>Jane</span>
                <div className="chatIcons">
                    <Avatar {...StringAvatar("Test Test")} />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    )
}
