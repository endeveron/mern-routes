import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide, Dialog } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ ref } { ...props } />;
});

const dialogRoot = document.getElementById('dialog-root');

/**   PROPS
 *    
 *    open={ boolean }
 *    content={ 
 *      title: string,
 *      message: string,
 *      btnText?: string,
 *      secondBtnText?: string,
 *    } 
 *    onAcceptCb?
 *    onCancelCb?
 **/

const CsDialog = props => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const onCloseHandler = () => {
    setOpen(false);
  };

  const onAcceptHandler = () => {
    onCloseHandler();
    props.onAcceptCb && props.onAcceptCb();
  }

  const onCancellHandler = () => {
    onCloseHandler();
    props.onCancelCb && props.onCancelCb();
  }

  return props.content ? (
    ReactDOM.createPortal(
      <Dialog
        open={ open }
        TransitionComponent={ Transition }
        keepMounted
        onClose={ onCloseHandler }
        aria-labelledby="заголовок діалогового вікна"
        aria-describedby="текст діалогового вікна"
      >
        <DialogTitle id="alert-dialog-slide-title">{ props.content.title }</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            { props.content.message }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          { props.content.secondBtnText && <Button onClick={ onCancellHandler } color="secondary" style={ { padding: '1rem' } }>
            { props.content.secondBtnText }
          </Button> }
          <Button onClick={ onAcceptHandler } style={ { padding: '1rem' } } color="primary">
            { props.content.btnText || 'Добре' }
          </Button>
        </DialogActions>
      </Dialog>, dialogRoot
    )) : null;
};

export default CsDialog;