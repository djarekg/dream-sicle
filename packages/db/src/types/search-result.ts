import type { SearchResultType } from '../constants/search-result-type.ts';

export type SearchResult = {
  type: SearchResultType;
  rank: number;
  json: string;
};
