import React, { Component, PropTypes } from 'react';
import { Authenticate } from 'components';
import auth from 'helpers/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActionCreators from './../../redux/modules/users';

class AuthenticateContainer extends Component {
  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    authUser: PropTypes.func.isRequired,
    fetchingUser: PropTypes.func.isRequired,
    fetchingUserFailure: PropTypes.func.isRequired,
    fetchingUserSuccess: PropTypes.func.isRequired
  }

  handleAuth() {
    const { fetchingUser, fetchingUserSuccess, authUser, fetchUserFailure } = this.props;
    fetchingUser();
    
    auth()
      .then(user => {
        (fetchingUserSuccess(123, user, Date.now()));
        (authUser(123));
        console.log('authed user: ', user);
      })
      .catch(err => (fetchUserFailure(err)));
  }
  
  render() {
    const { isFetching, error } = this.props;
    return (
      <div>
        <Authenticate 
          isFetching={isFetching}
          error={error}
          onAuth={() => this.handleAuth()}
        />
      </div>
    )
  }
}

const mapStateToProps = ({isFetching, error}) => {
  return {
    isFetching,
    error 
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(userActionCreators, dispatch);
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(AuthenticateContainer);
