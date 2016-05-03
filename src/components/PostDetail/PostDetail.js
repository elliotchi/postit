import React, { PropTypes } from 'react';
import {
  mainContainer, container, content, repliesContainer,
  replyTextAreaContainer, replyTextArea } from './styles.css';
import { subHeader, darkBtn, errorMsg } from 'sharedStyles/styles.css';
import { PostContainer } from 'containers';

const PostDetail = ({authedUser, postID, isFetching, error}) => (
  <div className={mainContainer}>
    {isFetching ? <p className={subHeader}>{'Fetching'}</p>
      : <div className={container}>
          <div className={content}>
            <PostContainer postID={postID} hideLikeCount={false} hideReplyBtn={true} />
            make reply
          </div>
          <div className={repliesContainer}>
            reply section
          </div>
        </div>
    }
    {error ? <p className={errorMsg}>{error}</p> : null}
  </div>
);

PostDetail.propTypes = {
  authedUser: PropTypes.object.isRequired,
  postID: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
}

export default PostDetail;
