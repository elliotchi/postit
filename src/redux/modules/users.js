// Users actions
const AUTH_USER = 'AUTH_USER';
const UNAUTH_USER = 'UNAUTH_USER';
const FETCHING_USER = 'FETCHING_USER';
const FETCHING_USER_ERROR = 'FETCHING_USER_ERROR';
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS';
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE';

// when we authorize the user and get back the userID
export const authUser = (userID) => {
  return {
    type: AUTH_USER,
    userID
  }
}

// When we unauthorize the user
export const unauthUser = () => {
  return {
    type: UNAUTH_USER
  };
}
// when we are fetching user information
export const fetchingUser = () => {
  return {
    type: FETCHING_USER
  };
}
// when we have an error fetching the user
export const fetchingUserError = error => {
  return {
    type: FETCHING_USER_ERROR,
    error
  };
}

// when we successfully fetch the user
export const fetchingUserSuccess = (userID, user, timestamp) => {
  return {
    type: FETCHING_USER_SUCCESS,
    userID,
    user,
    timestamp
  };
}


// Users reducer
const initialUserState = {
  lastUpdated: 0,
  info: {
    name: '',
    userID: '',
    avatar: ''
  }
}


export const user = (state = initialUserState, action) => {
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

export const users = (state = initialState, action) => {
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