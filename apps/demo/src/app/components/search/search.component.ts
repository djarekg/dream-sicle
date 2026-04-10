import { Component, computed, debounced, inject, resource, signal } from '@angular/core';
import { CommandItem, CommandPalette } from '@ds/components';
import { isBrowser } from '@ds/core';

import { SearchService } from '@/core/api/search.service';

import { toCommandItem } from './search-result-util';

const ESCAPE = 'Escape';
const SEARCH_TRIGGER_KEY = 'k';
const ALT_SEARCH_TRIGGER_KEY = '/';

@Component({
  selector: 'app-search',
  imports: [CommandPalette],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  host: {
    '(window:keydown)': 'handleWindowKeydown($event)',
  },
})
export class Search {
  readonly #searchService = inject(SearchService);

  protected readonly isBrowser = isBrowser();
  protected readonly isOpened = signal(false);
  protected readonly open = signal(false);
  protected readonly query = signal('');

  readonly #debouncedQuery = debounced(this.query, 300);
  readonly #resource = resource({
    params: () => this.#debouncedQuery.value(),
    loader: ({ params: query }) => this.#searchService.search(query),
  });

  protected readonly items = computed<CommandItem[]>(() =>
    (this.#resource.value() ?? []).map(toCommandItem),
  );

  protected handleWindowKeydown(e: KeyboardEvent): void {
    if (
      (e.key === SEARCH_TRIGGER_KEY && (e.metaKey || e.ctrlKey)) ||
      e.key === ALT_SEARCH_TRIGGER_KEY
    ) {
      e.preventDefault();
      this.open.update(display => !display);
    }

    if (e.key === ESCAPE && this.open()) {
      e.preventDefault();
      this.open.set(false);
    }
  }
}
