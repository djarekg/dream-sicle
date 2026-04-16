import type { CommandItem } from '@ds/components';
import { type SearchResult, SearchResultType, type SearchResultTypeMap } from '@ds/contracts';
import { assert, isEmpty } from '@ds/utils';

import { HIGHLIGHT_END_TAG, HIGHLIGHT_START_TAG } from '@/core/constants';

/**
 * Deserializes a search result JSON payload into a type-safe result model.
 *
 * @param _type The result type used to drive the inferred return type.
 * @param json The serialized search result payload.
 * @returns The parsed search result object for the provided type.
 */
export const deserializeResultJson = <TType extends SearchResult['type']>(
  _type: TType,
  json: string,
): SearchResultTypeMap[TType] => JSON.parse(json) as SearchResultTypeMap[TType];

/**
 * Replaces backend highlight tags with semantic HTML and preserves spacing for display.
 *
 * @param text The text that may contain highlight tags.
 * @returns A formatted HTML string or an empty string for empty input.
 */
export const formatHighlightedText = (text: string | null | undefined) => {
  if (isEmpty(text)) {
    return '';
  }

  const highlightRegex = new RegExp(`${HIGHLIGHT_START_TAG}(.*?)${HIGHLIGHT_END_TAG}`, 'g');

  const cleanedText = text
    .trim()
    .replace(highlightRegex, '<mark>$1</mark>')
    .replace(/\s/g, '&nbsp;');

  return cleanedText;
};

/**
 * Wraps text in a span for consistent rendering in command palette descriptions.
 *
 * @param text The plain text content to wrap.
 * @returns A wrapped HTML span string or an empty string for empty input.
 */
export const formatText = (text: string | null | undefined) => {
  if (isEmpty(text)) {
    return '';
  }

  return `<span>${text}</span>`;
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
        description: `${formatText(
          formatHighlightedText(json.jobTitle),
        )}&nbsp;&nbsp;&bull;&nbsp;&nbsp;${formatText(formatHighlightedText(json.email))}`,
        tags: ['user'],
      };
    }
    case SearchResultType.customer: {
      const json = deserializeResultJson(SearchResultType.customer, item.json);

      return {
        id: item.type + '-' + json.id,
        href: `/customers/${json.id}`,
        icon: 'business',
        title: formatHighlightedText(json.name),
        tags: ['customer'],
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
        tags: ['customer contact'],
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
        tags: ['product'],
      };
    }
    default:
      return assert.never(item.type);
  }
};
