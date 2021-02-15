import React, { useState, useEffect } from 'react';
import { Backdrop, makeStyles, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const CsBackdrop = props => {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Backdrop className={ classes.backdrop } open={ open } onClick={ handleClose }>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default CsBackdrop;