import React from 'react';
import { render } from 'react-dom';
import getRoutes from './config/routes';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from './redux/modules';
import thunk from 'redux-thunk';
import { checkIfAuthed } from 'helpers/auth';
import { routerReducer, syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

const store = createStore(combineReducers({...reducers, routing: routerReducer}), compose(
  applyMiddleware(thunk),
window.devToolsExtension ? window.devToolsExtension() : (f) => f
));

const history = syncHistoryWithStore(browserHistory, store);

const checkAuth = (nextState, replace) => {
  const isAuthed = checkIfAuthed(store);
  const nextPathName = nextState.location.pathname
  if (nextPathName === '/' || nextPathName === '/auth') {
    if (isAuthed === true) {
      replace('/feed');
    }
  } else {
    if (isAuthed !== true) {
      replace('/auth');
    }
  }
}

render(
  <Provider store={store}>
    {getRoutes(checkAuth, history)}
  </Provider>
  , document.getElementById('app')
);
