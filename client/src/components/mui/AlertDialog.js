import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';


// const useStyles = makeStyles({
//   dialog: {
//     position: "absolute",
//     width: "30%",
//     top: "50%",
//     left: "50%"
//   }
// })

export default function AlertDialog({ handleDelete, model }) {
  // const classes = useStyles()
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
        <button className="w-3/5 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-700 active:bg-red-800 focus:outline-none focus:shadow-outline" onClick={handleClickOpen}>
          Delete
        </button>
        <Dialog
          // className={classes.dialog}
          style={{
            position: "relative",
            // width: "30%"
            // top: "25%"
          }}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Permanently delete model?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Once a model is deleted it cannot be recovered.
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
      </div>
    </>
  );
}