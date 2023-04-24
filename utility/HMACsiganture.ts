import crypto from 'crypto';

export interface signatureOptions {
  verb: string;
  path: string;
  data: object;
}

export const generateSignature = (options: signatureOptions) => {
  const { verb, path, data } = options;

  const hmac = crypto.createHmac('sha256', process.env.STRIGA_API_SECRET!);
  const time = Date.now().toString();

  hmac.update(time);
  hmac.update(verb);
  hmac.update(path);

  const contentHash = crypto.createHash('md5');
  const bodyString = JSON.stringify(data);
  contentHash.update(bodyString);

  hmac.update(contentHash.digest('hex'));

  const requestSignatureHexString = hmac.digest('hex');
  const authorizationHeader = `HMAC ${time}:${requestSignatureHexString}`;

  return authorizationHeader;
};
