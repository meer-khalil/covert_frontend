import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

function Title() {
    return (
            <Box>
                <Typography sx={{
                    fontSize: '30px',
                    fontWeight: 'bold',
                    letterSpacing: '2px'
                }}>Browse by Category</Typography>
                <Divider sx={{ width: '10%', height: '5px', bgcolor: '#716EDC', borderRadius: '13px' }} />
            </Box>

    )
}

export default Title