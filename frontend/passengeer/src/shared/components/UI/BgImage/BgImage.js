import { Fade } from '@material-ui/core';
import React from 'react';

import './BgImage.scss';

const BgImage = () => {
  return (
    <Fade in={ true } { ...{ timeout: 1700 } } >
      <div className='bg-image'></div>
    </Fade>
  );
};

export default BgImage;