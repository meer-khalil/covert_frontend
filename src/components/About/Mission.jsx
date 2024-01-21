import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

import image from '../../images/About/OurMission.webp'

function Mission({ mission }) {
    return (
        <div className=' mt-24'>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p className=' text-4xl font-bold tracking-[2px]'>Our Mission</p>
                <Divider sx={{ width: '10%', height: '5px', bgcolor: '#716EDC', borderRadius: '13px' }} />
            </Box>

            <div className=' my-5 mx-2 md:px-14'>
                <div className="flex items-center justify-center py-28 bg-cover bg-center rounded-xl" style={{ backgroundImage: `url(${image})` }}>
                </div>
                <p className=' font-[Poppins] font-normal text-lg text-justify mt-2'>
                    {mission}
                </p>
            </div>
        </div>

    )
}

export default Mission