import * as React from 'react';
import { useRootSelector } from '../../lib/global/redux/reducers';

const Weather: React.FC<any> = () => {
  const {
    location,
    current_observation: currentObservation,
    forecasts,
  } = useRootSelector(({ weather }) => weather);
  if (!forecasts || !forecasts.length) {
    return null;
  }
  return (
    <div className="forecast">
      <div className="forecast-text">
        <span className="forecast-text__location">{location?.city}</span>
        <span className="forecast-text__condition">
          {currentObservation?.condition.text}
        </span>
        <div className="forecast-text__temp">
          <div className="forecast-text__temp--single">
            <span>
              Current
              <b>{currentObservation?.condition.temperature}°</b>
            </span>
          </div>
          <div className="forecast-text__temp--single">
            <span>
              Min
              <b>{forecasts[0].low}°</b>
            </span>
          </div>
          <div className="forecast-text__temp--single">
            <span>
              Max<b>{forecasts[0].high}°</b>
            </span>
          </div>
        </div>
      </div>
      {/* <div className="forecast-icon">some icon</div> */}
    </div>
  );
};

export default Weather;
