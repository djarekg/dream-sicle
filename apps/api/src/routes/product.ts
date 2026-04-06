import { getProduct, getProducts } from '@/controllers/products.ts';
import { withCors } from '@/middleware/with-cors.ts';

/**
 * Defining product-related routes for the API.
 */
export const productRoutes = {
  '/products': withCors(async () => getProducts()),
  '/products/:id': withCors(async req => getProduct(req)),
};
