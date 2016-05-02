import { ref } from 'config/constants';

const saveToPosts = post => {
  const postID = ref.child('posts').push().key();
  const postPromise = ref.child(`posts/${postID}`).set({...post, postID});
  
  return {
    postID,
    postPromise
  }
};

const saveToUsersPosts = (post, postID) => (
  ref.child(`usersPosts/${post.userID}/${postID}`)
    .set({...post, postID})
);

const saveLikeCount = postID => (
  ref.child(`likeCount/${postID}`).set(0)
);

export const savePost = post => {
  const { postID, postPromise } = saveToPosts(post);
  
  return Promise.all([
    postPromise,
    saveToUsersPosts(post, postID),
    saveLikeCount(postID)
  ])
    .then(() => ({...post, postID}));
};

export const listenToFeed = (cb, errorCB) => {
  ref.child('posts').on('value', snapshot => {
    const feed = snapshot.val() || {};
    const sortedIds = Object.keys(feed).sort((a, b) => feed[b].timestamp - feed[a].timestamp);
    cb({feed, sortedIds})
  }, errorCB);
};

export const fetchUsersLikes = userID => (
  ref.child(`usersLikes/${userID}`).once('value')
    .then(snapshot => snapshot.val() || {})
);

export const saveToUsersLikes = (userID, postID) => (
  ref.child(`usersLikes/${userID}/${postID}`).set(true)
);

export const deleteFromUsersLikes = (userID, postID) => (
  ref.child(`usersLikes/${userID}/${postID}`).set(null)
);

export const incrementNumberOfLikes = postID => (
  ref.child(`likeCount/${postID}`)
    .transaction((current = 0) => current + 1)
);

export const decrementNumberOfLikes = postID => (
  ref.child(`likeCount/${postID}`)
    .transaction((current = 0) => current - 1)
);