import storeCurrentUser from '../reducers/storeCurrentUser';

describe('StoreCurrentUser reducer', () => {
  it('should have a default state', () => {
    const action = {type: '', user: {}};
    const expectedReturn = {};
    expect(storeCurrentUser(undefined, action)).toEqual(expectedReturn);
  })

  it('should return an array of artists if type is STORE_CURRENT_USER', () => {
    const action = {type: 'STORE_CURRENT_USER', user: {}};
    const expectedReturn = {};
    expect(storeCurrentUser(undefined, action)).toEqual(expectedReturn)
  })
})
