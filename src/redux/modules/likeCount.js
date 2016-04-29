export const FETCHING_COUNT = 'FETCHING_COUNT';
export const FETCHING_COUNT_ERROR = 'FETCHING_COUNT_ERROR';
export const FETCHING_COUNT_SUCCESS = 'FETCHING_COUNT_SUCCESS';
export const FETCHING_USERS_POSTS = 'FETCHING_USERS_POSTS';
export const FETCHING_USERS_POSTS_ERROR = 'FETCHING_USERS_POSTS_ERROR';
export const FETCHING_USERS_POSTS_SUCCESS = 'FETCHING_USERS_POSTS_SUCCESS';

// like count
// fetching the like count
export const fetchingCount = () => {
  return {
    type: FETCHING_COUNT
  }
};
// error fetching the like count
export const FETCHING
{
  type: FETCHING_COUNT_ERROR,
  error: 'error fetching like count'
}
// success fetching the like count for a post
{
  type: FETCHING_COUNT_SUCCESS,
  postID,
  count
}

// users posts actions
// fetching users posts
{
  type: FETCHING_USERS_POSTS,
  userID
}
// error fetching users posts
{
  type: FETCHING_USERS_POSTS_ERROR,
  error: 'error fetching users posts'
}
// success fetching users posts
{
  type: FETCHING_USERS_POSTS_SUCCESS,
  userID,
  postIds,
  lastUpdated
}