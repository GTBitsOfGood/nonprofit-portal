import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initState = {};

const middleware = [thunk];

const bindMiddleware = (mware) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require
    const { composeWithDevTools } = require('redux-devtools-extension');

    return composeWithDevTools(applyMiddleware(...mware));
  }

  return applyMiddleware(...mware);
};

export default function initializeStore(initialState = initState) {
  return createStore(
    rootReducer,
    initialState,
    bindMiddleware(middleware),
  );
}
