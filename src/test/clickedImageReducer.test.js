import clickedImage from '../reducers/clickedImage';

describe('ClickedImage reducer', () => {
  it('should return a default state', () => {
    const action = {type: '', url: '', id: 1};
    const expectedReturn = {};
    expect(clickedImage(undefined, {})).toEqual(expectedReturn);
  })

  it('should return an image object if type is STORE_CLICKED_IMAGE', () => {
    const action = {type: 'STORE_CLICKED_IMAGE', url: 'http://stuff.com', id: 2};
    const expectedReturn = {url: 'http://stuff.com', id: 2};
    expect(clickedImage(undefined, action)).toEqual(expectedReturn)
  })
})
