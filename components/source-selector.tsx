import * as React from 'react';
import {DataSource} from './types';

interface Props {
  onChange: (source: DataSource) => void;
  value: DataSource;
}

const SourceSelector = ({onChange, value}: Props): JSX.Element => {
  const opposite: DataSource = value === 'state' ? 'county' : 'state';
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          onChange(opposite);
        }}
      >
        {opposite}
      </button>
    </div>
  );
};

export default SourceSelector;
