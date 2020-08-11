import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ component: ComponentToRender, ...rest }) {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          user.twoFactorCode ? (
            <Redirect to="/two-factor" />
          ) : (
            <ComponentToRender {...props} />
          )
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
