import { isAuthenticated, signin, signout } from '@/controllers/auth.ts';
import { withCors } from '@/middleware/with-cors.ts';

/**
 * Defining auth-related routes for the API.
 */
export const authRoutes = {
  '/auth/signin': withCors(async req => signin(req)),
  '/auth/signout': withCors(async () => signout()),
  '/auth/authenticated': withCors(async req => isAuthenticated(req)),
};
