import React from 'react';

import { tcLuggage as text } from '../../../../../data/text';
import TCLuggagePrices from '../TCLuggagePrices/TCLuggagePrices';
import ContactPhoneButtons from '../../../../../shared/components/ContactPhones/ContactPhoneButtons';

const TCLuggage = props => (
  <div className='tc-details__container tc-details__container--footer'>
    <h4 className='tc-details__title'>
      { !props.isReserved && text.TITLE_ROW_1_OR }{ text.TITLE_ROW_1 }<br />{ text.TITLE_ROW_2 }
    </h4>
    <TCLuggagePrices luggagePrices={ props.luggagePrices } />
    <ContactPhoneButtons />
  </div>
);

export default TCLuggage;