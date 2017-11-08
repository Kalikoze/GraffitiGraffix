import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Popup from '../Pages/Popup/Popup';

configure({ adapter: new Adapter() });

describe('Popup', () => {
  let wrapper;
  let mockFn;

  beforeEach(() => {
    mockFn = jest.fn()
    wrapper = mount(<Popup showPopup={mockFn} popupText='signin' />)
  })

  it('should have the correct props', () => {
    expect(wrapper.props().showPopup).toBeDefined();
    expect(wrapper.props().popupText).toBeDefined();
  })

  it('should render the correct elements', () => {
    expect(wrapper.find('.popup').length).toEqual(1);
    expect(wrapper.find('.popup-txt').length).toEqual(1);
    expect(wrapper.find('button').length).toEqual(1);
  })

  it('should run sortNewest if the user clicks the Newest button', () => {
    const button = wrapper.find('button');

    button.simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(1);
  })

  it('should change the popup text if popupText is not signin', () => {
    wrapper = mount(<Popup showPopup={mockFn} popupText='foo' />)

    expect(wrapper.find('.popup-txt').text()).toEqual('User not found.')
  })

})
