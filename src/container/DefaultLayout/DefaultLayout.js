import React, { useState } from 'react';
import routes from '@/routes';
import Loading from '@/utils/Loading';
import { Route, Switch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DefaultSideBar = React.lazy(() => import('./DefaultSideBar'));

function DefaultLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = (e) => {
    e.preventDefault();
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={defaultLayoutStyling} id="side-wrapper">
      <React.Suspense fallback={Loading()}>
        <DefaultSideBar sidebarOpen={sidebarOpen} />
      </React.Suspense>
      <div
        id="main-content-area"
        style={{ paddingLeft: sidebarOpen ? '300px' : 0 }}
      >
        <nav className="navbar navbar-expand-md bg-light navbar-light">
          <button className="btn" onClick={toggleSidebar}>
            <FontAwesomeIcon
              icon="bars"
              color="#303030"
              style={{ fontSize: '20px' }}
            />
          </button>
        </nav>
        <div className="px-5">
          <div className="row my-5">
            <div className="col-md-12">
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
  height: '100vh',
  overflow: 'hidden',
};

export default DefaultLayout;
