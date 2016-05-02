import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Post } from 'components';
import * as usersLikesActions from 'redux/modules/usersLikes';

const { func, object, bool, number } = PropTypes;

class PostContainer extends Component {
  static contextTypes = {
    router: object.isRequired
  }

  static propTypes = {
    post: object.isRequired,
    numberOfLikes: number,
    isLiked: bool.isRequired,
    hideLikeCount: bool.isRequired,
    hideReplyBtn: bool.isRequired,
    handleDeleteLike: func.isRequired,
    addAndHandleLike: func.isRequired
  }

  static defaultProps = {
    hideReplyBtn: false,
    hideLikeCount: true
  }

  goToProfile(e) {
    const { router } = this.context;
    const { post } = this.props;
    e.stopPropagation();
    router.push(`/${post.userID}`);
  }

  handleClick(e) {
    e.stopPropagation();
    const { router } = this.context;
    const { post } = this.props;
    router.push(`/postDetail/${post.postID}`);
  }

  render() {
    const { hideReplyBtn } = this.props;
    return (
      <Post 
        goToProfile={this.goToProfile.bind(this)}
        onClick={hideReplyBtn ? null : this.handleClick.bind(this)}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({posts, likeCount, usersLikes}, {postID, hideLikeCount, hideReplyBtn}) => (
  {
    post: posts[postID],
    hideLikeCount,
    hideReplyBtn,
    isLiked: usersLikes[postID] === true,
    numberOfLikes: likeCount[postID]
  }
);

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(usersLikesActions, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
