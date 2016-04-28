// Users reducer
const initialUserState = {
  lastUpdated = 0,
  info: {
    name: '',
    userID: '',
    avatar: ''
    }
}

function user(state = initialUserState, action) {
  switch (action.type) {
    case FETCHING_USER_SUCCESS:
      return {
        ...state,
        info: action.user,
        lastUpdated: action.timestamp
      }
    default:
      return state;
  }
}

const initialState = {
  isFetching: false,
  error: '',
  isAuthed: false,
  authedID: ''
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuthed: true,
        authedID: action.userID
      }

    case UNAUTH_USER:
      return {
        ...state,
        isAuthed: true,
        authedID: action.userID
      }

    case FETCHING_USER:
      return {
        ...state,
        isFetching: true
      }

    case FETCHING_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }

    case FETCHING_USER_SUCCESS:
      return action.user === null ?
      {
        ...state,
        isFetching: false,
        error: ''
      } :
      {
        ...state,
        isFetching: false,
        error: '',
        [action.userID]: user(state[action.userID], action)
      }

    default:
      return state;
  }
}

// POSTS
const initialState = {
  isFetching: true,
  error: ''
}

export default function posts(state = initialState, action) {
  switch (action.type) {
    case FETCHING_POST:
      return {
        ...state,
        isFetching: true
      }

    case ADD_DUCK:
    case FETCHING_POST_SUCCESS:
      return {
        ...state,
        error: '',
        isFetching: false,
        [action.post.postID]: action.post
      }

    case FETCHING_POST_ERROR:
      return {
        ...state,
        error: '',
        isFetching: false
      }

    case REMOVE_FETCHING:
      return {
        ...state,
        error: '',
        isFetching: false
      }

    case ADD_MULTIPLE_POSTS:
      return {
        ...state,
        ...action.posts
      }

    default:
      return state;
  }
}

// Feed
const initialState = {
  newPostsAvailable: false,
  newPostsToAdd: [],
  isFetching: false,
  error: '',
  postIds: []
}

export default function feed(state = initialState, action) {
  switch(action.type) {
    case SETTING_FEED_LISTENER:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }

    case SETTING_FEED_LISTENER_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }

    case SETTING_FEED_LISTENER_SUCCESS:
      return {
        ...state,
        newPostsToAdd: [actionpostID, ...state.newPostsToAdd],
        newPostsAvailable: true
      }

    case RESET_NEW_POSTS_AVAILABLE:
      return {
        ...state,
        postIds: [...state.newPostsToAdd, ...state.postIds],
        newPostsToAdd: [],
        newPostsAvailable: false
      }

    default:
      return state;
  }
}

// Modal
const initialState = {
  postText: '',
  isOpen: false
}

export default function modal (state = initialState, action) {
  switch (action.typ) {
    case OPEN_MODAL:
      return {
        ...state,isOpen: true
      }

    case CLOSE_MODAL:
      return {
        postText: '',
        isOpen: false
      }

    case UPDATE_POST_TEXT:
      return {
        ...state,
        postText: action.newPostText
      }

    default:
      return state
  }
}

// Replies
const initialReply = {
  name: '',
  reply: '',
  userID: '',
  timestamp: 0,
  avatar: '',
  replyID: ''
}

function postReplies (state = initialReply, action) {
  switch (action.type) {
    case ADD_REPLY:
      return {
        ...state,
        [action.reply.replyID]: action.reply
      }

    case REMOVE_REPLY:
      return {
        ...state,
        [action.reply.replyID]: undefined
      }
    default:
      return state;
  }
}

const initialPostState = {
  lastUpdated: Date.now(),
  replies: {}
}

function repliesAndLastUpdated (state = initialPostState, action) {
  switch (action.type) {
    case FETCHING_REPLIES_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        replies: action.replies
      }
    case ADD_REPLY:
    case REMOVE_REPLY:
      return {
        ...state,
        replies: postReplies(state.replies, action)
      }
    default:
      return state;
  }
}

const initialState = {
  isFetching: true,
  error: ''
}

export default function replies (state = initialState, action) {
  switch (action.type) {
    case FETCHING_REPLIES:
      return {
        ...state,
        isFetching: true
      }

    case FETCHING_REPLIES_ERROR:
    case ADD_REPLY_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }

    case ADD_REPLY:
    case REMOVE_REPLY:
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.postID]: repliesAndLastUpdated(state[action.postID], action)
      }
    default:
      return state;
  }
}

// like count
function count (state = 0, action) {
  switch (action.type) {
    case ADD_LIKE:
      return state + 1
    case REMOVE_LIKE:
      return state - 1
    default:
      return state
  }
}

const initialState = {
  isFetching: false,
  error: ''
}

export default function likeCount (state = initialState, action) {
  switch (action.type) {
    case FETCHING_COUNT:
      return {
      ...state,
        isFetching: true
    }

    case FETCHING_COUNT_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }

    case FETCHING_COUNT_SUCCESS:
      return {
        ...state,
        ...initialState,
        [action.postID]: action.count
      }

    case ADD_LIKE:
    case REMOVE_LIKE:
      return !!state[action.postID] ?
        state :
      {
        ...state,
        [action.postID]: count(state[action.postID], action)
      }

    default:
      return state;
  }
}

// users ducks
function usersPost (state = initialUsersPostState, action) {
  switch (action.type) {
    case ADD_SINGLE_USERS_POST:
      return {
        ...state,
        postIds: state.postIds.concat([action.postId])
      }
    default:
      return state;
  }
}

const initialState = {
  isFetching: true,
  error: ''
}

export default function usersPosts (state = initialState, action) {
  switch (action.type) {
    case FETCHING_USERS_POSTS:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_USERS_POSTS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case FETCHING_USERS_POSTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.userID]: {
          lastUpdated: action.lastUpdated,
          postsIds: action.postIds
        }
      }
    case ADD_SINGLE_USERS_POST:
      return !!state[action.userID] ?
        state :
      {
        ...state,
        isFetching: false,
        error: '',
        [action.userID]: usersPost(state[action.userID], action)
      }
    default:
      return state;
  }
}

// usersLikes
const initialState = {
  isFetching: false,
  error: ''
}

export default function usersLikes (state = initialState, action) {
  switch (action.type) {
    case FETCHING_LIKES:
      return {
        ...state,
        isFetching: true
      }

    case FETCHING_LIKES_SUCCESS:
      return {
        ...state,
        ...action.likes,
        isFetching: false,
        error: ''
      }

    case ADD_LIKE:
      return {
        ...state,
        [action.postID]: true
      }

    case REMOVE_LIKE:
      return Object.keys(state)
        .filter(postID => action.postID !== postID)
        .reduce((prev, curr) => {
          prev[current] = state[current]
          return prev;
        }, {})

    default:
      return state
  }
}