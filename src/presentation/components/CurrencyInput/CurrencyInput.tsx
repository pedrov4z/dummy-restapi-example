import { toCurrencyValue } from '@/helpers/numberFormat';
import { OutlinedTextFieldProps, TextField } from '@material-ui/core';
import React from 'react';
import NumberFormat from 'react-number-format';

const currencyFormatter = (value: any, prefix: boolean): string => {
  if (Number(value) === undefined) return '';
  const valueToUse = value === 0 ? 0 : value / 100;
  const amount = toCurrencyValue(valueToUse, prefix);
  return `${amount}`;
};

const NumberFormatCustomBase = (props: any, prefix: boolean): JSX.Element => {
  const { inputRef, name, onBlur, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      type="tel"
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale={2}
      format={(e) => currencyFormatter(e, prefix)}
      onValueChange={(values) => {
        onBlur({
          target: {
            value: (values.floatValue ?? 0) / 100,
            name,
          },
        });
      }}
    />
  );
};

const InputWithPrefix = (props: any): JSX.Element => {
  return NumberFormatCustomBase(props, true);
};

const InputWithoutPrefix = (props: any): JSX.Element => {
  return NumberFormatCustomBase(props, false);
};

interface CurrencyInputProps extends OutlinedTextFieldProps {
  usePrefix?: boolean;
}

const CurrencyInput: React.FC<CurrencyInputProps> = (props) => {
  return (
    <TextField
      {...props}
      defaultValue={props.defaultValue as number * 100}
      InputProps={{
        onBlur: props.onBlur,
        inputComponent:
          props.usePrefix ?? true ? InputWithPrefix : InputWithoutPrefix,
      }}
    />
  );
};

export default CurrencyInput;
