import React, { useEffect, useState } from 'react';

import { useAuthContext } from '../../../shared/context/AuthContext';
import { useHttpClient } from '../../../shared/hooks/useHttp';
import { useTravelData } from '../../../shared/context/TravelContext';
import PageHeader from '../../../shared/components/PageHeader/PageHeader';
import LogoutButton from '../../../driver/components/LogoutButton/LogoutButton';
import TravelList from '../../components/TravelList/TravelList';

const Travels = () => {
  const [error, setError] = useState(null);

  const { driverId, token } = useAuthContext();
  const { isLoading, sendRequest } = useHttpClient();
  const { setTravelList } = useTravelData();


  useEffect(() => {
    const fetchTravelList = async () => {
      try {
        // fetching a travel list for the current driver
        const resData = await sendRequest(`${ process.env.REACT_APP_BACKEND_URL }/api/travel/${ driverId }`, 'GET', null,
          {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        );

        // OR for all drivers
        // const resData = await sendRequest(`${ process.env.REACT_APP_BACKEND_URL }/api/travel`);

        setTravelList(resData.travelList);

      } catch (err) {
        console.log(err);
        setError({
          dialogContent: {
            title: 'Помилка',
            message: err.message
          }
        });
      }
    }
    fetchTravelList();

  }, [driverId, token, sendRequest, setTravelList]);

  return (
    <React.Fragment>
      <PageHeader controls={ <LogoutButton /> }>Маршрути</PageHeader>
      <TravelList
        isLoading={ isLoading }
        travelListError={ error } />
      {/* <BgImage /> */ }
    </React.Fragment>
  );
};

export default Travels;