import {
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
} from '@/controllers/customers.ts';
import { withCors } from '@/middleware/with-cors.ts';

/**
 * Defining customer-related routes for the API.
 */
export const customerRoutes = {
  '/customers': withCors(async () => getCustomers()),
  '/customers/:id': {
    GET: withCors(async req => getCustomer(req)),
    POST: withCors(async req => updateCustomer(req)),
    DELETE: withCors(async req => deleteCustomer(req)),
  },
};
