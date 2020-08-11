import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PublicRoute({ component: ComponentToRender, ...rest }) {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        ) : (
          <ComponentToRender {...props} />
        )
      }
    />
  );
}

export default PublicRoute;
