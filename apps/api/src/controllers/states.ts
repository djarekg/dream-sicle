import type { StateDto } from '@ds/contracts';

import prisma from '@/db.ts';

/**
 * Get all states.
 */
export const getStates = async () => {
  const states = await prisma.state.findMany();

  return Response.json(
    states.map(
      (state): StateDto => ({
        id: state.id,
        name: state.name,
        code: state.code,
      }),
    ),
  );
};
