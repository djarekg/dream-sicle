import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@/core/auth/auth.service';

export const authGuard = () => {
  const router = inject(Router);
  const service = inject(AuthService);

  if (service.isAuthenticated()) return true;

  return router.createUrlTree(['/unprotected/signin']);
};
