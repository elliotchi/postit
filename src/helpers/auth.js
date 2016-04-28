export default () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'elliot'
      });
    }, 2000);
  });
};
