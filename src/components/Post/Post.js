import React, { PropTypes } from 'react';
import { formatTimestamp } from 'helpers/utils';
import Reply from 'react-icons/lib/fa/mail-reply';
import Star from 'react-icons/lib/fa/star';

import {
  postContainer, contentContainer, avatar, actionContainer,
  header, text, likeReplyContainer, icon, likedIcon, author
} from './styles.css';

const { string, number, func, bool, shape } = PropTypes;

const Post = ({post: {avatar, name, timestamp, text, postID}, onClick, isLiked, addAndHandleLike, handleDeleteLike, numberOfLikes, hideReplyBtn, hideLikeCount, goToProfile}) => {
  const starIcon = isLiked ? likedIcon : icon;
  const starFn = isLiked ? handleDeleteLike : addAndHandleLike;

  return (
    <div 
      className={postContainer}
      style={{cursor: hideReplyBtn ? 'default' : 'pointer'}}
      onClick={onClick}>
        <img src={avatar} className={avatar} />
        <div className={contentContainer}>
          <div className={header}>
            <div onClick={goToProfile} className={author}>{name}</div>
            <div>{formatTimestamp(timestamp)}</div>
          </div>
          <div className={text}>{text}</div>
          <div className={likeReplyContainer}>
            {hideReplyBtn ? null : <Reply className={icon} />}
              <div className={actionContainer}>
                <Star className={starIcon} onClick={e => starFn(postID, e)} />
                {hideLikeCount ? null : <div>{numberOfLikes}</div>}
              </div>
          </div>
        </div>
    </div>
  );
};

Post.propTypes = {
  post: shape({
    avatar: string.isRequired,
    postID: string.isRequired,
    name: string.isRequired,
    text: string.isRequired,
    timestamp: number.isRequired,
    userID: string.isRequired
  }),
  onClick: func,
  isLiked: bool.isRequired,
  addAndHandleLike: func.isRequired,
  handleDeleteLike: func.isRequired,
  numberOfLikes: number,
  hideReplyBtn: bool.isRequired,
  hideLikeCount: bool.isRequired,
  goToProfile: func.isRequired
}

export default Post;
