import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { MainContainer, HomeContainer, AuthenticateContainer, FeedContainer, LogoutContainer, UserContainer, PostDetailContainer } from 'containers';

export default (checkAuth, history) => {
  return (
    <Router history={history}>
      <Router path='/' component={MainContainer}>
        <IndexRoute component={HomeContainer} onEnter={checkAuth} />
        <Route path='auth' component={AuthenticateContainer} onEnter={checkAuth}/>
        <Route path='feed' component={FeedContainer} onEnter={checkAuth} />
        <Route path='logout' component={LogoutContainer} />
        <Route path='/:userID' component={UserContainer} onEnter={checkAuth} />
        <Route path='/postDetail/:postID' component={PostDetailContainer} onEnter={checkAuth} />
      </Router>
    </Router>
  )
};

