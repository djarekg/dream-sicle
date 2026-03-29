import { computed, Injectable, signal } from '@angular/core';

import type { AuthStatus } from './auth-status';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #status = signal<AuthStatus>('idle');

  readonly isAuthenticating = computed(() => this.#status() === 'idle');
  readonly isAuthenticated = computed(() => this.#status() === 'authenticated');

  async signin(): Promise<void> {
    this.#status.set('idle');

    await new Promise(resolve => setTimeout(resolve, 1000));

    this.#status.set('authenticated');
  }

  async signout(): Promise<void> {
    this.#status.set('idle');
  }
}
