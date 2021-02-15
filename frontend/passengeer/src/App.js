import React, { Suspense, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';

import { theme } from './shared/style/theme';
import './shared/style/theme.scss';

import { TravelDataProvider } from './shared/context/TravelContext';
import Travels from './travel/pages/Travels/Travels';
import MyProgressTop from './shared/components/UI/MyProgressTop/MyProgressTop';
import { useUpdate } from './shared/hooks/useUpdate';
import { DriverDataProvider } from './shared/context/DriverContext';

const TravelDetails = React.lazy(() => import('./travel/pages/TravelDetails/TravelDetails'))

function App() {
  const { checkUpdates, updatesSnackbar } = useUpdate();

  useEffect(() => checkUpdates(), [checkUpdates]);

  return (
    <ThemeProvider theme={ theme }>
      <TravelDataProvider>
        <DriverDataProvider>
          <Router>
            <main>
              { updatesSnackbar }
              <Suspense fallback={ <MyProgressTop /> }>
                <Switch>
                  <Route exact path='/'>
                    <Travels />
                  </Route>
                  <Route path='/details/:travelId'>
                    <TravelDetails />
                  </Route>
                </Switch>
              </Suspense>
            </main>
          </Router>
        </DriverDataProvider>
      </TravelDataProvider>
    </ThemeProvider>
  );
}

export default App;
