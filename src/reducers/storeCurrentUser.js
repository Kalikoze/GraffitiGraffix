const currentUser = (state = {}, action) => {
  console.log(action);
  switch (action.type) {
    case 'STORE_CURRENT_USER':
      return action.user;
    default:
      return state;
  }
};

export default currentUser;
