/**
 * Removes the trailing slash from a URL if it exists.
 *
 * @param url The URL to process.
 * @returns The URL without a trailing slash.
 */
export const removeTrailingSlash = (url: string): string => {
  if (url.endsWith('/')) {
    return url.slice(0, -1);
  }
  return url;
};
