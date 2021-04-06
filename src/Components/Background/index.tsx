import React, { ReactElement } from 'react';
import { useRootSelector } from '../../lib/global/redux/reducers';

function Background(): ReactElement {
  const { background } = useRootSelector(({ settings }) => ({
    background: settings.background,
  }));

  return (
    <div className="background">
      {Boolean(background.opacity) && (
        <div
          className="background-overlay"
          style={{ opacity: background.opacity }}
        />
      )}
      {Boolean(background.url) && <img src={background.url} alt="background" />}
    </div>
  );
}

export default Background;
