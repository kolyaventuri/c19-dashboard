import * as React from 'react';
import {debounce} from 'debounce';

import {STATE_TIMESERIES, COUNTY_TIMESERIES} from '../constants/urls';
import {trackEvent as doTrackEvent} from '../utils/tracking';
import Map from './map';
import Slider from './slider';
import {DataSource, OneDayOfData, DataType} from './types';
import SourceSelector from './source-selector';
import Dropdown from './dropdown';
import Scale from './scale';

const colorScale = ['#00D474', '#FFC900', '#FF9600', '#D9002C', '#790019'];

interface DataEntry {
  range: string[];
  data: Array<Record<string, number>>;
}

interface Data {
  state?: DataEntry;
  county?: DataEntry;
}

const transformData = (data: DataEntry, date: string): OneDayOfData => {
  const key = data.range.indexOf(date);
  if (key > -1) {
    return data.data[key];
  }

  return {};
};

const getUrl = (source: DataSource, type: DataType): string => {
  let url: string;
  switch (source) {
    case 'state':
      url = STATE_TIMESERIES;
      break;
    case 'county':
      url = COUNTY_TIMESERIES;
      break;
    default:
      return '';
  }

  return url.replace(/{type}/, type);
};

const dataCache: Data = {};

type Labels = {
  title: string;
  name: string;
};
const labels: Record<string, Labels> = {
  risk: {title: 'Risk', name: 'risk levels'},
  r0: {title: 'Infection Rate', name: 'infection rate'},
  density: {title: 'Case Density', name: 'case density levels'},
  positivity: {title: 'Test Positivity', name: 'test positivity'}
};

const items = [
  {value: 'risk', displayName: 'Risk Levels'},
  {value: 'r0', displayName: 'Infection Rate (R_t)'},
  {value: 'density', displayName: 'Case Density (per 100k)'},
  {value: 'positivity', displayName: 'Positivty Rate'}
];

type Bounds = number[];
const bounds: Record<string, Bounds> = {
  risk: [0, 5],
  r0: [0, 0.9, 1.1, 1.4, 1.7],
  density: [1, 10, 25, 75, 90],
  positivity: [0, 3, 10, 20, 25].map((n) => n / 100)
};

const trackEvent = (type: 'slider' | 'dropdown', value: string) => {
  const isSlider = type === 'slider';
  const action = isSlider
    ? 'slider.date.change'
    : 'dropdown.selectedItem.change';
  const name = isSlider ? 'date' : 'dataType';
  doTrackEvent({
    action,
    params: {
      [name]: value
    }
  });
};

const logChange = debounce(trackEvent, 500);

const DataMap = (): JSX.Element => {
  const [didError, setDidError] = React.useState(false);
  const [data, setData] = React.useState<DataEntry | null>(null);
  const [mapData, setMapData] = React.useState<OneDayOfData | null>(null);
  const [date, setDate] = React.useState<string | undefined>();
  const [source, setSource] = React.useState<DataSource>('state');
  const [dataType, setDataType] = React.useState<DataType>('risk');

  React.useEffect(() => {
    const fetchData = async () => {
      if (dataCache[`${source}:${dataType}`]) {
        setData(dataCache[`${source}:${dataType}`] ?? null);
        return;
      }

      const url = getUrl(source, dataType);
      const result = await fetch(url);
      const json = (await result.json()) as DataEntry;
      dataCache[`${source}:${dataType}`] = json;

      setData(json);
    };

    if (!data && !didError) {
      fetchData().catch((error: unknown) => {
        console.error(error);
        setDidError(true);
        doTrackEvent({
          action: 'error.impression',
          params: {error: (error as Error).message}
        });
      });
    }

    if (data) {
      setMapData(transformData(data, date ?? data.range[1]));
    }
  }, [data, didError, date, source, dataType]);

  const onChange = (value: string) => {
    logChange('slider', value);
    setDate(value);
  };

  const onDropdownChange = (value: string) => {
    trackEvent('dropdown', value);
    setData(null);
    setDidError(false);
    setDataType(value as DataType);
  };

  const updateSource = (value: DataSource) => {
    setData(null);
    setDidError(false);
    setMapData(null);
    setSource(value);
  };

  const renderContent = () => {
    if (didError) {
      return <p>An error occurred</p>;
    }

    if (data && mapData) {
      return (
        <div>
          <SourceSelector
            value={source}
            onChange={(newSource) => {
              updateSource(newSource);
            }}
          />
          <Scale
            colors={colorScale}
            type={dataType}
            domain={bounds[dataType]}
          />
          <Slider values={data.range} onChange={onChange} />
          <Map
            data={mapData}
            colorScale={colorScale}
            source={source}
            bounds={bounds[dataType]}
            dataType={dataType}
          />
        </div>
      );
    }

    return <p>Loading...</p>;
  };

  return (
    <div className="py-6">
      <div>
        <Dropdown items={items} onChange={onDropdownChange} />
      </div>
      <h2 className="text-3xl text-blue-500 font-bold">
        {labels[dataType].title} Over Time
      </h2>
      <p className="text-gray-600">
        Use the slider below to scrub through {labels[dataType].name} over time.
        Grey areas indicate a lack of available data.
      </p>
      {renderContent()}
    </div>
  );
};

export default DataMap;
