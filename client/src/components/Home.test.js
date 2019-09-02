import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Home from './Home';

import ContainerTab from './TabPanel';
import DatePicker from "react-datepicker";

configure({ adapter: new Adapter() });

describe('Home component Shallow Rendering', () => {
    it('renders without crashing', () => {
       const component = shallow(<Home />);

       expect(component).toMatchSnapshot();
     });
 });

 describe('ContainerTab', () => {
    let wrapper;
  
    it('wraps class', () => {
      wrapper = shallow(<ContainerTab />);
      expect(wrapper.find(DatePicker));
    });
});



