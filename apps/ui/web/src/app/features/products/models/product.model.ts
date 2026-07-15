import type { Gender } from '@/core/models/gender';
import type { ProductType } from '@/core/models/product-type';

/**
 * Client-safe product shape returned by the API.
 *
 * Date values are represented as ISO-8601 strings because API responses are JSON.
 */
export type ProductDto = {
  id: string;
  name: string;
  description: string;
  price: string;
  gender: Gender;
  productType: ProductType;
  isActive: boolean;
  dateCreated: string;
  dateUpdated: string;
};
