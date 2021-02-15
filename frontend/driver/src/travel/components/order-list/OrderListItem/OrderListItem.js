import { IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import './OrderListItem.scss';

import { orderListItem as text } from '../../../../data/text';
import CsDialog from '../../../../shared/components/UI/CsDialog/CsDialog';

// import { ReactComponent as ConfirmedIcon } from '../../../../assets/icons/confirmed-icon.svg';

const OrderListItem = props => {
  const { id, person, seatsAmount, isLoading, delOrderId } = props;
  const { name, phone } = person;

  const [showLoader, setShowLoader] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  // const [isConfirmed, setIsConfirmed] = useState(false);

  // const { person } = props;
  // useEffect(() => {
  //   setIsConfirmed(person.isConfirmed)
  // }, [person]);

  useEffect(() => {
    isLoading && (id === delOrderId) && setShowLoader(true)
  }, [isLoading, id, delOrderId]);

  // prepare phone number for comfortable reading 
  const phoneNumber = phone.replace(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');

  const onDeleteHandler = () => {
    setOpenDialog(true)
  }

  const onDeleteCancelled = () => {
    setOpenDialog(false)
  }

  const onDeleteAccepted = () => {
    props.onDelete(props.id);
  }

  const confirmDeleteDialog = (
    <CsDialog
      open={ openDialog }
      content={ {
        title: text.DIALOG_TITLE,
        message: text.DIALOG_MESSAGE,
        btnText: text.DIALOG_ACCEPT_BUTTON_TITLE,
        secondBtnText: text.DIALOG_CANCEL_BUTTON_TITLE
      } }
      onAcceptCb={ onDeleteAccepted }
      onCancelCb={ onDeleteCancelled } />
  )


  return (
    <React.Fragment>

      { confirmDeleteDialog }

      <li className={ 'order-list-item' } >
        <div className='order-list-item__content'>

          { showLoader && (
            <div className='order-list-item__loading'>
              <CircularProgress size='2rem' />
            </div>) }

          <div className='order-list-item__person-data'>
            <div className='order-list-item__phone'>
              <a href={ `tel:${ phone }` } > { phoneNumber } </a>
              {/* { isConfirmed && <span className='order-list-item__confirmed-icon'><ConfirmedIcon /></span> } */ }
            </div>
            <div className='order-list-item__details'>
              <span className='order-list-item__name'>
                { name }
              </span>
              <span className='order-list-item__notification'>
                { props.notification }
              </span>
            </div>
          </div>
          <div className='order-list-item__amount-data'>
            <div className='order-list-item__tools'>
              <div className='order-list-item__delete-button'>
                <IconButton
                  onClick={ onDeleteHandler }
                  aria-label={ text.DELETE_BUTTON_ARIA_LABEL }>
                  <CloseIcon color='error' />
                </IconButton>
              </div>
            </div>
            <div className='order-list-item__seats'>
              { seatsAmount }
            </div>
            <div className='order-list-item__price'>
              { props.totalPrice }
            </div>
          </div>
        </div>
      </li>
    </React.Fragment>
  );
};

export default OrderListItem;