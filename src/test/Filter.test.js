import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Filter from '../Pages/Artists/Filter/Filter';

configure({ adapter: new Adapter() });

describe('Add Image', () => {
  let wrapper;
  let mockFn;

  beforeEach(() => {
    mockFn = jest.fn()
    wrapper = mount(<Filter sortNewest={mockFn} sortAlphabetically={mockFn} sortByPopularity={mockFn} />)
  })

  it('should have the correct props', () => {
    expect(wrapper.props().sortNewest).toBeDefined();
    expect(wrapper.props().sortAlphabetically).toBeDefined();
    expect(wrapper.props().sortByPopularity).toBeDefined();
  })

  it('should render the correct elements', () => {
    expect(wrapper.find('.l-filter').length).toEqual(1);
    expect(wrapper.find('.filter-options').length).toEqual(3);
  })

  it('should run sortNewest if the user clicks the Newest button', () => {
    const button = wrapper.find('.filter-options').at(0);

    button.simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(1);
  })

  it('should run sortAlphabetically if the user clicks the A-Z button', () => {
    const button = wrapper.find('.filter-options').at(1);

    button.simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(1);
  })

  it('should run sortByPopularity if the user clicks the Most-Popular button', () => {
    const button = wrapper.find('.filter-options').at(2);

    button.simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(1);
  })

})
