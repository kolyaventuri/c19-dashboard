import * as React from 'react';
import {ComposableMap, Geographies, Geography} from 'react-simple-maps';
import {scaleQuantile} from 'd3-scale';
import {GEO_URL_STATES, GEO_URL_COUNTIES} from '../constants/urls';
import {Geography as GeoType} from '../@types';
import {DataSource, OneDayOfData} from './types';

interface Props {
  data: OneDayOfData;
  colorScale: string[];
  source: DataSource;
  bounds: number[];
}
const url = {
  state: GEO_URL_STATES,
  county: GEO_URL_COUNTIES
};

const Map = ({data, colorScale, source, bounds}: Props): JSX.Element => {
  const scale = scaleQuantile<string>()
    .domain(bounds)
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
                fill={Number.isFinite(cur) && cur > -1 ? scale(cur) : '#EEE'}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default Map;
