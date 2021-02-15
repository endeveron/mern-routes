import React from 'react';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import 'moment/locale/uk';
import {
  MuiPickersUtilsProvider,
  TimePicker,
} from '@material-ui/pickers';

import { dateToKeyValuePair } from '../../../util/date';

const CsTimePicker = props => (
  <MuiPickersUtilsProvider libInstance={ moment } utils={ MomentUtils } locale='uk'>
    <TimePicker
      id={ props.name }
      name={ props.name }
      className={ props.className }
      label={ props.label }
      value={ props.value }
      onChange={ date => props.onChange(dateToKeyValuePair(props.name, date)) }
      ampm={ false }
      autoOk
      minutesStep={ 5 }
      okLabel=''
      cancelLabel=''
      inputVariant='outlined'
      margin='normal' />
  </MuiPickersUtilsProvider>
);

export default CsTimePicker;
