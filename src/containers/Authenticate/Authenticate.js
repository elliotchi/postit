import React, { Component, PropTypes } from 'react';
import { Authenticate } from 'components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActionCreators from './../../redux/modules/users';

class AuthenticateContainer extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    fetchAndHandleAuthedUser: PropTypes.func.isRequired
  }
  
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  handleAuth(e) {
    e.preventDefault();
    const { fetchAndHandleAuthedUser } = this.props;
    const { router } = this.context;
    fetchAndHandleAuthedUser()
      .then(() => router.replace('feed'));
  }
  
  render() {
    const { isFetching, error } = this.props;
    return (
      <div>
        <Authenticate 
          isFetching={isFetching}
          error={error}
          onAuth={(e) => this.handleAuth(e)}
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

const mapDispatchToProps = (dispatch) => (bindActionCreators(userActionCreators, dispatch));

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(AuthenticateContainer);
