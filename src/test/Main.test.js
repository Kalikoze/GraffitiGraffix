import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../Pages/Main/Main/Main';
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
    console.log(configure);
    wrapper = shallow(<Main />);
  });

  it('should render', () => {
    console.log('wrapper', wrapper.debug());
  });
});
