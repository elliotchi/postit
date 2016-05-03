import { postReply } from 'helpers/api';

export const ADD_REPLY = 'ADD_REPLY';
export const ADD_REPLY_ERROR = 'ADD_REPLY_ERROR';
export const REMOVE_REPLY = 'REMOVE_REPLY';
export const FETCHING_REPLIES = 'FETCHING_REPLIES';
export const FETCHING_REPLIES_ERROR = 'FETCHING_REPLIES_ERROR';
export const FETCHING_REPLIES_SUCCESS = 'FETCHING_REPLIES_SUCCESS';

// replies on each post actions
// add a reply to a post
export const addReply = (postID, reply) => {
  return {
    type: ADD_REPLY,
    postID,
    reply
  };
}
// add reply error
export const addReplyError = error => {
  return {
    type: ADD_REPLY_ERROR,
    error
  };
};
// remove a reply from a post
export const removeReply = replyID => {
  return {
    type: REMOVE_REPLY,
    replyID
  };
};
// fetching replies
export const fetchingReplies = () => {
  return {
    type: FETCHING_REPLIES
  };
};
// fetching replies error
export const fetchingRepliesError = error => {
  return {
    type: FETCHING_REPLIES_ERROR,
    error
  };
};
// fetching replies sucess
export const fetchingRepliesSuccess = (replies, postID, lastUpdated) => {
  return {
    type: FETCHING_REPLIES_SUCCESS,
    replies,
    postID,
    lastUpdated
  };
};

export const addAndHandleReply = (postID, reply) => dispatch => {
  const { replyWithID, replyPromise } = postReply(postID, reply);

  dispatch(addReply(postID, replyWithID));
  replyPromise.catch(error => {
    dispatch(removeReply(postID, replyWithID.replyID));
    dispatch(addReplyError(error));
  });
};

const initialReply = {
  name: '',
  reply: '',
  userID: '',
  timestamp: 0,
  avatar: '',
  replyID: ''
};

const postReplies = (state = initialReply, action) => {
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
};

const repliesAndLastUpdated = (state = initialPostState, action) => {
  switch (action.type) {
    case FETCHING_REPLIES_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        replied: action.replies
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
};

const initialState = {
  isFetching: true,
  error: ''
};

export default (state = initialState, action) => {
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
};

