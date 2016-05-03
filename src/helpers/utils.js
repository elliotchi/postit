import { usersExpirationLength, usersPostsExpirationLength, repliesExpirationLength } from 'config/constants';

export const formatUserInfo = (name, avatar, userID) => (
  {
    name,
    avatar,
    userID
  }
);

export const formatPost = (text, {name, avatar, userID}) => (
  {
    text,
    name,
    avatar,
    userID,
    timestamp: Date.now()
  }
);

export const formatTimestamp = timestamp => {
  const date = new Date(timestamp);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

const getMilliseconds = timestamp => new Date().getTime() - new Date(timestamp).getTime()

export const staleUser = timestamp => getMilliseconds(timestamp) > usersExpirationLength

export const stalePosts = timestamp => getMilliseconds(timestamp) > usersPostsExpirationLength

export const staleReplies = timestamp => getMilliseconds(timestamp) > repliesExpirationLength

export const formatReply = ({name, userID, avatar}, reply) => {
  return {
    name,
    reply,
    userID,
    avatar,
    timestamp: Date.now()
  }
};
