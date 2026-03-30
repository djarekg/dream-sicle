import { createServer } from 'node:http';
import { basename } from 'node:path';
import { fileURLToPath } from 'node:url';

import { PORT } from './config.ts';
import { authRoutes } from './routes/auth.ts';
import { searchRoutes } from './routes/search.ts';
import { userRoutes } from './routes/user.ts';
import { createCorsPreflightResponse, getCorsHeaders } from './utils/cors.ts';
import {
  sendFetchResponse,
  toFetchRequest,
} from './utils/node-http-adapter.ts';
import { setRequestParams } from './utils/params.ts';

type RouteHandler = (request: Request, context: unknown) => Promise<Response>;

type CompiledRoute = {
  regex: RegExp;
  paramNames: string[];
  handler: RouteHandler;
};

const routeHandlers: Record<string, RouteHandler> = {
  ...authRoutes,
  ...userRoutes,
  ...searchRoutes,
};

const apiPathPrefixes = ['/auth', '/users', '/search'];

const escapeRegex = (value: string): string => {
  return value.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
};

const compileRoute = (
  routePath: string,
  handler: RouteHandler,
): CompiledRoute => {
  const paramNames: string[] = [];

  const pattern = routePath
    .split('/')
    .map(segment => {
      if (!segment) {
        return '';
      }

      if (segment.startsWith(':')) {
        paramNames.push(segment.slice(1));
        return '([^/]+)';
      }

      return escapeRegex(segment);
    })
    .join('/');

  return {
    regex: new RegExp(`^${pattern}$`),
    paramNames,
    handler,
  };
};

const compiledRoutes: CompiledRoute[] = Object.entries(routeHandlers).map(
  ([routePath, handler]) => compileRoute(routePath, handler),
);

const findRoute = (pathname: string) => {
  for (const route of compiledRoutes) {
    const match = route.regex.exec(pathname);

    if (!match) {
      continue;
    }

    const params = route.paramNames.reduce<Record<string, string>>(
      (acc, paramName, index) => {
        const value = match[index + 1] ?? '';
        acc[paramName] = decodeURIComponent(value);
        return acc;
      },
      {},
    );

    return { handler: route.handler, params };
  }

  return null;
};

const createNotFoundResponse = (): Response => {
  return new Response(JSON.stringify({ error: 'Not found' }), {
    status: 404,
    headers: {
      'Content-Type': 'application/json',
      ...getCorsHeaders(),
    },
  });
};

/**
 * Handles API requests for both the Node server entrypoint and Vite dev middleware.
 *
 * @param request (Request) - Incoming request in Fetch API format.
 * @returns {Promise<Response>} The generated route response.
 */
export const handleApiRequest = async (request: Request): Promise<Response> => {
  const { pathname } = new URL(request.url);

  if (request.method === 'OPTIONS') {
    return createCorsPreflightResponse();
  }

  const matchedRoute = findRoute(pathname);

  if (!matchedRoute) {
    return createNotFoundResponse();
  }

  setRequestParams(request, matchedRoute.params);

  return matchedRoute.handler(request, { params: matchedRoute.params });
};

/**
 * Returns true when the URL path belongs to this API service.
 *
 * @param pathname (string) - URL pathname to evaluate.
 * @returns {boolean} Whether this request should be handled by API middleware.
 */
export const isApiPath = (pathname: string): boolean => {
  return apiPathPrefixes.some(
    prefix => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
};

/**
 * Starts the API HTTP server for direct Node execution.
 *
 * @returns {import('node:http').Server} Started Node HTTP server instance.
 */
export const startServer = () => {
  const server = createServer(async (req, res) => {
    const request = toFetchRequest(req, PORT);
    const response = await handleApiRequest(request);
    await sendFetchResponse(res, response);
  });

  server.listen(PORT, () => {
    console.log(`Server ready at: http://localhost:${PORT}`);
  });

  return server;
};

const isRunAsEntryPoint = (): boolean => {
  const executedPath = process.argv[1];

  if (!executedPath) {
    return false;
  }

  return basename(executedPath) === basename(fileURLToPath(import.meta.url));
};

if (isRunAsEntryPoint()) {
  startServer();
}
