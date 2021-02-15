import React from 'react';
import { Fade } from '@material-ui/core';
import SignalWifiOffIcon from '@material-ui/icons/SignalWifiOff';

import './OfflineNotification.scss';

import { offlineNotification as text } from '../../../../data/text';

const OfflineNotification = () => (
  <Fade in={ true } { ...{ timeout: 800 } } >
    <div className='offline-notification'>
      <h3 className='offline-notification__title'>
        <SignalWifiOffIcon className='offline-notification__icon' />
        { text.TITLE }
      </h3>
      <p className='offline-notification__message'>
        { text.MESSAGE }
      </p>
    </div>
  </Fade>);

export default OfflineNotification;