import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { User } from 'components';
import { bindActionCreators } from 'redux';
import * as usersActionCreators from 'redux/modules/users';
import * as usersPostsActionCreators from 'redux/modules/usersPosts';
import { staleUser, stalePosts } from 'helpers/utils';

class UserContainer extends Component {
  static propTypes = {
    noUser: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    postIds: PropTypes.array.isRequired,
    fetchAndHandleUser: PropTypes.func.isRequired,
    fetchAndHandlerUsersPosts: PropTypes.func.isRequired,
    lastUpdatedUser: PropTypes.number.isRequired,
    lastUpdatedPosts: PropTypes.number.isRequired
  }

  componentDidMount() {
    const { routeParams, fetchAndHandleUser, fetchAndHandlerUsersPosts, noUser, lastUpdatedUser, lastUpdatedPosts } = this.props;

    const userID = routeParams.userID;
    if (noUser || staleUser(lastUpdatedUser)) {
      fetchAndHandleUser(userID);
    }

    if (noUser || stalePosts(lastUpdatedPosts)) {
      fetchAndHandlerUsersPosts(userID);
    }
  }

  render() {
    const { noUser, name, isFetching, error, postIds } = this.props;
    return (
      <User 
        noUser={noUser}
        name={name}
        isFetching={isFetching}
        error={error}
        postIds={postIds}
      />
    );
  }
};

const mapStateToProps = ({users, usersPosts}, {routeParams}) => {
  const user = users[routeParams.userID];
  const noUser = user === undefined;
  const specificUsersPosts = usersPosts[routeParams.userID];

  return {
    noUser,
    name: noUser ? '' : user.info.name,
    isFetching: users.isFetching || usersPosts.isFetching,
    error: users.error || usersPosts.error,
    postIds: specificUsersPosts ? specificUsersPosts.postIds : [],
    lastUpdatedUser: user ? user.lastUpdated : 0,
    lastUpdatedPosts: specificUsersPosts ? specificUsersPosts.lastUpdated : 0
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  ...usersActionCreators,
  ...usersPostsActionCreators
}, dispatch) 

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
