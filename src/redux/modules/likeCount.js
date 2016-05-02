import { ADD_LIKE, REMOVE_LIKE } from './usersLikes';

export const FETCHING_COUNT = 'FETCHING_COUNT';
export const FETCHING_COUNT_ERROR = 'FETCHING_COUNT_ERROR';
export const FETCHING_COUNT_SUCCESS = 'FETCHING_COUNT_SUCCESS';

// like count
// fetching the like count
export const fetchingCount = () => (
  {
    type: FETCHING_COUNT
  }
);
// error fetching the like count
export const fetchingCountError = error => (
  {
    type: FETCHING_COUNT_ERROR,
    error  
  }
);
// success fetching the like count for a post
export const fetchingCountSuccess = (postID, count) => (
  {
    type: FETCHING_COUNT_SUCCESS,
    postID,
    count
  }
);

// like count
const count = (state = 0, action) => {
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
};

export default (state = initialState, action) => {
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
      return state[action.postID] 
      ? state 
      : {
        ...state,
        [action.postID]: count(state[action.postID], action)
      }

    default:
      return state;
  }
};
