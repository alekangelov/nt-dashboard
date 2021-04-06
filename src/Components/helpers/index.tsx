import * as React from 'react';
import { useSpring, a } from '@react-spring/web';
import mergeProps from 'merge-props';
import useMeasure from 'react-use-measure';
import clsx from 'clsx';
import useBtnClick from '../../lib/hooks/useBtnClick';
import { omitChildren } from '../../lib/utils';
import useOutsideAlerter from '../../lib/hooks/useOutsideAlerter';
import ArrowIcon from '../../Icons/ArrowIcon';

type IconButtonProps = React.ButtonHTMLAttributes<any>;
// eslint-disable react/jsx-props-no-spreading
export function IconButton(props: IconButtonProps): React.ReactElement {
  const [elem, onClick] = useBtnClick();
  return (
    <button
      type="button"
      {...mergeProps(omitChildren(props), {
        className: 'icon-button btn btn-default',
        onClick,
        children: elem,
      })}
    >
      {props.children}
      {elem}
    </button>
  );
}

type Option = { label: string; value: any };

interface SelectProps {
  placeholder?: string;
  items: Option[];
  initialValue?: string;
  className?: string;
  onChange?: (e: string) => any;
}

const SelectItem = ({
  item,
  setValue,
}: {
  item: Option;
  setValue: React.Dispatch<any>;
}) => {
  const [things, onClick] = useBtnClick();
  return (
    <div
      key={item.value}
      role="button"
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setValue(item.value);
        }
      }}
      onClick={(e) => {
        setValue(item.value);
        onClick(e);
      }}
      className="select-items__single btn"
    >
      {things}
      <span>{item.label}</span>
    </div>
  );
};

export const Select: React.FC<SelectProps> = ({
  placeholder = '',
  className,
  items,
  initialValue = '',
  onChange,
}) => {
  const [value, setValue] = React.useState<any>(initialValue);
  const [show, setShow] = React.useState<boolean>(false);
  const [boundRef, bounds] = useMeasure();
  const ref = useOutsideAlerter(() => {
    setShow(false);
  }) as React.MutableRefObject<HTMLDivElement>;
  const boxSpring = useSpring({
    to: async (next) => {
      if (show) {
        await next({
          opacity: 1,
          display: '',
          transform: 'translate(-50%,0%)',
          pointerEvents: 'all',
        });
        return;
      }
      await next({
        opacity: 0,
        transform: 'translate(-50%,25%)',

        pointerEvents: 'none',
      });
    },
  });
  const open = React.useCallback(
    (e: React.MouseEvent) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      if ((e as any).key && (e as any).key !== 'Enter') {
        return;
      }
      setShow((state) => !state);
    },
    [setShow],
  );
  React.useEffect(() => {
    setShow(false);
    if (onChange) {
      onChange(value);
    }
  }, [value, onChange]);
  return (
    <div
      ref={ref}
      role="menu"
      tabIndex={-1}
      className={clsx('select', className)}
      onKeyDown={open as any}
      onClick={open}
    >
      <div className="select-inner">
        <div className="select-box" style={{ minWidth: bounds.width + 32 }}>
          <span>{value || placeholder}</span>
          <div className="select-box__arrow">
            <ArrowIcon direction={show ? 'up' : 'down'} />
          </div>
        </div>
        <a.div ref={boundRef} style={boxSpring} className="select-items">
          {items.map((item) => {
            return (
              <SelectItem key={item.value} item={item} setValue={setValue} />
            );
          })}
        </a.div>
      </div>
    </div>
  );
};
