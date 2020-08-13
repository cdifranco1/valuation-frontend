import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  paper: {
    position: "absolute",
    width: "40%",
    top: "25%",
    left: "40%"
  }
})

export default function AlertDialog({ handleDelete, model }) {
  const classes = useStyles()
  const [ open, setOpen ] = useState(false)

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
        <div className="w-1/5 flex justify-center p-2">
          <button className="self-start p-1 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-700 active:bg-red-800 focus:outline-none focus:shadow-outline" onClick={handleClickOpen}>
            Delete
          </button>
        </div>
        <Dialog
          fullWidth
          classes={{
            paper: classes.paper
          }}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`Permanently delete ${model.projectName}?`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Once this model is deleted it cannot be recovered.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={handleClose} 
              color="primary"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                handleDelete(model._id)
                handleClose()
              }} 
              color="primary"
              variant="contained" 
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
    </>
  );
}