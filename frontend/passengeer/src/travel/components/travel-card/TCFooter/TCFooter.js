import React from 'react';

import './TCFooter.scss';

const TCFooter = props => (
  <div className='tc__footer'>
    <div className='tc__column tc__left-column'>
      { props.promoNotification && (
        <div className='tc__notification tc__luggage-notification'>
          { props.promoNotification }
        </div>) }
    </div>
    <div className='tc__column tc__right-column'>
      <div className='tc__seats'>
        <span className='tc__seats-title'>місць</span>
        <span className='tc__seats-value'>
          { props.availableSeats }
        </span>
      </div>
      <div className='tc__price'>
        <span className='tc__price-value'>
          { props.price }
        </span>
        <span className='tc__currency'>грн</span>
      </div>
    </div>
  </div>
);

export default TCFooter;