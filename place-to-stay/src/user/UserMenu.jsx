import { Logout, Settings } from '@mui/icons-material'
import { ListItem, Menu, MenuItem } from '@mui/material'
import React from 'react'
import { useValue } from '../context/ContextProvider'
import useCheckToken from '../hooks/useCheckToken.js'
import Profile from './Profile.jsx'

const UserMenu = ({anchorMenu, setAnchorMenu}) => {
    useCheckToken()
const {dispatch, state: {currentUser}} = useValue()
const handleCloseMenu = () => {
    setAnchorMenu(null)
}


    
  return (
    <>
        <Menu
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
    >
        {!currentUser.google && (
             <MenuItem onClick={()=> dispatch({type: 'UPDATE_PROFILE', payload:{open:true, file:null, photoUrl: currentUser?.photoUrl}})}>
             <ListItem>
                 <Settings fontSize='small' sx={{mr:2}}/>
                 Profile
             </ListItem>
             
         </MenuItem>
        )}
       
        <MenuItem onClick={()=>dispatch({type: 'UPDATE_USER', payload: null})}>
            <ListItem>
                <Logout fontSize='small' sx={{mr:2}}/>
                Logout
            </ListItem>
        </MenuItem>
        </Menu>
        <Profile />
    </>
  )
}

export default UserMenu