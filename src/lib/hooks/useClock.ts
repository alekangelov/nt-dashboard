import dayjs from 'dayjs';
import * as React from 'react';

interface ClockProps {
  month: string;
  day: string;
  year: string;
  hour: string;
  minute: string;
  seconds: string;
}

const IN_CLOCK: ClockProps = {
  month: 'MMMM',
  day: 'DD',
  year: 'YYYY',
  hour: 'hh',
  minute: 'mm',
  seconds: 'ss',
};
const arrayToObject = (clock: dayjs.Dayjs) => {
  const x: { [e: string]: any } = {};
  Object.keys(IN_CLOCK).forEach((y: string) => {
    x[y] = clock.format(IN_CLOCK[y as keyof ClockProps]);
  });
  return x;
};

const useClock = (): ClockProps => {
  const [clock, setClock] = React.useState(
    arrayToObject(dayjs(new Date().toUTCString())),
  );

  React.useEffect(() => {
    const id = setInterval(() => {
      setClock(arrayToObject(dayjs(new Date().toISOString())));
    }, 1000);

    return () => clearInterval(id);
  }, []);
  return clock as ClockProps;
};

export default useClock;
