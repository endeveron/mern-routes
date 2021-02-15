import React from 'react';
import ContactPhoneButtons from '../../../../shared/components/ContactPhones/ContactPhoneButtons';

import { tcContacts as text } from '../../../../data/text';
import { useDriverData } from '../../../../shared/context/DriverContext';

const TCContacts = () => {
  const { phones, isContactsReady, } = useDriverData();

  return phones && isContactsReady ? (
    <div className='tc-details__container tc-details__container--footer'>
      <h4 className='tc-details__title'>
        { text.TITLE }
      </h4>
      <ContactPhoneButtons />
    </div>) : null
};

export default TCContacts;