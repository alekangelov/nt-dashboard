import * as React from 'react';

interface FolderProps extends React.SVGProps<SVGSVGElement> {
  open: boolean;
}

function Folder({ open, ...props }: FolderProps): React.ReactElement {
  if (!open) {
    return (
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 118 87"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M94.08 13.951H50.103L35.733.268A1.001 1.001 0 0035.06 0H3.92A3.907 3.907 0 000 3.902v72.196A3.907 3.907 0 003.92 80h90.16A3.907 3.907 0 0098 76.098V17.854a3.907 3.907 0 00-3.92-3.903z"
          fill="#fff"
        />
      </svg>
    );
  }
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 118 87"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M113.786 34.482H99.562V19.416c0-2.348-1.883-4.244-4.214-4.244H53.864L38.416.292A1.07 1.07 0 0037.692 0H4.213C1.884 0 0 1.896 0 4.244v78.512C0 85.103 1.883 87 4.214 87h91.924a4.225 4.225 0 003.912-2.652l17.647-44.03a4.37 4.37 0 00.303-1.592c0-2.348-1.883-4.244-4.214-4.244zm-23.706 0H22.915a4.225 4.225 0 00-3.911 2.652L9.482 60.9V9.549h24.825l15.75 15.172H90.08v9.76z"
        fill="#fff"
      />
    </svg>
  );
}

export default Folder;
