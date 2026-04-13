import { Component, inject, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavDrawer } from '@ds/components';

import { AuthService } from '@/core/auth/auth.service';

@Component({
  selector: 'app-settings-nav',
  imports: [MatIconModule, MatListModule, NavDrawer, RouterLink, RouterLinkActive],
  templateUrl: './settings-nav.html',
  styleUrl: './settings-nav.css',
})
export class SettingsNav {
  #authService = inject(AuthService);

  readonly opened = input.required<boolean>();
  readonly close = output<void>();

  protected userId = signal(this.#authService.userId);

  protected onSignOut(): void {
    this.#authService.signout();
    this.close.emit();
  }
}
