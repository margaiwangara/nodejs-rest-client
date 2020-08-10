import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { configureStore } from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faSpinner,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import Loading from '@/utils/Loading';
import SimpleBar from 'simplebar-react';

// font-awesome library
library.add(fab, faSpinner, faEyeSlash, faEye);

const store = configureStore();

const Main = React.lazy(() => import('@/container/Main/Main'));

function App() {
  return (
    <HashRouter>
      <div id="app" style={appStyling}>
        <React.Suspense fallback={Loading()}>
          <Provider store={store}>
            <SimpleBar
              autoHide={false}
              style={{ maxHeight: '100vh', width: '100%' }}
            >
              <Main />
            </SimpleBar>
          </Provider>
        </React.Suspense>
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
