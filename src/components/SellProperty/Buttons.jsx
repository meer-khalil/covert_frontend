import { Button } from '@mui/material'
import React from 'react'
import { useContext } from 'react'
import { PropertyContext } from '../../context/PropertyContext'

const Buttons = ({ activeStep, setActiveStep }) => {

  const { handleProperty } = useContext(PropertyContext);

  return (
    <div className=' flex gap-5 justify-center'>
      <Button
        type="submit"
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
        disabled={activeStep == 0}
        onClick={() => setActiveStep(prev => prev - 1)}
      >
        Back
      </Button>
      {
        activeStep == 2 ? (
          <Button
            type="submit"
            // fullWidth
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
            disabled={activeStep == 4}
            onClick={() => {
              handleProperty();
              setActiveStep(prev => prev + 1);
            }}
          >
            Submit
          </Button>
        ) : (
          <Button
            type="submit"
            // fullWidth
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
            disabled={activeStep == 4}
            onClick={() => setActiveStep(prev => prev + 1)}
          >
            Next
          </Button>
        )
      }
    </div>
  )
}

export default Buttons