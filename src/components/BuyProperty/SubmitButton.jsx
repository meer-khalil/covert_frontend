import { Box, Button } from '@material-ui/core'
import React from 'react'

const SubmitButton = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Button
        disabled
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          px: 5,
          py: 1,
          bgcolor: "#716EDC",
          "&:hover": {
            backgroundColor: "#716EDC",
          },
        }}
      >
        Submit
      </Button>
    </Box>
  )
}

export default SubmitButton