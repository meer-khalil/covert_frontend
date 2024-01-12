import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'

const ZipForm = ({ setZipcode, zipcodet }) => {

  const [t_zipcode, settZipcode] = useState(zipcodet ? zipcodet : "")

  const handleSubmit = (e) => {
    e.preventDefault();
    setZipcode(t_zipcode)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className=' flex mx-2 mt-4 gap-1'>
          <TextField
            label="Zip Code"
            variant="outlined"
            type='text'
            value={t_zipcode}
            onChange={(e) => settZipcode(e.target.value)}
            autoComplete="off"
            inputProps={{ style: { fontSize: 15 } }}
            InputLabelProps={{ style: { fontSize: 15, color: "GrayText" } }}
            className=' py-1'
          />
          <Button
            variant="outlined"
            sx={{ bgcolor: "#9771B5", color: 'white', '&:hover': { bgcolor: "#9771B5", color: 'white' } }}
            type='submit'
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ZipForm