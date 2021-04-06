import * as React from 'react';

function Home(props: React.SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <svg
      width={20}
      height={21}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.126.745a2.727 2.727 0 013.748 0l6.702 6.335A4.546 4.546 0 0120 10.384V17.5a2.727 2.727 0 01-2.727 2.727H2.727A2.728 2.728 0 010 17.5v-7.115A4.546 4.546 0 011.424 7.08m0 0L8.126.745M10 1.818a.91.91 0 00-.625.249L2.673 8.4a2.728 2.728 0 00-.855 1.983V17.5a.91.91 0 00.91.909h14.545a.91.91 0 00.909-.91v-7.114a2.727 2.727 0 00-.854-1.983l-6.703-6.334A.91.91 0 0010 1.818z"
        fill="#fff"
      />
    </svg>
  );
}

export default Home;
