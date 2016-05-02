import Firebase from 'firebase';

const firebaseUrl = 'https://remmutable.firebaseio.com';
export const ref = new Firebase(firebaseUrl);

export const usersPostsExpirationLength = 10000;
export const usersExpirationLength = 100000;
