import * as React from 'react';
import Scrollbars, { ScrollbarProps } from 'react-custom-scrollbars';

const Custombars: React.FC<ScrollbarProps> = ({ children, ...rest }) => (
  <Scrollbars
    autoHide
    renderThumbVertical={(props) => (
      <div {...props} className="scrollbars-thumb" />
    )}
    renderThumbHorizontal={(props) => (
      <div {...props} className="scrollbars-thumb" />
    )}
    renderView={(props) => <div {...props} className="renderView" />}
    width="100%"
    autoHeight
    {...rest}
  >
    {children}
  </Scrollbars>
);

export default Custombars;
