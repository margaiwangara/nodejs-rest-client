import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { configureStore } from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Loading from '@/utils/Loading';

// font-awesome library
library.add(fab, faSpinner);

const store = configureStore();

const Main = React.lazy(() => import('@/container/Main/Main'));

function App() {
  return (
    <HashRouter>
      <div className="limiter">
        <div id="app" style={appStyling}>
          <React.Suspense fallback={Loading()}>
            <Provider store={store}>
              <Main />
            </Provider>
          </React.Suspense>
        </div>
      </div>
    </HashRouter>
  );
}

const appStyling = {
  width: '100%',
  height: '100vh',
  oveflow: 'hidden',
};

export default App;
