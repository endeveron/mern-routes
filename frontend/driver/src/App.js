import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core';

import { theme } from './shared/style/theme';
import './shared/style/theme.scss';

import { AuthProvider } from './shared/context/AuthContext';
import { TravelDataProvider } from './shared/context/TravelContext';
import Routes from './routes/Routes';
import { useUpdate } from './shared/hooks/useUpdate';

function App() {
  const { checkUpdates, updatesSnackbar } = useUpdate();

  useEffect(() => checkUpdates(), [checkUpdates]);

  return (
    <ThemeProvider theme={ theme }>
      <AuthProvider >
        <TravelDataProvider>
          { updatesSnackbar }
          <Routes />
        </TravelDataProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App;
