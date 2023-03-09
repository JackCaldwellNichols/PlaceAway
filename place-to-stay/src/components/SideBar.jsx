import React from 'react'
import {Box, Drawer, IconButton, styled, Typography} from '@mui/material'
import {ChevronLeft} from '@mui/icons-material'
import PriceSlider from './PriceSlider'
import { useValue } from '../context/ContextProvider'


const DraweHeader = styled('div')(({theme})=> ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0,1),
    ...theme.mixins.toolbar

}))

const SideBar = ({isOpen, setIsOpen}) => {

const {containerRef} = useValue()

  return (
    <Drawer
    variant='persistent'
    hideBackdrop= {true}
    open={isOpen}

    >
        <DraweHeader>
            <Typography>
                Apply search or filter
            </Typography>
            <IconButton onClick={()=> setIsOpen(false)}>
                <ChevronLeft fontSize='large'/>
            </IconButton>
        </DraweHeader>
        <Box sx={{width: 240, p:3}}>
            <Box ref={containerRef}>

            </Box>
            <PriceSlider />
        </Box>
    </Drawer>
  )
}

export default SideBar