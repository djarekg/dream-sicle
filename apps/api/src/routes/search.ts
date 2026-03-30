import { getSearchResults } from '@/controllers/search.ts';
import { withCors } from '@/middleware/with-cors.ts';

/**
 * Defining search-related routes for the API.
 */
export const searchRoutes = {
  '/search': withCors(async req => getSearchResults(req)),
};
