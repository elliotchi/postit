export const FETCHING_USERS_POSTS = 'FETCHING_USERS_POSTS';
export const FETCHING_USERS_POSTS_ERROR = 'FETCHING_USERS_POSTS_ERROR';
export const FETCHING_USERS_POSTS_SUCCESS = 'FETCHING_USERS_POSTS_SUCCESS';
export const ADD_SINGLE_USERS_POST = 'ADD_SINGLE_USERS_POST';

// users posts actions
// fetching users posts
export const fetchingUsersPosts = userID => (
  {
    type: FETCHING_USERS_POSTS,
    userID
  }
);
// error fetching users posts
export const fetchingUsersPostsError = error => (
  {
    type: FETCHING_USERS_POSTS_ERROR,
    error
  }
);
// success fetching users posts
export const fetchingUsersPostsSuccess = (userID, postIds, lastUpdated) => (
  {
    type: FETCHING_USERS_POSTS_SUCCESS,
    userID,
    postIds,
    lastUpdated
  }
);
// add single users posts
export const addSingleUsersPost = (userID, postID) => (
  {
    type: ADD_SINGLE_USERS_POST,
    userID,
    postID
  }
);

const initialUsersPostState = {
  lastUpdated: 0,
  postIds: []
};

const usersPost = (state = initialUsersPostState, action) => {
  switch (action.type) {
    case ADD_SINGLE_USERS_POST:
      return {
        ...state,
        postIds: state.postIds.concat([action.postIds])
      }
    default:
      return state;
  }
};

const initialState = {
  isFetching: true,
  error: ''
};

export default (state = initialState, action) => {
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
          postIds: action.postIds
        }
      }
      
    case ADD_SINGLE_USERS_POST:
      return !!state[action.userID] ? state : {
        ...state,
        isFetching: false,
        error: '',
        [action.userID]: usersPost(state[action.userID],
        action)
      }
      
    default:
      return state;
  }
}
