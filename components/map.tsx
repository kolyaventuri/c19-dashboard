import * as React from 'react';
import {ComposableMap, Geographies, Geography} from 'react-simple-maps';
import {scaleQuantile} from 'd3-scale';
import {GEO_URL_STATES, GEO_URL_COUNTIES} from '../constants/urls';
import {Geography as GeoType} from '../@types';
import {DataSource, DataType, OneDayOfData} from './types';
import ReactTooltip from 'react-tooltip';

interface Props {
  data: OneDayOfData;
  colorScale: string[];
  source: DataSource;
  bounds: number[];
  dataType: DataType;
}
const url = {
  state: GEO_URL_STATES,
  county: GEO_URL_COUNTIES
};

const riskLevels = ['Unknown Risk', 'Low Risk', 'Medium Risk', 'High Risk', 'Very High Risk', 'Severe Risk'];

const getLabel = (value: number, dataType: DataType): string => {
  switch (dataType) {
    case 'risk':
      return riskLevels[value] ?? 'Unknown Risk';
    case 'r0':
      return `Reproduction rate: ${value}`; 
    case 'density':
      return `${value} cases per 100k`;
    case 'positivity':
      const val = Number.parseFloat((value * 100).toPrecision(3));
      return `${val}% positivity rate`;
    default:
      return value.toString();
  }
};

const Map = ({data, colorScale, source, bounds, dataType}: Props): JSX.Element => {
  const scale = scaleQuantile<string>()
    .domain(bounds)
    .range(colorScale);

  const [tooltipContent, setTooltipContent] = React.useState<string | null>(null);

  return (
    <div>
      <ComposableMap data-tip projection="geoAlbersUsa">
        <Geographies geography={url[source]}>
          {({geographies}: {geographies: GeoType[]}) =>
            geographies.map((geo) => {
              const cur: typeof data[number] = data[geo.id];
              const hasData = Number.isFinite(cur) && cur > -1;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={hasData ? scale(cur) : '#EEE'}
                  onMouseEnter={() => {
                    let {name} = geo.properties as any;
                    if (source === 'county') {
                      name += ' County';
                    }
                    const content = hasData ? `${name} - ${getLabel(cur, dataType)}` : `${name}`;
                    setTooltipContent(content);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent(null);
                  }}
                  style={{
                    hover: {
                      cursor: 'pointer',
                      stroke: 'white',
                      strokeWidth: '2'
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
    </div>
  );
};

export default Map;
