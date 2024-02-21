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
                <p className=' font-[Poppins] font-normal text-justify mt-2'>
                    {
                        mission
                        // || "Empowering Real Estate Investment Beyond Boundaries: Our mission at CovertNest is to revolutionize the way investors access and manage real estate opportunities. We are dedicated to unveiling the potential of off-market properties, facilitating seamless out-of-state investments, and providing a robust network of financial and professional support. Our commitment lies in enabling investors to confidently expand their portfolios, backed by an ecosystem of expertise and resources. We strive to be the cornerstone of innovation in real estate investment, breaking down geographical barriers and elevating the investment experience to new heights."
                    }
                </p>
            </div>
        </div>

    )
}

export default Mission