export const storeCurrentUser = user => {
  return {
    type: 'STORE_CURRENT_USER',
    user
  };
};

export const postNewUser = user => {
  return dispatch => {
    fetch('http://localhost:3001/api/v1/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => dispatch(storeCurrentUser(response)))
      .catch(error => console.log(error));
  };
};
