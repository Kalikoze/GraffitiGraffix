import storeAllArtists from '../reducers/storeAllArtists';

describe('StoreAllArtists reducer', () => {
  it('should have a default state', () => {
    const action = {type: '', artists: []};
    const expectedReturn = [];
    expect(storeAllArtists(undefined, action)).toEqual(expectedReturn);
  })

  it('should return an array of artists if type is STORE_ALL_ARTISTS', () => {
    const action = {type: 'STORE_ALL_ARTISTS', artists: []};
    const expectedReturn = [];
    expect(storeAllArtists(undefined, action)).toEqual(expectedReturn)
  })
})
