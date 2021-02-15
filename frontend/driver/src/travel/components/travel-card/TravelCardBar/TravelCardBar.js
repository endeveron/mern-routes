import React from 'react';
import { Button, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import './TravelCardBar.scss';

import { travelCardBar as text } from '../../../../data/text';
import { ReactComponent as SeatIcon } from '../../../../assets/icons/seat-icon.svg';

const TravelCardBar = props => {
  const totalPrice = ((props.seatsReserved && props.seatsReserved > 0) ? props.price * props.seatsReserved : '');
  let lugPriceA = ' - ';
  let lugPriceB = ' - ';
  if (props.luggagePrices) {
    props.luggagePrices[0] && (lugPriceA = props.luggagePrices[0]);
    props.luggagePrices[1] && (lugPriceB = props.luggagePrices[1]);
  }

  const isNoSeatsReserved = (props.seatsReserved === 0);
  const noAvailableSeats = (props.seatsAmount === props.seatsReserved)

  return (
    <div className='travel-card__bar'>
      <div className='travel-card__bar-income travel-card__left-col'>
        { totalPrice }
      </div>
      <div className='travel-card__bar-content travel-card__right-col'>
        <div className='travel-card__bar-prices'>
          { props.price } / { lugPriceA } / { lugPriceB }
        </div>
        <div className='travel-card__bar-seats'>
          <div className='travel-card__bar-seats-button'>
            <Button
              size="large"
              color='primary'
              onClick={ props.showOrderList }
              startIcon={ <SeatIcon /> }>
              <span className={ `travel-card__bar-seats-button-text ${ isNoSeatsReserved && 'travel-card__bar-seats-button-text-disabled' }` }>{ props.seatsReserved }</span>
            </Button>
          </div>
          <div className='travel-card__bar-seats-button'>
            <IconButton
              color='primary'
              onClick={ props.addSeat }
              disabled={ noAvailableSeats }
              aria-label={ text.ADD_BUTTON_ARIA_LABEL }>
              <AddIcon fontSize='large' />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TravelCardBar);