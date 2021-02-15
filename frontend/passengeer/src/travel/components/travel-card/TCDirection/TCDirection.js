import React from 'react';

import './TCDirection.scss';

const TCDirection = props => (
  <div className='tc-direction'>
    <div className='tc-direction__row'>
      <div className='tc-direction__time'>
        { props.departureTime }
      </div>
      <div className='tc-direction__location'>
        <span className='tc-direction__city'>
          { props.departureCity }
        </span>
        <span className='tc-direction__place'>
          { props.departurePlace }
        </span>
      </div>
    </div>
    <div className='tc-direction__row arrival'>
      <div className='tc-direction__time'>
        { props.arrivalTime }
      </div>
      <div className='tc-direction__location'>
        <span className='tc-direction__city'>
          { props.arrivalCity }
        </span>
        <span className='tc-direction__place'>
          { props.arrivalPlace }
        </span>
      </div>
    </div>
  </div>
);

export default React.memo(TCDirection);