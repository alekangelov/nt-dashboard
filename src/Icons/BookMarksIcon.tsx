import * as React from 'react';

function BookmarksIcon(
  props: React.SVGProps<SVGSVGElement>,
): React.ReactElement {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 20 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.333 6.545v14.15L8.656 18.72l-.878-.37-.878.37-4.678 1.975V6.545h11.111zM17.778 0H6.656C5.433 0 4.444.982 4.444 2.182h11.112c1.222 0 2.222.982 2.222 2.182v14.181L20 19.637V2.182C20 .982 19 0 17.778 0zm-4.445 4.364H2.223C1 4.364 0 5.345 0 6.545V24l7.778-3.273L15.556 24V6.545c0-1.2-1-2.181-2.223-2.181z"
        fill="#fff"
      />
    </svg>
  );
}

export default BookmarksIcon;
