import { Button } from '@material-ui/core';
import React, { useState } from 'react';

import './AuthForm.scss';

import { authForm as text } from '../../../data/text';
import { useForm } from '../../../shared/hooks/useForm';
import CsTextField from '../../../shared/components/form/CsTextField/CsTextField';

const AuthForm = props => {
  const { signupMode } = props;

  const [phone1Error, setPhone1Error] = useState(false);
  const [phone2Error, setPhone2Error] = useState(false);
  const [phone3Error, setPhone3Error] = useState(false);

  const { inputValues, inputChangeHandler } = useForm({
    code: '',
    email: '',
    password: '',
    phone1: '',
    phone2: '',
    phone3: ''
  });

  const preparePhone = data => data.replace(/\s/g, '');

  const checkPhoheValidity = num => (preparePhone(num).length === 10) ? true : false;

  const phoneChangeHandler = e => {
    inputChangeHandler(e)
    const el = e.target;
    switch (el.name) {
      case 'phone1': checkPhoheValidity(el.value) ? setPhone1Error(false) : setPhone1Error(true);
        break;
      case 'phone2': ((el.value.length === 0) || checkPhoheValidity(el.value)) ? setPhone2Error(false) : setPhone2Error(true);
        break;
      case 'phone3': ((el.value.length === 0) || checkPhoheValidity(el.value)) ? setPhone3Error(false) : setPhone3Error(true);
        break;
      default: return;
    }
  }

  const phonesToArray = () => {
    let phones = [preparePhone(inputValues.phone1)];
    inputValues.phone2 && phones.push(preparePhone(inputValues.phone2));
    inputValues.phone3 && phones.push(preparePhone(inputValues.phone3));
    return phones
  }

  const submitHandler = e => {
    e.preventDefault();
    let outputData;

    if (signupMode) {
      const phones = phonesToArray();

      outputData = {
        code: inputValues.code,
        email: inputValues.email,
        password: inputValues.password,
        phones
      }
    } else {

      outputData = {
        email: inputValues.email,
        password: inputValues.password
      }
    }
    props.formSubmitted(outputData)
  }

  return (

    <form className='auth-form' onSubmit={ submitHandler } autoComplete="off" >

      { signupMode && <CsTextField
        name='code'
        className='auth-form__field'
        label={ text.CODE_INPUT_LABEL }
        value={ inputValues.code }
        onChange={ inputChangeHandler }
        required /> }

      <CsTextField
        name='email'
        className='auth-form__field'
        label={ text.EMAIL_INPUT_LABEL }
        value={ inputValues.email }
        type='email'
        onChange={ inputChangeHandler }
        required />

      <CsTextField
        name='password'
        className='auth-form__field'
        type='password'
        label={ text.PSWRD_INPUT_LABEL }
        inputProps={ { minLength: 6 } }
        value={ inputValues.password }
        onChange={ inputChangeHandler }
        required />

      { signupMode && (
        <React.Fragment>
          <p className='notification'>{ text.PHONES_NOTIFICATION }</p>
          <CsTextField
            name='phone1'
            className='auth-form__field'
            label={ text.PHONE_INPUT_LABEL }
            value={ inputValues.phone1 }
            onChange={ phoneChangeHandler }
            placeholder={ text.PHONE_PLACEHOLDER }
            error={ phone1Error }
            required />

          <CsTextField
            name='phone2'
            className='auth-form__field'
            label={ text.PHONE_ADD_INPUT_LABEL }
            value={ inputValues.phone2 }
            onChange={ phoneChangeHandler }
            placeholder={ text.PHONE_PLACEHOLDER }
            error={ phone2Error }
          />

          <CsTextField
            name='phone3'
            className='auth-form__field'
            label={ text.PHONE_ADD_INPUT_LABEL }
            value={ inputValues.phone3 }
            onChange={ phoneChangeHandler }
            placeholder={ text.PHONE_PLACEHOLDER }
            error={ phone3Error }
          />
        </React.Fragment>
      ) }

      <div className='auth-form__buttons-wrapper'>
        <Button type='submit' variant='contained' color='primary'>
          { signupMode ? text.SIGNUP_SUBMIT_BUTTON_TITLE : text.LOGIN_SUBMIT_BUTTON_TITLE }
        </Button>
      </div>
    </form>
  );
};

export default AuthForm;