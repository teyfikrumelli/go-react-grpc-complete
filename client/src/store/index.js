import thunk from 'redux-thunk';
import {
  compose,
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';

import * as reducers from './reducers';

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers(reducers),
  {},
  composeEnhancers(applyMiddleware(thunk))
);
