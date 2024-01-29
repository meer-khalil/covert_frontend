import { Button } from '@mui/material'
import React, { useState } from 'react'
import { useContext } from 'react'
import { PropertyContext } from '../../context/PropertyContext'

const Buttons = ({ activeStep, setActiveStep }) => {

  const { propertyData, handleProperty } = useContext(PropertyContext);


  const play = () => {
    if (activeStep == 0 && propertyData?.hasOwnProperty('address') && propertyData?.address?.length > 10) {
      return false
    }
    else if (
      activeStep == 1 &&
      propertyData?.hasOwnProperty('numberOfBeds') &&
      propertyData?.hasOwnProperty('numberOfBaths') &&
      propertyData?.hasOwnProperty('builtYear') &&
      propertyData?.hasOwnProperty('sqFt') &&
      propertyData?.hasOwnProperty('lotSqft') &&
      propertyData?.hasOwnProperty('actualCAP') &&
      propertyData?.hasOwnProperty('proFormaCAP') &&
      propertyData?.hasOwnProperty('units') &&
      propertyData?.hasOwnProperty('propertyType') &&
      propertyData?.hasOwnProperty('zipcode') &&
      propertyData?.hasOwnProperty('propertyCondition') &&
      propertyData?.hasOwnProperty('occupancy') &&
      propertyData?.hasOwnProperty('rentalIncome') &&
      propertyData?.hasOwnProperty('hasHoa') &&
      propertyData?.hasOwnProperty('finance_cash') &&
      propertyData?.hasOwnProperty('finance_sellerFinance') &&
      propertyData?.hasOwnProperty('finance_mortgage')
    ) {
      return false
    }
    else {
      return true
    }
  }
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
            disabled={activeStep == 4 || play()}
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