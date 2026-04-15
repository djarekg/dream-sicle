import type { CommandItem } from '@ds/components';
import { type SearchResult, SearchResultType, type SearchResultTypeMap } from '@ds/contracts';
import { isEmpty } from '@ds/utils';

import { HIGHLIGHT_END_TAG, HIGHLIGHT_START_TAG } from '@/core/constants';

export const assertNever = (value: never): never => {
  throw new Error(`Unhandled search result type: ${value}`);
};

export const deserializeResultJson = <TType extends SearchResult['type']>(
  _type: TType,
  json: string,
): SearchResultTypeMap[TType] => JSON.parse(json) as SearchResultTypeMap[TType];

export const formatHighlightedText = (text: string | null | undefined) => {
  if (isEmpty(text)) {
    return '';
  }

  const highlightRegex = new RegExp(`${HIGHLIGHT_START_TAG}(.*?)${HIGHLIGHT_END_TAG}`, 'g');

  const cleanedText = text
    .trim()
    .replace(highlightRegex, '<mark>$1</mark>')
    .replace(/>([^<]+)</g, (_match, content: string) => `>${content.replaceAll(' ', '&nbsp;')}<`);

  return cleanedText;
};

export const formatText = (text: string | null | undefined) => {
  if (isEmpty(text)) {
    return '';
  }

  return `<span>${text}</span>`; // Icon removed for now to simplify styling, can be re-added later if needed
};

/**
 * Maps a SearchResult from the API to a CommandItem for display in the CommandPalette.
 *
 * @param item The search result item to be mapped.
 * @returns A CommandItem representing the search result.
 */
export const toCommandItem = (item: SearchResult): CommandItem => {
  switch (item.type) {
    case SearchResultType.user: {
      const json = deserializeResultJson(SearchResultType.user, item.json);

      return {
        id: item.type + '-' + json.id,
        href: `/users/${json.id}`,
        icon: 'person',
        title: formatHighlightedText(`${json.firstName}&nbsp;${json.lastName}`),
        description: `${
          formatText(formatHighlightedText(json.jobTitle))
        }&nbsp;&nbsp;&bull;&nbsp;&nbsp;${formatText(formatHighlightedText(json.email))}`,
      };
    }
    case SearchResultType.customer: {
      const json = deserializeResultJson(SearchResultType.customer, item.json);

      return {
        id: item.type + '-' + json.id,
        href: `/customers/${json.id}`,
        icon: 'business',
        title: formatHighlightedText(json.name),
      };
    }
    case SearchResultType.customerContact: {
      const json = deserializeResultJson(SearchResultType.customerContact, item.json);

      return {
        id: item.type + '-' + json.id,
        href: `/customers/${json.customerId}/contacts/${json.id}`,
        icon: 'contacts',
        title: formatHighlightedText(`${json.firstName}&nbsp;${json.lastName}`),
        description: formatText(formatHighlightedText(json.email)),
      };
    }
    case SearchResultType.product: {
      const json = deserializeResultJson(SearchResultType.product, item.json);

      return {
        id: item.type + '-' + json.id,
        href: `/products/${json.id}`,
        icon: 'inventory_2',
        title: formatHighlightedText(json.name),
        description: formatText(formatHighlightedText(json.description)),
      };
    }
    default:
      return assertNever(item.type);
  }
};
