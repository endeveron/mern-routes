import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Fade } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

import './TravelCard.scss';

import { useTravelData } from '../../../../shared/context/TravelContext';
import { useHttpClient } from '../../../../shared/hooks/useHttp';
import { dateToString } from '../../../../shared/util/date';
import OrderList from '../../order-list/OrderList/OrderList';
import TravelCardHeader from '../TravelCardHeader/TravelCardHeader';
import TravelCardDetails from '../TravelCardDetails/TravelCardDetails';
import TravelCardBar from '../TravelCardBar/TravelCardBar';
import CreateOrder from '../../create-order/CreateOrder/CreateOrder';

const TravelCard = props => {
  const data = props.travelData;
  const orders = data.orders;
  const {
    id,
    departureDate,
    departureCity,
    arrivalTime,
    arrivalCity,
    seatsAmount,
    seatsReserved,
    price,
    luggagePrices
  } = data;

  const history = useHistory();

  const [strDates, setStrDates] = useState({});
  const [showOrderList, setShowOrderList] = useState(false);
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [delOrderId, setDelOrderId] = useState(null);

  const { setTravelToEdit } = useTravelData();
  const { isLoading, sendRequest } = useHttpClient();


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

  const showOrderListHandler = () => {
    if (orders && !!orders.length && orders.length > 0) {
      setShowCreateOrder(false);
      setShowOrderList(showOrderList => !showOrderList);
    }
  }

  const addSeatHandler = (e) => {
    setShowOrderList(false);
    setShowCreateOrder(showCreateOrder => !showCreateOrder);
  }

  const hideOrderCreationHandler = () => {
    setShowCreateOrder(false);
  }

  const orderCreatedHandler = () => {
    setShowCreateOrder(false);
    setShowOrderList(true);
  }

  const editTravelHandler = useCallback(() => {
    setTravelToEdit(data);
    history.push('/edit-travel');

  }, [history, data, setTravelToEdit]);

  const deleteOrderHandler = async (orderId) => {
    const orderData = {
      travelId: id,
      orderId
    }

    setDelOrderId(orderId);

    try {
      await sendRequest(
        `${ process.env.REACT_APP_BACKEND_URL }/api/travel/cancel-reservation`,
        'POST',
        JSON.stringify(orderData),
        {
          'Content-Type': 'application/json'
        }
      );
      setDelOrderId(null);

    } catch (err) {
      setDelOrderId(null);
      console.log(err)
    }
  }

  return (
    <Fade
      in={ true }
      { ...{ timeout: (500 + 500 * props.index) } } >

      <div className='travel-card'>

        <TravelCardHeader
          departureDate={ strDates.depDate }
          departureCity={ departureCity }
          arrivalCity={ arrivalCity }
          progress={ seatsReserved / seatsAmount }
          onEdit={ editTravelHandler } />

        <TravelCardDetails
          departureDate={ strDates.depDate }
          departureDay={ strDates.depDay }
          departureTime={ strDates.depTime }
          arrivalTime={ strDates.arrTime } />

        <TravelCardBar
          price={ price }
          luggagePrices={ luggagePrices }
          seatsAmount={ seatsAmount }
          seatsReserved={ seatsReserved }
          showOrderList={ showOrderListHandler }
          addSeat={ addSeatHandler } />

        { orders && !!orders.length && (orders.length > 0) && (
          <Collapse in={ showOrderList }>
            <OrderList
              travelId={ id }
              orderList={ orders }
              isLoading={ isLoading }
              delOrderId={ delOrderId }
              deleteOrder={ deleteOrderHandler }
            />
          </Collapse>
        ) }

        <Collapse in={ showCreateOrder }>
          <CreateOrder
            travelId={ id }
            travelData={ { id, departureDate, departureCity, arrivalCity } }
            availableSeats={ seatsAmount - seatsReserved }
            price={ price }
            close={ hideOrderCreationHandler }
            orderCreated={ orderCreatedHandler } />
        </Collapse>

      </div>
    </Fade>
  );
};

export default TravelCard;