import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker({ handlePropertyData }) {

  const handleClick = (e) => {
    let target = { name: 'builtYear', value: e.$y }
    handlePropertyData({ target })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        fullWidth
        views={['year']}
        label="Year Built"
        onChange={handleClick}
      />
    </LocalizationProvider>
  );
}