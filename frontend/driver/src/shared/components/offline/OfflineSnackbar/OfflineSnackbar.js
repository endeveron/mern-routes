import React from 'react';

import { useOffline } from '../../../hooks/useOffline';
import { offlineSnackbar as text } from '../../../../data/text';
import CsSnackbar from '../../UI/CsSnackbar/CsSnackbar';

const OfflineSnackbar = () => {
  const { isOffline } = useOffline();
  return isOffline ? <CsSnackbar open={ isOffline } message={ text.MESSAGE } /> : null;
};

export default OfflineSnackbar;