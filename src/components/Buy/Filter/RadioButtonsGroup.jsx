import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioButtonsGroup({ name, items, handleChange }) {
  return (
    <FormControl>
      {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        // defaultValue={items[0]}
        onChange={handleChange}
        name={name}
      >
        {
          items.map(item => (
            <FormControlLabel value={item} control={<Radio />} label={item} />
          ))
        }
      </RadioGroup>
    </FormControl>
  );
}