import type { CommandItem } from '@ds/components';
import { SearchResultType, type SearchResult, type SearchResultTypeMap } from '@ds/contracts';
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

  return `<div style="display:grid;grid-template-columns: 50% 1fr;inline-size:100%;">${cleanedText}</div>`;
};

const formatTextWithIcon = (text: string | null | undefined, icon: string) => {
  if (isEmpty(text)) {
    return '';
  }

  return `<span style="display:flex;align-items:center;"><span class="icon material-symbols-outlined">${icon}</span style="display:inline-block;">${text}</span>`;
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
        title: parseHighlighting(`${json.firstName} ${json.lastName}`),
        description: parseHighlighting(
          `${formatTextWithIcon(json.jobTitle, 'work')}${formatTextWithIcon(json.email, 'email')}`,
        ),
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
        title: parseHighlighting(`${json.firstName}${json.lastName}`),
        description: parseHighlighting(formatTextWithIcon(json.email, 'email')),
      };
    }
    case SearchResultType.product: {
      const json = deserializeResultsJson(SearchResultType.product, item.json);

      return {
        id: item.type + '-' + json.id,
        href: `/products/${json.id}`,
        icon: 'inventory_2',
        title: parseHighlighting(json.name),
        description: parseHighlighting(formatTextWithIcon(json.description, 'description')),
      };
    }
    default:
      return assertNever(item.type);
  }
};
