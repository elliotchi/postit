import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { MainContainer, HomeContainer, AuthenticateContainer } from 'containers';

const routes = (
  <Router history={browserHistory}>
    <Router path='/' component={MainContainer}>
      <IndexRoute component={HomeContainer} />
      <Route path='auth' component={AuthenticateContainer} />
    </Router>
  </Router>
);

export default routes;
