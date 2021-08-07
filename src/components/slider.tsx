import * as React from 'react';
import ReactSlider from 'react-slider';

interface Props {
  values: (string | number)[];
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
    <div className="w-full flex justify-center">
      <p>{value}</p>
      <ReactSlider
        step={1}
        min={0}
        max={values.length - 1}
        values={values}
        onChange={(val: number) => {
          onChange(val);
        }}
        className="w-full h-3 pr-2 my-4 bg-gray-200 rounded-md cursor-grab"
				thumbClassName="absolute w-5 h-5 cursor-grab bg-indigo-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 -top-2px"
      />
    </div>
  );
};

export default Slider;