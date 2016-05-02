import {
  fetchUsersLikes, saveToUsersLikes, deleteFromUsersLikes,
  incrementNumberOfLikes, decrementNumberOfLikes
} from 'helpers/api';

export const ADD_LIKE = 'ADD_LIKE';
export const REMOVE_LIKE = 'REMOVE_LIKE';
export const FETCHING_LIKES = 'FETCHING_LIKES';
export const FETCHING_LIKES_ERROR = 'FETCHING_LIKES_ERROR';
export const FETCHING_LIKES_SUCCESS = 'FETCHING_LIKES_SUCCESS';

// users likes actions
// add like
export const addLike = postID => (
  {
    type: ADD_LIKE,
    postID
  }
);
// remove like
export const removeLike = postID => (
  {
    type: REMOVE_LIKE,
    postID
  }
);
// fetching likes
export const fetchingLikes = () => (
  {
    type: FETCHING_LIKES
  }
);
// error fetching likes
export const fetchingLikesError = error => (
  {
    type: FETCHING_LIKES_ERROR,
    error
  }
);
// success fetching likes
export const fetchingLikesSuccess = likes => (
  {
    type: FETCHING_LIKES_SUCCESS,
    likes    
  }
);

export const addAndHandleLike = (postID, e) => {
  e.stopPropagation();

  return (dispatch, getState) => {
    dispatch(addLike(postID));

    const userID = getState().users.authedID;
    Promise.all([
      saveToUsersLikes(userID, postID),
      incrementNumberOfLikes(postID)      
    ])
    .catch(error => {
      console.warn(error);
      dispatch(removeLike(postID));
    });
  }
};

export const handleDeleteLike = (postID, e) => {
  e.stopPropagation();

  return (dispatch, getState) => {
    dispatch(removeLike(postID));

    const userID = getState().users.authedID;

    Promise.all([
      deleteFromUsersLikes(userID, postID),
      decrementNumberOfLikes(postID)
    ])
    .catch(error => {
      console.warn(error);
      dispatch(addLike(postID))
    })    
  }
};

export const setUsersLikes = () => 
  (dispatch, getState) => {
    const userID = getState().users.authedID;
    dispatch(fetchingLikes());
    fetchUsersLikes(userID)
      .then(likes => dispatch(fetchingLikesSuccess(likes)))
      .catch(error => dispatch(fetchingLikesError(error)));
  }

// usersLikes
const initialState = {
  isFetching: false,
  error: ''
}

export default (state = initialState, action) => {
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
          prev[curr] = state[curr]
          return prev;
        }, {})

    default:
      return state
  }
};
