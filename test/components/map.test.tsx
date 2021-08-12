import {test} from 'mocha';
import {expect} from 'chai';
import React from 'react';
import {shallow} from 'enzyme';
import {scaleQuantize} from 'd3-scale';
import proxyquire from 'proxyquire';

import RealMap from '../../components/map';
import { GEO_URL_STATES } from '../../constants/urls';

const colorScale = ['#FFF', '#AAA', '#000'];

const data = [
  {id: '1', value: 1},
  {id: '2', value: 2},
  {id: '3', value: 1},
  {id: '4', value: 3},
  {id: '5', value: 3},
]; 
const render = (props = {}) => shallow(
  <Map
    data={data}
    colorScale={colorScale}
    source='state'
    {...props}
  />
);

const geographies = [
  {id: '1', rsmKey: 2},
  {id: '2', rsmKey: 3},
  {id: '3', rsmKey: 4},
  {id: '4', rsmKey: 5},
  {id: '5', rsmKey: 6},
]
class Geographies extends React.Component {
  render() {
    const fn = this.props?.children as Function;
    return fn({geographies}); 
  }
}

const Map = proxyquire<{default: typeof RealMap}>('../../components/map', {
  'react-simple-maps': {Geographies}
}).default;

const scale = scaleQuantize<string>()
    .domain([0, colorScale.length - 1])
    .range(colorScale)

test('renders a ComposableMap', () => {
  const tree = render();

  const map = tree.find('ComposableMap');
  expect(map).to.have.lengthOf(1);
  expect(map.props()).to.have.property('projection', 'geoAlbersUsa');
});

test('renders a nested Geographies map, with the correct geography', () => {
  const tree = render();

  const map = tree.find('ComposableMap');
  const geos = map.find('Geographies');
  expect(geos).to.have.lengthOf(1);
  expect(geos.props()).to.have.property('geography', GEO_URL_STATES);
});

test('renders nested geographies based on the data', () => {
  const tree = render();

  const container = tree.find('Geographies');
  const geos = container.find('Geography'); 

  expect(geos).to.have.lengthOf(geographies.length);
  for (let i = 0; i < geos.length; i++) {
    const geo = geos.at(i);
    const props = geo.props();
    expect(props).to.have.property('key', geographies[i].rsmKey);
    expect(props).to.have.property('geography', geographies[i]);
    expect(props).to.have.property('fill', scale(data[i].value));
  }
});
