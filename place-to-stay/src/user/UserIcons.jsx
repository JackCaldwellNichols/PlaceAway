import { Mail, Notifications } from '@mui/icons-material'
import { Avatar, Badge, Box, IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import UserMenu from './UserMenu'
import { useValue } from '../context/ContextProvider'
import useCheckToken from '../hooks/useCheckToken'

const UserIcons = () => {
    useCheckToken()
    const {state: {currentUser}} = useValue()
    const [anchorMenu, setAnchorMenu] = useState(null)
  return (
    <Box sx={{ display: 'flex' }}>
        <IconButton size='large' color='inherit'>
            <Badge color='error' badgeContent={5}>
                <Mail />
            </Badge>
        </IconButton>
        <IconButton size='large' color='inherit'>
            <Badge color='error' badgeContent={20}>
                <Notifications />
            </Badge>
        </IconButton>
        <Tooltip title='Open User Settings'>
            <IconButton onClick={(e)=>setAnchorMenu(e.currentTarget)}>
                <Avatar src={currentUser?.photoURL} alt={currentUser?.name} sx={{ml:1}}>
                    {currentUser?.name?.charAt(0).toUpperCase()}
                </Avatar>
            </IconButton>
        </Tooltip>
        <UserMenu {...{anchorMenu, setAnchorMenu}}/>
    </Box>
  )
}

export default UserIcons