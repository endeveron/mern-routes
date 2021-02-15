import React, { useState } from 'react';
import { Button } from '@material-ui/core';

import './TCReservationForm.scss';

import { tcReservation as text } from '../../../../../../data/text';
import TCReservationFormField from '../TCReservationFormField/TCReservationFormField';
import { useForm } from '../../../../../../shared/hooks/useForm';
import { useOffline } from '../../../../../../shared/hooks/useOffline';

const initialValues = {
  name: '',
  phone: text.DEFAULT_PHONE_NUMBER,
  notification: ''
}

const TCReservationForm = props => {
  const { isOffline } = useOffline();
  const { inputValues, setInputValues, inputHandler } = useForm(initialValues);
  const [isWrongPhone, setIsWrongPhone] = useState(false);

  const phoneInputHandler = e => {
    inputHandler(e);

    // check the phone input validity
    const prepNumber = e.target.value.replace(/\s/g, '');
    const isCorrect = prepNumber.match(/^\+\d{12}$/);
    isCorrect ? setIsWrongPhone(false) : setIsWrongPhone(true);
  }

  const submitHandler = e => {
    e.preventDefault();
    if (isOffline) return;

    const defNumber = text.DEFAULT_PHONE_NUMBER.replace(/\s/g, '');
    const prepNumber = inputValues.phone.replace(/\s/g, '');
    if (prepNumber === defNumber) {
      setIsWrongPhone(true);
      return;
    }

    // output form data
    const outputData = {
      notification: inputValues.notification,
      person: {
        name: inputValues.name,
        phone: prepNumber,
        isConfirmed: false
      }
    }
    props.onSubmit(outputData);

    // reset form to default values
    setInputValues(initialValues);
    setIsWrongPhone(false);
  };


  return (
    <form className='tc-reservation-form' onSubmit={ submitHandler } autoComplete="off" >
      <TCReservationFormField
        name='name'
        label={ text.NAME_FIELD_LABEL }
        value={ inputValues.name }
        inputProps={ { maxLength: 20 } }
        onChange={ inputHandler }
        required />

      <TCReservationFormField
        name='phone'
        label={ text.PHONE_FIELD_LABEL }
        value={ inputValues.phone }
        inputProps={ { maxLength: 17 } }
        onChange={ phoneInputHandler }
        error={ isWrongPhone }
        helperText={ isWrongPhone ? text.PHONE_INPUT_ERROR_MESSAGE : false }
        required />

      <TCReservationFormField
        name='notification'
        label={ text.NOTIFICATION_FIELD_LABEL }
        value={ inputValues.notification }
        inputProps={ { maxLength: 30 } }
        onChange={ inputHandler } />

      <div className='tc-reservation-form__notification-wrapper'>
        <div className='tc-reservation-form__agree-notification'>
          { text.AGREE_NOTIFICATION }
        </div>
      </div>

      <div className='tc-reservation-form__buttons'>
        <Button type='submit' variant='contained' color='primary' disabled={ props.seatsAmount === 0 }>{ text.SUBMIT_TITLE }</Button>
      </div>
    </form>
  );
};

export default TCReservationForm;