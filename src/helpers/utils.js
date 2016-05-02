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
