// Users actions

// when we authorize the user and get back the userID
{
  type: AUTH_USER,
  userID
}
// When we unauthorize the user
{
  type: UNAUTH_USER
}
// when we are fetching user information
{
  type: FETCHING_USER
}
// when we have an error fetching the user
{
  type: FETCHING_USER_ERROR,
  error: 'error fetching user'
}
// when we successfully fetch the user
{
  type: FETCHING_USER_SUCCESS,
  userID,
  user,
  timestamp
}

// Post actions
{
  type: FETCHING_POST
}
// error fetching post
{
  type: FETCHING_POST_ERROR,
  error: 'error fetching post'
}
// successfully fetch posts
{
  type: FETCHING_POST_SUCCESS,
  post
}
// remove the fetching status => true
{
  type: REMOVE_FETCHING
}
// add post
{
  type: ADD_POST,
  post
}
// add multiple posts
{
  type: ADD_MULTIPLE_POSTS,
  posts
}

// post FEED actions
// sets the listening status
{
  type: SETTING_FEED_LISTENER
}
// error fetching feeds
{
  type: SETTING_FEED_LISTENER_ERROR,
  error: 'error setting feed listener'
}
// successful fetching feeds
{
  type: SETTING_FEED_LISTENER_SUCCESS,
  postIds
}
// adding a new duck id to the feed so that we can update the view
{
  type: ADD_NEW_POST_ID_TO_FEED,
  postID
}
// resets the new post available status
{
  type: RESET_NEW_POSTS_AVAILABLE
}

// Listeners actions
// add listener
{
  type: ADD_LISTENER,
  listenerID
}

// modals
// open the modal instance
{
  type: OPEN_MODAL
}
// close the modal instance
{
  type: CLOSE_MODAL
}
// update the post text in the modal
{
  type: UPDATE_POST_TEXT,
  newPostText
}

// replies on each post actions
// add a reply to a post
{
  type: ADD_REPLY,
  postID,
  reply
}
// add reply error
{
  type: ADD_REPLY_ERROR,
  error: 'error adding reply'
}
// remove a reply from a post
{
  type: REMOVE_REPLY,
  replyID
}
// fetching replies
{
  type: FETCHING_REPLIES
}
// fetching replies error
{
  type: FETCHING_REPLIES_ERROR,
  error: 'error fetching replies'
}
// fetching replies sucess
{
  type: FETCHING_REPLIES_SUCCESS,
  replies,
  postID,
  lastUpdated: Date.now()
}

// like count
// fetching the like count
{
  type: FETCHING_COUNT
}
// error fetching the like count
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
// add single users posts
{
  type: ADD_SINGLE_USERS_POST,
  userID,
  postID
}

// users likes actions
// add like
{
  type: ADD_LIKE,
  postID
}
// remove like
{
  type: REMOVE_LIKE,
  postID
}
// fetching likes
{
  type: FETCHING_LIKES
}
// error fetching likes
{
  type: FETCHING_LIKES_ERROR,
  error: 'error fetching likes'
}
// success fetching likes
{
  type: FETCHING_LIKES_SUCCESS,
  likes
}
