import {
  Component,
  computed,
  debounced,
  injectAsync,
  onIdle,
  resource,
  signal,
} from '@angular/core';
import { CommandItem, CommandPalette } from '@dream-sicle/components';
import { isBrowser } from '@dream-sicle/core';
import { isEmpty } from '@dream-sicle/utils';
import { toCommandItem } from './search-result-util';

const ESCAPE = 'Escape';
const SEARCH_TRIGGER_KEY = 'k';
const ALT_SEARCH_TRIGGER_KEY = '/';

@Component({
  selector: 'app-search',
  imports: [CommandPalette],
  templateUrl: './search.html',
  styleUrl: './search.css',
  host: {
    '(window:keydown)': 'handleWindowKeydown($event)',
  },
})
export class Search {
  readonly #searchService = injectAsync(
    () => import('@/core/api/search.service').then(({ SearchService }) => SearchService),
    { prefetch: onIdle },
  );

  protected readonly isBrowser = isBrowser();
  protected readonly isOpened = signal(false);
  protected readonly open = signal(false);
  protected readonly query = signal('');

  readonly #debouncedQuery = debounced(this.query, 300);
  readonly #resource = resource({
    defaultValue: [],
    params: () => {
      const query = this.#debouncedQuery.value().trim();
      if (!this.open() || isEmpty(query)) {
        return undefined;
      }
      return query;
    },
    loader: async ({ params: query }) => (await this.#searchService()).search(query),
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

  protected onClose(): void {
    this.open.set(false);
  }
}
