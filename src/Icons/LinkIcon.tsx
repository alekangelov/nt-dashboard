import * as React from 'react';

function LinkIcon(props: React.SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 98 98"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.753 90.247A26.425 26.425 0 0026.5 98a26.443 26.443 0 0018.753-7.753L60.25 75.245l-7.5-7.499-14.997 15.002a15.947 15.947 0 01-22.502 0 15.935 15.935 0 010-22.5L30.255 45.25l-7.499-7.499L7.753 52.75a26.546 26.546 0 000 37.498zM90.251 45.25a26.557 26.557 0 000-37.498 26.549 26.549 0 00-37.5 0L37.755 22.755l7.499 7.499L60.25 15.25a15.947 15.947 0 0122.501 0 15.935 15.935 0 010 22.501L67.75 52.75l7.5 7.499L90.25 45.25z"
        fill="#fff"
      />
      <path
        d="M30.25 75.25l-7.504-7.499L67.755 22.75l7.499 7.504L30.25 75.25z"
        fill="#fff"
      />
    </svg>
  );
}

export default LinkIcon;
