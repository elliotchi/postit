// this is a schema for what my redux stor will look like
const store = {
  // the users part of my schema
  users: {
    //if the user is authenticated or not
    isAuthed,
    //whether we are fetching the user info
    isFetching,
    //if theres an error fetching the schema
    error,
  //  our current authed user's id
    authedID,
    [userID]: {
      lastUpdated,
      info: {
        name,
        userID,
        avatar
      }
    }
  },

  modal: {
    post,
    isOpen
  },

  posts: {
    [postID]: {
      lastUpdated,
      info: {
        avatar,
        postID,
        name,
        text,
        timestamp,
        userID
      }
    }
  },
  likeCount: {
    [postID]: 0
  },
  usersPosts: {
    isFetching,
    error,
    [userID]: {
      lastUpdated,
      postIds: [postID, postID, postId]
    }
  },
  usersLikes: {
    postID: true
  },
  feed: {
    isFetching,
    error,
    newPostsAvailable,
    postIdsToAdd: [postID],
    postIds: [postID]
  },

  replies: {
    isFetching,
    error,
    [postID]: {
      lastUpdated,
      replies: {
        [replyID]: {
          name,
          reply,
          userID,
          timestamp,
          avatar
        }
      }
    }
  },
  listeners: {
    [listenerID]: true
  }
}