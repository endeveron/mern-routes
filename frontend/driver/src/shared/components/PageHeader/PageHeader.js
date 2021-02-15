import React from 'react';
import { useHistory } from 'react-router-dom';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

import './PageHeader.scss';

const PageHeader = props => {
  const history = useHistory();

  const navBeforeHandler = () => {
    history.goBack();
  }

  // const menuTogglerHandler = () => { }

  const alignCenter = props.alignCenter ? 'page-header__content--align-center' : null;
  const contentClassName = `page-header__content ${ alignCenter }`

  const navBeforeButton = props.navBefore ? (
    <div className='page-header__button page-header__nav-before'>
      <NavigateBeforeIcon onClick={ navBeforeHandler } fontSize="large" />
    </div>
  ) : null

  return (
    <div className='page-header'>
      <div className={ contentClassName }>
        { navBeforeButton }
        <h3>{ props.children }</h3>
      </div>
      { props.controls && <div className='page-header__controls'>
        { props.controls }
      </div> }
    </div>
  );
};

export default PageHeader;