import React from 'react';
import routes from '@/routes';
import Loading from '@/utils/Loading';
import { Route, Switch } from 'react-router-dom';

const DefaultSideBar = React.lazy(() => import('./DefaultSideBar'));

function DefaultLayout() {
  return (
    <div style={defaultLayoutStyling}>
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-4">
              <React.Suspense fallback={Loading()}>
                <DefaultSideBar />
              </React.Suspense>
            </div>
            <div className="col-md-8">
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
        </div>
      </div>
    </div>
  );
}

const defaultLayoutStyling = {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  padding: '50px',
};

export default DefaultLayout;
