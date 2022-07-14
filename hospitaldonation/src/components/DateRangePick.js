import * as React from 'react';
import TextField from '@mui/material/TextField';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Box from '@mui/material/Box';

export default function DateRangePick(props) {
  const { value, onChange, renderInput} = props;
  // const [value, setValue] = React.useState([null, null]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
      format="MMM/dd/yyyy"
        startText="Check-in"
        endText="Check-out"
        value={value}
        onChange={onChange}
        renderInput={renderInput}
      />
    </LocalizationProvider>
  );
}