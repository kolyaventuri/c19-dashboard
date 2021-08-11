import * as React from 'react';
import {STATE_RISK_TIMESERIES, COUNTY_RISK_TIMESERIES} from '../constants/urls';
import states from '../constants/states.json';
import Map from './map';
import Slider from './slider';
import {DataSource} from './types';
import SourceSelector from './source-selector';

const colorScale = ['#00D474', '#FFC900', '#FF9600', '#D9002C', '#790019'];

interface DataEntry {
  range: string[];
  data: Record<string, number[]> | Record<string, Record<string, number[]>>;
}

interface Data {
  state?: DataEntry;
  county?: DataEntry;
}

type StatesArray = Array<{id: string; val: string}>;

type OneDayOfData = Array<{id: string; value: number}>;
const transformData = (
  data: DataEntry,
  date: string,
  source: DataSource
): OneDayOfData => {
  const abbrs = Object.keys(data.data);
  const result: OneDayOfData = [];
  if (source === 'state') {
    for (const state of abbrs) {
      const id =
        (states as StatesArray).find((s) => s.id === state)?.val ?? '0';

      result.push({
        id,
        value: data.data[state][date] as number
      });
    }
  } else {
    for (const fips of abbrs) {
      result.push({
        id: fips,
        value: (data.data[fips] as Record<string, number[]>).risks[
          date
        ] as number
      });
    }
  }

  return result;
};

const getUrl = (source: DataSource): string => {
  switch (source) {
    case 'state':
      return STATE_RISK_TIMESERIES;
    case 'county':
      return COUNTY_RISK_TIMESERIES;
    default:
      return '';
  }
};

const dataCache: Data = {};

const RiskMap = (): JSX.Element => {
  const [didError, setDidError] = React.useState(false);
  const [data, setData] = React.useState<DataEntry | null>(null);
  const [mapData, setMapData] = React.useState<OneDayOfData | null>(null);
  const [date, setDate] = React.useState<string | undefined>();
  const [source, setSource] = React.useState<DataSource>('state');

  React.useEffect(() => {
    const fetchData = async () => {
      if (dataCache[source]) {
        setData(dataCache[source] ?? null);
        return;
      }

      const url = getUrl(source);
      const result = await fetch(url);
      const json = (await result.json()) as DataEntry;
      dataCache[source] = json;

      setData(json);
    };

    if (!data && !didError) {
      fetchData().catch((error: unknown) => {
        console.error(error);
        setDidError(true);
      });
    }

    if (data) {
      setMapData(transformData(data, date ?? data.range[1], source));
    }
  }, [data, didError, date, source]);

  const onChange = (value: string | number) => {
    setDate(value as string);
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
      console.log(mapData);
      return (
        <>
          <SourceSelector
            value={source}
            onChange={(newSource) => {
              updateSource(newSource);
            }}
          />
          <Slider values={data.range} onChange={onChange} />
          <Map data={mapData} colorScale={colorScale} source={source} />
        </>
      );
    }

    return <p>Loading...</p>;
  };

  return (
    <div className="py-6">
      <h2 className="text-3xl text-blue-500 font-bold">State Risk Over Time</h2>
      <p className="text-gray-600">
        Use the slider below to scrub through state risk levels over time.
      </p>
      {renderContent()}
    </div>
  );
};

export default RiskMap;
