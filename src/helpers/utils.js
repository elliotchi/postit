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
