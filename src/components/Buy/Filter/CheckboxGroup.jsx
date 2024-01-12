import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React from 'react'

const CheckboxGroup = ({ items, handleChange }) => {
  return (
    <div className=" ml-4">
      <FormGroup>
        {
          items.map((ell, j) => (
            <FormControlLabel control={<Checkbox name={ell} onChange={handleChange} />} label={ell} key={j} />
          ))
        }
      </FormGroup>
    </div>
  )
}

export default CheckboxGroup