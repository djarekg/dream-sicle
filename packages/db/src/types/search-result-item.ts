import type { SearchResultType } from '../constants/index.ts';

export type SearchResultItem = {
  id: string;
  itemId: string;
  type: SearchResultType;
  url: string;
  labelHtml: string | null;
  subLabelHtml?: string | null;
};
