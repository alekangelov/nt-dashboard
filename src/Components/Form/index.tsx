import * as React from 'react';
import { useField, useFormikContext } from 'formik';
import mergeProps from 'merge-props';
import { useSpring, animated } from '@react-spring/web';
import clsx from 'clsx';
import { fileToDataUrl, makeid } from '../../lib/utils';
import CheckIcon from '../../Icons/CheckIcon';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, name = '', ...rest }) => {
  console.log('TEXTINPUT');
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
  options: Option[];
}

const SelectInput: React.FC<SelectInputProps> = ({
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
        <label
          className={clsx(
            'form-control__label',
            Boolean(field.value || isFocused) && 'hide',
          )}
          htmlFor={id.current}
        >
          {label}
        </label>
        <select
          {...mergeProps(field, {
            onBlur: () => setIsFocused(false),
            onFocus: () => setIsFocused(true),
          })}
          className="form-control__input"
          id={id.current}
        >
          <option value=""> </option>
          {options.map((e) =>
            e ? (
              <option key={e.value} value={e.value}>
                {e.label}
              </option>
            ) : null,
          )}
        </select>
      </div>
      {Boolean(meta.touched && meta.error) && (
        <div className="form-control__error">
          <span>{meta.error}</span>
        </div>
      )}
    </div>
  );
};

(SelectInput as any).whyDidYouRender = true;

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  min: number;
  max: number;
  label: string;
  name: string;
}

const SliderInput: React.FC<SliderProps> = ({ label, min, max, name }) => {
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

const SwitchInput: React.FC<SwitchProps> = ({ label, off, on, name }) => {
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

const FormButtons: React.FC<any> = () => {
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

const Checkbox: React.FC<CheckboxProps> = ({
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

interface DropZoneProps {
  name: string;
  label: string;
}

const DropZoneInput: React.FC<DropZoneProps> = ({ name, label }) => {
  const id = React.useRef(makeid(5));
  const [dragging, setDragging] = React.useState<boolean>(false);
  const fieldRef = React.useRef<HTMLInputElement | null>(null);
  const [field, meta] = useField(name);
  const changeFile = (file: string) => field.onChange(name)(file);
  return (
    <div className="form-control dropzone">
      <div
        // htmlFor={id.current}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          fieldRef?.current?.click();
        }}
        role="button"
        tabIndex={-1}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragging(false);
        }}
        onDrop={async (e) => {
          e.preventDefault();
          changeFile(await fileToDataUrl(e.dataTransfer.files[0]));
          setDragging(false);
        }}
        className={clsx('form-control__dropzone', dragging && 'dropping')}
      >
        {label}
        <input
          onClick={(e) => e.stopPropagation()}
          onChange={async (e) => {
            changeFile(await fileToDataUrl((e.target.files as any)[0]));
          }}
          id={id.current}
          type="file"
          ref={fieldRef}
          className="form-control__dropzone__input"
        />

        {Boolean(field.value) && (
          <div className="form-control__dropzone__preview">
            <img src={field.value} alt="preview for the dropzone" />
          </div>
        )}
      </div>
    </div>
  );
};

export {
  SelectInput,
  DropZoneInput,
  SliderInput,
  SwitchInput,
  FormButtons,
  Checkbox,
  TextInput,
};
