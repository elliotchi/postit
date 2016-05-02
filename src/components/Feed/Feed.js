import React, { PropTypes } from 'react';
import { newPostContainer, header } from './styles.css';
import { errorMsg } from 'sharedStyles/styles.css';
import { PostContainer } from 'containers';

const NewPostsAvailable = ({handleClick}) => (
  <div className={newPostContainer} onClick={handleClick}>
    {'New Posts Available'}
  </div>
);

NewPostsAvailable.propTypes = {
  handleClick: PropTypes.func.isRequired
};

const Feed = ({isFetching, newPostsAvailable, resetNewPostsAvailable, postIds, error}) => {
  return isFetching
  ? <h1 className={header}>{'Fetching'}</h1>
  : <div>
      {newPostsAvailable ? <NewPostsAvailable handleClick={resetNewPostsAvailable} /> : null }

      {!postIds.length ? <p className={header}>{'No posts yet'}</p> : null }

      {postIds.map(id => (
        <PostContainer postID={id} key={id} />
        ))}

      {error ? <p className={errorMsg}>{error}</p> : null}
    </div>
} 
 
Feed.propTypes = {
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  newPostsAvailable: PropTypes.bool.isRequired,
  resetNewPostsAvailable: PropTypes.func.isRequired,
  postIds: PropTypes.array.isRequired
}

export default Feed;
