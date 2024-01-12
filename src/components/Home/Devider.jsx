import { Box } from '@mui/material';
import React from 'react';

import devider from '../../images/devider.png';

const Divider = () => {
  return (
    <div className=' page-size'>

    <Box sx={{ overflow: 'hidden', margin: 'auto' }}>
      <img src={devider} alt="Divider" />
    </Box>
    </div>
  )
}

export default Divider;
