import type { UserDto } from '@ds/contracts';
import type { UserModel } from '@ds/db';

import prisma from '@/db.ts';
import { ApiError, ApiStatus } from '@/types/index.ts';
import { parseParams } from '@/utils/params.ts';

const toUserDto = (user: UserModel): UserDto => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    email: user.email,
    streetAddress: user.streetAddress,
    streetAddress2: user.streetAddress2,
    city: user.city,
    stateId: user.stateId,
    zip: user.zip,
    phone: user.phone,
    jobTitle: user.jobTitle,
    imageId: user.imageId,
    isActive: user.isActive,
    dateCreated: user.dateCreated.toISOString(),
    dateUpdated: user.dateUpdated?.toISOString() ?? null,
  };
};

/**
 * Get a single user by ID.
 *
 */
export const getUser = async (req: Request) => {
  const { id } = parseParams<{ id: string }>(req);

  if (!id) {
    throw new ApiError(ApiStatus.badRequest, 'User ID is required');
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new ApiError(ApiStatus.notFound, 'User not found', { id });
  }

  return Response.json(toUserDto(user));
};

/**
 * Get all users.
 */
export const getUsers = async () => {
  const users = await prisma.user.findMany();
  return Response.json(users.map(toUserDto));
};
