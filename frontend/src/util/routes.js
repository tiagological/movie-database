import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import GlobalContext from '../context';

export const AuthRoute = ({ path, component: Component }) => {
  const { session } = useContext(GlobalContext);

  const loggedIn = !!session.userId;

  return (
    <Route
      path={path}
      render={(props) =>
        loggedIn ? <Redirect to='/dashboard' /> : <Component {...props} />
      }
    />
  );
};

export const ProtectedRoute = ({ path, component: Component }) => {
  const { session } = useContext(GlobalContext);

  const loggedIn = !!session.userId;

  return (
    <Route
      path={path}
      render={(props) =>
        loggedIn ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};
