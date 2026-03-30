/**
 * Shared gender values exposed by API contracts.
 */
export const Genders = ['MALE', 'FEMALE', 'PERFERNOTTOSAY'] as const;

/**
 * Union type for supported gender values.
 */
export type Gender = (typeof Genders)[number];
