import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { MainContainer, HomeContainer, AuthenticateContainer, FeedContainer, LogoutContainer } from 'containers';

export default (checkAuth) => {
  return (
    <Router history={browserHistory}>
      <Router path='/' component={MainContainer}>
        <IndexRoute component={HomeContainer} onEnter={checkAuth} />
        <Route path='auth' component={AuthenticateContainer} onEnter={checkAuth}/>
        <Route path='feed' component={FeedContainer} onEnter={checkAuth} />
        <Route path='logout' component={LogoutContainer} />
      </Router>
    </Router>
  )
};

