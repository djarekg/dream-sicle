/**
 * Shared role values exposed by API contracts.
 */
export const Role = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  SALES: 'SALES',
  ACCOUNTING: 'ACCOUNTING',
} as const;

/**
 * Union type for supported role values.
 */
export type Role = (typeof Role)[keyof typeof Role];
