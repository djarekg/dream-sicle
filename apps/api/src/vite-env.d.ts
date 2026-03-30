/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ACCESS_TOKEN_SECRET: string;
  readonly VITE_SKIP_PRISMA_VERSION_CHECK: string;
  readonly VITE_PORT: string;
  readonly VITE_CORS_ORIGIN: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
