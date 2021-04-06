import * as React from 'react';
import { useField, useFormikContext } from 'formik';
import mergeProps from 'merge-props';
import { useSpring, animated } from '@react-spring/web';
import clsx from 'clsx';
import { getValuesFromOption, makeid } from '../../lib/utils';
import Custombars from '../Custombars';
import { delay } from '../../lib/libhelpers';
import CheckIcon from '../../Icons/CheckIcon';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  name = '',
  ...rest
}) => {
  const id = React.useRef(makeid(5));
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const [field, meta] = useField(name);
  return (
    <div
      className={clsx(
        'form-control',
        Boolean(meta.touched && meta.error) && 'error',
      )}
    >
      <div className="form-control__inner">
        <label
          className={clsx(
            'form-control__label',
            Boolean(field.value || isFocused) && 'hide',
          )}
          htmlFor={id.current}
        >
          {label}
        </label>
        <label
          className={clsx(
            'form-control__placeholder',
            Boolean(field.value || !isFocused) && 'hide',
          )}
          htmlFor={id.current}
        >
          {rest.placeholder}
        </label>
        <input
          {...mergeProps(field, rest, {
            onBlur: () => {
              setIsFocused(false);
            },
          })}
          onFocus={() => {
            setIsFocused(true);
          }}
          className="form-control__input"
          placeholder=""
          id={id.current}
        />
      </div>
      {Boolean(meta.touched && meta.error) && (
        <div className="form-control__error">
          <span>{meta.error}</span>
        </div>
      )}
    </div>
  );
};

export interface Option {
  label: string;
  value: string;
}

interface SelectInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  options?: Option[] | null;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name = '',
  disabled,
  options,
  ...rest
}) => {
  const id = React.useRef(makeid(5));

  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const [field, meta] = useField(name);
  return (
    <div
      className={clsx(
        'form-control',
        Boolean(meta.touched && meta.error) && 'error',
        disabled && 'disabled',
      )}
    >
      <div className="form-control__inner">
        {Boolean(options) && (
          <div className={clsx('form-control__select', !isFocused && 'hide')}>
            <Custombars autoHeight autoHeightMin={125}>
              {options?.map((e) => {
                if (
                  field.value &&
                  (!e.value.toLowerCase().includes(field.value.toLowerCase()) ||
                    !e.label
                      .toLowerCase()
                      .includes(field.value.toLowerCase())) &&
                  !getValuesFromOption(options).includes(field.value)
                ) {
                  return null;
                }
                return (
                  <div
                    role="button"
                    tabIndex={-1}
                    onClick={() => {
                      field.onChange(name)(e.value);
                    }}
                    key={e.value}
                    className="form-control__select--single"
                  >
                    {e.label}
                  </div>
                );
              })}
            </Custombars>
          </div>
        )}
        <label
          className={clsx(
            'form-control__label',
            Boolean(field.value || isFocused) && 'hide',
          )}
          htmlFor={id.current}
        >
          {label}
        </label>
        <label
          className={clsx(
            'form-control__placeholder',
            Boolean(field.value || !isFocused) && 'hide',
          )}
          htmlFor={id.current}
        >
          {rest.placeholder}
        </label>
        <input
          {...mergeProps(field, rest, {
            onBlur: () => {
              delay(0.1).then(() => setIsFocused(false));
            },
          })}
          value={
            // eslint-disable-next-line
            options
              ? getValuesFromOption(options as any).includes(field.value)
                ? options?.filter((e) => e.value === field.value)[0].label
                : field.value
              : field.value
          }
          onFocus={() => {
            setIsFocused(true);
          }}
          className="form-control__input"
          placeholder=""
          id={id.current}
        />
      </div>
      {Boolean(meta.touched && meta.error) && (
        <div className="form-control__error">
          <span>{meta.error}</span>
        </div>
      )}
    </div>
  );
};

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  min: number;
  max: number;
  label: string;
  name: string;
}

export const SliderInput: React.FC<SliderProps> = ({
  label,
  min,
  max,
  name,
}) => {
  const id = React.useRef(makeid(5));
  const [field, meta] = useField(name);

  return (
    <div className="form-control">
      <div className="form-control__slider">
        <label htmlFor={id.current}>{label}</label>
        <input
          type="range"
          min={min}
          max={max}
          step={0.01}
          id={id.current}
          {...field}
        />
      </div>
      {Boolean(meta.touched && meta.error) && (
        <div className="form-control__error">
          <span>{meta.error}</span>
        </div>
      )}
    </div>
  );
};

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  on: string;
  off: string;
  label: string;
  name: string;
}

export const SwitchInput: React.FC<SwitchProps> = ({
  label,
  off,
  on,
  name,
}) => {
  const id = React.useRef(makeid(5));
  const [field, meta] = useField(name);
  return (
    <div className="form-control">
      <div
        className="form-control__switch"
        role="button"
        tabIndex={-1}
        onClick={() => {
          const newValue = field.value === on ? off : on;
          field.onChange(name)(newValue);
        }}
      >
        <label htmlFor={id.current}>{label}</label>
        <div className={clsx('switch', field.value === on ? 'on' : 'off')}>
          <div className="switch-track" />
          <div className="switch-thumb" />
        </div>
      </div>
      {Boolean(meta.touched && meta.error) && (
        <div className="form-control__error">
          <span>{meta.error}</span>
        </div>
      )}
    </div>
  );
};

export const FormButtons: React.FC<any> = () => {
  const formik = useFormikContext();
  return (
    <div className="form-buttons">
      <button type="submit" className="btn btn-default btn-btn">
        Submit
      </button>
      <button
        onClick={() => formik.resetForm()}
        type="button"
        className="btn btn-default btn-btn"
      >
        Reset
      </button>
    </div>
  );
};

type SimpleSpread<L, R> = R & Pick<L, Exclude<keyof L, keyof R>>;

interface CheckboxProps
  extends SimpleSpread<
    React.InputHTMLAttributes<HTMLInputElement>,
    { onChange: (e: boolean) => any }
  > {
  initialValue: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  initialValue = false,
  onChange,
  name = '',
}) => {
  const [checked, setChecked] = React.useState<boolean>(initialValue);
  const spring = useSpring({
    to: checked ? { transform: 'scale(1)' } : { transform: 'scale(0)' },
  });
  React.useEffect(() => {
    onChange(checked);
    // eslint-disable-next-line
  }, [checked]);
  return (
    <div
      role="button"
      tabIndex={-1}
      className="checkbox"
      id={`${name}-checkbox`}
      onClick={(e) => {
        e.stopPropagation();
        setChecked((state) => !state);
      }}
    >
      <animated.div style={spring} className="checkbox-icon">
        <CheckIcon />
      </animated.div>
    </div>
  );
};
