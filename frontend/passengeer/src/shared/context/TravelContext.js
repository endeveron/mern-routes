import React, { createContext, useCallback, useContext, useEffect } from 'react';
import openSocket from 'socket.io-client';

import { useTravelList } from '../hooks/useTravelList';

const TravelContext = createContext({
  isLoading: false,
  travelListError: false,
  travelList: []
});

export const useTravelData = () => {
  return useContext(TravelContext)
}

export const TravelDataProvider = ({ children }) => {
  const { isLoading, travelList, updTravelList, travelListError } = useTravelList();

  const syncTravel = useCallback((action, data) => {
    let updTravels = [...travelList];

    const add = travel => {
      updTravels.push(travel);
      updTravelList(updTravels);
    }

    const upd = travel => {
      let index = updTravels.findIndex(t => t.id === travel.id);
      if (index !== -1) {
        updTravels[index] = travel;
        updTravelList(updTravels);
      }
    }

    const del = id => {
      updTravels = updTravels.filter(t => t.id !== id)
      updTravelList(updTravels);
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

  }, [travelList, updTravelList])

  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_BACKEND_URL);
    // open connection
    socket.on('travels', data => {
      syncTravel(data.action, data.data)
    });
    // close connection
    return () => socket.off('travels');

  }, [syncTravel]);

  const increaseReservedSeats = useCallback(({ travelId, order }) => {
    const travels = [...travelList];
    const travel = travels.find(t => t.id === travelId);
    travel.seatsReserved += order.seatsAmount;
    updTravelList(travels);

  }, [travelList, updTravelList]);

  const decreaseReservedSeats = useCallback(({ travelId, updSeatsReserved }) => {
    const travels = [...travelList];
    const travel = travels.find(t => t.id === travelId);
    travel.seatsReserved = updSeatsReserved;
    updTravelList(travels);

  }, [travelList, updTravelList]);

  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_BACKEND_URL);
    // open connection
    socket.on('orders', action => {
      const { mode, data } = action;
      switch (mode) {
        case 'add': increaseReservedSeats(data);
          break;
        case 'cancel': decreaseReservedSeats(data);
          break;
        default: throw new Error('Invalid mode')
      }
    })
    // close connection
    return () => socket.off('orders');

  }, [increaseReservedSeats, decreaseReservedSeats]);

  return (
    <TravelContext.Provider value={ {
      isLoading,
      travelList: travelList,
      travelListError,
      updTravelList
    } }>
      { children }
    </TravelContext.Provider>
  )
}