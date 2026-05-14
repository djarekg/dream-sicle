import { HttpClient } from '@angular/common/http';
import { computed, inject, isDevMode, Service, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

import { ApiService } from '@/core/api/api.service.js';
import { AUTH_TOKEN_CACHE_KEY } from '@/core/auth/auth-token-cache-key';

import type { AuthToken } from '@/core/auth/auth-token';
import { AuthStatus } from './auth-status.js';
import { SigninResponse } from './signin-response.js';

type AuthVerificationResponse = {
  isAuthenticated: boolean;
  email: string | null;
  role: string | null;
};

@Service()
export class AuthService {
  readonly #api = inject(ApiService);
  readonly #http = inject(HttpClient);
  readonly #cookieService = inject(SsrCookieService);
  readonly #router = inject(Router);
  readonly #status = signal<AuthStatus>('unauthenticated');

  readonly isAuthenticated = computed(() => this.#status() === 'authenticated');
  readonly isAuthenticating = computed(() => this.#status() === 'idle');

  get userName() {
    const authCookie = this.#getCookie();
    return authCookie?.email || null;
  }

  /**
   * Refresh the user authentication status.
   */
  async refresh() {
    const authCookie = this.#getCookie();
    if (!authCookie?.accessToken) {
      this.#clearSession();
      return;
    }

    this.#status.set('idle');

    try {
      const verification = await this.#api.get<AuthVerificationResponse>('/auth/is-authenticated');

      if (!verification.isAuthenticated) {
        this.#clearSession();
        return;
      }

      this.#cookieService.set(
        AUTH_TOKEN_CACHE_KEY,
        JSON.stringify({
          accessToken: authCookie.accessToken,
          email: verification.email ?? authCookie.email,
        }),
        {
          path: '/',
        },
      );
      this.#status.set('authenticated');
    } catch {
      this.#clearSession();
    }
  }

  /**
   * Authenticate the user and redirect to the specified url.
   *
   * @param {string[]} urlSegments - The url segments to navigate to after authentication.
   */
  authenticate(urlSegments: string[] = ['/']) {
    this.#router.navigate(urlSegments);
  }

  /**
   * Verify user credentials and store auth token.
   */
  signin(email: string, password: string) {
    const { promise, resolve, reject } = Promise.withResolvers<boolean>();

    this.#status.set('idle');

    this.#http
      .post<SigninResponse>('/auth/signin', {
        email,
        password,
      })
      .subscribe({
        next: ({ accessToken, expiresAtUtc }) => {
          if (accessToken) {
            this.#cookieService.set(AUTH_TOKEN_CACHE_KEY, JSON.stringify({ accessToken, email }), {
              path: '/',
              expires: new Date(expiresAtUtc),
              httpOnly: isDevMode(),
            });
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
    try {
      await this.#api.post<unknown, { success: boolean }>('/auth/signout');
    } finally {
      this.#clearSession();
      this.#router.navigate(['/unprotected/signin']);
    }
  }

  #getCookie() {
    const cookieStr = this.#cookieService.get(AUTH_TOKEN_CACHE_KEY);
    if (!cookieStr) {
      return null;
    }

    try {
      return JSON.parse(cookieStr) as AuthToken;
    } catch {
      return null;
    }
  }

  #clearSession() {
    this.#cookieService.delete(AUTH_TOKEN_CACHE_KEY, '/');
    this.#status.set('unauthenticated');
  }
}
