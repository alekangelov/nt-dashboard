import React, { ReactElement, useCallback, useState } from 'react';
import CSS from 'csstype';
import { BTN_TIMING } from '../constants';
import { delay, generateId } from '../libhelpers';
import { removeFromListWhereId } from '../utils';

interface RippleProps {
  style: CSS.Properties;
}

function Ripple(props: RippleProps) {
  return <span style={props.style} className="btn-hoop" />;
}

function useBtnClick(): [
  ReactElement[] | false,
  (e: React.MouseEvent) => void,
] {
  const [ripples, setRipples] = useState<ReactElement[]>([]);
  const onClick = useCallback(
    async (e: React.MouseEvent) => {
      const { pageX: x, pageY: y } = e;
      const { top, left } = (e.target as HTMLElement).getBoundingClientRect();
      const pos: CSS.Properties = {
        left: `${x - left}px`,
        top: `${y - top}px`,
      };
      const id = generateId();
      setRipples((rippleState) => {
        const newRipples = [
          ...rippleState,
          <Ripple {...{ style: pos, id, key: id }} />,
        ];
        return newRipples;
      });
      delay(BTN_TIMING).then(() => {
        setRipples(removeFromListWhereId(id));
      });
    },
    [setRipples],
  );
  return [ripples, onClick];
}

export default useBtnClick;
