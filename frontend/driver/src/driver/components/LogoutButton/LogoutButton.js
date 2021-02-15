import React from 'react';
import { Tooltip } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import './LogoutButton.scss';

import { useAuthContext } from '../../../shared/context/AuthContext';
import { toolButtons as text } from '../../../data/text';

const LogoutButton = () => {
  const { isLoggedIn, logout } = useAuthContext();

  const buttonHandler = () => {
    logout();
  }

  return isLoggedIn ? (
    <div className='tool-button tool-button--logout'>
      <Tooltip title={ text.LOGOUT_BUTTON_TOOLTIP_TITLE } arrow>
        <ExitToAppIcon onClick={ buttonHandler } color='primary' />
      </Tooltip>
    </div>
  ) : null
};

export default LogoutButton;