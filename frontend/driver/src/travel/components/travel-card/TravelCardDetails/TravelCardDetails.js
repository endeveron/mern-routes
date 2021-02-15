import React from 'react';

import './TravelCardDetails.scss';

const TravelCardDetails = props => {

  return (
    <div className='travel-card__details'>
      <div className='travel-card__details-depart-day travel-card__left-col'>
        { props.departureDay }
      </div>
      <div className='travel-card__details-time travel-card__right-col'>
        <span>{ props.departureTime }</span>
        <span className='arrival'> - { props.arrivalTime }</span>
      </div>
    </div>
  )
};

export default React.memo(TravelCardDetails);
