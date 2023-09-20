import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';

export default function ConfirmButton({children, loading, type, dialogTitle, dialogDescription, handleConfirmation}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = (e) => {
    handleConfirmation(e);
    setOpen(false);
  };

  return (
    <>
      <LoadingButton type={type} loading={loading} variant='contained'  onClick={(e) => {handleClickOpen(e)}}>
        {children}
      </LoadingButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogDescription}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={(e) =>  {handleApply(e)}} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}