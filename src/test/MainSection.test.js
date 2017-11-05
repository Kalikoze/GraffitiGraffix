import React from 'react';
import ReactDOM from 'react-dom';
import MainSection from '../Pages/Main/MainSection/MainSection';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainSection />, div);
});

describe('MainSection component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <MainSection
        articleClass={'test-class'}
        src={'url'}
        title={'Test Title'}
        info={'Test info'}
      />
    );
  });

  it('should receive the correct props', () => {
    expect(wrapper.props().articleClass).toEqual('test-class');
    expect(wrapper.props().src).toEqual('url');
    expect(wrapper.props().title).toEqual('Test Title');
    expect(wrapper.props().info).toEqual('Test info');
  });

  it('should render an article element with the correct class name', () => {
    expect(wrapper.find('article.main-section').length).toEqual(1);
    expect(wrapper.find('article.test-class').length).toEqual(1);
  });

  it('should render an img element with the correct class name', () => {
    expect(wrapper.find('img.main-section-image').length).toEqual(1);
  });

  it('should render a section element with the correct class name', () => {
    expect(wrapper.find('section.content').length).toEqual(1);
  });

  it('should render an h2 element', () => {
    expect(wrapper.find('h2').length).toEqual(1);
  });

  it('should render a p element', () => {
    expect(wrapper.find('p').length).toEqual(1);
  });
});
