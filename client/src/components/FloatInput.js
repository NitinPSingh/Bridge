import React from 'react';

const FloatInput = ({value, setValue,isDisable}) => {
 

  const handleChange = (event) => {

    let inputValue = event.target.value;

    if (/^\d*\.?\d*$/.test(inputValue)) {
      setValue(inputValue);
    }
  };

  return (
    <input
      type="text"
      value={value}
      disabled={isDisable}
      onChange={handleChange}
      className="border-none bg-inherit outline-none truncate  w-full  text-[24px] font-semibold leading-[30px]"
      placeholder="0.0"
      inputMode="decimal"
    />
  );
};

export default FloatInput;