import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App/App';
import Navigation from '../Pages/Main/Navigation/Navigation';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('App component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should render a div with the correct class name', () => {
    expect(wrapper.find('div.App').length).toEqual(1);
  });

  it('should render a Navigation component', () => {
    expect(wrapper.find(Navigation).length).toEqual(1);
  });

  it('should render three Routes', () => {
    expect(wrapper.find('Route').length).toEqual(4);
  });
});
