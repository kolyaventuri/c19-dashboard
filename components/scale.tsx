import * as React from 'react';
import { DataType } from './types';

interface Props {
  domain: number[];
  colors: string[];
  type: DataType;
}

const className = 'h-3 w-8 inline-block relative top-1.5';

const getLabels = (domain: number[], type: DataType): [string, string] => {
  let lower: unknown = domain[0];
  let higher: unknown = domain[domain.length - 1];

  if (type === 'risk') {
    lower = 'Low Risk';
    higher = 'High Risk';
  } else if (type === 'density') {
    lower = `${lower} / 100k`;
    higher = `${higher}+ / 100k`;
  } else if (type === 'positivity') {
    lower = `${lower as number * 100}%`;
    higher = `${higher as number * 100}%+`;
  }

  return [`${lower}`, `${higher}`];
};

const Scale = ({domain, colors, type}: Props): JSX.Element => {
  const [lower, higher] = getLabels(domain, type);
  return (
    <div className="flex justify-center align-middle">
      <p className='px-2 inline-block'>{lower}</p>
      {colors.map((_, index) => {
        let extra = '';
        if (index === 0) {
          extra = 'rounded-l-lg ';
        } else if (index === colors.length - 1) {
          extra = 'rounded-r-lg ';
        }
        return <div className={`${extra}${className}`} style={{ backgroundColor: colors[index]}}></div>
      })}
      <p className='px-2 inline-block'>{higher}</p>
    </div>
  );
};

export default Scale;
