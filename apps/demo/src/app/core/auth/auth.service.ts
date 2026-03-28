import { computed, Injectable, signal } from '@angular/core';

import type { AuthStatus } from './auth-status';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #status = signal<AuthStatus>('idle');

  readonly isAuthenticating = computed(() => this.#status() === 'idle');
  readonly isAuthenticated = computed(() => this.#status() === 'authenticated');
}
