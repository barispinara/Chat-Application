import { Avatar, Button } from '@mui/material'
import React from 'react'
import StringAvatar from '../scripts/StringAvatar'
import LogoutIcon from '@mui/icons-material/Logout';
import AuthService from '../services/AuthService';

export const Navbar = () => {

    const userProfile = JSON.parse(sessionStorage.getItem("profile"))

    return (
        <div className="navbar">
            <div className="user">
                <Avatar {...StringAvatar(userProfile.firstName + " " + userProfile.lastName)} />
                <span>{userProfile.firstName + " " + userProfile.lastName}</span>
                <Button><LogoutIcon /></Button>
            </div>
        </div>
    )
}