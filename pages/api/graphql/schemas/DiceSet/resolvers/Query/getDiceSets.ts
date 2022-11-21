import { logger } from '$helpers-client';
import { ResolverFn } from '$types';
import { DiceSet } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const getDiceSets: ResolverFn<unknown, Promise<DiceSet[]>> = async (_parent, _args, { prisma, unpackedToken }) => {
  try {
    const sets = await prisma.user
      .findUnique({
        where: {
          id: unpackedToken.id,
        },
      })
      .ownedSets();

    return sets;
  } catch (error) {
    logger.error('getDiceSets', error);
    throw new ApolloError('Error getting dice sets');
  }
};
