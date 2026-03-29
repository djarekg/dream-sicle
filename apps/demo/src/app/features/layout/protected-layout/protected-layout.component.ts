import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  NavigationEnd,
  NavigationSkipped,
  Router,
  RouterOutlet,
} from '@angular/router';
import { CommandPalette } from '@ds/components';
import { isBrowser } from '@ds/core';
import { filter } from 'rxjs';

import { Header } from '@/components/layout/header/header.component';

const ESCAPE = 'Escape';
const SEARCH_TRIGGER_KEY = 'k';

@Component({
  selector: 'app-protected-layout',
  imports: [CommandPalette, Header, RouterOutlet],
  templateUrl: './protected-layout.component.html',
  styleUrl: './protected-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:keydown)': 'setSearchDialogVisibilityOnKeyPress($event)',
  },
})
export default class ProtectedLayout {
  readonly #router = inject(Router);

  protected readonly isBrowser = isBrowser;
  protected readonly displaySearchDialog = signal(false);

  constructor() {
    this.#closeSearchDialogOnNavigationSkipped();

    this.#router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.displaySearchDialog.set(false);
      });
  }

  protected setSearchDialogVisibilityOnKeyPress(event: KeyboardEvent): void {
    if (event.key === SEARCH_TRIGGER_KEY && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      this.displaySearchDialog.update(display => !display);
    }

    if (event.key === ESCAPE && this.displaySearchDialog()) {
      event.preventDefault();
      this.displaySearchDialog.set(false);
    }
  }

  #closeSearchDialogOnNavigationSkipped(): void {
    this.#router.events
      .pipe(filter(event => event instanceof NavigationSkipped))
      .subscribe(() => {
        this.displaySearchDialog.set(false);
      });
  }
}
