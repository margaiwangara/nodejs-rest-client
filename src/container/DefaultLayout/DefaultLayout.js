import React from 'react';
import routes from '@/routes';
import Loading from '@/utils/Loading';
import { Route, Switch } from 'react-router-dom';

function DefaultLayout() {
  return (
    <div style={defaultLayoutStyling}>
      <div className="container">
        <React.Suspense fallback={Loading()}>
          <Switch>
            {routes.map((route, index) =>
              route.component ? (
                <Route
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  key={index}
                  render={(props) => <route.component {...props} />}
                />
              ) : (
                ''
              ),
            )}
          </Switch>
        </React.Suspense>
      </div>
    </div>
  );
}

const defaultLayoutStyling = {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
};

export default DefaultLayout;
