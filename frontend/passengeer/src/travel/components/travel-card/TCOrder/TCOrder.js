import React, { useState, useMemo } from 'react';

import '../../../../shared/style/theme.scss';

import TCReservation from '../tc-reservation/TCReservation/TCReservation';
import TCLuggage from '../tc-luggage/TCLuggage/TCLuggage';
import TCContacts from '../TCContacts/TCContacts';

const TCOrder = props => {
  const { availableSeats, price, luggagePrices } = props.orderData;
  const { id, departureDate, departureCity, arrivalCity } = props.travelData;

  const [isReserved, setIsReserved] = useState(false);

  const travelCardLuggage = useMemo(() => (
    <TCLuggage isReserved={ isReserved } luggagePrices={ luggagePrices } />
  ), [isReserved, luggagePrices]);

  const travelCardContacts = useMemo(() => (
    <TCContacts />
  ), []);

  const onReservedHandler = () => {
    setIsReserved(true)
  }

  const travelCardReservation = useMemo(() => (
    <TCReservation
      travelData={ { id, availableSeats, price, departureDate, departureCity, arrivalCity } }
      onReserved={ onReservedHandler }
    />
  ), [id, availableSeats, price, departureDate, departureCity, arrivalCity])

  return (
    <div className='tc-order'>
      {travelCardReservation }
      { luggagePrices && luggagePrices.length && (luggagePrices.length > 0) ? travelCardLuggage : travelCardContacts }
    </div>
  );
};

export default TCOrder;