import React, { useState } from 'react';
import { Button, Fade } from '@material-ui/core';

import './Auth.scss';

import { useOffline } from '../../../shared/hooks/useOffline';
import { authPage as text } from '../../../data/text';
import { useHttpClient } from '../../../shared/hooks/useHttp';
import { useAuthContext } from '../../../shared/context/AuthContext';
import PageHeader from '../../../shared/components/PageHeader/PageHeader';
import AuthForm from '../../components/AuthForm/AuthForm';
import CsDialog from '../../../shared/components/UI/CsDialog/CsDialog';
import CsBackdrop from '../../../shared/components/UI/CsBackdrop/CsBackdrop';

const Auth = () => {
  const [signupMode, setSignupMode] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);

  const { isOffline, offlineNotification } = useOffline();
  const { isLoading, sendRequest } = useHttpClient();
  const { login } = useAuthContext();

  const toggleMode = () => {
    setSignupMode(signupMode => !signupMode);
  }

  const sendAuthRequest = async data => {
    const mode = signupMode ? 'signup' : 'login';

    try {
      const resData = await sendRequest(
        `${ process.env.REACT_APP_BACKEND_URL }/api/driver/${ mode }`,
        'POST',
        JSON.stringify(data),
        { 'Content-Type': 'application/json' }
      )
      login(resData.driverId, resData.token);

    } catch (err) {
      setDialogContent(err.dialogData);
      setOpenDialog(true);
    }
  }

  const formDataHandler = data => {
    sendAuthRequest(data);
  }

  const dialogClosedHandler = () => {
    openDialog && setOpenDialog(false);
  }

  return (
    <React.Fragment>
      <CsDialog open={ openDialog } content={ dialogContent } onAcceptCb={ dialogClosedHandler } />
      <CsBackdrop open={ isLoading } />
      <PageHeader alignCenter>{ signupMode ? text.TITLE_SIGNUP : text.TITLE_LOGIN }</PageHeader>
      <div className='auth__wrapper'>
        { isOffline ? offlineNotification : <Fade in={ true } { ...{ timeout: 1000 } } >
          <div className='auth__paper paper'>
            <AuthForm
              signupMode={ signupMode }
              formSubmitted={ formDataHandler } />

            <div className='auth__buttons-wrapper'>
              <Button size='small' color='secondary' onClick={ toggleMode }>
                { signupMode ? text.LOGIN_BUTTON_TITLE : text.SIGNUP_BUTTON_TITLE }
              </Button>
            </div>

          </div>
        </Fade> }
      </div>
    </React.Fragment>
  );
};

export default Auth;