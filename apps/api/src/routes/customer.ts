import { getCustomer, getCustomers } from '@/controllers/customers.ts';
import { withCors } from '@/middleware/with-cors.ts';

/**
 * Defining customer-related routes for the API.
 */
export const customerRoutes = {
  '/customers': withCors(async () => getCustomers()),
  '/customers/:id': withCors(async req => getCustomer(req)),
};
