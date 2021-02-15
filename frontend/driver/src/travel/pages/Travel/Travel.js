import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Fade } from '@material-ui/core';

import './Travel.scss';

import { useAuthContext } from '../../../shared/context/AuthContext';
import { useTravelData } from '../../../shared/context/TravelContext';
import { travel as text } from '../../../data/text';

import PageHeader from '../../../shared/components/PageHeader/PageHeader';
import TravelForm from '../../components/TravelForm/TravelForm';
import CsBackdrop from '../../../shared/components/UI/CsBackdrop/CsBackdrop';
import CsDialog from '../../../shared/components/UI/CsDialog/CsDialog';
import OfflineSnackbar from '../../../shared/components/offline/OfflineSnackbar/OfflineSnackbar';

const TOTAL_SEATS_AMOUNT = 8;
const PROMO_NOTIFICATION = 'Доступна послуга з доставки багажу';

const Travel = ({ editMode }) => {
  const history = useHistory();

  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const [isRedirectAllowed, setIsRedirectAllowed] = useState(false);
  const [travelToDelete, setTravelToDelete] = useState(null);

  const { travelList, setTravelList, travelToEdit } = useTravelData();
  const { token } = useAuthContext();


  const URL = `${ process.env.REACT_APP_BACKEND_URL }/api/travel`;

  useEffect(() => {
    editMode && setIsEditMode(true);
  }, [editMode]);

  const syncLocalTravelList = async (travel) => {
    let updTravels = [...travelList];

    // ! Warning: not strong data type
    // for EDIT mode 'travel' is object
    // for DELETE mode 'travel' is string (travel id)

    if (isEditMode) {
      if (travelToDelete) {

        // DELETE mode
        updTravels = updTravels.filter(t => t.id !== travel)
      } else {

        // EDIT mode
        let index = updTravels.findIndex(t => t.id === travel.id);
        updTravels[index] = travel;
      }

    } else {
      updTravels.push(travel);
    }

    setTravelList(updTravels);
  }

  const showDialog = (dialogContent) => {
    setDialogContent(dialogContent);
    setTimeout(() => {
      setIsLoading(false);
      setOpenDialog(true);
    }, 1000);
  }

  // create/update travel
  const createTravel = async travelObject => {
    let url, method, resTitle, resMessage;
    setIsLoading(true);

    if (isEditMode) {
      url = `${ URL }/${ travelToEdit.id }`;
      method = 'PATCH';
      resTitle = 'оновлено';
      resMessage = 'оновили';

    } else {
      url = URL;
      method = 'POST';
      resTitle = 'створено';
      resMessage = 'створили новий';
    }

    try {
      const res = await fetch(url, {
        method,
        body: JSON.stringify(travelObject),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });

      if (res.ok) {
        // success case
        const resData = await res.json();
        setIsRedirectAllowed(true);
        showDialog({
          title: `Маршрут ${ resTitle }`,
          message: `Ви успішно ${ resMessage } маршрут. Приємних подорожей!`
        });
        syncLocalTravelList(resData.travel);
        setIsEditMode(false);

      } else {

        // bad request
        setIsRedirectAllowed(false);
        showDialog({
          title: 'Щось пішло не так :(',
          message: 'Здається на сервері виникла проблема. Будь ласка, спробуйте пізніше'
        });
      }

    } catch (err) {
      setIsLoading(false);
      console.log(err);
      showDialog({
        title: 'Щось пішло не так :(',
        message: 'Будь ласка, спробуйте пізніше'
      });
    }
  }

  const deleteTravel = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`${ URL }/${ travelToDelete }`, {
        method: 'DELETE',
        body: null,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });

      if (res.ok) {
        // success case

        setIsRedirectAllowed(true);
        await showDialog({
          title: 'Маршрут видалено',
          message: 'Ви успішно видалили маршрут'
        });
        syncLocalTravelList(travelToDelete);

      } else {
        // bad request
        setIsRedirectAllowed(false);
        showDialog({
          title: 'Щось пішло не так :(',
          message: 'Здається на сервері виникла проблема. Будь ласка, спробуйте пізніше'
        });
      }

    } catch (err) {
      setIsLoading(false);
      console.log(err);
      showDialog({
        title: 'Щось пішло не так :(',
        message: 'Будь ласка, спробуйте пізніше'
      })
    }

    setTravelToDelete(null);
  }

  const deleteTravelHandler = () => {

    // start deleting
    setTravelToDelete(travelToEdit.id);

    // ask before
    setDialogContent({
      title: 'Видалення маршруту',
      message: 'Після видалення маршрут не можна відновити. Будь ласка, підтвердіть операцію',
      btnText: 'Видалити',
      secondBtnText: 'Назад'
    });
    setOpenDialog(true);

    // waiting for dialog been accepted...
  }

  const dialogAcceptedHandler = () => {
    travelToDelete && deleteTravel();
    isRedirectAllowed && history.push('/');
    setOpenDialog(false);
  }

  return (
    <React.Fragment>
      <OfflineSnackbar />
      <CsDialog open={ openDialog } content={ dialogContent } onAcceptCb={ dialogAcceptedHandler } />
      <CsBackdrop open={ isLoading } />

      <PageHeader navBefore>{ isEditMode ? text.TITLE_EDIT : text.TITLE_CREATE }</PageHeader>
      <Fade in={ true } { ...{ timeout: 1000 } } >
        <div className='paper travel-paper'>
          <TravelForm
            editMode={ isEditMode }
            totalSeatsAmount={ TOTAL_SEATS_AMOUNT }
            promoNotification={ PROMO_NOTIFICATION }
            onTravelObjectReady={ o => createTravel(o) }
            onDeleteTravel={ deleteTravelHandler } />
        </div>
      </Fade>
      {/* <BgImage /> */ }
    </React.Fragment>
  );
};

export default Travel;