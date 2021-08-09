import * as React from 'react';
import {STATE_RISK_TIMESERIES} from '../constants/urls';
import states from '../constants/states.json';
import Map from './map';
import Slider from './slider';

const colorScale = ['#00D474', '#FFC900', '#FF9600', '#D9002C', '#790019'];

interface Data {
  range: string[];
  data: Record<string, number[]>;
}

type StatesArray = Array<{id: string; val: string}>;

type OneDayOfData = Array<{id: string; value: number}>;
const transformData = (data: Data, date: string): OneDayOfData => {
  const abbrs = Object.keys(data.data);
  const result: OneDayOfData = [];
  for (const state of abbrs) {
    const id = (states as StatesArray).find((s) => s.id === state)?.val ?? '0';

    result.push({
      id,
      value: data.data[state][date] as number
    });
  }

  return result;
};

const RiskMap = (): JSX.Element => {
  const [didError, setDidError] = React.useState(false);
  const [data, setData] = React.useState<Data | null>(null);
  const [mapData, setMapData] = React.useState<OneDayOfData | null>(null);
  const [date, setDate] = React.useState<string | undefined>();

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(STATE_RISK_TIMESERIES);
      const json = (await result.json()) as Data;

      setData(json);
    };

    if (!data && !didError) {
      fetchData().catch((error: unknown) => {
        console.error(error);
        setDidError(true);
      });
    }

    if (data) {
      setMapData(transformData(data, date ?? data.range[0]));
    }
  }, [data, didError, date]);

  const onChange = (value: string | number) => {
    setDate(value as string);
  };

  if (didError) {
    return <p>An error occurred</p>;
  }

  if (data && mapData) {
    return (
      <>
        <Slider values={data.range} onChange={onChange} />
        <Map data={mapData} colorScale={colorScale} />
      </>
    );
  }

  return <p>Loading...</p>;
};

export default RiskMap;
