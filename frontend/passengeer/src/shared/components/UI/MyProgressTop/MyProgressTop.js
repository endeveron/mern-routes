import React from 'react';
import { CircularProgress, Fade } from '@material-ui/core';

const styles = {
  padding: '4rem',
  textAlign: 'center'
}

const MyProgressTop = () => {
  return (
    <div style={ styles }>
      <Fade in={ true } { ...{ timeout: 2000 } } >
        <CircularProgress />
      </Fade>
    </div>
  );
};

export default MyProgressTop;