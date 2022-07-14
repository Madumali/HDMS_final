import * as React from 'react';
import Alert from '@mui/material/Alert';
// import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function ActionAlerts(props) {

  const {children, onClose,action, ...other } = props;
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity='error'  onClose={onClose} > {props.children}</Alert>
      {/* <Alert
        action={
          <Button color="inherit" size="small">
            UNDO
          </Button>
        }
      >
        This is a success alert — check it out!
      </Alert> */}
    </Stack>
  );
}
