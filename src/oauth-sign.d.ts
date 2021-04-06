declare module 'oauth-sign' {
  function sign(
    signMethod: 'RSA-SHA1' | 'HMAC-SHA1' | 'HMAC-SHA256' | 'PLAINTEXT' | string,
    httpMethod: string,
    base_uri: string,
    params: { [k: string]: string },
    consumer_secret: string,
    token_secret?: string | null,
  ): string;
  function rfc3986(s: string): string;
}
