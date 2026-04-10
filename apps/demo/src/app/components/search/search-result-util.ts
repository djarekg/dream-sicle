import type { CommandItem } from '@ds/components';
import { SearchResultType, type SearchResult, type SearchResultTypeMap } from '@ds/contracts';

const parseSearchResultJson = <TType extends SearchResult['type']>(
  _type: TType,
  json: string,
): SearchResultTypeMap[TType] => JSON.parse(json) as SearchResultTypeMap[TType];

const assertNever = (value: never): never => {
  throw new Error(`Unhandled search result type: ${value}`);
};

export const toCommandItem = (item: SearchResult): CommandItem => {
  switch (item.type) {
    case SearchResultType.user: {
      const json = parseSearchResultJson(SearchResultType.user, item.json);

      return {
        id: item.type + '-' + json.id,
        title: `${json.firstName} ${json.lastName}`,
        description: json.email,
      };
    }
    case SearchResultType.customer: {
      const json = parseSearchResultJson(SearchResultType.customer, item.json);

      return {
        id: item.type + '-' + json.id,
        title: json.name,
        description: json.streetAddress,
      };
    }
    case SearchResultType.customerContact: {
      const json = parseSearchResultJson(SearchResultType.customerContact, item.json);

      return {
        id: item.type + '-' + json.id,
        title: `${json.firstName} ${json.lastName}`,
        description: json.email,
      };
    }
    case SearchResultType.product: {
      const json = parseSearchResultJson(SearchResultType.product, item.json);

      return {
        id: item.type + '-' + json.id,
        title: json.name,
        description: json.description,
      };
    }
    default:
      return assertNever(item.type);
  }
};
