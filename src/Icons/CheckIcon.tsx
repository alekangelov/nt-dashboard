import * as React from 'react';

function CheckIcon(props: React.SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 20 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 1a1 1 0 01.125 1.409L7.279 16.558.875 8.908A1 1 0 012.41 7.625l4.87 5.818L17.591 1.125A1 1 0 0119 1z"
        fill="#fff"
      />
    </svg>
  );
}

export default CheckIcon;
