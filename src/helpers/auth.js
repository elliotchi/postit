export default () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'elliot'
      });
    }, 2000);
  });
};

export const checkIfAuthed = store => store.getState().isAuthed;

export const logout = () => {
  console.log('logged out');
} 
