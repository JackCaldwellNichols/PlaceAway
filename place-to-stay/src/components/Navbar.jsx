import React, { useState } from 'react'
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from '@mui/material'
import { Lock, Menu} from '@mui/icons-material';
import { Container } from '@mui/system'

import { useValue } from '../context/ContextProvider';
import UserIcons from '../user/UserIcons';
import SideBar from './SideBar';


const Navbar = () => {

    const {state: {currentUser}, dispatch} = useValue()

    const [isOpen, setIsOpen] = useState(false)
  return (
    <>
        <AppBar>
        <Container maxWidth='lg'>
            <Toolbar disableGutters>
                <Box sx={{mr:1}}>
                    <IconButton size="large" color="inherit" onClick={()=>setIsOpen(true)}>
                            <Menu />
                    </IconButton> 
                </Box>
                <Typography variant='h6' component='h1' noWrap sx={{flexGrow: 1, display:{xs: 'none', md: 'flex'}}}>
                    Place Away
                </Typography>
                <Typography variant='h6' component='h1' noWrap sx={{flexGrow: 1, display:{xs: 'flex', md: 'none'}}}>
                    PA
                </Typography>
                {!currentUser ? (<Button color='inherit' startIcon={<Lock />} onClick={()=>dispatch({type: 'OPEN_LOGIN'})}>
                    Login
                </Button>) : (
                    <UserIcons />
                )}
                
            </Toolbar>
        </Container>
        </AppBar>
        <Toolbar />
        <SideBar {...{isOpen, setIsOpen}}/>
    </>

  )
}

export default Navbar