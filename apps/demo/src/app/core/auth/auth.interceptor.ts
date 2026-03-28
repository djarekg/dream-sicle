import { AUTH_TOKEN_CACHE_KEY } from '@/core/identity/auth-token-cache-key.js';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // const isServer = false;
  // const token = isServer ? null : sessionStorage.getItem(AUTH_TOKEN_CACHE_KEY);
  const token = inject(SsrCookieService).get(AUTH_TOKEN_CACHE_KEY);

  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Token ${token}` } });
  }

  return next(req);
};
