import React from 'react';

import './TCReservationTitle.scss';

import { tcReservationTitle as text } from '../../../../../data/text';

const TCReservationTitle = props => (
  <h4 className='tc-details__title'>
    { props.isReserved
      ? text.RESERVED
      : props.noSeats
        ? (<React.Fragment>
          { text.NO_SEATS_TITLE_ROW_1 } <br /> { text.NO_SEATS_TITLE_ROW_2 }
        </React.Fragment>)
        : text.NOT_RESERVED
    }
  </h4>
);

export default TCReservationTitle;