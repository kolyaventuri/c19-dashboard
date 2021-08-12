import * as React from 'react';
import {ComposableMap, Geographies, Geography} from 'react-simple-maps';
import {scaleQuantize} from 'd3-scale';
import {GEO_URL_STATES, GEO_URL_COUNTIES} from '../constants/urls';
import {Geography as GeoType} from '../@types';
import {DataSource, OneDayOfData} from './types';

interface Props {
  data: OneDayOfData;
  colorScale: string[];
  source: DataSource;
}
const url = {
  state: GEO_URL_STATES,
  county: GEO_URL_COUNTIES
};

const Map = ({data, colorScale, source}: Props): JSX.Element => {
  const scale = scaleQuantize<string>()
    .domain([0, colorScale.length - 1])
    .range(colorScale);

  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={url[source]}>
        {({geographies}: {geographies: GeoType[]}) =>
          geographies.map((geo) => {
            const cur: typeof data[number] = data[geo.id];
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={Number.isFinite(cur) ? scale(cur) : '#EEE'}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default Map;
