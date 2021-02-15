import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect
} from 'react-router-dom';

import { useAuthContext } from '../shared/context/AuthContext';
import Auth from '../driver/pages/Auth/Auth';
import CsProgressTop from '../shared/components/UI/CsProgressTop/CsProgressTop';

const Travels = React.lazy(() => import('../travel/pages/Travels/Travels'));
const Travel = React.lazy(() => import('../travel/pages/Travel/Travel'));

const Routes = () => {
  const { token } = useAuthContext();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route exact path='/'>
          <Travels />
        </Route>
        <Route exact path='/travel'>
          <Travel />
        </Route>
        <Route exact path='/edit-travel'>
          <Travel editMode />
        </Route>

        <Redirect to="/" />
      </Switch>
    )

  } else {
    routes = (
      <Switch>
        <Route exact path='/auth'>
          <Auth />
        </Route>

        <Redirect to='/auth' />
      </Switch>
    )
  }

  return (
    <Router>
      <main>
        <Suspense fallback={ <CsProgressTop /> }>
          { routes }
        </Suspense>
      </main>
    </Router>

  );
};

export default Routes;