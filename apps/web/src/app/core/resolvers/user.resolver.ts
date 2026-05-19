import { AuthService } from '@/core/auth/auth.service';
import type { User } from '@/core/models';
import { UserService } from '@/core/services/user.service';
import { inject } from '@angular/core';
import { Router, type ResolveFn } from '@angular/router';

export const userResolver: ResolveFn<User | null> = async () => {
  const userService = inject(UserService);
  const email = inject(AuthService).userName;
  const router = inject(Router);

  if (!email) {
    await router.navigate(['/signin']);
    return null;
  }

  try {
    const user = await userService.getUserByEmail(email);
    return user;
  } catch {
    await router.navigate(['/signin']);
    return null;
  }
};
