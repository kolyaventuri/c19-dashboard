import {test} from 'mocha';
import {expect} from 'chai';
import React from 'react';
import {shallow} from 'enzyme';

import Home from '../../pages';

const getComponent = () => shallow(<Home />);

test('renders a head component', () => {
  const tree = getComponent();

  expect(tree.find('Head')).to.have.lengthOf(1);
});
