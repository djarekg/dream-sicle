import { computed, Injectable, signal } from '@angular/core';
import { assert } from '@ds/core';

import type { AuthStatus } from './auth-status';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #status = signal<AuthStatus>('unauthenticated');

  readonly isAuthenticating = computed(() => this.#status() === 'idle');
  readonly isAuthenticated = computed(() => this.#status() === 'authenticated');

  async signin(email: string, password: string): Promise<void> {
    this.#status.set('idle');

    assert.isNotEmpty(email, 'Email is required');
    assert.isNotEmpty(password, 'Password is required');

    await new Promise(resolve => setTimeout(resolve, 1000));

    this.#status.set('authenticated');
  }

  async signout(): Promise<void> {
    this.#status.set('unauthenticated');
  }
}
