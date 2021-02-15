import { Button, Fade } from '@material-ui/core';
import React from 'react';

import './Notification.scss';

const Notification = props => {

  const buttonClickHandler = () => {
    props.onButtonClick()
  }

  const title = props.title ? (<h3 className='notification__title'>{ props.title }</h3>) : null;
  const message = props.message ? (<p className='notification__message'>{ props.message }</p>) : null;
  const button = props.buttonTitle ? (
    <div className='notification__button-wrapper'>
      <Button
        color="primary"
        variant='contained'
        onClick={ buttonClickHandler }
      >{ props.buttonTitle }</Button>
    </div>) : null;

  return (
    <div className='notification__wrapper'>
      <Fade in={ true } { ...{ timeout: 800 } } >
        <div className='paper notification__paper'>
          { title }
          { message }
          { button }
        </div>
      </Fade>
    </div>
  );
};

export default Notification;