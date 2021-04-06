import React, { ReactElement } from 'react';
import { useRootSelector } from '../../lib/global/redux/reducers';
import useClock from '../../lib/hooks/useClock';

function Clock(): ReactElement {
  const { minute, seconds, hour } = useClock();
  const { name } = useRootSelector((state) => ({ name: state.settings.name }));
  return (
    <div className="clock">
      <div className="clock-message">
        {Boolean(name) && (
          <h1 className="m-0">
            Hello, <b>{name}</b>
          </h1>
        )}
        <h2 className="m-0">
          {hour}:{minute}:{seconds}
        </h2>
      </div>
    </div>
  );
}

export default Clock;
