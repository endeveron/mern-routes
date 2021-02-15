import React, { useState, useCallback, useEffect } from 'react';

import './CreateOrder.scss';
import '../../../../shared/style/theme.scss';

import { useHttpClient } from '../../../../shared/hooks/useHttp';
import CsDialog from '../../../../shared/components/UI/CsDialog/CsDialog';
import CsBackdrop from '../../../../shared/components/UI/CsBackdrop/CsBackdrop';
import CreateOrderTools from '../CreateOrderTools/CreateOrderTools';
import CreateOrderForm from '../CreateOrderForm/CreateOrderForm';

const RESERVATION_TITLE = 'Резервувати місця';
const DEFAULT_PHONE_NUMBER = '+38 097 000 0000';
const PHONE_INPUT_ERROR_MESSAGE = 'Ви вказали невірний номер';
const NAME_FIELD_LABEL = 'Ім\'я';
const PHONE_FIELD_LABEL = 'Номер телефону';
const NOTIFICATION_FIELD_LABEL = 'Додаткова інформація';
const RESERVATION_SUBMIT_TITLE = 'Резервувати';
const RESERVATION_CANCEL_TITLE = 'Закрити';
const NO_SEATS_TITLE = 'Всі місця зарезервовані';
const AVAILABLE_SEATS_TITLE = 'місць';
const CURRENCY = 'грн';

const CreateOrder = props => {
  const { travelData, price, availableSeats } = props;

  const [availSeats, setAvailSeats] = useState(0);
  const [seatsAmount, setSeatsAmount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);

  const { isLoading, sendRequest } = useHttpClient();

  const calcPrice = useCallback(() => {
    setTotalPrice(price * seatsAmount);
  }, [price, seatsAmount]);

  useEffect(() => {
    setAvailSeats(availableSeats);
  }, [availableSeats]);

  useEffect(() => {
    calcPrice();
  }, [calcPrice]);

  const addSeatToReserve = () => {
    if (availSeats === 0) return;
    setSeatsAmount(seatsAmount + 1);
    setAvailSeats(availSeats - 1);
    calcPrice()
  }

  const removeSeatFromReserve = () => {
    if (seatsAmount === 1) return;
    setSeatsAmount(seatsAmount - 1);
    setAvailSeats(availSeats + 1);
    calcPrice()
  }

  const showDialog = (dialogContent) => {
    setDialogContent(dialogContent);
    setTimeout(() => {
      setOpenDialog(true);
    }, 1000);
  }

  const sendDataToServer = async (nameInput, prepNumber, notificationInput) => {
    const orderData = {
      travelData,
      seatsAmount,
      notification: notificationInput,
      person: {
        name: nameInput,
        phone: prepNumber,
        isConfirmed: false
      }
    };

    try {
      const resData = await sendRequest(
        `${ process.env.REACT_APP_BACKEND_URL }/api/travel/add-reservation`,
        'POST',
        JSON.stringify(orderData),
        {
          'Content-Type': 'application/json'
        }
      );
      if (!resData.order) throw new Error('Could not create Order');
      orderData.totalPrice = resData.order.totalPrice;
      setSeatsAmount(1);
      props.orderCreated();

    } catch (err) {
      console.log(err);
      showDialog({
        title: 'Щось пішло не так :(',
        message: err.message
      });
    }
  };

  return (
    <React.Fragment>

      <CsDialog open={ openDialog } content={ dialogContent } />
      <CsBackdrop open={ isLoading } />

      { availSeats > 0
        ? (<div className='create-order__reservation'>

          <h4 className='create-order__title'>{ RESERVATION_TITLE }</h4>

          <CreateOrderTools
            availSeatsTitle={ AVAILABLE_SEATS_TITLE }
            availSeats={ availSeats }
            availSeatsFixed={ availableSeats }
            seatsAmount={ seatsAmount }
            totalPrice={ totalPrice }
            currency={ CURRENCY }
            addSeatToReserve={ addSeatToReserve }
            removeSeatFromReserve={ removeSeatFromReserve } />

          <CreateOrderForm
            passengerNameFieldLabel={ NAME_FIELD_LABEL }
            defaultPhoneNumber={ DEFAULT_PHONE_NUMBER }
            passengerPhoneFieldLabel={ PHONE_FIELD_LABEL }
            errorMessage={ PHONE_INPUT_ERROR_MESSAGE }
            passengerNotificationFieldLabel={ NOTIFICATION_FIELD_LABEL }
            submitBtnTitle={ RESERVATION_SUBMIT_TITLE }
            cancelBtnTitle={ RESERVATION_CANCEL_TITLE }
            onSubmit={ sendDataToServer }
            close={ props.close } />

        </div>)
        : (
          <h4 className='create-order__title create-order__title-add-space'>
            { NO_SEATS_TITLE }
          </h4>
        ) }

    </React.Fragment>
  );
};

export default CreateOrder;