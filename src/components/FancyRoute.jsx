import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import NProgress from 'nprogress';

const FancyRoute = ({ route: r, index }) => {
  useEffect(() => {
    NProgress.done();

    return () => {
      NProgress.start();
    };
  }, []);

  return (
    <Route
      path={r.path}
      exact={r.exact}
      route
      name={r.name}
      key={index}
      render={(props) => <r.component {...props} />}
    />
  );
};

export default FancyRoute;
