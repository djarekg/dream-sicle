import { getProduct, getProducts, updateProduct } from '@/controllers/products.ts';
import { withCors } from '@/middleware/with-cors.ts';

/**
 * Defining product-related routes for the API.
 */
export const productRoutes = {
  '/products': withCors(async () => getProducts()),
  '/products/:id': {
    GET: withCors(async req => getProduct(req)),
    POST: withCors(async req => updateProduct(req)),
  },
};
