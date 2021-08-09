import * as React from 'react';
import {ComposableMap, Geographies, Geography} from 'react-simple-maps';
import {scaleQuantize} from 'd3-scale';
import {GEO_URL} from '../constants/urls';
import {Geography as GeoType} from '../@types';

interface MapData {
  id: string;
  value: number;
}

interface Props {
  data: MapData[];
  colorScale: string[];
}
const Map = ({data, colorScale}: Props): JSX.Element => {
  const scale = scaleQuantize<string>()
    .domain([0, colorScale.length - 1])
    .range(colorScale);

  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={GEO_URL}>
        {({geographies}: {geographies: GeoType[]}) =>
          geographies.map((geo) => {
            const cur = data.find((s) => s.id === geo.id);
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={scale(cur ? cur.value : 0)}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default Map;
