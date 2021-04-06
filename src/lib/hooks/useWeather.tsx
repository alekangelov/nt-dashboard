import axios from 'axios';
import { useEffect } from 'react';
import { APP_ID, CONSUMER_KEY, CONSUMER_SECRET, URL } from '../OAuthHelper';
import useAxios from './useAxios';
import oauthInterceptor from '../interceptors/oauthInterceptor';

const weatherAxios = axios.create();

oauthInterceptor(weatherAxios, {
  // OAuth consumer key and secret
  key: CONSUMER_KEY as string,
  secret: CONSUMER_SECRET as string,
  // HMAC-SHA1 and HMAC-SHA256 are supported
  algorithm: 'HMAC-SHA1',
});

const weatherApi = async (body: any) => {
  try {
    const result = await weatherAxios.get(URL, {
      params: { ...body },
      headers: {
        'X-Yahoo-App-Id': APP_ID,
      },
    });
    return result.data;
  } catch (e) {
    throw Error('There was an error processing your request.');
  }
};

export declare namespace Weather {
  export interface Location {
    city: string;
    region: string;
    woeid: number;
    country: string;
    lat: number;
    long: number;
    timezone_id: string;
  }

  export interface Wind {
    chill: number;
    direction: number;
    speed: number;
  }

  export interface Atmosphere {
    humidity: number;
    visibility: number;
    pressure: number;
    rising: number;
  }

  export interface Astronomy {
    sunrise: string;
    sunset: string;
  }

  export interface Condition {
    text: string;
    code: number;
    temperature: number;
  }

  export interface CurrentObservation {
    wind: Wind;
    atmosphere: Atmosphere;
    astronomy: Astronomy;
    condition: Condition;
    pubDate: number;
  }

  export interface Forecast {
    day: string;
    date: number;
    low: number;
    high: number;
    text: string;
    code: number;
  }

  export interface Response {
    location?: Location;
    current_observation?: CurrentObservation;
    forecasts: Forecast[];
  }

  export interface Request {
    location: string;
    format: string;
    u: string;
  }
}

export default function useWeather(
  props: Weather.Request = { location: '', format: 'json', u: 'c' },
) {
  const [state, get] = useAxios<Weather.Request, Weather.Response>(weatherApi, {
    loading: true,
  });
  useEffect(() => {
    get(props);
    // eslint-disable-next-line
  }, [props.location]);
  return state;
}
