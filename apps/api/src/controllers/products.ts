import type { ProductDto } from '@ds/contracts';
import type { ProductModel } from '@ds/db';

import prisma from '@/db.ts';
import { ApiError, ApiStatus } from '@/types/index.ts';
import { parseParams } from '@/utils/params.ts';

type UpdateProductPayload = Pick<
  ProductDto,
  'name' | 'description' | 'price' | 'gender' | 'productType' | 'isActive'
>;

const toProductDto = (product: ProductModel): ProductDto => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    gender: product.gender,
    productType: product.productType,
    isActive: product.isActive,
    dateCreated: product.dateCreated.toISOString(),
    dateUpdated: product.dateUpdated.toISOString(),
  };
};

/**
 * Get a single product by ID.
 */
export const getProduct = async (req: Request) => {
  const { id } = parseParams<{ id: string }>(req);

  if (!id) {
    throw new ApiError(ApiStatus.badRequest, 'Product ID is required');
  }

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw new ApiError(ApiStatus.notFound, 'Product not found', { id });
  }

  return Response.json(toProductDto(product));
};

/**
 * Get all products.
 */
export const getProducts = async () => {
  const products = await prisma.product.findMany();
  return Response.json(products.map(toProductDto));
};

/**
 * Update a product by ID.
 */
export const updateProduct = async (req: Request) => {
  const { id } = parseParams<{ id: string }>(req);

  if (!id) {
    throw new ApiError(ApiStatus.badRequest, 'Product ID is required');
  }

  const payload = (await req.json()) as Partial<UpdateProductPayload>;

  const product = await prisma.product.update({
    where: { id },
    data: {
      name: payload.name,
      description: payload.description,
      price: payload.price,
      gender: payload.gender,
      productType: payload.productType,
      isActive: payload.isActive,
    },
  });

  return Response.json(toProductDto(product));
};
