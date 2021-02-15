import React, { useCallback, useEffect, useState } from "react";
import { Button, Snackbar } from "@material-ui/core";

import { appUpdateSnackbar as text } from '../../data/text';
import * as serviceWorker from '../../serviceWorker';

export const useUpdate = () => {
  const [waitingSW, setWaitingSW] = useState();
  const [newVersionAvailable, setNewVersionAvailable] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const onServiceWorkerUpdate = registration => {
    setWaitingSW(registration && registration.waiting);
    setNewVersionAvailable(true);
  }

  const updateServiceWorker = useCallback(() => {
    waitingSW && waitingSW.postMessage({ type: 'SKIP_WAITING' })
    setNewVersionAvailable(false);
    window.location.reload();
  }, [waitingSW]);

  const checkUpdates = useCallback(() => {
    if (process.env.NODE_ENV === 'production') {
      serviceWorker.register({ onUpdate: onServiceWorkerUpdate });
    }
  }, []);

  useEffect(() => {
    newVersionAvailable && setOpenSnackbar(true);
  }, [newVersionAvailable])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const updatesSnackbar = newVersionAvailable ? (
    <Snackbar
      anchorOrigin={ {
        vertical: 'bottom',
        horizontal: 'left',
      } }
      open={ openSnackbar }
      autoHideDuration={ 15000 }
      onClose={ handleClose }
      message={ text.MESSAGE }
      action={
        <Button
          size='small'
          color='primary'
          onClick={ updateServiceWorker }
          aria-label={ text.ACTION_BUTTON_TITLE } >
          { text.ACTION_BUTTON_TITLE }
        </Button>
      }
    />
  ) : null

  return { checkUpdates, updatesSnackbar };
}