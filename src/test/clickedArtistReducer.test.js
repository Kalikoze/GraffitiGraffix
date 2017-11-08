import clickedArtist from '../reducers/clickedArtist';

describe('ClickedArtist reducer', () => {
  it('should have a default state', () => {
    const action = {type: '', artist: {}};
    const expectedReturn = {};
    expect(clickedArtist(undefined, {})).toEqual(expectedReturn);
  })

  it('should return the artist if type is STORE_CLICKED_ARTIST', () => {
    const action = {type: 'STORE_CLICKED_ARTIST', artist: {foo: 'bar'}};
    const expectedReturn = {foo: 'bar'};
    expect(clickedArtist(undefined, action)).toEqual(expectedReturn)
  })
})
