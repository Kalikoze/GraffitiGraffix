import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../Pages/Main/Main/Main';
import MainSection from '../Pages/Main/MainSection/MainSection';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Main />, div);
});

describe('Main component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Main />);
  });

  it('should render a div with a class of "main"', () => {
    expect(wrapper.find('div.main').length).toEqual(1);
  });

  it('should render three section elements with the correct class names', () => {
    expect(wrapper.find('section').length).toEqual(3);

    expect(wrapper.find('section.l-below-fold').length).toEqual(1);
    expect(wrapper.find('section.title').length).toEqual(1);
    expect(wrapper.find('section.l-below-fold').length).toEqual(1);
  });

  it('should render an h1 element', () => {
    expect(wrapper.find('h1').length).toEqual(1);
  });

  it('should render a video element', () => {
    expect(wrapper.find('video').length).toEqual(1);
  });

  it('should render an audio element', () => {
    expect(wrapper.find('audio').length).toEqual(1);
  });

  it('should render three MainSection components', () => {
    expect(wrapper.find(MainSection).length).toEqual(3);
  });

  it('should pass the correct props to the MainSection component', () => {
    const mainSectionProps = Object.keys(
      wrapper.find(MainSection).first().props()
    );

    expect(mainSectionProps.includes('src'));
    expect(mainSectionProps.includes('title'));
    expect(mainSectionProps.includes('articleClass'));
    expect(mainSectionProps.includes('info'));
  });
});
