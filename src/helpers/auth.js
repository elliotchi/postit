import { ref } from 'config/constants';
import { formatUserInfo } from 'helpers/utils';
import { authUser, fetchingUserSuccess } from 'redux/modules/users';

export default () => ref.authWithOAuthPopup('facebook');

export const checkIfAuthed = store => {
  // store.getState().isAuthed;
  const authData = ref.getAuth();
  if (authData === null) {
    return false;
  } else if (store.getState().isAuthed === false) {
    const { userID, facebook: {displayName, profileImageURL} } = authData;
    const userInfo = formatUserInfo(displayName, profileImageURL, userID);
    
    store.dispatch(authUser(userID))
    store.dispatch(fetchingUserSuccess(userID, userInfo, Date.now()));
  }
  
  return true;
}

export const logout = () => 
ref.unauth()

export const saveUser = user => {
  console.log(user);
  return ref.child(`users/${user.userID}`)
    .set(user)
    .then(() => user)
}
