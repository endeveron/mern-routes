import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide, Dialog } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ ref } { ...props } />;
});

const dialogRoot = document.getElementById('dialog-root');

/** <MyDialog
 *    open={ boolean }
 *    content={ 
 *      title: string,
 *      message: string,
 *      btnText?: string,
 *      secondBtnText?: string,
 *    } /> 
 */

const MyDialog = props => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleClose = () => {
    setOpen(false);
    props.onClose && props.onClose();
  };

  return props.content ? (
    ReactDOM.createPortal(
      <Dialog
        open={ open }
        TransitionComponent={ Transition }
        keepMounted
        onClose={ handleClose }
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{ props.content.title }</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            { props.content.message }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          { props.content.secondBtnText && <Button onClick={ handleClose } color="primary" style={ { padding: '1rem' } }>
            { props.content.secondBtnText }
          </Button> }
          <Button onClick={ handleClose } style={ { padding: '1rem' } } color="primary">
            { props.content.btnText || 'Добре' }
          </Button>
        </DialogActions>
      </Dialog>, dialogRoot
    )) : null;
};

export default MyDialog;