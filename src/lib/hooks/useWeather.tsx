import axios from 'axios';
import useAxios from './useAxios';
import oauthInterceptor from '../interceptors/oauthInterceptor';
import useDeepEffect from './useDeepEffect';
import { removeEmpty } from '../utils';

export const CONSUMER_SECRET = process.env.REACT_APP_CONSUMER_SECRET;
export const CONSUMER_KEY = process.env.REACT_APP_CONSUMER_KEY;
export const URL = `https://weather-ydn-yql.media.yahoo.com/forecastrss`;
export const APP_ID = 'pwfhq4rQ';

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
    location?: string;
    format: string;
    u: string;
    lat?: number;
    lon?: number;
  }
}

export default function useWeather(
  props: Weather.Request = { location: '', format: 'json', u: 'c' },
) {
  const [state, get] = useAxios<Weather.Request, Weather.Response>(weatherApi, {
    loading: true,
  });

  useDeepEffect(() => {
    if ((props.lat && props.lon) || props.location) {
      get((removeEmpty({ ...props }) as unknown) as Weather.Request);
    }
  }, [props]);
  return state;
}
