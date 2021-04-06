import crypto from 'crypto';
import OAuth1a from 'oauth-1.0a';

export const CONSUMER_SECRET = process.env.REACT_APP_CONSUMER_SECRET;
export const CONSUMER_KEY = process.env.REACT_APP_CONSUMER_KEY;
export const URL = `https://weather-ydn-yql.media.yahoo.com/forecastrss`;

export const APP_ID = 'pwfhq4rQ';
export interface WeatherRequestProps {
  method: 'GET' | 'POST';
  url: string;
  data: Record<string, unknown>;
}

export interface OAuthHelperProps {
  request: WeatherRequestProps;
  secret: string;
  key: string;
}

export default class OAuthHelper {
  request = {
    method: 'GET',
    url: '',
    data: {},
  };

  secret = '';

  key = '';

  constructor({ request, secret, key }: OAuthHelperProps) {
    this.request = request;
    this.secret = secret;
    this.key = key;
    return this.makeOAuth() as any;
  }

  hash_function_sha1 = (base_string: string, key: string): string => {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  };

  makeOAuth = (): OAuth1a.Header => {
    const oauth = new OAuth1a({
      consumer: { key: this.key, secret: this.secret },
      signature_method: 'HMAC-SHA1',
      hash_function: this.hash_function_sha1,
    });
    const authorization = oauth.authorize(this.request, {
      key: this.key,
      secret: this.secret,
    });

    return oauth.toHeader(authorization);
  };
}
