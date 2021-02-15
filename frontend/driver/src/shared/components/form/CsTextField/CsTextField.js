import React from 'react';
import { TextField } from '@material-ui/core';

const CsTextField = props => (
  <TextField
    id={ props.name }
    name={ props.name }
    className={ props.className }
    label={ props.label }
    value={ props.value }
    placeholder={ props.placeholder }
    onChange={ props.onChange }
    onKeyPress={ props.onKeyPress && props.onKeyPress }
    type={ props.type && props.type }
    multiline={ props.multiline }
    fullWidth={ props.fullWidth }
    rows={ props.rows }
    inputProps={ props.inputProps }
    required={ props.required }
    error={ props.error }
    helperText={ props.helperText }
    variant='outlined'
    margin='normal' />
);

export default CsTextField;