import React from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import './TravelCardHeader.scss';

import { travelCardHeader as text } from '../../../../data/text';

const TravelCardHeader = ({
  departureDate,
  departureCity,
  arrivalCity,
  progress,
  onEdit
}) => (
    <div className='travel-card-header'>
      <div className='travel-card-header__filling'>

        <div className='travel-card-header__filling-content'>
          <div className='travel-card-header__depart-date travel-card__left-col'>
            { departureDate }
          </div>
          <div className='travel-card-header__content travel-card__right-col'>
            <div className='travel-card-header__direction'>{ departureCity } - { arrivalCity }</div>
            <div className='travel-card-header__button'>
              <IconButton
                color='secondary'
                className='travel-card-header__button'
                onClick={ onEdit }
                aria-label={ text.EDIT_BUTTON_ARIA_LABEL }>
                <EditIcon />
              </IconButton>
            </div>
          </div>
        </div>

        <div
          style={ { width: progress ? `${ progress * 100 }%` : 0 } }
          className='travel-card-header__filling-progress'></div>
      </div>
    </div>
  );

export default React.memo(TravelCardHeader);