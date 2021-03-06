import { addListener } from 'redux/modules/listeners';
import { listenToFeed } from 'helpers/api';
import { addMultiplePosts } from './posts';

export const SETTING_FEED_LISTENER = 'SETTING_FEED_LISTENER';
export const SETTING_FEED_LISTENER_ERROR = 'SETTING_FEED_LISTENER_ERROR';
export const SETTING_FEED_LISTENER_SUCCESS = 'SETTING_FEED_LISTENER_SUCCESS';
export const ADD_NEW_POST_ID_TO_FEED = 'ADD_NEW_POST_ID_TO_FEED';
export const RESET_NEW_POSTS_AVAILABLE = 'RESET_NEW_POSTS_AVAILABLE';

// post FEED actions
// sets the listening status
export const settingFeedListener = () => {
  return {
    type: SETTING_FEED_LISTENER
  };
};
// error fetching feeds
export const settingFeedListenerError = error => {
  return {
    type: SETTING_FEED_LISTENER_ERROR,
    error
  };
};
// successful fetching feeds
export const settingFeedListenerSuccess = postIds => {
  return {
    type: SETTING_FEED_LISTENER_SUCCESS,
    postIds
  };
};
// adding a new duck id to the feed so that we can update the view
export const addNewPostIdToFeed = postID => {
  return {
    type: ADD_NEW_POST_ID_TO_FEED,
    postID
  };
};
// resets the new post available status
export const resetNewPostsAvailable = () => {
  return {
    type: RESET_NEW_POSTS_AVAILABLE
  };
};

export const setAndHandleFeedListener = () => {
  let initialFetch = true;

  return (dispatch, getState) => {
    if (getState().listeners.feed) {
      return;
    }

    dispatch(addListener('feed'));
    dispatch(settingFeedListener())
    listenToFeed(({feed, sortedIds}) => {
      dispatch(addMultiplePosts(feed));
      initialFetch ? dispatch(settingFeedListenerSuccess(sortedIds)) : dispatch(addNewPostIdToFeed(sortedIds[0]));
      initialFetch = false;
    }, error => dispatch(settingFeedListenerError(error)));
  }
};

const initialState = {
  newPostsAvailable: false,
  newPostsToAdd: [],
  isFetching: false,
  error: '',
  postIds: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SETTING_FEED_LISTENER:
      return {
        ...state,
        isFetching: true
      };
      
    case SETTING_FEED_LISTENER_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
      
    case SETTING_FEED_LISTENER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        postIds: action.postIds,
        newPostsAvailable: false
      };

    case ADD_NEW_POST_ID_TO_FEED:
      return {
        ...state,
        newPostsToAdd: [action.postID, ...state.newPostsToAdd],
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
};
