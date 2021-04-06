import * as React from 'react';

function TodoIcon(props: React.SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.059 0L2.293 2.672l-1.079-1.04L0 2.798l1.686 1.627.607.558.608-.559 3.372-3.254L5.06 0zm3.98 1.4v1.627H20V1.4H9.039zm-3.98 5.109L2.293 9.18 1.214 8.136 0 9.307l1.686 1.627.607.558.608-.559L6.273 7.68 5.06 6.508zm3.98 1.399v1.627H20V7.908H9.039zm-3.98 5.109l-2.766 2.67-1.079-1.041L0 15.815l1.686 1.627.607.558.608-.559 3.372-3.254-1.214-1.171zm3.98 1.399v1.627H20v-1.627H9.039z"
        fill="#fff"
      />
    </svg>
  );
}

export default TodoIcon;
