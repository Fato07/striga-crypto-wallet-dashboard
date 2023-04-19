import React, { useState, useMemo } from 'react';
import Select, { ValueType, OptionTypeBase, OptionsType, GroupTypeBase } from 'react-select';
import countryList from 'react-select-country-list';

type CountryOption = OptionTypeBase & {
 label: string;
 value: string;
};

type CountryOptionGroup = GroupTypeBase<CountryOption> & {
 options: OptionsType<CountryOption>;
};

const CountrySelector = () => {
 const [value, setValue] = useState<ValueType<OptionTypeBase>>(null);
 const options: CountryOption[] = useMemo(() => countryList().getData(), []);

 const changeHandler = (selectedOption: ValueType<OptionTypeBase>) => {
  setValue(selectedOption);
 };

 return <Select options={options as CountryOptionGroup[]} value={value} onChange={changeHandler} />;
};

export default CountrySelector;
