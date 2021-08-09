import * as React from 'react';
import ReactSlider from 'react-slider';

interface Props {
  values: Array<string | number>;
  onChange?: (newValue: string | number) => void;
}

const Slider = ({values, onChange: onChangeCallback}: Props): JSX.Element => {
  const [value, setValue] = React.useState(values[0]);
  const onChange = (index: number) => {
    const newValue = values[index] as string;
    setValue(newValue);
    onChangeCallback?.(newValue);
  };

  return (
    <div className="w-full">
      <p className="text-2xl font-bold text-center">{value}</p>
      <ReactSlider
        step={1}
        min={1}
        max={values.length - 2}
        values={values}
        className="w-full h-3 pr-2 my-4 bg-gray-200 rounded-md cursor-grab"
        thumbClassName="cursor-pointer absolute w-5 h-5 cursor-grab bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 -top-1"
        onChange={(value_: number) => {
          onChange(value_);
        }}
      />
    </div>
  );
};

export default Slider;
