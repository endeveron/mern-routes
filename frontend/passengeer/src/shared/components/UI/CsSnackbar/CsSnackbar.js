import React, { useEffect, useState } from 'react';
import { IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const CsSnackbar = props => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    props.open && setOpen(true);
  }, [props.open])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={ {
        vertical: 'bottom',
        horizontal: 'left',
      } }
      open={ open }
      autoHideDuration={ 60000 }
      onClose={ handleClose }
      message={ props.message }
      action={
        <React.Fragment>
          <IconButton size="small" aria-label="close" color="inherit" onClick={ handleClose }>
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};

export default CsSnackbar;