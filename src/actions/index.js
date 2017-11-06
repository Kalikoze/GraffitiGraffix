export const storeCurrentUser = user => ({
  type: 'STORE_CURRENT_USER',
  user,
});

export const postNewUser = user => dispatch => {
  fetch('http://localhost:3001/api/v1/users', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(response => dispatch(storeCurrentUser(response[0])))
    .catch(error => console.log(error));
};

export const storeClickedArtist = artist => ({
  type: 'STORE_CLICKED_ARTIST',
  artist,
});

export const fetchArtistImages = artist => dispatch => {
  fetch(`http://localhost:3001/api/v1/images/${artist.id}`)
    .then(response => response.json())
    .then(parsedResponse =>
      dispatch(
        storeClickedArtist(
          Object.assign({}, artist, { images: parsedResponse }),
        ),
      ),
    )
    .catch(error => console.log(error));
};

export const fetchClickedArtist = id => dispatch => {
  fetch(`http://localhost:3001/api/v1/users/${id}`)
    .then(response => response.json())
    .then(parsedResponse => dispatch(fetchArtistImages(parsedResponse)))
    .catch(error => console.log(error));
};

export const storeClickedImage = (url, id) => ({
  type: 'STORE_CLICKED_IMAGE',
  url,
  id,
});
