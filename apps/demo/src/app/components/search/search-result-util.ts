import type { CommandItem } from '@ds/components';
import { type SearchResult, SearchResultType, type SearchResultTypeMap } from '@ds/contracts';
import { isEmpty } from '@ds/utils';

import { HIGHLIGHT_END_TAG, HIGHLIGHT_START_TAG } from '@/core/constants';

const HIGHLIGHT_REGEX = new RegExp(`${HIGHLIGHT_START_TAG}(.*?)${HIGHLIGHT_END_TAG}`, 'g');

const assertNever = (value: never): never => {
  throw new Error(`Unhandled search result type: ${value}`);
};

const deserializeResultsJson = <TType extends SearchResult['type']>(
  _type: TType,
  json: string,
): SearchResultTypeMap[TType] => JSON.parse(json) as SearchResultTypeMap[TType];

const parseHighlighting = (text: string | null | undefined) => {
  if (isEmpty(text)) {
    return '';
  }

  const cleanedText = text
    .trim()
    .replace(HIGHLIGHT_REGEX, '<mark>$1</mark>')
    .replace(/>([^<]+)</g, (_match, content: string) => `>${content.replaceAll(' ', '&nbsp;')}<`);

  // return `<div style="display:grid;grid-template-columns: 50% 1fr;inline-size:100%;">${cleanedText}</div>`;
  return cleanedText;
};

const formatText = (text: string | null | undefined) => {
  if (isEmpty(text)) {
    return '';
  }

  // return `
  //   <span style="display:flex;align-items:center;">
  //     <span class="material-symbols-outlined" style="font-size:16px;inline-size:16px;block-size:16px;">${icon}</span>
  //     <span style="display:inline-block;">${text}</span>
  //   </span>
  // `;

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
      const json = deserializeResultsJson(SearchResultType.user, item.json);

      return {
        id: item.type + '-' + json.id,
        href: `/users/${json.id}`,
        icon: 'person',
        title: parseHighlighting(`${json.firstName}&nbsp;${json.lastName}`),
        description: `${
          formatText(parseHighlighting(json.jobTitle))
        }&nbsp;&nbsp;&bull;&nbsp;&nbsp;${formatText(parseHighlighting(json.email))}`,
      };
    }
    case SearchResultType.customer: {
      const json = deserializeResultsJson(SearchResultType.customer, item.json);

      return {
        id: item.type + '-' + json.id,
        href: `/customers/${json.id}`,
        icon: 'business',
        title: parseHighlighting(json.name),
      };
    }
    case SearchResultType.customerContact: {
      const json = deserializeResultsJson(SearchResultType.customerContact, item.json);

      return {
        id: item.type + '-' + json.id,
        href: `/customers/${json.customerId}/contacts/${json.id}`,
        icon: 'contacts',
        title: parseHighlighting(`${json.firstName} ${json.lastName}`),
        description: formatText(parseHighlighting(json.email)),
      };
    }
    case SearchResultType.product: {
      const json = deserializeResultsJson(SearchResultType.product, item.json);

      return {
        id: item.type + '-' + json.id,
        href: `/products/${json.id}`,
        icon: 'inventory_2',
        title: parseHighlighting(json.name),
        description: formatText(parseHighlighting(json.description)),
      };
    }
    default:
      return assertNever(item.type);
  }
};
