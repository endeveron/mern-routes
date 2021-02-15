import React from 'react';
import { useHistory } from 'react-router-dom';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import './PageHeader.scss';

const PageHeader = props => {
  let navBeforeButton = null;
  const history = useHistory();

  const navBeforeHandler = () => {
    history.goBack();
  }

  if (props.navBefore) {
    navBeforeButton = (
      <div className='page-header__button page-header__nav-before'>
        <NavigateBeforeIcon onClick={ navBeforeHandler } fontSize="large" />
      </div>
    )
  }

  return (
    <div className='page-header'>
      <div className='page-header__content'>
        { navBeforeButton }
        <h3>{ props.children }</h3>
      </div>
      <div className='page-header__button page-header__menu-toggler'></div>
    </div>
  );
};

export default PageHeader;