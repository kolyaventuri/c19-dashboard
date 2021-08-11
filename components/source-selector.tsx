import * as React from 'react';
import {DataSource} from './types';

interface Props {
  onChange: (source: DataSource) => void;
  value: DataSource;
}

const SourceSelector = ({onChange, value}: Props): JSX.Element => {
  const [source, setSource] = React.useState(value);
  const className =
    'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500';
  const enabled = 'bg-blue-500';

  const handleClick = (newSource: DataSource) => {
    setSource(newSource);
    onChange(newSource);
  };

  return (
    <span className="relative z-0 inline-flex shadow-sm rounded-md">
      <button
        type="button"
        className={`${className} ${
          source === 'state' ? enabled : 'hover:bg-blue-100'
        }`}
        onClick={() => {
          handleClick('state');
        }}
      >
        States
      </button>
      <button
        type="button"
        className={`-ml-px ${className} ${
          source === 'county' ? enabled : 'hover:bg-blue-100'
        }`}
        onClick={() => {
          handleClick('county');
        }}
      >
        Counties
      </button>
    </span>
  );
};

export default SourceSelector;
