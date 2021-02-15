import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './TravelList.scss';

import { useTravelData } from '../../../shared/context/TravelContext';
import TravelCard from '../travel-card/TravelCard/TravelCard';
import MyProgressTop from '../../../shared/components/UI/MyProgressTop/MyProgressTop';
import EmptyListNotification from '../EmptyListNotification/EmptyListNotification';
import MyDialog from '../../../shared/components/UI/MyDialog/MyDialog';

const TravelList = () => {
  const history = useHistory();
  const { isLoading, travelList, travelListError } = useTravelData();

  const [travels, setTravels] = useState();
  const [showList, setShowList] = useState(false);


  const removeIrrelevantTravels = (travels) => {
    const now = new Date();
    now.setHours(now.getHours() - 1);
    // date.setMinutes(date.getMinutes() - 1);
    const date = now.toISOString();
    return travels.filter(t => t.departureDate > date);
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
      const relevantTravels = removeIrrelevantTravels(travelList);
      if (relevantTravels.length > 0) {
        const sortedTravels = sortByDepartureDate(relevantTravels);
        setTravels(sortedTravels);
        setShowList(true);
      } else {
        setTravels(null);
        setShowList(false);
      }
    }
  }, [travelList, showList])

  const cardClickHandler = (id) => {
    history.push('/details/' + id);
  }

  const travelListErrorDialog = travelListError ? (
    <MyDialog open={ !!travelListError } content={ travelListError.dialogContent } />
  ) : null

  return (
    <React.Fragment>
      { travelListErrorDialog }

      { isLoading
        ? <MyProgressTop />
        : (showList
          ? (
            <ul className='travel-list'>
              { travels.map((travel, index) => {
                return (
                  <li key={ travel.id }>
                    <TravelCard
                      travelData={ travel }
                      grow
                      index={ index }
                      click={ () => cardClickHandler(travel.id) } />
                  </li>
                )
              }) }
            </ul>)
          : <EmptyListNotification />
        ) }

    </React.Fragment>
  );
};

export default TravelList;