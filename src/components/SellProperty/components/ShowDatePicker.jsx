import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function ShowDatePicker({ propertyData }) {


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        fullWidth
        views={['year']}
        label="Year Built"
        value={dayjs(propertyData?.builtYear || '2000')}
      />
    </LocalizationProvider>
  );
}