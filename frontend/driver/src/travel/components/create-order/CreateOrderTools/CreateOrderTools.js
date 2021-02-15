import React from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import './CreateOrderTools.scss';

import { createOrderTools as text } from '../../../../data/text';

const CreateOrderTools = props => {
  return (
    <div className='create-order__tools'>
      <div className='create-order__available-seats'>
        <span className='create-order__available-seats-title create-order__small-text'>{ props.availSeatsTitle }</span>
        <span className='create-order__available-seats-value'>{ props.availSeatsFixed }</span>
      </div>
      <div className='create-order__controls'>
        <IconButton
          color='primary'
          className='create-order__control'
          onClick={ props.removeSeatFromReserve }
          aria-label={ text.INCREASE_BUTTON_ARIA_LABEL }
          disabled={ props.seatsAmount === 1 }>
          <RemoveIcon fontSize='large' />
        </IconButton>
        <div className='create-order__seats-amount'>{ props.seatsAmount }</div>
        <IconButton
          color='primary'
          className='create-order__control'
          onClick={ props.addSeatToReserve }
          aria-label={ text.DECREASE_BUTTON_ARIA_LABEL }
          disabled={ props.availSeats === 1 }>
          <AddIcon fontSize='large' />
        </IconButton>
      </div>
      <div className='create-order__total-price'>
        <span className='create-order__price-value'>{ props.totalPrice || 0 }</span>
        <span className='create-order__currency create-order__small-text'>{ props.currency }</span>
      </div>
    </div>
  );
};

export default CreateOrderTools;