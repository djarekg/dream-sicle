export const CORS_ORIGIN = import.meta.env.VITE_CORS_ORIGIN;
export const DATABASE_URL = process.env.DATABASE_URL;
export const TOKEN_SECRET = import.meta.env.VITE_ACCESS_TOKEN_SECRET!;
export const PORT = Number(import.meta.env.VITE_PORT ?? 4000);
export const IS_DEV = import.meta.env.DEV;
export const IS_PROD = import.meta.env.PROD;
