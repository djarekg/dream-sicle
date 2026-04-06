/**
 * Shared product type values exposed by API contracts.
 */
export const ProductType = [
  "DRESS",
  "HAT",
  "HOODIE",
  "JACKET",
  "PANTS",
  "SHIRT",
  "SHOES",
  "SHORTS",
  "SOCKS",
  "SWEATER",
  "UNDERWEAR",
] as const;

/**
 * Union type for supported product type values.
 */
export type ProductType = (typeof ProductType)[number];
