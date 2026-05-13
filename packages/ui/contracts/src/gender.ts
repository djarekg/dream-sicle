/**
 * Shared gender values exposed by API contracts.
 */
export const Gender = ["MALE", "FEMALE", "PERFERNOTTOSAY"] as const;

/**
 * Union type for supported gender values.
 */
export type Gender = (typeof Gender)[number];
