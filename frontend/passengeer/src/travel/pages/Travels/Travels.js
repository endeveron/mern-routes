import React from 'react';

import { pageTitle as title } from '../../../data/text';
import PageHeader from '../../../shared/components/PageHeader/PageHeader';
import { useOffline } from '../../../shared/hooks/useOffline';
import TravelList from '../../components/TravelList/TravelList';

const Travels = () => {

  const { isOffline, offlineNotification } = useOffline();

  return (
    <React.Fragment>
      <PageHeader>{ title.ROUTES }</PageHeader>
      { isOffline && offlineNotification }
      <TravelList />
    </React.Fragment>
  );
};

export default Travels;