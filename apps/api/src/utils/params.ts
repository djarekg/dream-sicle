const requestParams = new WeakMap<Request, Record<string, string>>();

/**
 * Attaches route params to a request in a runtime-agnostic way.
 *
 * @param request (Request) - Request object to associate params with.
 * @param params (Record<string, string>) - Route params extracted from path matching.
 */
export const setRequestParams = (
  request: Request,
  params: Record<string, string>,
) => {
  requestParams.set(request, params);
};

/**
 * Returns route parameters for a request.
 *
 * @param request (Request) - Request object previously associated with params.
 * @returns {T} Parsed params object.
 */
export const parseParams = <T>(request: Request): T => {
  return (requestParams.get(request) as T | undefined) ?? ({} as T);
};
