import type { IncomingMessage, ServerResponse } from 'node:http';
import { Readable } from 'node:stream';
import type { ReadableStream as NodeReadableStream } from 'node:stream/web';

const isBodylessMethod = (method: string): boolean => {
  return method === 'GET' || method === 'HEAD';
};

/**
 * Converts a Node incoming message into a Fetch API Request.
 *
 * @param req (IncomingMessage) - Node request object.
 * @param fallbackPort (number) - Port used when host header is missing.
 * @returns {Request} Fetch Request for route handlers.
 */
export const toFetchRequest = (
  req: IncomingMessage,
  fallbackPort: number,
): Request => {
  const method = req.method ?? 'GET';
  const host = req.headers.host ?? `localhost:${fallbackPort}`;
  const url = new URL(req.url ?? '/', `http://${host}`);
  const headers = new Headers();

  Object.entries(req.headers).forEach(([key, value]) => {
    if (typeof value === 'undefined') {
      return;
    }

    if (Array.isArray(value)) {
      headers.set(key, value.join(', '));
      return;
    }

    headers.set(key, value);
  });

  if (isBodylessMethod(method)) {
    return new Request(url, {
      method,
      headers,
    });
  }

  return new Request(url, {
    method,
    headers,
    body: Readable.toWeb(req) as RequestInit['body'],
    duplex: 'half',
  } as RequestInit & { duplex: 'half' });
};

/**
 * Writes a Fetch API response back to a Node ServerResponse.
 *
 * @param res (ServerResponse) - Node response object.
 * @param response (Response) - Fetch response returned by handlers.
 * @returns {Promise<void>} Completes when the response body finishes.
 */
export const sendFetchResponse = async (
  res: ServerResponse,
  response: Response,
): Promise<void> => {
  res.statusCode = response.status;
  res.statusMessage = response.statusText;

  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  if (!response.body) {
    res.end();
    return;
  }

  await new Promise<void>((resolve, reject) => {
    const body = Readable.fromWeb(response.body as NodeReadableStream);

    body.on('error', reject);
    res.on('error', reject);
    res.on('finish', resolve);

    body.pipe(res);
  });
};
