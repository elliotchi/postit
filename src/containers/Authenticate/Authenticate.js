import React, { Component } from 'react';
import { Authenticate } from 'components';
import auth from 'helpers/auth';

class AuthenticateController extends Component {

  handleAuth() {
    auth()
      .then(user => {
        console.log('authed user: ', user);
      });
  }
  
  render() {
    return (
      <div>
        <Authenticate 
          isFetching={false}
          error={''}
          onAuth={this.handleAuth}
        />
      </div>
    )
  }
}

export default AuthenticateController;
