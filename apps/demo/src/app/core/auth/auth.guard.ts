import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { isServer } from '@ds/core';

import { AuthService } from '@/core/auth/auth.service';

export const authGuard = () => {
  const router = inject(Router);
  const { isAuthenticated, isAuthenticating } = inject(AuthService);

  if (isAuthenticating()) return false;
  if (isAuthenticated()) return true;
  if (isServer) return false;

  return router.createUrlTree(['/unprotected/signin']);
};
