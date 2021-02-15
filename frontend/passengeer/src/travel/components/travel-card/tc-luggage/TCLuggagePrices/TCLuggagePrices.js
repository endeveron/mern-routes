import React from 'react';

import './TCLuggagePrices.scss';

import TCLuggagePrice from '../TCLuggagePrice/TCLuggagePrice';

const TCLuggagePrices = ({ luggagePrices }) => {

  const large = luggagePrices[0];
  const small = luggagePrices[1];

  return (
    <div className='tc-luggage-prices'>
      { small ? <TCLuggagePrice luggageSize='small' price={ small } /> : null }
      { large ? <TCLuggagePrice luggageSize='large' price={ large } /> : null }
    </div>
  )
};

export default TCLuggagePrices;