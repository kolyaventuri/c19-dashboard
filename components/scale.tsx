import * as React from 'react';
import {DataType} from './types';

interface Props {
  domain: number[];
  colors: string[];
  type: DataType;
}

const className = 'h-3 w-8 inline-block relative top-1.5';

const getLabels = (domain: number[], type: DataType): [string, string] => {
  const lowerN = domain[0];
  const higherN = domain[domain.length - 1];
  let lower = '';
  let higher = '';

  switch (type) {
    case 'risk': {
      lower = 'Low Risk';
      higher = 'High Risk';

      break;
    }

    case 'density': {
      lower = `${lowerN} / 100k`;
      higher = `${higherN}+ / 100k`;

      break;
    }

    case 'positivity': {
      lower = `${lowerN * 100}%`;
      higher = `${higherN * 100}%+`;
      break;
    }

    case 'r0':
    default:
      break;
  }

  return [`${lower}`, `${higher}`];
};

const Scale = ({domain, colors, type}: Props): JSX.Element => {
  const [lower, higher] = getLabels(domain, type);
  return (
    <div className="flex justify-center align-middle">
      <p className="px-2 inline-block">{lower}</p>
      {colors.map((color, index) => {
        let extra = '';
        if (index === 0) {
          extra = 'rounded-l-lg ';
        } else if (index === colors.length - 1) {
          extra = 'rounded-r-lg ';
        }

        return (
          <div
            key={color}
            className={`${extra}${className}`}
            style={{backgroundColor: colors[index]}}
          />
        );
      })}
      <p className="px-2 inline-block">{higher}</p>
    </div>
  );
};

export default Scale;
