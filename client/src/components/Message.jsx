import React from 'react'
import { Avatar } from '@mui/material'
import stringAvatar from '../scripts/StringAvatar';

export const Message = () => {


    return (
        <div className="message">
            <div className="messageInfo">
                <Avatar {...stringAvatar('Test Test')} />
                <span>just now</span>
            </div>
            <div className="messageContent">
                <p>Hello</p>
            </div>
        </div>
    )
}
