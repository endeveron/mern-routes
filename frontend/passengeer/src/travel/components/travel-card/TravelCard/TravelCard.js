import React, { useCallback, useEffect, useState } from 'react';
import { Fade } from '@material-ui/core';

import './TravelCard.scss';

import { dateToString } from '../../../../shared/util/date';
import TCOrder from '../TCOrder/TCOrder';
import TCHeader from '../TCHeader/TCHeader';
import TCDirection from '../TCDirection/TCDirection';
import TCFooter from '../TCFooter/TCFooter';

const TravelCard = props => {
  const [availableSeats, setAvailableSeats] = useState();
  const [strDates, setStrDates] = useState({});

  const data = props.travelData;
  const {
    id,
    departureDate,
    arrivalTime,
    departureCity,
    arrivalCity } = data;

  const detailMode = !!props.detailMode;

  const convertDate = useCallback(() => {
    const depDate = dateToString(new Date(departureDate), 'date', '.')
    const depDay = dateToString(new Date(departureDate), 'day')
    const depTime = dateToString(new Date(departureDate), 'time', ':')
    const arrTime = dateToString(new Date(arrivalTime), 'time', ':')
    setStrDates({ depDate, depDay, depTime, arrTime })
  }, [departureDate, arrivalTime])

  useEffect(() => {
    convertDate()
  }, [convertDate])

  useEffect(() => {
    setAvailableSeats(data.seatsAmount - data.seatsReserved);
  }, [data.seatsAmount, data.seatsReserved]);

  let orderData;
  if (detailMode) {
    orderData = {
      travelData: { id, departureDate, departureCity, arrivalCity },
      availableSeats,
      price: data.price,
      luggagePrices: data.luggagePrices
    }
  }

  return (
    <Fade
      in={ true }
      { ...(props.index ? { timeout: (500 + 500 * props.index) } : { timeout: 500 }) } >

      <div className='travel-card' onClick={ props.click }>

        <TCHeader
          detailMode={ detailMode }
          departureDate={ strDates.depDate }
          departureDay={ strDates.depDay }
          departureCity={ data.departureCity }
          arrivalCity={ data.arrivalCity } />

        <TCDirection
          departureTime={ strDates.depTime }
          departureCity={ data.departureCity }
          departurePlace={ data.departurePlace }
          arrivalTime={ strDates.arrTime }
          arrivalCity={ data.arrivalCity }
          arrivalPlace={ data.arrivalPlace } />

        { detailMode
          ? <TCOrder
            travelData={ { id, departureDate, departureCity, arrivalCity } }
            orderData={ orderData } />
          : (<TCFooter
            promoNotification={ data.promoNotification }
            availableSeats={ availableSeats }
            price={ data.price } />)
        }
      </div>
    </Fade>
  );
};

export default TravelCard;