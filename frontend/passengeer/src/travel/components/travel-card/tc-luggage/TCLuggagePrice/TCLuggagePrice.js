import React from 'react';

import './TCLuggagePrice.scss';

import { tcLuggage as text } from '../../../../../data/text';

const TCLuggagePrice = props => {
  const map = {
    'large': text.LARGE_DIMENTIONS,
    'small': text.SMALL_DIMENTIONS,
  }

  return (
    <div className='tc-luggage-price'>
      <span className='tc-luggage-price__dimensions'>{ map[props.luggageSize] }</span>
      <span className='tc-details__small-text'>{ text.LENGTH_UNIT }</span>
      <span className='tc-luggage-price__value'>{ props.price }</span>
      <span className='tc-details__small-text'>{ text.CURRENCY }</span>
    </div>
  );
};

export default TCLuggagePrice;