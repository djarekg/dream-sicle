import { compareHash, Role } from '@ds/db';
import { isEmpty, isNotEmpty } from '@ds/utils';
import jwt from 'jsonwebtoken';

import { ApiError, ApiStatus } from '@/types/index.ts';

import { TOKEN_SECRET } from '../config.ts';
import prisma from '../db.ts';
import { parseBody } from '../utils/json.ts';

/**
 * Sign in a user and return a JWT if successful.
 */
export const signin = async (req: Request) => {
  const body = await parseBody<{ email: string; password: string }>(req);
  const { email, password } = body;

  if (isEmpty(email) || isEmpty(password)) {
    throw new ApiError(ApiStatus.badRequest, 'Email and password are required');
  }

  const user = await prisma.user.findFirst({
    select: {
      id: true,
      userCredential: {
        select: {
          password: true,
          role: true,
        },
      },
    },
    where: {
      email,
    },
  });

  // If user doesn't exist, we throw a 404 to avoid revealing
  // whether the email is registered or not
  if (!user) {
    throw new ApiError(ApiStatus.notFound, 'User not found');
  }

  // Validate password against stored has
  const hashPassword = user.userCredential?.password ?? '';
  const isValid = compareHash(password, hashPassword);

  // If credentials are invalid, signin was unsuccessful
  if (!isValid) {
    return Response.json({ success: false });
  }

  console.log(TOKEN_SECRET);

  // Credentials are valid, so return a JWT
  const token = jwt.sign({ username: email }, TOKEN_SECRET, {
    expiresIn: '24h',
  });

  return Response.json({
    success: true,
    userId: user.id,
    role: user.userCredential?.role ?? Role.USER,
    token,
  });
};

/**
 * Sign out a user by expiring their JWT.
 */
export const signout = () => {
  // Note: In a real implementation, you might want to add the token to a blacklist
  // For now, we just acknowledge the signout
  return Response.json({ success: true });
};

/**
 * Check if the user is authenticated by verifying their JWT.
 */
export const isAuthenticated = (req: Request) => {
  const header = req.headers.get('authorization');
  const token = header?.split(' ')[1] ?? '';

  if (isNotEmpty(token)) {
    try {
      const authenticated = !!jwt.verify(token, TOKEN_SECRET);
      return Response.json(authenticated);
    } catch (error) {
      console.error('Token verification failed', error);
    }
  }

  return Response.json(false);
};
