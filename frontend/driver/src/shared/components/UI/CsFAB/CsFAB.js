import React from 'react';
import { useHistory } from 'react-router-dom';
import { Fab, Zoom } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { csFAB as text } from '../../../../data/text';

const CsFAB = props => {
  const history = useHistory();

  const { show } = props;

  const fabClickHandler = () => {
    history.push('/travel');
  }

  return (
    <Zoom in={ show } style={ { transitionDelay: show ? '500ms' : '0ms' } }>
      <Fab onClick={ fabClickHandler } aria-label={ text.ARIA_LABEL }>
        <AddIcon fontSize='large' />
      </Fab>
    </Zoom>
  );
};

export default CsFAB;