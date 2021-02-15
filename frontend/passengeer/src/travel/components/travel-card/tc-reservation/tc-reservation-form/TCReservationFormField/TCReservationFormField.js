import { TextField } from '@material-ui/core';
import React from 'react';

const TCReservationFormField = props => {
  return (
    <div className='tc-reservation-form__field'>
      <TextField
        id={ props.name }
        name={ props.name }
        label={ props.label }
        value={ props.value }
        inputProps={ props.inputProps }
        onChange={ props.onChange }
        required={ props.required }
        error={ props.error }
        helperText={ props.helperText }
        variant='outlined' />
    </div>
  );
};

export default TCReservationFormField;