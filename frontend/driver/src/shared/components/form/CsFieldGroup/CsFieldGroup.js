import React from 'react';

import './CsFieldGroup.scss';

const CsFieldGroup = props => {
  return (
    <div className='cs-field-group'>
      <h3 className='cs-field-group__title'>
        { props.title }
      </h3>
      { props.children }
    </div>
  );
};

export default CsFieldGroup;