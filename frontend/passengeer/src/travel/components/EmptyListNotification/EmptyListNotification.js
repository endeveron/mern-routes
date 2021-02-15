import React from 'react';
import { Fade } from '@material-ui/core';

import './EmptyListNotification.scss';

import { emptyTravelListlNotification as text } from '../../../data/text';
import ContactPhoneButtons from '../../../shared/components/ContactPhones/ContactPhoneButtons';

const EmptyListNotification = () => {
  return (
    <Fade in={ true } { ...{ timeout: 1000 } } >
      <div className='v-align-wrapper'>
        <p className='notification__message'>
          { text.MESSAGE }
        </p>
        <ContactPhoneButtons />
      </div>
    </Fade >
  );
};

export default EmptyListNotification;