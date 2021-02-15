import React from 'react';
import { Button } from '@material-ui/core';

import './ContactPhoneButtons.scss';

import { useDriverData } from '../../context/DriverContext';

const ContactPhoneButtons = () => {
  const { phones } = useDriverData();

  return phones ? (
    <div className='contact-phone-buttons'>
      { phones.map((phone) => (
        <Button
          key={ phone }
          href={ 'tel:+38' + phone }
          variant='contained'>
          { phone }
        </Button>
      )) }
    </div>) : null
}

export default ContactPhoneButtons;