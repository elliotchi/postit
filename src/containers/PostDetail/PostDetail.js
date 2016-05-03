import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PostDetail } from 'components';
import * as postActionCreators from 'redux/modules/posts';
import * as likeCountActionCreators from 'redux/modules/likeCount';

class PostDetailContainer extends Component {
  static propTypes = {
    authedUser: PropTypes.object.isRequired,
    postID: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    postAlreadyFetched: PropTypes.bool.isRequired,
    fetchAndHandlePost: PropTypes.func.isRequired,
    initLikeFetch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { postAlreadyFetched, fetchAndHandlePost, removeFetching, postID, initLikeFetch } = this.props;
    initLikeFetch(postID);
    if (!postAlreadyFetched) {
      fetchAndHandlePost(postID);
    } else {
      removeFetching();
    }
  }

  render() {
    const { authedUser, postID, isFetching, error } = this.props;
    return (
      <PostDetail 
        authedUser={authedUser}
        postID={postID}
        isFetching={isFetching}
        error={error}
      />
    );
  }
}

const mapStateToProps = ({posts, likeCount, users}, {routeParams: {postID}}) => {
  return {
    isFetching: posts.isFetching || likeCount.isFetching,
    error: posts.error,
    authedUser: users[users.authedID].info,
    postID,
    postAlreadyFetched: !!posts[postID]
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...postActionCreators,
  ...likeCountActionCreators
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailContainer);
