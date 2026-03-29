import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@/core/auth/auth.service';

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isAuthenticating()) return false;
  if (authService.isAuthenticated()) return true;

  return router.createUrlTree(['/unprotected/signin']);
};
