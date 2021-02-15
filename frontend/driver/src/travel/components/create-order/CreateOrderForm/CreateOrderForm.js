import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

import './CreateOrderForm.scss';

const CreateOrderForm = props => {

  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState(props.defaultPhoneNumber);
  const [notificationInput, setNotificationInput] = useState('');
  const [isWrongPhone, setIsWrongPhone] = useState(false);

  const phoneInputHandler = e => {
    setPhoneInput(e.target.value);

    // check the phone input validity
    const prepNumber = e.target.value.replace(/\s/g, '');
    const isCorrect = prepNumber.match(/^\+\d{12}$/);
    isCorrect ? setIsWrongPhone(false) : setIsWrongPhone(true);
  }

  const submitHandler = e => {
    e.preventDefault();

    const defNumber = props.defaultPhoneNumber.replace(/\s/g, '');
    const prepNumber = phoneInput.replace(/\s/g, '');
    if (prepNumber === defNumber) {
      setIsWrongPhone(true);
      return;
    }

    // output form data
    props.onSubmit(nameInput, prepNumber, notificationInput);

    // reset form to default values
    setNameInput('');
    setPhoneInput(props.defaultPhoneNumber);
    setNotificationInput('');
    setIsWrongPhone(false);
  };

  return (
    <form className='create-order-form' onSubmit={ submitHandler } autoComplete="off" >
      <div className='create-order-form__field-wrapper'>
        <TextField
          id='passengerName'
          label={ props.passengerNameFieldLabel }
          value={ nameInput }
          inputProps={ { maxLength: 20 } }
          onChange={ e => setNameInput(e.target.value) }
          variant='outlined'
          required />
      </div>
      <div className='create-order-form__field-wrapper'>
        <TextField
          id='passengerPhone'
          label={ props.passengerPhoneFieldLabel }
          value={ phoneInput }
          inputProps={ { maxLength: 17 } }
          onChange={ e => phoneInputHandler(e) }
          variant='outlined'
          required
          error={ isWrongPhone }
          helperText={ isWrongPhone ? props.errorMessage : false } />
      </div>
      <div className='create-order-form__field-wrapper'>
        <TextField
          id='notification'
          label={ props.passengerNotificationFieldLabel }
          value={ notificationInput }
          inputProps={ { maxLength: 30 } }
          onChange={ e => setNotificationInput(e.target.value) }
          variant='outlined' />
      </div>
      <div className='create-order-form__buttons-wrapper'>
        <Button type='submit' variant='contained' color='primary'>{ props.submitBtnTitle }</Button>
        <Button onClick={ props.close } type='button' color='primary'>{ props.cancelBtnTitle }</Button>
      </div>
    </form>
  );
};

export default CreateOrderForm;