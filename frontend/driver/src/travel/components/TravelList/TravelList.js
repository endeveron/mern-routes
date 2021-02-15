import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './TravelList.scss';

import { useTravelData } from '../../../shared/context/TravelContext';
import { travelList as text } from '../../../data/text';
import TravelCard from '../travel-card/TravelCard/TravelCard';
import CsProgressTop from '../../../shared/components/UI/CsProgressTop/CsProgressTop';
import CsFAB from '../../../shared/components/UI/CsFAB/CsFAB';
import Notification from '../../../shared/components/UI/Notification/Notification';
import CsDialog from '../../../shared/components/UI/CsDialog/CsDialog';
import { useOffline } from '../../../shared/hooks/useOffline';
import { Fade } from '@material-ui/core';

const TravelList = ({ isLoading, travelListError }) => {
  const history = useHistory();

  const [travels, setTravels] = useState();
  const [irrelevantTravels, setIrrelevantTravels] = useState();
  const [showList, setShowList] = useState(false);
  const [showIrrList, setShowIrrList] = useState(false);

  const { isOffline, offlineNotification } = useOffline();
  const { travelList } = useTravelData();


  const sortIrrelevantTravels = (travels) => {
    const now = new Date();
    now.setHours(now.getHours() - 1);
    const date = now.toISOString();
    const relTravels = [];
    const irrelTravels = [];

    for (const t of travels) {
      if (t.departureDate > date) {
        relTravels.push(t)
      } else {
        irrelTravels.push(t)
      }
    }

    if (irrelTravels.length && (irrelTravels.length > 0)) {
      setIrrelevantTravels(irrelTravels);
      setShowIrrList(true);
    }
    return relTravels
  }

  const sortByDepartureDate = (travels) => {
    return travels.sort(function(a, b) {
      const dateA = new Date(a.departureDate)
      const dateB = new Date(b.departureDate)
      return dateA - dateB
    })
  }

  useEffect(() => {
    if (travelList) {
      const relevantTravels = sortIrrelevantTravels(travelList);
      const sortedTravelList = sortByDepartureDate(relevantTravels);
      setTravels(sortedTravelList);
      travelList && (travelList.length > 0) ? setShowList(true) : setShowList(false)
    }
  }, [travelList])

  const createTravelRedirect = () => {
    history.push('/travel');
  }

  const travelListErrorDialog = travelListError ? (
    <CsDialog open={ !!travelListError } content={ travelListError.dialogContent } />
  ) : null

  const travelListEl = (travelList, isIrrelevant) => {
    let titleEl = null;
    let className = 'travel-list'
    if (isIrrelevant) {
      className = `${ className } ${ className }--irrelevant`;
      titleEl = (
        <Fade in={ true } { ...{ timeout: 950 } } >
          <h3 className='travel-list__title'>{ text.IRRELEVANT_LIST_TITLE }</h3>
        </Fade>
      )
    }
    return (
      <ul className={ className }>
        { titleEl }
        { travelList.map((travel, index) => (
          <li key={ travel.id }>
            <TravelCard
              travelData={ travel }
              grow
              index={ index } />
          </li>
        )) }
      </ul>
    )
  }

  return (
    <React.Fragment>
      { travelListErrorDialog }
      { isOffline && offlineNotification }

      { isLoading ? <CsProgressTop /> : (

        (showList || showIrrList)
          ? (
            <div className='travel-list__wrapper'>
              { showList && travelListEl(travels) }
              { showIrrList && travelListEl(irrelevantTravels, true) }

              <CsFAB show={ showList || showIrrList } />
            </div>)
          : (
            <div className='v-align-wrapper'>
              <Notification
                title={ text.EMPTY_LIST_NOTIFICATION_TITLE }
                message={ text.EMPTY_LIST_NOTIFICATION_MESSAGE }
                buttonTitle={ text.EMPTY_LIST_NOTIFICATION_BUTTON_TITLE }
                onButtonClick={ createTravelRedirect } />
            </div>
          )
      ) }

    </React.Fragment>
  );
};

export default TravelList;