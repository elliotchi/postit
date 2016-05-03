import React, { PropTypes } from 'react';
import {
  mainContainer, container, content, repliesContainer,
  replyTextAreaContainer, replyTextArea } from './styles.css';
import { subHeader, darkBtn, errorMsg } from 'sharedStyles/styles.css';
import { PostContainer } from 'containers';
import { formatReply } from 'helpers/utils';

const Reply = ({submit}) => {
  const handleSubmit = e => {
    if (!Reply.ref.value) {
      return;
    } else {
      submit(Reply.ref.value, e);
      Reply.ref.value = '';
    }
  }

  return (
    <div className={replyTextAreaContainer}>
      <textarea
        ref={ref => { Reply.ref = ref }}
        className={replyTextArea}
        maxLength={140}
        placeholder={'respond'}
        type='text'/>
      <button onClick={handleSubmit} className={darkBtn}>
        {'submit'}
      </button>
    </div>
  );
}

const PostDetail = ({authedUser, postID, isFetching, error, addAndHandleReply}) => (
  <div className={mainContainer}>
    {isFetching ? <p className={subHeader}>{'Fetching'}</p>
      : <div className={container}>
          <div className={content}>
            <PostContainer postID={postID} hideLikeCount={false} hideReplyBtn={true} />
            <Reply submit={replyText => addAndHandleReply(postID, formatReply(authedUser, replyText))} />
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
  error: PropTypes.string.isRequired,
  addAndHandleReply: PropTypes.func.isRequired
}

export default PostDetail;
