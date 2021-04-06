import * as React from 'react';
import { useSpring, animated } from '@react-spring/web';

type Direction = 'up' | 'down' | 'left' | 'right';

interface ArrowProps extends React.SVGProps<SVGSVGElement> {
  direction: Direction;
}

const BASE_ROTATION = 90;

const directionToDegrees = (direction: Direction): number => {
  switch (direction) {
    case 'down':
      return BASE_ROTATION;
    case 'left':
      return BASE_ROTATION * 2;
    case 'up':
      return BASE_ROTATION * 3;
    default:
      return 0;
  }
};

function ArrowIcon(props: ArrowProps): React.ReactElement {
  const spring = useSpring({
    to: {
      transform: `rotate(${directionToDegrees(props.direction)}deg)`,
      display: 'flex',
    },
  });
  return (
    <animated.div style={spring}>
      <svg
        width={9}
        height={16}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.657 8.707a1 1 0 000-1.414L1 1.636a.5.5 0 11.707-.707l6.364 6.364a1 1 0 010 1.414l-6.364 6.364A.5.5 0 111 14.364l5.657-5.657z"
          fill="#fff"
        />
      </svg>
    </animated.div>
  );
}

export default ArrowIcon;
