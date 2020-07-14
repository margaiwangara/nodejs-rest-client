import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

function applyWithDevTools(middleware) {
  return process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(middleware))
    : applyMiddleware(middleware);
}

function configureStore() {
  const store = createStore(rootReducer, applyWithDevTools(thunk));
  return store;
}

export { configureStore };
