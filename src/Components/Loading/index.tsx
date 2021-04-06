import * as React from 'react';

const Loading: React.FC<{ loading: boolean }> = ({ loading, children }) => {
  if (loading) {
    return (
      <div className="loading">
        <div className="lds-ripple">
          <div />
          <div />
        </div>
      </div>
    );
  }
  return <>{children}</>;
};

export default Loading;
