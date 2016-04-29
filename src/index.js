import React from 'react';
import { render } from 'react-dom';
import getRoutes from './config/routes';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import users from './redux/modules/users';
import thunk from 'redux-thunk';
import { checkIfAuthed } from 'helpers/auth';

const store = createStore(users, applyMiddleware(thunk));

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
    {getRoutes(checkAuth)}
  </Provider>
  , document.getElementById('app')
);
