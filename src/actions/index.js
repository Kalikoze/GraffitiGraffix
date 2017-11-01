export const storeCurrentUser = user => {
  return {
    type: 'STORE_CURRENT_USER',
    user
  };
};
