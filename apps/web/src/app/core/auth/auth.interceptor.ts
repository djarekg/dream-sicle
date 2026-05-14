import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

import type { AuthToken } from './auth-token';
import { AUTH_TOKEN_CACHE_KEY } from './auth-token-cache-key';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const rawAuthToken = inject(SsrCookieService).get(AUTH_TOKEN_CACHE_KEY);

  let token: string | null = null;
  if (rawAuthToken) {
    try {
      token = (JSON.parse(rawAuthToken) as AuthToken).accessToken;
    } catch {
      token = null;
    }
  }

  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  return next(req);
};
