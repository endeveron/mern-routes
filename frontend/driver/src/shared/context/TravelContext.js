import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import openSocket from 'socket.io-client';
import { useAuth } from '../hooks/useAuth';
import { useOrder } from '../hooks/useOrder';

const TravelContext = createContext({
  travelList: [],
  travelToEdit: {},
  setTravelList: () => { },
  setTravelToEdit: () => { }
});

export const useTravelData = () => {
  return useContext(TravelContext)
}

export const TravelDataProvider = ({ children }) => {
  const [travelList, setTravelList] = useState();
  const [travelToEdit, setTravelToEdit] = useState();

  const { driverId } = useAuth();
  const { addOrder, cancelOrder } = useOrder(travelList, setTravelList);

  const syncTravel = useCallback((action, data) => {
    let updTravels = [...travelList];

    const add = travel => {
      updTravels.push(travel);
      setTravelList(updTravels);
    }

    const upd = travel => {
      let index = updTravels.findIndex(t => t.id === travel.id);
      if (index !== -1) {
        updTravels[index] = travel;
        setTravelList(updTravels);
      }
    }

    const del = id => {
      updTravels = updTravels.filter(t => t.id !== id)
      setTravelList(updTravels);
    }

    switch (action) {
      case 'create': add(data);
        break;
      case 'update': upd(data);
        break;
      case 'delete': del(data);
        break;
      default: throw new Error('Invalid action name')
    }

  }, [travelList, setTravelList])

  // travelList socket
  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_BACKEND_URL);
    // open connection
    socket.on('travels', data => {
      if (driverId && data.data && data.data.creatorId) {
        driverId === data.data.creatorId && syncTravel(data.action, data.data)
      }
    });
    // close connection
    return () => socket.off('travels');

  }, [driverId, syncTravel]);

  // order socket
  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_BACKEND_URL);
    // open connection
    socket.on('orders', action => {
      const { mode, data } = action;
      switch (mode) {
        case 'add': addOrder(data.travelId, data.order);
          break;
        case 'cancel': cancelOrder(data.travelId, data.orderId, data.updSeatsReserved);
          break;
        default: throw new Error('Invalid mode')
      }

    })
    // close connection
    return () => socket.off('orders');
  }, [addOrder, cancelOrder]);

  return (
    <TravelContext.Provider value={ {
      travelList,
      travelToEdit,
      setTravelList,
      setTravelToEdit,
    } }>
      { children }
    </TravelContext.Provider>
  )
}