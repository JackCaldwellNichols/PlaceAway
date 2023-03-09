import { AddLocationAlt, Bed, LocationOn } from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import AddRoom from '../AddRoom/AddRoom.jsx'
import ClusterMap from '../Map/ClusterMap.jsx'
import Rooms from '../Rooms/Rooms.jsx'
import Protected from './Protected.jsx'

const BottomNav = () => {
    const [value, setValue] = useState(0)
    const ref = useRef()

    useEffect(()=> {
      ref.current.ownerDocument.body.scrollTop = 0;
    }, [value])

  return (

    <Box ref={ref}>
          {{
            0: <ClusterMap />,
            1: <Rooms />,
            2: <Protected><AddRoom setPage={setValue}/></Protected>
          }[value]}
        <Paper elevation={3} sx={{position:'fixed', bottom: 0, left:0, right:0, zIndex:2}}>
            <BottomNavigation showLabels value={value} onChange={(e, newValue)=>setValue(newValue)}>
                <BottomNavigationAction label='Map' icon={<LocationOn />}/>
                <BottomNavigationAction label='Rooms' icon={<Bed />}/>
                <BottomNavigationAction label='Add' icon={<AddLocationAlt />}/>
            </BottomNavigation >
        </Paper>

    </Box>
  )
}

export default BottomNav