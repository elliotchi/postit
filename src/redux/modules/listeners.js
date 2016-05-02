const ADD_LISTENER = 'ADD_LISTENER';

// Listeners actions
// add listener
export const addListener = listenerID => (
  {
    type: ADD_LISTENER,
    listenerID
  }
);

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_LISTENER:
      return {
        ...state,
        [action.listenerID]: true
      }
      
    default:
      return state;
  }
};
