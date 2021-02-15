import React from 'react';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import 'moment/locale/uk';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';

import { dateToKeyValuePair } from '../../../util/date';
import { travelForm as text } from '../../../../data/text';

const CsDatePicker = props => {

  const dateHandler = (date) => {
    props.onChange(dateToKeyValuePair(props.name, date));
  }

  return (
    <MuiPickersUtilsProvider libInstance={ moment } utils={ MomentUtils } locale='uk'>
      <DatePicker
        id={ props.name }
        name={ props.name }
        className={ props.className }
        label={ props.label }
        value={ props.value }
        onChange={ date => dateHandler(date) }
        autoOk
        disablePast
        disableToolbar
        format='DD MMMM'
        okLabel=''
        cancelLabel=''
        minDateMessage={ text.MIN_DATE_ERR }
        inputVariant='outlined'
        margin='normal' />
    </MuiPickersUtilsProvider>
  )
};

export default CsDatePicker;
