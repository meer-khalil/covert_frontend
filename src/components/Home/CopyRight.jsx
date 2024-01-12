import { Typography } from '@mui/material';

function CopyRight() {
  return (
    <Typography variant="body2" color="white" sx={{ bgcolor: '#3296ff', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      Copyright © {new Date().getFullYear()} CovertNest, LLC. All rights reserved.
    </Typography>
  );
}

export default CopyRight;