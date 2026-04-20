import type { CustomerDto } from '@ds/contracts';
import type { CustomerModel } from '@ds/db';

import prisma from '@/db.ts';
import { ApiError, ApiStatus } from '@/types/index.ts';
import { parseParams } from '@/utils/params.ts';

type UpdateCustomerPayload = Pick<
  CustomerDto,
  'name' | 'streetAddress' | 'streetAddress2' | 'city' | 'stateId' | 'zip' | 'phone' | 'isActive'
>;

const toCustomerDto = (customer: CustomerModel): CustomerDto => {
  return {
    id: customer.id,
    name: customer.name,
    streetAddress: customer.streetAddress,
    streetAddress2: customer.streetAddress2 || undefined,
    city: customer.city,
    stateId: customer.stateId,
    zip: customer.zip,
    phone: customer.phone,
    isActive: customer.isActive,
    dateCreated: customer.dateCreated.toISOString(),
    dateUpdated: customer.dateUpdated?.toISOString(),
  };
};

/**
 * Get a single customer by ID.
 */
export const getCustomer = async (req: Request) => {
  const { id } = parseParams<{ id: string }>(req);

  if (!id) {
    throw new ApiError(ApiStatus.badRequest, 'Customer ID is required');
  }

  const customer = await prisma.customer.findUnique({
    where: { id },
  });

  if (!customer) {
    throw new ApiError(ApiStatus.notFound, 'Customer not found', { id });
  }

  return Response.json(toCustomerDto(customer));
};

/**
 * Get all customers.
 */
export const getCustomers = async () => {
  const customers = await prisma.customer.findMany();
  return Response.json(customers.map(toCustomerDto));
};

/**
 * Update a customer by ID.
 */
export const updateCustomer = async (req: Request) => {
  const { id } = parseParams<{ id: string }>(req);

  if (!id) {
    throw new ApiError(ApiStatus.badRequest, 'Customer ID is required');
  }

  const payload = (await req.json()) as Partial<UpdateCustomerPayload>;

  const customer = await prisma.customer.update({
    where: { id },
    data: {
      name: payload.name,
      streetAddress: payload.streetAddress,
      streetAddress2: payload.streetAddress2,
      city: payload.city,
      stateId: payload.stateId,
      zip: payload.zip,
      phone: payload.phone,
      isActive: payload.isActive,
    },
  });

  return Response.json(toCustomerDto(customer));
};

/**
 * Delete a customer by ID.
 */
export const deleteCustomer = async (req: Request) => {
  const { id } = parseParams<{ id: string }>(req);

  if (!id) {
    throw new ApiError(ApiStatus.badRequest, 'Customer ID is required');
  }

  const customer = await prisma.customer.delete({
    where: { id },
  });

  return Response.json(toCustomerDto(customer));
};
