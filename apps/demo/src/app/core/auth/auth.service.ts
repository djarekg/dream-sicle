import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '@ds/contracts';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

import { ApiService } from '@/core/api/api.service.js';
import { AUTH_TOKEN_CACHE_KEY } from '@/core/auth/auth-token-cache-key';

import { AuthCookie } from './auth-cookie.js';
import { AuthStatus } from './auth-status.js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #api = inject(ApiService);
  readonly #http = inject(HttpClient);
  readonly #cookieService = inject(SsrCookieService);
  readonly #router = inject(Router);
  readonly #status = signal<AuthStatus>('unauthenticated');

  readonly isAuthenticated = computed(() => this.#status() === 'authenticated');
  readonly isAuthenticating = computed(() => this.#status() === 'idle');

  get userId() {
    return this.#getCookie().userId;
  }

  get isAdmin() {
    const cookie = this.#getCookie();
    return cookie.role === Role.ADMIN;
  }

  /**
   * Refresh the user authentication status.
   */
  refresh() {
    const tokenRaw = this.#cookieService.get(AUTH_TOKEN_CACHE_KEY);

    if (tokenRaw) {
      this.#status.set('authenticated');
    } else {
      this.#status.set('unauthenticated');
    }
  }

  /**
   * Authenticate the user and redirect to the specified url.
   *
   * @param {string[]} urlSegments - The url segments to navigate to after authentication.
   */
  authenticate(urlSegments: string[] = ['/']) {
    this.refresh();
    this.#router.navigate(urlSegments);
  }

  /**
   * Verify user credentials and store auth token.
   */
  signin(email: string, password: string) {
    const { promise, resolve, reject } = Promise.withResolvers<boolean>();

    this.#status.set('idle');

    this.#http
      .post<AuthCookie>('/auth/signin', {
        email,
        password,
      })
      .subscribe({
        next: ({ token, userId, role }) => {
          if (token) {
            this.#cookieService.set(
              AUTH_TOKEN_CACHE_KEY,
              JSON.stringify({ token, userId, email, role }),
              {
                path: '/',
              },
            );
            this.#status.set('authenticated');
            this.authenticate();
            resolve(true);
          } else {
            this.#status.set('unauthenticated');
            resolve(false);
          }
        },
        error: err => {
          console.error('Failed to signin', err);
          reject(false);
        },
      });

    return promise;
  }

  /**
   * Signout the user and redirect to the home page.
   */
  async signout() {
    const { success = false } = await this.#api.post<
      unknown,
      { success: boolean }
    >('/auth/signout');

    if (success) {
      this.#cookieService.delete(AUTH_TOKEN_CACHE_KEY, '/');
      this.#status.set('unauthenticated');
      this.#router.navigate(['/unprotected/signin']);
    }
  }

  #getCookie() {
    const cookieStr = this.#cookieService.get(AUTH_TOKEN_CACHE_KEY);
    const authCookie = JSON.parse(cookieStr) as AuthCookie;
    return authCookie;
  }
}
