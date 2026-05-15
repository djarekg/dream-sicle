/**
 * Shared gender values used by the web app.
 */
export const Gender = ['MALE', 'FEMALE', 'PERFERNOTTOSAY'] as const;

/**
 * Union type for supported gender values.
 */
export type Gender = (typeof Gender)[number];
