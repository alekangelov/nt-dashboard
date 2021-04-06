import * as React from 'react';

function PlusIcon(props: React.SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M3 13a2 2 0 110-4h16a2 2 0 110 4H3z" fill="#fff" />
      <path d="M3 13a2 2 0 110-4h16a2 2 0 110 4H3z" fill="#fff" />
      <path d="M3 13a2 2 0 110-4h16a2 2 0 110 4H3z" fill="#fff" />
      <path d="M9 3a2 2 0 114 0v16a2 2 0 11-4 0V3z" fill="#fff" />
      <path d="M9 3a2 2 0 114 0v16a2 2 0 11-4 0V3z" fill="#fff" />
      <path d="M9 3a2 2 0 114 0v16a2 2 0 11-4 0V3z" fill="#fff" />
    </svg>
  );
}

export default PlusIcon;
