import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faSpinner,
  faEye,
  faEyeSlash,
  faChevronLeft,
  faUserEdit,
  faKey,
  faPencilAlt,
  faArrowAltCircleRight,
  faTachometerAlt,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import Loading from '@/utils/Loading';
import SimpleBar from 'simplebar-react';
import { ToastProvider } from 'react-toast-notifications';

// font-awesome library
library.add(
  fab,
  faSpinner,
  faEyeSlash,
  faEye,
  faChevronLeft,
  faUserEdit,
  faKey,
  faPencilAlt,
  faArrowAltCircleRight,
  faTachometerAlt,
  faBars,
);

const store = configureStore();

const Main = React.lazy(() => import('@/container/Main/Main'));

function App() {
  return (
    <Router>
      <div id="app" style={appStyling}>
        <React.Suspense fallback={Loading()}>
          <Provider store={store}>
            <ToastProvider>
              <SimpleBar
                autoHide={false}
                style={{ maxHeight: '100vh', width: '100%' }}
              >
                <Main />
              </SimpleBar>
            </ToastProvider>
          </Provider>
        </React.Suspense>
      </div>
    </Router>
  );
}

const appStyling = {
  width: '100%',
  height: '100vh',
  oveflow: 'hidden',
};

export default App;
