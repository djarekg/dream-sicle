import { getUser, getUsers } from '@/controllers/users.ts';
import { withCors } from '@/middleware/with-cors.ts';

/**
 * Defining user-related routes for the API.
 */
export const userRoutes = {
  '/users': withCors(async () => getUsers()),
  '/users/:id': withCors(async req => getUser(req)),
};
