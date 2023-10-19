// ----------------------------------------------------------------------

const data = JSON.parse(localStorage.getItem('Academy'));
const username = data.Username.split('@')[0];

const account = {
  displayName: 'Teacher Portal',
  email: username,
  photoURL: '/assets/images/avatars/avatar_default.jpg',
};

export default account;
