import React, { useCallback, useEffect, useState } from 'react';


import './TCReservationToolbar.scss';

import { tcReservationToolbar as text } from '../../../../../data/text';
import TCReservationControl from '../TCReservationControl/TCReservationControl';

const TCReservationToolbar = props => {
  const [totalPrice, setTotalPrice] = useState(0);

  const calcPrice = useCallback(() => {
    setTotalPrice(props.price * props.seatsAmount);
  }, [props.price, props.seatsAmount]);

  useEffect(() => {
    calcPrice();
  }, [calcPrice]);

  const addSeatHandler = () => {
    if (props.availSeats === 0) return;
    props.addSeatToReserve();
    calcPrice()
  }

  const removeSeatHandler = () => {
    if (props.seatsAmount === 1) return;
    props.removeSeatFromReserve();
    calcPrice()
  }

  return (
    <div className='tc-reservation-toolbar'>

      <div className='tc-reservation-toolbar__available-seats'>
        <span className='tc-reservation-toolbar__available-seats-title tc-details__small-text'>
          { text.AVAILABLE_SEATS_TITLE }
        </span>
        <span className='tc-reservation-toolbar__available-seats-value'>
          { props.availableSeats }
        </span>
      </div>

      <div className='tc-reservation-toolbar__controls'>
        <TCReservationControl
          type='decrease'
          onClick={ removeSeatHandler }
          disabled={ props.seatsAmount === 1 } />

        <div className='tc-reservation-toolbar__seats-amount'>
          { props.seatsAmount }
        </div>

        <TCReservationControl
          type='increase'
          onClick={ addSeatHandler }
          disabled={ props.availSeats === 1 } />
      </div>

      <div className='tc-reservation-toolbar__total-price'>
        <span className='tc-reservation-toolbar__price-value'>
          { totalPrice || 0 }
        </span>
        <span className='
          tc-reservation-toolbar__currency 
          tc-details__small-text'>
          { text.CURRENCY }
        </span>
      </div>
    </div>
  );
};

export default TCReservationToolbar;