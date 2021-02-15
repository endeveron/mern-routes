import React from 'react';

import './TCHeader.scss';

const TCHeader = props => (
  <div className='tc-header'>
    <div className='tc-header__depart-date'>
      { props.departureDate }
    </div>
    <div className='tc-header__content'>
      { props.detailMode
        ? <span className='tc-header__day'>{ props.departureDay }</span>
        : <span className='tc-header__direction'>{ props.departureCity } - { props.arrivalCity }</span>
      }
    </div>
  </div>
);

export default React.memo(TCHeader);