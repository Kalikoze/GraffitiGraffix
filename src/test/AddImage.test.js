import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddImage from '../Pages/Artists/AddImage/AddImage';

configure({ adapter: new Adapter() });

describe('Add Image', () => {
  let wrapper;
  let mockFn;
  let mockFn2;

  beforeEach(() => {
    mockFn = jest.fn()
    mockFn2 = jest.fn()
    wrapper = mount(<AddImage addImage={mockFn} closeWindow={mockFn2} />)
  })

  it('should have url as an empty string in state', () => {
    expect(wrapper.state().url).toEqual('');
  })

  it('should have the correct props', () => {
    expect(wrapper.props().addImage).toBeDefined()
    expect(wrapper.props().closeWindow).toBeDefined()
  })

  it('should render the correct elements', () => {
    expect(wrapper.find('.add-image').length).toEqual(1);
    expect(wrapper.find('.image-input-container').length).toEqual(1);
    expect(wrapper.find('#add-image-input').length).toEqual(1);
    expect(wrapper.find('.add-image-btn').length).toEqual(2);
  })

  it.skip('should run addImage when the Add Image button is clicked', () => {
    const button = wrapper.find('.add-image-btn').at(2);

    button.simulate('click');

    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('should run closeWindow when the Close button is clicked', () => {
    const button = wrapper.find('.add-image-btn').at(1);

    button.simulate('click');

    expect(mockFn2).toHaveBeenCalledTimes(1)
  })
})
