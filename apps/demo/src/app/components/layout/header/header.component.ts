import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  output,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Breadcrumbs } from '@ds/components';

import { AuthService } from '@/core/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    Breadcrumbs,
    MatButtonModule,
    MatIconModule,
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  #logoHoverResetTimeout: ReturnType<typeof setTimeout> | null = null;

  readonly #authService = inject(AuthService);
  readonly #destroyRef = inject(DestroyRef);

  protected readonly isLogoHovered = signal(false);

  readonly settingsButtonClick = output<void>();

  constructor() {
    this.#destroyRef.onDestroy(() => {
      if (this.#logoHoverResetTimeout) {
        clearTimeout(this.#logoHoverResetTimeout);
        this.#logoHoverResetTimeout = null;
      }
    });
  }

  /**
   * Handles mouseenter event on logo. Cancels any pending hover-off timeout and
   * immediately sets the logo hover state to true, which triggers the image swap
   * to dream-sicle.svg.
   */
  protected readonly onLogoMouseEnter = () => {
    if (this.#logoHoverResetTimeout) {
      clearTimeout(this.#logoHoverResetTimeout);
      this.#logoHoverResetTimeout = null;
    }

    this.isLogoHovered.set(true);
  };

  /**
   * Handles mouseleave event on logo. Schedules the hover state to be reset to false
   * after 200ms, reverting the image back to dream-sicle-outline.svg. If the logo is
   * re-hovered before the timeout completes, the timeout is cancelled by onLogoMouseEnter.
   */
  protected readonly onLogoMouseLeave = () => {
    this.#logoHoverResetTimeout = setTimeout(() => {
      this.isLogoHovered.set(false);
      this.#logoHoverResetTimeout = null;
    }, 200);
  };

  protected async onSignout() {
    await this.#authService.signout();
  }
}
