import { config } from 'dotenv';
import { defineConfig, env } from 'prisma/config';

config({ path: '.env.local' });

export default defineConfig({
  schema: './prisma/schema.prisma',
  migrations: {
    path: './prisma/migrations',
    seed: 'node prisma/seed/seed.ts',
  },
  datasource: {
    // url: process.env.DATABASE_URL!,
    url: env('DATABASE_URL'),
    // shadowDatabaseUrl: process.env.DIRECT_URL!,
    // shadowDatabaseUrl: process.env.DIRECT_URL!,
    // Optional directUrl moved from schema
    // Optionally support shadow DB if present:
    // shadowDatabaseUrl: env('SHADOW_DATABASE_URL'),
  },
});
