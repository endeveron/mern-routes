import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './TravelDetails.scss';

import { useTravelData } from '../../../shared/context/TravelContext';
import { useDriverData } from '../../../shared/context/DriverContext';
import { pageTitle as title } from '../../../data/text';
import OfflineSnackbar from '../../../shared/components/offline/OfflineSnackbar/OfflineSnackbar';
import PageHeader from '../../../shared/components/PageHeader/PageHeader';
import TravelCard from '../../components/travel-card/TravelCard/TravelCard';

const TravelDetails = () => {
  const { travelId } = useParams();

  const [travel, setTravel] = useState();

  const { travelList } = useTravelData();
  const { setPhones, setIsContactsReady } = useDriverData();

  const handleFetchedPhones = useCallback(phones => {
    const updPhones = phones.map(p => p.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3'));
    setPhones(updPhones);
  }, [setPhones]);

  const fetchDriverPhones = useCallback(async id => {
    setIsContactsReady(false);

    try {
      const res = await fetch(
        `${ process.env.REACT_APP_BACKEND_URL }/api/driver/contacts`, {
        method: 'POST',
        body: JSON.stringify({ driverId: id }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const resData = await res.json();
      setIsContactsReady(true);
      const phones = resData.driverPhones;
      (phones && phones.length && phones.length > 0) && handleFetchedPhones(phones);

    } catch (err) {
      console.log(err);
    }
  }, [setIsContactsReady, handleFetchedPhones])

  useEffect(() => {
    if (travelList) {
      const travel = travelList.find(t => t.id === travelId);
      if (travel) {
        setTravel(travel);
        travel.creatorId && fetchDriverPhones(travel.creatorId)
      }
    }
  }, [travelId, travelList, fetchDriverPhones]);

  return (
    <React.Fragment>
      <OfflineSnackbar />
      <PageHeader navBefore>{ title.DETAILS }</PageHeader>

      { travel && <div className='tc-details'>
        <TravelCard detailMode travelData={ travel } grow />
      </div> }
    </React.Fragment>
  );
};

export default TravelDetails;