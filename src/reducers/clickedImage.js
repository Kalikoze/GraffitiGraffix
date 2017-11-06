const clickedImage = (state = {}, action) => {
  switch (action.type) {
    case 'STORE_CLICKED_IMAGE':
      return { url: action.url, id: action.id };
    default:
      return state;
  }
};

export default clickedImage;
