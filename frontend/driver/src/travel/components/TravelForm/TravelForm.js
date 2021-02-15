import React, { useCallback, useEffect, useState } from 'react';
import { TextField, Button } from '@material-ui/core';

import './TravelForm.scss';

import { useForm } from '../../../shared/hooks/useForm';
import { useTravelData } from '../../../shared/context/TravelContext';
import { travelForm as text } from '../../../data/text';
import { useAuthContext } from '../../../shared/context/AuthContext';
import CsFieldGroup from '../../../shared/components/form/CsFieldGroup/CsFieldGroup';
import CsTextField from '../../../shared/components/form/CsTextField/CsTextField';
import CsDatePicker from '../../../shared/components/form/CsDatePicker/CsDatePicker';
import CsTimePicker from '../../../shared/components/form/CsTimePicker/CsTimePicker';

const DEPARTURE_FIELD_GROUP_TITLE = 'Відправлення';
const DEPARTURE_DATE_FIELD_LABEL = 'Дата';
const DEPARTURE_TIME_FIELD_LABEL = 'Час';
const DEPARTURE_CITY_FIELD_LABEL = 'Місто';
const DEPARTURE_PLACE_FIELD_LABEL = 'Місце';

const ARRIVAL_FIELD_GROUP_TITLE = 'Прибуття';
const ARRIVAL_TIME_FIELD_LABEL = 'Час';
const ARRIVAL_CITY_FIELD_LABEL = 'Місто';
const ARRIVAL_PLACE_FIELD_LABEL = 'Місце';

const SEATS_GROUP_TITLE = 'Місця';
const PRICE_FIELD_LABEL = 'Вартість місця';
const SEATS_AMOUNT_FIELD_LABEL = 'Кількість місць';
const SEATS_AMOUNT_ERROR = 'В резерві вже є більше місць';

const LUGGAGE_FIELD_GROUP_TITLE = 'Вартість доставки багажу';
const LARGE_LUGGAGE_PRICE_FIELD_LABEL = 'Великий (60х80см)';
const SMALL_LUGGAGE_PRICE_FIELD_LABEL = 'Малий (40х60см)';


const newDate = new Date();

const initialValues = {
  departureDate: newDate,
  departureTime: newDate,
  departureCity: 'Київ',
  departurePlace: 'Центральний автовокзал',
  arrivalTime: newDate,
  arrivalCity: 'Одеса',
  arrivalPlace: 'Центральний автовокзал',
  price: 400,
  largeLuggagePrice: '',
  smallLuggagePrice: ''
}

const TravelForm = props => {
  const { editMode } = props;

  const [seatsAmount, setSteatsAmount] = useState(props.totalSeatsAmount);
  const [seatsAmountError, setSeatsAmountError] = useState(false);

  const { driverId } = useAuthContext();
  const { travelToEdit } = useTravelData();
  const { inputValues, setInputValues, inputChangeHandler } = useForm(initialValues);


  const editModeHandler = useCallback(() => {
    const t = travelToEdit
    let upd = {}

    setSteatsAmount(t.seatsAmount);

    for (const key in initialValues) {
      upd[key] = t[key]
    }
    if (t.luggagePrices && !!t.luggagePrices.length && (t.luggagePrices.length > 0)) {
      upd.largeLuggagePrice = t.luggagePrices[0] || '';
      upd.smallLuggagePrice = t.luggagePrices[1] || '';

    } else {
      upd.largeLuggagePrice = '';
      upd.smallLuggagePrice = '';
    }

    upd.seatsAmount = t.seatsAmount;
    setInputValues(upd);

  }, [travelToEdit, setInputValues])

  useEffect(() => {
    editMode && travelToEdit && editModeHandler();
  }, [editMode, travelToEdit, editModeHandler]);

  const departureTimeHandler = e => {
    const depTime = new Date(e.target.value);
    const h = depTime.getHours();
    const m = depTime.getMinutes();

    // upd departure date
    const depDate = new Date(inputValues.departureDate);
    depDate.setHours(h);
    depDate.setMinutes(m);

    // upd arrival time
    const arrTime = new Date(inputValues.arrivalTime);
    arrTime.setHours(h);
    arrTime.setMinutes(m + 5);

    // upd departure day (not necesarry)
    const depDay = depDate.getDate();
    depTime.setDate(depDay);

    setInputValues({
      ...inputValues,
      departureDate: depDate,
      departureTime: depTime,
      arrivalTime: arrTime
    })
  }

  const arrivalTimeHandler = e => {
    const arrDate = new Date(e.target.value);
    const depDate = new Date(inputValues.departureDate);

    const depDay = depDate.getDate();
    const depHrs = depDate.getHours();
    const depMin = depDate.getMinutes();
    const arrHrs = arrDate.getHours();
    const arrMin = arrDate.getMinutes();

    // calculate minutes count until tomorrow (00:00)
    // 1440 - total minutes count per day (24h * 60m)
    const depMinUntilTomorrow = 1440 - (depHrs * 60 + depMin);
    const arrMinUntilTomorrow = 1440 - (arrHrs * 60 + arrMin);

    // is arrival today
    const arrToday = depMinUntilTomorrow > arrMinUntilTomorrow;
    arrToday ? arrDate.setDate(depDay) : arrDate.setDate(depDay + 1);
    console.log(arrToday);

    setInputValues({
      ...inputValues,
      arrivalTime: arrDate
    })
  }

  const getTravelObject = () => {

    const getBaseProps = () => {
      let newProps = {};

      // remove unnecessary object keys
      const unnecessaryProps = [
        'departureTime',
        'largeLuggagePrice',
        'smallLuggagePrice'
      ];
      for (const key in inputValues) {
        if (!unnecessaryProps.includes(key)) {
          newProps[key] = inputValues[key]
        }
      }

      return newProps;
    }

    const getLuggageProps = () => {
      let luggageProps = {};
      let lPrice = inputValues.largeLuggagePrice;
      let sPrice = inputValues.smallLuggagePrice;

      // to number
      typeof lPrice !== 'number' && (lPrice = Number.parseInt(lPrice));
      typeof sPrice !== 'number' && (sPrice = Number.parseInt(sPrice));

      // check are input fields have proper values
      const isProper = val => !!val && val > 0;
      if (isProper(lPrice) || isProper(sPrice)) {
        let luggagePrices;

        if (isProper(lPrice) && isProper(sPrice)) {
          luggagePrices = [lPrice, sPrice]
        } else if (isProper(lPrice)) {
          luggagePrices = [lPrice, null]
        } else if (isProper(sPrice)) {
          luggagePrices = [null, sPrice]
        }

        luggageProps = {
          luggagePrices,
          promoNotification: props.promoNotification
        }
      }

      return luggageProps;
    }

    let travelObject = {
      creatorId: driverId,
      seatsAmount,
      seatsReserved: editMode ? travelToEdit.seatsReserved : 0,
      ...getBaseProps(),
      ...getLuggageProps(),
    }

    // keep previous data
    if (editMode) {
      travelObject.id = travelToEdit.id

      if (travelToEdit.orders && !!travelToEdit.orders.length && (travelToEdit.orders.length > 0)) {
        travelObject = {
          ...travelObject,
          orders: travelToEdit.orders
        }
      }
    }

    return travelObject
  };

  const seatsAmountHandler = e => {
    setSteatsAmount(parseInt(e.target.value))

    if (editMode && travelToEdit.seatsReserved > 0) {
      if (e.target.value < travelToEdit.seatsReserved) {
        setSeatsAmountError(true)
      } else if (seatsAmountError) {
        setSeatsAmountError(false)
      }
    }
  }

  const preventSubmitHandler = e => e.key === 'Enter' && e.preventDefault();

  const submitHandler = e => {
    e.preventDefault();
    props.onTravelObjectReady(getTravelObject())
  }

  // const cancelBtnHandler = () => {
  //   history.goBack()
  // }

  const deleteBtnHandler = () => {
    props.onDeleteTravel()
  }

  return (
    <form className='travel-form' onSubmit={ submitHandler } autoComplete="off" >

      {/* DEPARTURE */ }

      <CsFieldGroup title={ DEPARTURE_FIELD_GROUP_TITLE }>

        <CsDatePicker
          name='departureDate'
          className='travel-form__field'
          label={ DEPARTURE_DATE_FIELD_LABEL }
          value={ inputValues.departureDate }
          onChange={ inputChangeHandler } />

        <div className='travel-form__field-pair'>

          <CsTimePicker
            name='departureTime'
            className='travel-form__field'
            label={ DEPARTURE_TIME_FIELD_LABEL }
            value={ inputValues.departureTime }
            onChange={ departureTimeHandler } />

          <CsTextField
            name='departureCity'
            className='travel-form__field'
            label={ DEPARTURE_CITY_FIELD_LABEL }
            value={ inputValues.departureCity }
            onChange={ inputChangeHandler }
            required />

        </div>

        <CsTextField
          name='departurePlace'
          className='travel-form__field'
          label={ DEPARTURE_PLACE_FIELD_LABEL }
          value={ inputValues.departurePlace }
          onChange={ inputChangeHandler }
          fullWidth
          multiline
          required />

      </CsFieldGroup>

      {/* ARRIVAL */ }

      <CsFieldGroup title={ ARRIVAL_FIELD_GROUP_TITLE }>

        <div className='travel-form__field-pair'>

          <CsTimePicker
            name='arrivalTime'
            className='travel-form__field'
            label={ ARRIVAL_TIME_FIELD_LABEL }
            value={ inputValues.arrivalTime }
            onChange={ arrivalTimeHandler } />

          <TextField
            id='arrivalCity'
            name='arrivalCity'
            className='travel-form__field'
            label={ ARRIVAL_CITY_FIELD_LABEL }
            value={ inputValues.arrivalCity }
            onChange={ inputChangeHandler }
            variant='outlined'
            margin='normal'
            required />

        </div>

        <TextField
          id='arrivalPlace'
          name='arrivalPlace'
          className='travel-form__field'
          label={ ARRIVAL_PLACE_FIELD_LABEL }
          value={ inputValues.arrivalPlace }
          onChange={ inputChangeHandler }
          variant='outlined'
          margin='normal'
          fullWidth
          multiline
          required />

      </CsFieldGroup>

      {/* SEATS */ }

      <CsFieldGroup title={ SEATS_GROUP_TITLE }>

        <div className='travel-form__field-pair'>

          <TextField
            id='seatsAmount'
            name='seatsAmount'
            className='travel-form__field'
            label={ SEATS_AMOUNT_FIELD_LABEL }
            type='number'
            value={ seatsAmount ? seatsAmount : '' }
            onChange={ seatsAmountHandler }
            onKeyPress={ preventSubmitHandler }
            variant='outlined'
            margin='normal'
            error={ seatsAmountError }
            helperText={ seatsAmountError && SEATS_AMOUNT_ERROR }
            inputProps={ { min: 1, step: 1 } }
            required />

          <TextField
            id='price'
            name='price'
            className='travel-form__field'
            label={ PRICE_FIELD_LABEL }
            type='number'
            value={ inputValues.price }
            onChange={ inputChangeHandler }
            onKeyPress={ preventSubmitHandler }
            variant='outlined'
            margin='normal'
            inputProps={ { min: 1, step: 1 } }
            required />

        </div>

      </CsFieldGroup>

      {/* LUGGAGE */ }

      <CsFieldGroup title={ LUGGAGE_FIELD_GROUP_TITLE }>

        <div className='travel-form__field-pair'>

          <TextField
            id='largeLuggagePrice'
            name='largeLuggagePrice'
            className='travel-form__field'
            label={ LARGE_LUGGAGE_PRICE_FIELD_LABEL }
            type="number"
            value={ inputValues.largeLuggagePrice }
            onChange={ inputChangeHandler }
            onKeyPress={ preventSubmitHandler }
            variant='outlined'
            margin='normal' />

          <TextField
            id='smallLuggagePrice'
            name='smallLuggagePrice'
            className='travel-form__field'
            label={ SMALL_LUGGAGE_PRICE_FIELD_LABEL }
            type="number"
            value={ inputValues.smallLuggagePrice }
            onChange={ inputChangeHandler }
            onKeyPress={ preventSubmitHandler }
            variant='outlined'
            margin='normal' />

        </div>

      </CsFieldGroup>

      <div className='travel-form__buttons-wrapper'>
        {/* <Button onClick={ cancelBtnHandler } type='button' color='primary'>{ text.CANCEL_BUTTON_TITLE }</Button> */ }
        <Button type='submit' variant='contained' color='primary'>
          { editMode ? text.SUBMIT_UPDATE_TITLE : text.SUBMIT_CREATE_TITLE }
        </Button>

        { editMode && <Button className='cs-button--danger' onClick={ deleteBtnHandler } type='button'>{ text.DELETE_BUTTON_TITLE }</Button> }
      </div>
    </form>
  );
};

export default React.memo(TravelForm);