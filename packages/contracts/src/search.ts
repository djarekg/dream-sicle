/**
 * Numeric search result type identifiers shared across API and client.
 */
export const SearchResultType = {
  user: 1,
  customer: 2,
  customerContact: 3,
  product: 4,
} as const;

/**
 * Union of supported search result type identifiers.
 */
export type SearchResultType = (typeof SearchResultType)[keyof typeof SearchResultType];

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

/**
 * Represents a search result for a user.
 */
export type UserSearchResult = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  streetAddress: string;
  streetAddress2?: string;
  city: string;
  phone: string;
};

/**
 * Represents a search result for a customer.
 */
export type CustomerSearchResult = {
  id: string;
  name: string;
  streetAddress: string;
  streetAddress2?: string;
  city: string;
  phone: string;
};

/**
 * Represents a search result for a customer contact.
 */
export type CustomerContactSearchResult = {
  id: string;
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  streetAddress: string;
  streetAddress2?: string;
  city: string;
  phone: string;
};

/**
 * Represents a search result for a product.
 */
export type ProductSearchResult = {
  id: string;
  name: string;
  description: string;
  price: number;
};

/**
 * Mapping of search result types to their corresponding JSON structures for
 * type-safe parsing on the client.
 */
export type SearchResultTypeMap = {
  [SearchResultType.user]: UserSearchResult;
  [SearchResultType.customer]: CustomerSearchResult;
  [SearchResultType.customerContact]: CustomerContactSearchResult;
  [SearchResultType.product]: ProductSearchResult;
};
