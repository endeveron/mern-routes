import React, { useState, useEffect } from 'react';

import TCReservationTitle from '../TCReservationTitle/TCReservationTitle';
import TCReservationToolbar from '../TCReservationToolbar/TCReservationToolbar';
import MyDialog from '../../../../../shared/components/UI/MyDialog/MyDialog';
import MyBackdrop from '../../../../../shared/components/UI/MyBackdrop/MyBackdrop';
import TCReservationForm from '../tc-reservation-form/TCReservationForm/TCReservationForm';

const TCReservation = props => {
  const { id, availableSeats, price, departureDate, departureCity, arrivalCity } = props.travelData;

  const [availSeats, setAvailSeats] = useState(0);
  const [seatsAmount, setSeatsAmount] = useState(1);
  const [isReserved, setIsReserved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);

  useEffect(() => {
    setAvailSeats(availableSeats);
  }, [availableSeats]);

  const addSeatHandler = () => {
    setSeatsAmount(seatsAmount + 1);
    setAvailSeats(availSeats - 1);
  }

  const removeSeatHandler = () => {
    setSeatsAmount(seatsAmount - 1);
    setAvailSeats(availSeats + 1);
  }

  const showDialog = (dialogContent) => {
    setDialogContent(dialogContent);
    setTimeout(() => {
      setIsLoading(false);
      setOpenDialog(true);
    }, 300);
  }

  const sendDataToServer = async (formData) => {
    const data = {
      ...formData,
      seatsAmount,
      travelData: { id, departureDate, departureCity, arrivalCity }
    }

    setIsLoading(true);

    try {
      const res = await fetch(
        `${ process.env.REACT_APP_BACKEND_URL }/api/travel/add-reservation`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const resData = await res.json();
      if (!resData.order) throw new Error('Could not create Order');
      await showDialog(resData.dialogContent);
      setIsReserved(true);
      props.onReserved();

    } catch (err) {
      console.log(err);
      showDialog({
        title: 'Щось пішло не так :(',
        message: 'Будь ласка, спробуйте пізніше'
      });
    }
  };

  return (
    <div className='tc-details__container'>

      <MyDialog
        open={ openDialog }
        content={ dialogContent }
      />
      <MyBackdrop open={ isLoading } />

      <TCReservationTitle isReserved={ isReserved } noSeats={ availSeats <= 0 } />

      { !isReserved && availSeats > 0 && (
        <React.Fragment>
          <TCReservationToolbar
            price={ price }
            availSeats={ availSeats }
            availableSeats={ availableSeats }
            seatsAmount={ seatsAmount }
            addSeatToReserve={ addSeatHandler }
            removeSeatFromReserve={ removeSeatHandler } />

          <TCReservationForm
            seatsAmount={ seatsAmount }
            onSubmit={ data => sendDataToServer(data) }
          />
        </React.Fragment>
      ) }

    </div>
  );
};

export default TCReservation;