/* eslint-disable */

import { AxiosInstance, AxiosRequestConfig } from 'axios';
import crypto from 'crypto';
import { rfc3986, sign } from 'oauth-sign';

const isAbsoluteURL = (url: string): boolean =>
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);

const combineURLs = (baseURL: string, relativeURL: string): string => {
  if (relativeURL) {
    return `${baseURL.replace(/\/+$/, '')}/${relativeURL.replace(/^\/+/, '')}`;
  }
  return baseURL;
};

const generateNonce = (size = 16): string =>
  crypto.randomBytes(size * 0.75).toString('base64');

const calculateBodyHash = (
  signatureMethod: OAuthInterceptorConfig['algorithm'],
  data: any,
): string => {
  const buf = Buffer.isBuffer(data)
    ? data
    : typeof data === 'string'
    ? Buffer.from(data)
    : !data
    ? Buffer.from('')
    : Buffer.from(JSON.stringify(data));
  return crypto
    .createHash(signatureMethod === 'HMAC-SHA1' ? 'sha1' : 'sha256')
    .update(buf)
    .digest('base64');
};

export interface OAuthInterceptorConfig {
  /**
   * Hashing function to use
   */
  algorithm: 'HMAC-SHA1' | 'HMAC-SHA256';

  /**
   * When true, always try to hash the body and include the hash in the signature
   * When false, never try to calculate oauth_body_hash
   * When 'auto', calculate oauth_body_hash on PUT or POST requests that have a body
   */
  includeBodyHash?: boolean | 'auto';

  /**
   * Consumer key
   */
  key: string;

  /**
   * Consumer secret
   */
  secret: string;

  /**
   * OAuth token
   */
  token?: string | null;
}

const oauthInterceptor = (
  client: AxiosInstance,
  {
    key,
    secret,
    algorithm = 'HMAC-SHA256',
    token = null,
    includeBodyHash = 'auto',
  }: OAuthInterceptorConfig,
) => {
  client.interceptors.request.use((config: AxiosRequestConfig) => {
    const method = (config.method || 'GET').toUpperCase();
    const oauthParams: { [k: string]: string } = {
      oauth_consumer_key: key,
      oauth_nonce: generateNonce(),
      oauth_signature_method: algorithm,
      oauth_timestamp: String(Math.floor(Date.now() * 0.001)),
      oauth_version: '1.0',
    };

    const oauthUrl = new URL(
      ((config.baseURL as string) || isAbsoluteURL(config.url as string)
        ? config.url
        : combineURLs(
            config.baseURL as string,
            config.url as string,
          )) as string,
    );

    const paramsToSign = { ...oauthParams };
    if (config.params) {
      for (const [k, v] of Object.entries(config.params)) {
        paramsToSign[k] = String(v);
      }
    }

    // Query parameters are hashed as part of params rather than as part of the URL
    if (oauthUrl.search) {
      oauthUrl.searchParams.forEach((value, key) => {
        paramsToSign[key] = value;
      });
      oauthUrl.search = '';
    }

    // Do not include hash in signature
    oauthUrl.hash = '';

    // Remove port if it is the default for that protocol
    if (
      (oauthUrl.protocol === 'https:' && oauthUrl.port === '443') ||
      (oauthUrl.protocol === 'http:' && oauthUrl.port === '80')
    ) {
      oauthUrl.port = '';
    }

    // If they are submitting a form, then include form parameters in the
    // signature as parameters rather than the body hash
    if (
      config.headers['content-type'] === 'application/x-www-form-urlencoded'
    ) {
      new URLSearchParams(config.data).forEach((value, key) => {
        paramsToSign[key] = value;
      });
    } else if (
      includeBodyHash === true ||
      (config.data &&
        includeBodyHash === 'auto' &&
        ['POST', 'PUT'].includes(method))
    ) {
      oauthParams.oauth_body_hash = calculateBodyHash(algorithm, config.data);
    }

    oauthParams.oauth_signature = sign(
      algorithm,
      method,
      oauthUrl.toString(),
      paramsToSign,
      secret,
      token,
    );
    const authorization = [
      'OAuth',
      Object.entries(oauthParams)
        .map((e) => [e[0], '="', rfc3986(e[1]), '"'].join(''))
        .join(','),
    ].join(' ');
    return {
      ...config,
      params: { ...config.params, ...oauthParams },
      headers: {
        ...config.headers,
        // authorization,
      },
    };
  });
};

export default oauthInterceptor;
