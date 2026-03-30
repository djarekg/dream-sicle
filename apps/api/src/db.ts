import { createPrismaClient } from '@ds/db';

import { DATABASE_URL } from './config.ts';

const prisma = createPrismaClient({ url: DATABASE_URL });

export default prisma;
