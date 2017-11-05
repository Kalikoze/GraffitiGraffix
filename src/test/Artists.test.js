import React from 'react';
import ReactDOM from 'react-dom';
import Artists from '../Pages/Artists/Artists/Artists';
import Filter from '../Pages/Artists/Filter/Filter';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Artists component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Artists />);
  });

  it('should have the correct state properties with the correct default values', () => {
    expect(wrapper.state().artists).toEqual([]);
  });

  it('should render a section with the correct class name', () => {
    expect(wrapper.find('section.l-artists').length).toEqual(1);
  });

  it('should render a Filter component', () => {
    expect(wrapper.find(Filter).length).toEqual(1);
  });
});
