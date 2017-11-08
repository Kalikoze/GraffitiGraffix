import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { createMockStore } from 'redux-test-utils';
import { shallow, mount, render, configure } from 'enzyme';
import { Artists } from '../Pages/Artists/Artists/Artists';
import Filter from '../Pages/Artists/Filter/Filter';

configure({ adapter: new Adapter() });

const testState = { currentUser: {}, artist: [] }
const store = createMockStore(testState);
const shallowWithStore = (component, store) => {
  const context = { store };
  return shallow(component, { context });
}

describe('Artists component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowWithStore(<Artists />, store)
  });

  it.skip('should have the correct state properties with the correct default values', () => {
    expect(wrapper.state().artists).toEqual([]);
  });

  it.skip('should render a section with the correct class name', () => {
    expect(wrapper.find('section.l-artists').length).toEqual(1);
  });

  it.skip('should render a Filter component', () => {
    expect(wrapper.find(Filter).length).toEqual(1);
  });
});
