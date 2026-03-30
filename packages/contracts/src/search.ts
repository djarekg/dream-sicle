/**
 * Numeric search result type identifiers shared across API and client.
 */
export const SearchResultTypes = {
  user: 1,
  customer: 2,
  customerContact: 3,
  product: 4,
} as const;

/**
 * Union of supported search result type identifiers.
 */
export type SearchResultType =
  (typeof SearchResultTypes)[keyof typeof SearchResultTypes];

/**
 * Input payload contract for the search endpoint.
 */
export type SearchResultParams = {
  query: string;
  highlightStartTag: string;
  highlightEndTag: string;
};

/**
 * Search response item contract returned by the API.
 */
export type SearchResult = {
  type: SearchResultType;
  rank: number;
  json: string;
};
