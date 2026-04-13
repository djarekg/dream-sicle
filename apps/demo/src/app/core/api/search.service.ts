import { inject, Injectable } from '@angular/core';
import type { SearchResult } from '@ds/contracts';

import { ApiService } from '@/core/api/api.service';
import { HIGHLIGHT_END_TAG, HIGHLIGHT_START_TAG } from '@/core/constants';

type SearchRequest = {
  query: string;
  highlightStartTag: string;
  highlightEndTag: string;
};

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  readonly #api = inject(ApiService);

  /**
   * Performs a search query against the API and returns an array of search results.
   *
   * @param query The search query string.
   * @returns An array of search results matching the query.
   */
  search(query: string) {
    return this.#api.post<SearchRequest, SearchResult[]>('/search', {
      query,
      highlightStartTag: HIGHLIGHT_START_TAG,
      highlightEndTag: HIGHLIGHT_END_TAG,
    });
  }
}
