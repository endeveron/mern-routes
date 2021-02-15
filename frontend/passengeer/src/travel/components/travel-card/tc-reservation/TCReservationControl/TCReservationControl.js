import React from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const TCReservationControl = props => {
  const addIcon = <AddIcon fontSize='large' />
  const removeIcon = <RemoveIcon fontSize='large' />

  const map = {
    'increase': {
      ariaLabel: 'додати кількість',
      icon: addIcon
    },
    'decrease': {
      ariaLabel: 'зменшити кількість',
      icon: removeIcon
    }
  }

  return (
    <IconButton
      color='primary'
      className='tc-reservation-toolbar__control'
      onClick={ props.onClick }
      aria-label={ map[props.type].ariaLabel }
      disabled={ props.disabled }>
      {map[props.type].icon }
    </IconButton>
  );
};

export default TCReservationControl;