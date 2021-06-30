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
  faTrashAlt,
  faColumns,
  faUnlockAlt,
  faSignOutAlt,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import Loading from '@/utils/Loading';
import SimpleBar from 'simplebar-react';
import { ToastProvider } from 'react-toast-notifications';
import { createGlobalStyle } from 'styled-components';
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
  faTrashAlt,
  faColumns,
  faUnlockAlt,
  faSignOutAlt,
  faLink,
);

const store = configureStore();

const Main = React.lazy(() => import('@/container/Main/Main'));

function App() {
  return (
    <Router>
      <GlobalStyles />
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

const GlobalStyles = createGlobalStyle`
  :root {
    --custom-gray: #e9ebf1;
    --white: #ffffff;
  }

  /* Works on Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: var(--bs-green) transparent;
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 8px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background-color: var(--bs-green);
  border-radius: 20px;
  border: 5px solid var(----bs-gray);
}
`;

export default App;
