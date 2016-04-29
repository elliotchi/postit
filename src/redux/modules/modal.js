export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT';

// modals
// open the modal instance
export const openModal = () => {
  return {
    type: OPEN_MODAL
  }
}
// close the modal instance
export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  }
}
// update the post text in the modal
export const updatePostText = newPostText => {
  return {
    type: UPDATE_POST_TEXT,
    newPostText
  }
}

const initialState = {
  postText: '',
  isOpen: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true
      };
      
    case CLOSE_MODAL:
      return {
        postText: '',
        isOpen: false
      };
      
    case UPDATE_POST_TEXT:
      return {
        ...state,
        postText: action.newPostText
      };
      
    default:
      return state;
  }
};
