import React from 'react'
import { Autocomplete, Box, Button, Divider, TextField, Typography } from '@mui/material'

const InvestementPayback = () => {
  return (
    <div>
      <div className='mt-20 hidden md:block'>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography sx={{
            fontSize: '30px',
            fontWeight: 'bold',
            letterSpacing: '2px'
          }}>
            Investment Payback Balance Table
          </Typography>
          <Divider sx={{ width: '40%', height: '5px', bgcolor: '#716EDC', borderRadius: '13px' }} />
        </Box>
      </div>

      <div className='mt-12 border-2 border-blue-500 p-8  hidden md:block'>
        <Table />
      </div>
    </div>
  )
}

export default InvestementPayback