import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert  from '@mui/material/Alert';

export default function UserAlert({isOpen, duration = 3000, onClose, children, status, testId = "user-alert"}) {

    return (
    <Snackbar 
        open={isOpen} 
        autoHideDuration={duration} 
        onClose={onClose}
        data-test-id={testId} 
    >
        <Alert  severity={status} sx={{ width: '100%' }}>
           {children}
        </Alert>
    </Snackbar>
    )
}